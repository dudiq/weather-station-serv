#pragma once

String WX_API_ENDPOINT_PATH = "http://localhost:5050/api/data";

char *WX_WIFI_SSID = "SSID";
char *WX_WIFI_PWD = "PWD";

const long WX_IMMEDIATE_SLEEP_SECONDS = 60; // 1 minute

const int WX_MAX_REQUEST_TICK = 2;

const int MAX_WIFI_CONNECT_TICKS = 50;

bool WX_IS_DEV = false;

String WX_API_TOKEN = "token";
