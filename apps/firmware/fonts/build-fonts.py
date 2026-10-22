"""Build all firmware text sizes from one vendored Nunito font."""
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import zlib

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "source" / "Nunito.ttf"
OUTPUT = ROOT.parent / "src" / "fonts"
SIZES = {"textSm": 8, "textMd": 16, "textLg": 28, "textXl": 52}
TEMPERATURE_SIZES = {"temperatureMd": 16, "temperatureLg": 28, "temperatureXl": 52}


def glyphs(header):
    """Read and validate the actual compressed firmware bitmaps."""
    section = header.split("Bitmaps[", 1)[1].split("};", 1)[0]
    bitmap = bytes(int(v, 16) for v in re.findall(r"0x([0-9A-F]{2})", section))
    section = header.split("Glyphs[] = {", 1)[1].split("};", 1)[0]
    props = [tuple(map(int, row.split(','))) for row in re.findall(r"\{\s*([-\d, ]+)\s*\}", section)]
    section = header.split("Intervals[] = {", 1)[1].split("};", 1)[0]
    result = {}
    for start, end, offset in re.findall(r"\{ 0x([\dA-F]+), 0x([\dA-F]+), 0x([\dA-F]+) \}", section):
        start, end, offset = (int(v, 16) for v in (start, end, offset))
        for codepoint in range(start, end + 1):
            width, height, advance, left, top, length, position = props[offset + codepoint - start]
            packed = zlib.decompress(bitmap[position:position + length])
            if len(packed) != ((width + 1) // 2) * height:
                raise ValueError(f"Invalid bitmap length for U+{codepoint:04X}")
            result[chr(codepoint)] = (width, height, advance, left, top, packed)
    return result


def render_text(image, font, text, x, baseline):
    for character in text:
        width, height, advance, left, top, packed = font[character]
        if width and height:
            pixels = []
            stride = (width + 1) // 2
            for y in range(height):
                for column in range(width):
                    byte = packed[y * stride + column // 2]
                    coverage = (byte >> 4) if column % 2 else (byte & 15)
                    pixels.append(255 - coverage * 17)
            glyph = Image.new("L", (width, height))
            glyph.putdata(pixels)
            image.paste(glyph, (x + left, baseline - top))
        x += advance


def main():
    metadata = json.loads((ROOT / "source" / "source.json").read_text(encoding="utf-8"))
    if hashlib.sha256(SOURCE.read_bytes()).hexdigest() != metadata["sha256"]:
        raise ValueError("Nunito source checksum does not match source.json")
    environment = dict(os.environ, PYTHONIOENCODING="utf-8")
    generated = {}
    for name, size in (SIZES | TEMPERATURE_SIZES).items():
        options = []
        if name in TEMPERATURE_SIZES:
            options = ["--digit-weight", "600", "--codepoints",
                       ','.join(f'{point:X}' for point in [32, 43, 45, *range(48, 58), 176])]
        result = subprocess.run(
            [sys.executable, str(ROOT / "fontconvert.py"), "--compress", "--weight", "400", *options, name, str(size), str(SOURCE)],
            capture_output=True, encoding="utf-8", env=environment, check=True,
        )
        header = "\n".join(line.rstrip() for line in result.stdout.splitlines()) + "\n"
        generated[name] = (header, glyphs(header))
    # Validate every size before replacing any firmware headers.
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name, (header, font) in generated.items():
        (OUTPUT / f"{name}.h").write_bytes(header.encode("utf-8"))
        print(f"{name}: {len(font)} glyphs, {len(header.encode('utf-8'))} header bytes")

    preview = Image.new("L", (1200, 1080), 255)
    labels = ImageDraw.Draw(preview)
    rows = [
        ("textSm", 60, "13.10.2026  |  100%  4.2v"),
        ("textMd", 155, "Вторник, 13 октября  |  Tuesday"),
        ("textLg", 300, "Ветер 3 м/с  |  +12° / -3°"),
        ("textXl", 520, "+12°  -3°  100%"),
        ("temperatureMd", 660, "+12°  -3°  0°"),
        ("temperatureLg", 800, "+12°  -3°  0°"),
        ("temperatureXl", 1010, "+12°  -3°  0°"),
    ]
    for name, baseline, text in rows:
        font = generated[name][1]
        top = max(font[character][4] for character in text)
        weight = "Semibold digits" if name in TEMPERATURE_SIZES else "Regular"
        labels.text((35, baseline - top - 24), f"Nunito {weight} / {name}", fill=110)
        render_text(preview, font, text, 35, baseline)
    preview.save(ROOT / "preview.png")
    print("Preview: fonts/preview.png (rendered from generated 4-bit glyphs)")


if __name__ == "__main__":
    main()
