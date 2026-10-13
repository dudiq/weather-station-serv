# Local weather device and server mono repository
- Based on LilyGo EPD47 (esp32)
- simple nodejs server

## How to run server side
- install node 20.x
- install pnpm 9.15.x
- define variables in apps/server/.env file
- run `pnpm install`
- run `pnpm build`
- run `cd apps/server`
- run `pnpm dev`

or just run `docker compose up -d` with predefined keys in `.env` file

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
- Weather icons from https://github.com/kickstandapps/WeatherIcons
- moon phases from http://www.mockfont.com/old/


## Based on and many thx to this repos

- https://github.com/gchart/Weather_EPD47
- https://github.com/vroland/epdiy
- https://github.com/markbirss/LilyGo-EPD-4-7-OWM-Weather-Display
