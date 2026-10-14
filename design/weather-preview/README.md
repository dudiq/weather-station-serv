# Weather preview — 960 × 540

Design mockup using sample readings from `sample.json`. The preview uses Nunito
Regular, antialiased icons, and 16 shades of gray. It shows current weather on the
left, weather metrics and the moon on the right, and a three-day forecast below.
The icons are sketches, not a complete weather icon set.

The mockup is for visual review only and is not integrated with the firmware or server.

To regenerate `preview.png`, install Pillow and run from the repository root:

```powershell
python design/weather-preview/render.py
```

Nunito is from [Google Fonts](https://github.com/google/fonts/tree/main/ofl/nunito).
Its license and source metadata are in `source/nunito/OFL.txt` and
`source/nunito/source.json`.
