"""Rebuild the existing moon font, including its missing new-moon glyph."""
import os
from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parent
points = [0x30, *range(0x40, 0x5B)]
result = subprocess.run(
    [sys.executable, str(root / 'fontconvert.py'), '--compress', '--codepoints',
     ','.join(f'{point:X}' for point in points), 'moon24', '24', str(root / 'moon.ttc')],
    capture_output=True, encoding='utf-8', env=dict(os.environ, PYTHONIOENCODING='utf-8'), check=True,
)
header = '\n'.join(line.rstrip() for line in result.stdout.splitlines()) + '\n'
(root.parent / 'src' / 'fonts' / 'moon24.h').write_text(header, encoding='utf-8')
print('moon24: 28 glyphs, including 0 (new moon); existing font name and size retained')
