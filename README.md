# Local weather device and server mono repository
- Based on LilyGo EPD47 (esp32)
- simple nodejs server


## Hot to run server side
- install node 18.x + version
- install yarn 1.x
- define variables in apps/server/.env file
- run `yarn install`
- run `yarn build`
- run `cd apps/server`
- run `node dist/src/app.js`



## How to run in device

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
