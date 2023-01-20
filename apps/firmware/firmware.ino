// Weather display for  the LilyGo 4.7" ePaper board
// Build by dudiq, based on gChart and Valentine Roland

// Shout out to Valentine Roland, the source of bits of this code
// https://github.com/gchart
// https://github.com/vroland/epdiy/tree/master/examples/weather/

// Weather icons from https://github.com/kickstandapps/WeatherIcons

// Other information for the EPD47 board: https://github.com/Xinyuan-LilyGO/LilyGo-EPD47

#include <Arduino.h>
#define ARDUINOJSON_ENABLE_ARDUINO_STRING 1
#include <ArduinoJson.h> // https://arduinojson.org/
#include "epd_driver.h"
#include <HTTPClient.h>
#include <WiFi.h>

#include "esp_adc_cal.h"
#include <Wire.h>

#include "src/enum.h"
#include "env.h"
#include "src/mod-wifi.h"
#include "src/mod-battery.h"
#include "src/mod-display-epd.h"
#include "src/mod-drawing.h"
#include "src/mod-request.h"
#include "src/mod-sleep.h"
#include "src/section-status-bar.h"

#include "config.h"

WiFiClient wifiClient;   // wifi client object

ModWifi modWifi;
ModDisplayEpd modDisplayEpd;
ModBattery modBattery;
ModRequest modRequest;
ModDrawing modDrawing(&modDisplayEpd);
SectionStatusBar sectionStatusBar(&modDisplayEpd, &modBattery, &modWifi);

const int MIN_BATTERY_PERCENTAGE = 15;
const uint64_t DEEP_SLEEP_TIME = 60 * 60 * 24 * 100;

void setup()
{
  Serial.begin(115200);
  wakeUp();

  // delay needed for correct start device
  delay(1000);
  Serial.println("starting...");

  modDisplayEpd.prepareBuffer();

  modBattery.readVoltage();
  float percentage = modBattery.currentPercent;
  
  Serial.println("percentage:" + String(percentage));
  if (percentage < MIN_BATTERY_PERCENTAGE) {
    modDrawing.drawNeedCharge();
    gotoSleep(DEEP_SLEEP_TIME);
    return;
  }


  bool isConnected = modWifi.connect(WX_WIFI_SSID, WX_WIFI_PWD);
  if (!isConnected) {
    // TODO add default rendering
    modDrawing.drawNotConnected();
    gotoSleep(WX_IMMEDIATE_SLEEP_SECONDS);
    return;
  }

  if (!handleRequestWeather()) {
    // TODO: add redraw screen and make next request after 20 min
    Serial.println("Cannot observer new data from server, going to sleep");
    modDrawing.drawFetchError();
    gotoSleep(WX_IMMEDIATE_SLEEP_SECONDS);
    return;
  }

  processResults();

  if (!WX_IS_DEV) {
    DynamicJsonDocument json = modRequest.getJson();
    uint64_t sleepSeconds = json["sleepSeconds"].as<int>();
    gotoSleep(sleepSeconds);// 2 hours
  }
}

void loopDev() {
  modDisplayEpd.prepareBuffer();
  DynamicJsonDocument json = modRequest.getJson();
  uint64_t sleepSeconds = json["devSleep"].as<int>();

  delay(sleepSeconds);

  if (!handleRequestWeather()) {
    // TODO: add redraw screen and make next request after 20 min
    Serial.println("Cannot observer new data from server, going to sleep");
    modDrawing.drawFetchError();
    return;
  }
  processResults();
}

void processResults() {
  sectionStatusBar.drawStatusBar(600, 20);

  Serial.println("-draw json");
  DynamicJsonDocument json = modRequest.getJson();
  modDrawing.drawJson(json);

  bool isDev = json["isDev"].as<bool>();
  if (isDev) {
    WX_IS_DEV = true;
  }

  if (WX_IS_DEV) {
    modDrawing.drawDevGrid();
  }

  Serial.println("-draw buffer");
  modDisplayEpd.drawBuffer();
}

void loop(){
  if (WX_IS_DEV) {
    loopDev();
  }
}

bool handleRequestWeather() {
  bool isFetched = false;
  int ticks = 0;
  while (!isFetched && (ticks < WX_MAX_REQUEST_TICK))
  {
    ticks++;
    Serial.print(".");
    delay(200);
    isFetched = modRequest.fetchRequest(wifiClient);
  }

  if (!isFetched) {
    Serial.println("Data not obtained");
  }

  return isFetched;
}

