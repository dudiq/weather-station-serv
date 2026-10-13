"""Create the smaller forecast font from the existing Meteocons bitmap font."""
from pathlib import Path
import re
import runpy
import zlib

from PIL import Image

ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT.parent / 'src' / 'fonts'
NAME = 'meteoconsSmall'
REDUCTION = 18 # Original 89 px -> 71 px; 10 px smaller than the previous 81 px.


def main():
    helpers = runpy.run_path(str(ROOT / 'build-fonts.py'))
    source = (OUTPUT / 'meteocons42.h').read_text(encoding='utf-8')
    glyphs = helpers['glyphs'](source)
    original_size = max(max(glyph[0], glyph[1]) for glyph in glyphs.values())
    scale = (original_size - REDUCTION) / original_size
    bitmaps = bytearray()
    props = []
    for character, (width, height, advance, left, top, packed) in glyphs.items():
        if width and height:
            pixels = []
            for y in range(height):
                for x in range(width):
                    byte = packed[y * ((width + 1) // 2) + x // 2]
                    pixels.append(((byte >> 4) if x % 2 else (byte & 15)) * 17)
            image = Image.new('L', (width, height))
            image.putdata(pixels)
            width, height = max(1, round(width * scale)), max(1, round(height * scale))
            image = image.resize((width, height), Image.Resampling.LANCZOS)
            packed = bytearray()
            for y in range(height):
                for x in range(0, width, 2):
                    value = image.getpixel((x, y)) >> 4
                    if x + 1 < width:
                        value |= (image.getpixel((x + 1, y)) >> 4) << 4
                    packed.append(value)
        compressed = zlib.compress(bytes(packed))
        # Tight glyph origin: center by visible bounds, not legacy font bearings.
        props.append((width, height, max(round(advance * scale), width + 4), 0, height, len(compressed), len(bitmaps)))
        bitmaps.extend(compressed)
    intervals = source.split('Intervals[] = {', 1)[1].split('};', 1)[0]
    metrics = source.split('const GFXfont meteocons42 = {', 1)[1].split('};', 1)[0]
    line_height, ascender, descender = map(int, re.findall(r'^\s*(-?\d+),', metrics, re.M)[-3:])
    lines = ['#pragma once', '#include "epd_driver.h"', f'const uint8_t {NAME}Bitmaps[{len(bitmaps)}] = {{']
    for offset in range(0, len(bitmaps), 16):
        lines.append('    ' + ' '.join(f'0x{value:02X},' for value in bitmaps[offset:offset + 16]))
    lines.extend(['};', f'const GFXglyph {NAME}Glyphs[] = {{'])
    lines.extend('    { ' + ', '.join(map(str, glyph)) + ' },' for glyph in props)
    lines.extend(['};', f'const UnicodeInterval {NAME}Intervals[] = {{' + intervals + '};'])
    lines.extend([f'const GFXfont {NAME} = {{', f'    (uint8_t*){NAME}Bitmaps,', f'    (GFXglyph*){NAME}Glyphs,',
                  f'    (UnicodeInterval*){NAME}Intervals,', '    3,', '    1,',
                  *[f'    {round(value * scale)},' for value in (line_height, ascender, descender)], '};'])
    header = '\n'.join(lines) + '\n'
    result = helpers['glyphs'](header)
    assert max(max(glyph[0], glyph[1]) for glyph in result.values()) == original_size - REDUCTION
    (OUTPUT / f'{NAME}.h').write_text(header, encoding='utf-8')
    print(f'{NAME}: {len(result)} glyphs, maximum size {original_size} -> {original_size - REDUCTION} px')


if __name__ == '__main__':
    main()
