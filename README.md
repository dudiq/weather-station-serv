# Local weather device and server mono repository
- Based on LilyGo EPD47 (esp32)
- server running on Bun

## How to run server side
- install node 20.x
- install pnpm 9.15.x
- install Bun 1.4.3 (version recorded in `.bun-version`)
- define variables in apps/server/.env file
- run `pnpm install --frozen-lockfile`
- run `pnpm build`
- run `cd apps/server`
- run `pnpm dev`

or run `docker compose up -d --build` with predefined keys in `.env` file.
The Docker runtime uses `oven/bun:1.4.3-alpine`; existing Node/pnpm build tools,
dependency versions and workspace packages are unchanged.

## How to run in device

For the original ESP32 LilyGO T5 4.7, use the pinned PlatformIO build described
in [the firmware README](apps/firmware/readme.md#reproducible-build).
It also describes battery measurements and optimization candidates.

- server should be started
- copy /apps/firmware/env.example.h to /apps/firmware/env.h
- define your settings in env.h file
- update variables
- install arduino 2.x
- open https://github.com/Xinyuan-LilyGO/LilyGo-EPD47 repo and use installation guide for install drivers
- open sketch in arduino
- connect device to arduino and build with upload sketch


## Icons
- Detail icons (humidity, pressure, wind, cloud cover, UV): Weather Icons by
  Erik Flowers, https://github.com/erikflowers/weather-icons (SIL OFL 1.1).
- Weather icons from https://github.com/kickstandapps/WeatherIcons
- moon phases from http://www.mockfont.com/old/


## Based on and many thx to this repos

- https://github.com/gchart/Weather_EPD47
- https://github.com/vroland/epdiy
- https://github.com/markbirss/LilyGo-EPD-4-7-OWM-Weather-Display
