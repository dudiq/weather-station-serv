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

    bool connect(char *ssid, char *password)
    {
        bool isConnected = isConnected = WiFi.status() == WL_CONNECTED;
        if (isConnected)
        {
            return true;
        }
        if (WiFi.waitForConnectResult(6000) == WL_CONNECTED)
        {
            return true;
        }

        WiFi.mode(WIFI_STA); // switch off AP
        // WiFi.onEvent(this->WiFiEvent);
        WiFi.setAutoConnect(true);
        WiFi.setAutoReconnect(true);
        WiFi.begin(ssid, password);
        WiFi.persistent(true);
        Serial.println("Start connect to wifi:" + String(ssid));

        int ticks = 0;
        while (!isConnected && (ticks < MAX_WIFI_CONNECT_TICKS))
        {
            delay(1000);
            ticks++;
            Serial.print(".");
            isConnected = WiFi.status() == WL_CONNECTED;
        }

        if (!isConnected)
        {
            Serial.println("Error: \nCan't connect to WiFi");
            return false;
        }

        // this->rssiValue = WiFi.RSSI();
        // WiFi.disconnect(false);

        Serial.println("");
        Serial.println("WiFi connected");
        Serial.println("IP address: ");
        Serial.println(WiFi.localIP());

        return true;
    }

    void disconnect()
    {
        WiFi.disconnect();
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
