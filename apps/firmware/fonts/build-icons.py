"""Generate the small, separate Weather Icons font used by server field blocks."""
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys
import runpy

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "source" / "weather-icons"
ICONS = {"humidity": 0xF07A, "pressure": 0xF079, "wind": 0xF050, "cloud": 0xF041, "uv": 0xF00D}


def main():
    metadata = json.loads((SOURCE / "source.json").read_text())
    font = SOURCE / "weather-icons.ttf"
    if hashlib.sha256(font.read_bytes()).hexdigest() != metadata["sha256"]:
        raise ValueError("Weather Icons source checksum mismatch")
    result = subprocess.run(
        [sys.executable, str(ROOT / "fontconvert.py"), "--compress", "--codepoints",
         ','.join(f'{point:X}' for point in ICONS.values()), "fieldIcons", "16", str(font)],
        capture_output=True, encoding="utf-8", env=dict(os.environ, PYTHONIOENCODING="utf-8"), check=True,
    )
    header = '\n'.join(line.rstrip() for line in result.stdout.splitlines()) + '\n'
    helpers = runpy.run_path(str(ROOT / "build-fonts.py"))
    glyphs = helpers["glyphs"](header)
    if set(glyphs) != {chr(point) for point in ICONS.values()}:
        raise ValueError("Unexpected icon character set")
    (ROOT.parent / "src" / "fonts" / "fieldIcons.h").write_bytes(header.encode("utf-8"))
    preview = Image.new('L', (750, 120), 255)
    draw = ImageDraw.Draw(preview)
    for index, (name, point) in enumerate(ICONS.items()):
        x = 25 + index * 150
        draw.text((x, 15), name, fill=0)
        helpers["render_text"](preview, glyphs, chr(point), x, 85)
    preview.save(ROOT / 'icons-preview.png')
    print(f'fieldIcons: {len(glyphs)} glyphs; preview: fonts/icons-preview.png')


if __name__ == '__main__':
    main()
