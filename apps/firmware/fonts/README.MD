## Unified text font

All firmware text uses **Inter Regular**, at the existing sizes:

| API name | Generated header | Size at 150 dpi |
| --- | --- | --- |
| `t-sm` | `textSm.h` | 8 pt |
| `t-md` | `textMd.h` | 16 pt |
| `t-lg` | `textLg.h` | 28 pt |
| `t-xl` | `textXl.h` | 52 pt |

The icon fonts (`moon`, `meteo-md`, `meteo-xl`) remain separate.
The text set includes ASCII, degree/plus-minus signs, Russian Cyrillic and Ё/ё
(163 glyphs per size). Font names and server payloads remain compatible.
Font metrics differ from Open Sans/Roboto Slab, so check spacing on the actual display.

Rebuild from the repository root:

```powershell
python -m pip install -r apps/firmware/fonts/requirements.txt
python apps/firmware/fonts/build-fonts.py
```

The script checks the source SHA-256, generates and validates all four compressed
4-bit fonts, then writes directly to `apps/firmware/src/fonts/`.
`preview.png` renders the generated bitmaps, rather than a desktop approximation.
`create-font.bat` runs the same script, independently of the current directory.
Generated headers are committed, so normal firmware builds do not require Python
font dependencies or a network font download.

The vendored variable font uses its default Regular weight and text optical size.
Source: [Inter](https://rsms.me/inter/), from the
[pinned Google Fonts revision](https://github.com/google/fonts/tree/0b58fb370093f9a9f4ff785d94405710b79de67c/ofl/inter).
`source/source.json` records provenance and checksum; `source/OFL.txt` contains the
SIL Open Font License. The `.ttc` files and `text8.h` are legacy assets and are not
used by the unified text build.

## Detail icons

`field-icons` is a separate 16 pt Weather Icons font containing just five glyphs:

| Field | Unicode |
| --- | --- |
| Humidity | U+F07A |
| Pressure | U+F079 |
| Wind | U+F050 |
| Cloud cover | U+F041 |
| UV (sun) | U+F00D |

Run `python apps/firmware/fonts/build-icons.py` to regenerate `fieldIcons.h`
and `icons-preview.png`. It uses the existing Python requirements, verifies
the vendored font checksum and validates the compressed glyphs.
Source revision and license information are in `source/weather-icons/`.
The server sends these as ordinary text blocks with `font: 'field-icons'`,
followed by the value in Inter. No new rendering protocol is needed.
Moon icons and phase captions use their existing font and logic.

Deploy firmware with `field-icons` before deploying the new server response:
older firmware falls back to the text font and cannot render these glyphs.

## Forecast icons and system footer

`meteo-sm` uses `meteoconsSmall.h`, resampled from the existing `meteocons42.h`
with preserved proportions. The largest glyph dimension is reduced by exactly
8 pixels (89 to 81). Regenerate with:

```powershell
python apps/firmware/fonts/build-forecast-icons.py
```

Forecast days use this smaller font; current weather retains `meteo-md`.
The system footer uses the smallest Inter size (`t-sm`) with `align: 'BASELINE'`
at y=528 on the 960x540 display. All blocks share the same text baseline, regardless
of glyph heights. The server sends a combined time/date block and a next-update block,
marked with `footer: true`. Firmware appends battery percent, voltage and Wi-Fi signal
percent before shutting Wi-Fi off. It joins the blocks with ` | `, measures the complete
text in the actual font and aligns the line to the right with a 12-pixel margin.
Footer block coordinates are superseded by this layout; ordinary blocks retain theirs.
Signal strength uses a simple clamped scale: -100 dBm is 0%, -50 dBm is 100%.
It is an approximate signal indicator, not a throughput measurement.
All footer text uses `opacity: 50`, rendered as gray level 8/15 on white;
omitting opacity preserves the normal black text. This is grayscale rendering,
not transparency over arbitrary backgrounds.

## Low-level fontconvert

The following converter is available for custom fonts and icon work.

fontconvert
============

- to build own ttc font use font-forge app
- install python before usage with deps declared below

Prerequisite you need to install python3 and install `freetype-py` using pip
The approximate process is like this:

.. code-block:: shell

    sudo apt install python3-pip
    python3 -m pip install freetype-py

The previous is the prerequisite for implementation, and then you need to store the font file you want to convert in the same path as fontconvert.py. This is just for more convenient operation. You can also fill in the font path.

Then just follow the command below to convert the font.

.. code-block:: shell

    python3 fontconvert.py --compress demo 16 msyh.ttc > font.h

Explanation of specific parameters:

.. code-block:: shell

    python3 fontconvert.py --compress [generated font name] [font size] [font file path] > [generated font file]

Of course, this only demonstrates the generation of standard ascii codes. If you need other fonts, you only need to fill in the unicode encoding of the font to be generated in the `fontconvert.py`  `intervals` list.

Please make sure that the unicode encoding in the fontconvert.py intervals list is included in your font file, otherwise please comment other encodings and only keep the 32,126 range!

.. image:: https://user-images.githubusercontent.com/22990954/104092951-446c1880-52c2-11eb-852e-8c50626eb340.png

imgconvert
============

1. Prerequisites

.. code-block:: shell

    python3 -m pip install pillow

2. Instructions

.. code-block:: shell

    imgconvert.py [-h] [-i INPUTFILE] [-n NAME] [-o OUTPUTFILE]

3. examples:

.. code-block:: shell

    python imgconvert.py -i demo.png  -n demo -o demo.h
