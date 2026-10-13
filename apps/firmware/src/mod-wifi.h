#pragma once

#include "WiFi.h"
#include <Arduino.h>
#include "../env.h"

// #define WIFI_RSSI_OUT -120;

class ModWifi
{
private:
public:
    bool checkConnected()
    {
        return WiFi.status() == WL_CONNECTED;
    }

    bool connect(const char *ssid, const char *password)
    {
        if (checkConnected())
        {
            return true;
        }

        WiFi.persistent(false); // Keep credentials in RAM; do not write flash on wakeup.
        WiFi.mode(WIFI_STA); // switch off AP
        WiFi.setAutoReconnect(true);
        const uint32_t startedAt = millis();
        const uint32_t timeoutMs = (uint32_t)MAX_WIFI_CONNECT_TICKS * 1000UL;
        WiFi.begin(ssid, password);
        Serial.println("Start connect to wifi:" + String(ssid));

        while (!checkConnected() && (uint32_t)(millis() - startedAt) < timeoutMs)
        {
            delay(50);
        }

        if (!checkConnected())
        {
            Serial.println("Error: \nCan't connect to WiFi");
            disconnect();
            return false;
        }

        Serial.println("");
        Serial.println("WiFi connected");
        Serial.println("WiFi connect time ms: " + String(millis() - startedAt));
        Serial.println("IP address: ");
        Serial.println(WiFi.localIP());

        return true;
    }

    void disconnect()
    {
        WiFi.setAutoReconnect(false);
        WiFi.disconnect(false, false); // Preserve AP settings while stopping the connection.
        WiFi.mode(WIFI_OFF);
        Serial.println("WiFi switched Off ");
    }

    bool isWifiConnected()
    {
        return WiFi.status() == WL_CONNECTED;
    }

    int wifiSignal()
    {
        return WiFi.RSSI();
    }
};
