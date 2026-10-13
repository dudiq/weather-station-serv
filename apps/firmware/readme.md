# render json device firmware

This is ordinary device for render json data getting from your server

There are few types of rendering. Ordinary text and image

Why not define weather api inside device and create external server?
- Because in this case you can draw anything with jpeg or just write text messages
- And second point, you can make different requests on server side, instead of device to collect any data and pass it to device

## Reproducible build

The PlatformIO environment targets the original LilyGO T5 4.7 (ESP32,
16 MB flash and PSRAM), not the ESP32-S3 Plus. Confirm your board before uploading.
It pins Espressif32 6.9.0, Arduino ESP32 2.0.17, ArduinoJson 6.21.5,
and the LilyGo-EPD47 driver to a specific Git commit.

Install PlatformIO Core 6.1.18, then run from the repository root:

```powershell
Copy-Item apps/firmware/env.example.h apps/firmware/env.h
# Edit env.h: use the server's LAN address, not localhost, for the endpoint.
pio run -d apps/firmware
pio run -d apps/firmware -t upload --upload-port COM5
pio device monitor -d apps/firmware --port COM5
```

Copy the example only when creating env.h; keep existing credentials on later builds.
The first build downloads the toolchain and libraries. No separate config.h is needed.
Arduino IDE remains supported with the same core/library versions and PSRAM enabled.

References: [LilyGO driver](https://github.com/Xinyuan-LilyGO/LilyGo-EPD47),
[Espressif sleep modes](https://docs.espressif.com/projects/esp-idf/en/v4.4.8/esp32/api-reference/system/sleep_modes.html).
