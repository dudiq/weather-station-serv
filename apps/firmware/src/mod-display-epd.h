#pragma once

// #include <HTTPClient.h>
#include "epd_driver.h"
#include "enum.h"
#include "libjpeg/libjpeg.h"
#include "esp_adc_cal.h"
#include "mod-fonts.h"

class ModDisplayEpd
{
private:
    /* data */
    GFXfont currentFont;
    uint8_t *framebuffer = nullptr;
    bool isEpdInited = false;
    bool isJpegInited = false;

public:
    bool prepareBuffer()
    {
        if (!this->framebuffer)
        {
            this->framebuffer = (uint8_t *)ps_calloc(sizeof(uint8_t), EPD_WIDTH * EPD_HEIGHT / 2);
            if (!this->framebuffer)
            {
                Serial.println("alloc memory failed !!!");
                return false;
            }
        }
        if (!this->isEpdInited)
        {
            epd_init();
            this->isEpdInited = true;
        }
        memset(this->framebuffer, 0xFF, EPD_WIDTH * EPD_HEIGHT / 2);
        return true;
    }

    void drawBuffer()
    {
        epd_poweron();
        epd_clear();
        epd_draw_grayscale_image(epd_full_screen(), this->framebuffer);
        epd_poweroff_all();
    }

    void drawHLine(int32_t x, int32_t y, int32_t length, uint8_t color)
    {
        epd_draw_hline(x, y, length, color, this->framebuffer);
    }

    void drawVLine(int32_t x, int32_t y, int32_t length, uint8_t color)
    {
        epd_draw_vline(x, y, length, color, this->framebuffer);
    }

    void drawRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color)
    {
        epd_draw_rect(x, y, w, h, color, this->framebuffer);
    }

    void fillRect(int16_t x, int16_t y, int16_t w, int16_t h, uint16_t color)
    {
        epd_fill_rect(x, y, w, h, color, this->framebuffer);
    }

    void drawString(int x, int y, String text, alignment align, int opacity = 100)
    {
        opacity = constrain(opacity, 0, 100);
        if (opacity == 0)
            return;
        char *data = const_cast<char *>(text.c_str());
        int x1, y1; // the bounds of x,y and w and h of the variable 'text' in pixels.
        int w, h;
        int xx = x, yy = y;
        get_text_bounds(&this->currentFont, data, &xx, &yy, &x1, &y1, &w, &h, NULL);

        if (align == RIGHT)
            x = x - w;
        if (align == CENTER || align == H_CENTER)
            x = x - w / 2;

        // int cursor_y = y + h;
        int cursor_y = align == BASELINE ? y : y + h;
        if (align == CENTER || align == V_CENTER)
            cursor_y = cursor_y + h / 2;

        if (opacity == 100)
        {
            write_string(&this->currentFont, data, &x, &cursor_y, this->framebuffer);
            return;
        }
        // Blend black text with white in the display's 16-level grayscale palette.
        FontProperties properties = {};
        properties.fg_color = (15 * (100 - opacity) + 50) / 100;
        properties.bg_color = 15;
        int start = 0;
        do
        {
            int end = text.indexOf('\n', start);
            if (end < 0)
                end = text.length();
            String line = text.substring(start, end);
            int cursor_x = x;
            write_mode(&this->currentFont, line.c_str(), &cursor_x, &cursor_y,
                       this->framebuffer, BLACK_ON_WHITE, &properties);
            cursor_y += this->currentFont.advance_y;
            start = end + 1;
        } while (start <= text.length());
    }
    void drawImageByUrl(String filePath, int x, int y, int width, int height)
    {
        if (!this->isJpegInited)
        {
            libjpeg_init();
            this->isJpegInited = true;
        }
        HTTPClient http;
        String payload = "";

        // Your Domain name with URL path or IP address with path
        http.begin(filePath.c_str());
        int httpResponseCode = http.GET();

        if (httpResponseCode > 0)
        {
            Serial.print("HTTP Response code: ");
            Serial.println(httpResponseCode);
            payload = http.getString();
            // Serial.println(payload);
            Rect_t rect = {
                .x = x,
                .y = y,
                .width = width,
                .height = height,
            };
            // The JPEG library draws directly to the display, not to framebuffer.
            epd_poweron();
            show_jpg_from_buff((uint8_t *)payload.c_str(), payload.length(), rect);
            epd_poweroff_all();
        }
        else
        {
            Serial.print("Error code: ");
            Serial.println(httpResponseCode);
        }
        // Free resources
        http.end();
    }

    void setFont(String fontName)
    {
        // TODO: change usage into three fonts
        Serial.println("Set font:" + fontName);

        this->currentFont = getFontByName(fontName);
    }

    uint8_t *buffer()
    {
        return this->framebuffer;
    }
};
