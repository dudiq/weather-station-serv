#pragma once

#include "enum.h"
#include <ArduinoJson.h>

class SectionStatusBar
{
private:
    /* data */
    ModDisplayEpd *displayEpd;
    ModBattery *battery;
    ModWifi *wifi;

public:
    SectionStatusBar(ModDisplayEpd *displayEpd, ModBattery *modBattery, ModWifi *modWifi);

    void drawStatusBar(const DynamicJsonDocument &json, int rightEdge, int y)
    {
        Serial.println("-status bar draw start");
        // get data
        float voltage = this->battery->currentVoltage;
        uint8_t voltagePercent = this->battery->currentPercent;
        int wifiSignal = this->wifi->wifiSignalPercent();

        Serial.println("voltage:" + String(voltage));
        Serial.println("voltagePercent:" + String(voltagePercent));

        this->displayEpd->setFont("t-sm");
        String footer;
        for (JsonObjectConst block : json["blocks"]["items"].as<JsonArrayConst>())
        {
            if (!block["footer"].as<bool>())
                continue;
            if (footer.length())
                footer += " | ";
            footer += block["text"].as<String>();
        }
        String status = String(voltagePercent) + "%, " + String(voltage, 1) + "v, WiFi " + String(wifiSignal) + "%";
        if (footer.length())
            footer += " | ";
        footer += status;
        int x = rightEdge - this->displayEpd->textWidth(footer);
        this->displayEpd->drawString(x, y, footer, BASELINE, 50);
        Serial.println("-status bar draw done");
    }

};

SectionStatusBar::SectionStatusBar(ModDisplayEpd *displayEpd, ModBattery *modBattery, ModWifi *modWifi)
{
    this->displayEpd = displayEpd;
    this->battery = modBattery;
    this->wifi = modWifi;
}
