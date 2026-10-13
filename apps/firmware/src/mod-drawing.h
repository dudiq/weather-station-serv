#pragma once

#include "enum.h"
#include <ArduinoJson.h>

class ModDrawing
{
private:
    /* data */
    ModDisplayEpd *displayEpd;

public:
    ModDrawing(ModDisplayEpd *displayEpd);

    void drawNeedCharge() {
        this->displayEpd->setFont("t-md");
        this->displayEpd->drawString(50, 210 , "Need to charge =(", LEFT);
        this->displayEpd->drawBuffer(); 

        Serial.println("Need charge");
    }

    void drawNotConnected()
    {
        this->displayEpd->setFont("t-md");
        this->displayEpd->drawString(50, 210 , "WIFI Connection lost =(", LEFT);
        this->displayEpd->drawBuffer(); 

        Serial.println("Not connected to WIFI");
    }

    void drawFetchError()
    {
        this->displayEpd->setFont("t-md");
        this->displayEpd->drawString(50, 210 , "Fetch error from server =(", LEFT);
        this->displayEpd->drawBuffer(); 

        Serial.println("Fetch error from server");
    }

    uint8_t getColor(String color)
    {
        if (color == "white")
            return White;
        if (color == "lightGrey")
            return LightGrey;
        if (color == "grey")
            return Grey;
        if (color == "darkGrey")
            return DarkGrey;
        if (color == "black")
            return Black;
        return Black;
    }

    alignment getAlign(String align)
    {
        if (align == "BASELINE")
            return BASELINE;
        if (align == "V_CENTER")
            return V_CENTER;
        if (align == "H_CENTER")
            return H_CENTER;
        if (align == "CENTER")
            return CENTER;
        if (align == "RIGHT")
            return RIGHT;
        if (align == "LEFT")
            return LEFT;
        return LEFT;
    }

    void drawJson(const DynamicJsonDocument &json)
    {
        int totalTexts = json["blocks"]["total"].as<int>();
        for (int d = 0; d < totalTexts; d++)
        {
            if (json["blocks"]["items"][d]["footer"].as<bool>())
                continue;
            String type = json["blocks"]["items"][d]["type"].as<String>();
            if (type == "text")
            {
                this->drawText(json, d);
            }
            if (type == "image")
            {
                this->drawImage(json, d);
            }
            if (type == "rect")
            {
                JsonObjectConst block = json["blocks"]["items"][d];
                int opacity = constrain(block["opacity"] | 100, 0, 100);
                int width = block["width"].as<int>();
                int height = block["height"].as<int>();
                if (opacity > 0 && width > 0 && height > 0)
                {
                    uint8_t color = ((15 * (100 - opacity) + 50) / 100) * 17;
                    this->displayEpd->fillRect(block["x"].as<int>(), block["y"].as<int>(), width, height, color);
                }
            }
        }
    }

    void drawImage(const DynamicJsonDocument &json, int d)
    {

        this->displayEpd->drawImageByUrl(
            json["blocks"]["items"][d]["url"].as<String>(),
            json["blocks"]["items"][d]["x"].as<int>(),
            json["blocks"]["items"][d]["y"].as<int>(),
            json["blocks"]["items"][d]["width"].as<int>(),
            json["blocks"]["items"][d]["height"].as<int>());
    }

    void drawText(const DynamicJsonDocument &json, int d)
    {
        String fontName = json["blocks"]["items"][d]["font"].as<String>();
        this->displayEpd->setFont(fontName);

        alignment align = this->getAlign(json["blocks"]["items"][d]["align"].as<String>());
            int x = json["blocks"]["items"][d]["x"].as<int>();
            int y = json["blocks"]["items"][d]["y"].as<int>();

        this->displayEpd->drawString(
            x,
            y,
            json["blocks"]["items"][d]["text"].as<String>(),
            align,
            json["blocks"]["items"][d]["opacity"] | 100);

        // if (WX_IS_DEV)
        // {
        //   this->displayEpd->setFont("t-sm");
        //   this->displayEpd->drawString(
        //     x,
        //     y,
        //     "x:" + String(x) + "; y:" + String(y),
        //     align);
        //   this->displayEpd->drawVLine(x, y, 20, Black);
        //   this->displayEpd->drawHLine(x, y, 20, Black);
        // }
    }

    void drawDevGrid()
    {
        // 960 / 540
        this->displayEpd->setFont("t-sm");
        this->displayEpd->drawVLine(0, 0, 540, Black);

        this->displayEpd->drawString(240, 0, "240", LEFT);
        this->displayEpd->drawVLine(240, 0, 540, Black);

        this->displayEpd->drawString(480, 0, "480", LEFT);
        this->displayEpd->drawVLine(480, 0, 540, Black);

        this->displayEpd->drawString(720, 0, "720", LEFT);
        this->displayEpd->drawVLine(720, 0, 540, Black);

        this->displayEpd->drawString(960, 0, "960", LEFT);
        this->displayEpd->drawVLine(960, 0, 540, Black);

        this->displayEpd->drawHLine(0, 0, 960, Black);
        this->displayEpd->drawString(0, 135, "135", LEFT);
        this->displayEpd->drawHLine(0, 135, 960, Black);
        this->displayEpd->drawString(0, 270, "270", LEFT);
        this->displayEpd->drawHLine(0, 270, 960, Black);
        this->displayEpd->drawString(0, 405, "405", LEFT);
        this->displayEpd->drawHLine(0, 405, 960, Black);
        this->displayEpd->drawString(0, 540, "540", LEFT);
        this->displayEpd->drawHLine(0, 540, 960, Black);
    }
};

ModDrawing::ModDrawing(ModDisplayEpd *display)
{
    this->displayEpd = display;
}
