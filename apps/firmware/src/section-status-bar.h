#pragma once

#include "enum.h"

class SectionStatusBar
{
private:
    /* data */
    ModDisplayEpd *displayEpd;
    ModBattery *battery;
    ModWifi *wifi;

public:
    SectionStatusBar(ModDisplayEpd *displayEpd, ModBattery *modBattery, ModWifi *modWifi);

    void drawStatusBar(int x, int y)
    {
        Serial.println("-status bar draw start");
        this->displayEpd->setFont("OpenSans8B");
        // get data
        float voltage = this->battery->voltage();
        uint8_t voltagePercent = this->battery->percent(voltage);
        int wifiSignal = this->wifi->wifiSignal();

        Serial.println("voltage:" + String(voltage));
        Serial.println("voltagePercent:" + String(voltagePercent));

        this->drawWifiSignal(x + 317, y + 5, wifiSignal);
        this->drawBattery(x + 150, 20, voltage, voltagePercent);
        Serial.println("-status bar draw done");
    }

    void drawWifiSignal(int x, int y, int rssi)
    {
        int WIFIsignal = 0;
        int xpos = 1;
        for (int _rssi = -100; _rssi <= rssi; _rssi = _rssi + 20)
        {
            if (_rssi <= -20)
                WIFIsignal = 30; //            <-20dbm displays 5-bars
            if (_rssi <= -40)
                WIFIsignal = 24; //  -40dbm to  -21dbm displays 4-bars
            if (_rssi <= -60)
                WIFIsignal = 18; //  -60dbm to  -41dbm displays 3-bars
            if (_rssi <= -80)
                WIFIsignal = 12; //  -80dbm to  -61dbm displays 2-bars
            if (_rssi <= -100)
                WIFIsignal = 6; // -100dbm to  -81dbm displays 1-bar
            this->displayEpd->fillRect(x + xpos * 8, y - WIFIsignal, 6, WIFIsignal, Black);
            xpos++;
        }
    }

    void drawBattery(int x, int y, float voltage, uint8_t percentage)
    {
        if (voltage < 1)
            return;
        this->displayEpd->drawRect(x + 25, y - 14, 40, 15, Black);
        this->displayEpd->fillRect(x + 65, y - 10, 4, 7, Black);
        this->displayEpd->fillRect(x + 27, y - 12, 36 * percentage / 100.0, 11, Black);
        this->displayEpd->drawString(x + 80, y - 12 , String(percentage) + "%  " + String(voltage, 1) + "v", LEFT);
    }
};

SectionStatusBar::SectionStatusBar(ModDisplayEpd *displayEpd, ModBattery *modBattery, ModWifi *modWifi)
{
    this->displayEpd = displayEpd;
    this->battery = modBattery;
    this->wifi = modWifi;
}