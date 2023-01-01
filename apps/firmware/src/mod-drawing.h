#pragma once

#include "enum.h"

class ModDrawing
{
private:
    /* data */
    ModDisplayEpd *displayEpd;

public:
    ModDrawing(ModDisplayEpd *displayEpd);

    void drawNotConnected()
    {
    }

    void drawFetchError()
    {
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
        if (align == "V_CENTER")
            return V_CENTER;
        if (align == "CENTER")
            return CENTER;
        if (align == "RIGHT")
            return RIGHT;
        if (align == "LEFT")
            return LEFT;
    }

    void drawJson(DynamicJsonDocument json)
    {
        int totalTexts = json["blocks"]["total"].as<int>();
        for (int d = 0; d < totalTexts; d++)
        {
            String type = json["blocks"]["items"][d]["type"].as<String>();
            if (type == "text")
            {
                this->drawText(json, d);
            }
            if (type == "image")
            {
                this->drawImage(json, d);
            }
        }
    }

    void drawImage(DynamicJsonDocument json, int d)
    {

        this->displayEpd->drawImageByUrl(
            json["blocks"]["items"][d]["url"].as<String>(),
            json["blocks"]["items"][d]["x"].as<int>(),
            json["blocks"]["items"][d]["y"].as<int>(),
            json["blocks"]["items"][d]["width"].as<int>(),
            json["blocks"]["items"][d]["height"].as<int>());
    }

    void drawText(DynamicJsonDocument json, int d)
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
            align);

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

    void drawGrid()
    {
        //    ModDisplayEpd *disp = this->displayEpd;
        // // two lines each for double thickness

        this->displayEpd->drawVLine(480, 0, 540, Black);
        this->displayEpd->drawVLine(481, 0, 540, Black);

        this->displayEpd->drawHLine(480, 135, 480, Black);
        this->displayEpd->drawHLine(480, 136, 480, Black);
        this->displayEpd->drawHLine(480, 270, 480, Black);
        this->displayEpd->drawHLine(480, 271, 480, Black);
        this->displayEpd->drawHLine(480, 405, 480, Black);
        this->displayEpd->drawHLine(480, 406, 480, Black);
    }
};

ModDrawing::ModDrawing(ModDisplayEpd *display)
{
    this->displayEpd = display;
}