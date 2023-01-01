#include <WiFi.h>
#include <WiFiClient.h>
#include <HTTPClient.h>
#include <Arduino.h>
#include "epd_driver.h"
#include "libjpeg/libjpeg.h"
#include "esp_adc_cal.h"
#include "pins.h"

// #define USE_SD
// #define USE_FLASH

// #if defined(USE_SD)
// #define FILE_SYSTEM SD
// #elif defined(USE_FLASH)
// #define FILE_SYSTEM FFat
// #endif

#define DBG_OUTPUT_PORT Serial

const char *ssid = "ssid";
const char *password = "pwd";
const char *host = "lilygo";
String filePath = "http://locahost/image.jpg";

uint8_t *framebuffer;
char buf[128];
const Rect_t line1Area = {
    .x = 0,
    .y = 387,
    .width = 960,
    .height = 51,
};
const Rect_t line2Area = {
    .x = 0,
    .y = 438,
    .width = 960,
    .height = 51,
};

const Rect_t line3Area = {
    .x = 0,
    .y = 489,
    .width = 960,
    .height = 51,
};

#define BIT_CLEAN _BV(0)
#define BIT_SHOW _BV(1)

bool loaded = false;

String loadImage()
{
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
        Serial.println(payload);
        loaded = true;
    }
    else
    {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
    }
    // Free resources
    http.end();
    return payload;
}

void setup()
{
    DBG_OUTPUT_PORT.begin(115200);
    DBG_OUTPUT_PORT.setDebugOutput(true);
    DBG_OUTPUT_PORT.print("\n");

    /** Initialize the screen */
    epd_init();
    libjpeg_init();
    framebuffer = (uint8_t *)ps_calloc(sizeof(uint8_t), EPD_WIDTH * EPD_HEIGHT / 2);
    if (!framebuffer) {
        Serial.println("alloc memory failed !!!");
        while (1) ;
    }
    memset(framebuffer, 0xFF, EPD_WIDTH * EPD_HEIGHT / 2);
    epd_poweron();
    epd_clear();

    // Rect_t area = {
    //     .x = 256,
    //     .y = 180,
    //     .width = logo_width,
    //     .height = logo_height,
    // };

    // epd_draw_grayscale_image(area, (uint8_t *)logo_data);
//    epd_draw_image(area, (uint8_t *)logo_data, BLACK_ON_WHITE);

    WiFi.disconnect();
    delay(100);
    WiFi.mode(WIFI_STA);
    WiFi.onEvent(WiFiEvent);
    WiFi.begin(ssid, password);
    sprintf(buf, "Connecting to %s", ssid);
    DBG_OUTPUT_PORT.println(buf);
    // int cursor_x = line1Area.x;
    // int cursor_y = line1Area.y + FiraSans.advance_y + FiraSans.descender;
    epd_clear_area(line1Area);
    // writeln((GFXfont *)&FiraSans, buf, &cursor_x, &cursor_y, NULL);

    DBG_OUTPUT_PORT.println("--- started");

        epd_clear_area(line3Area);
        // cursor_x = line3Area.x;
        // cursor_y = line3Area.y + FiraSans.advance_y + FiraSans.descender;

}


void loop()
{
    String imageStr;

    if (!loaded) {
      imageStr= loadImage();
    }
    delay(2000); // allow the cpu to switch to other tasks
    // if (bit & BIT_CLEAN) {
    //     epd_poweron();
    //     epd_clear();
    //     epd_poweroff();
    // } else if (bit & BIT_SHOW) {
        epd_poweron();
        Serial.printf("BIT_SHOW");
        // File jpg = FILE_SYSTEM.open(pic_path);
        // String jpg_p;
        // while (jpg.available()) {
        //     jpg_p += jpg.readString();
        // }
        Rect_t rect = {
            .x = 0,
            .y = 0,
            .width = EPD_WIDTH,
            .height = EPD_HEIGHT,
        };
        if (loaded) {
         show_jpg_from_buff((uint8_t *)imageStr.c_str(), imageStr.length(), rect);
        }
        Serial.printf("jpg w:%d,h:%d\r\n", rect.width, rect.height);
        epd_poweroff();
    // }
}


void WiFiEvent(WiFiEvent_t event) {
    int32_t cursor_x = 0;
    int32_t cursor_y = 0;

    Serial.printf("[WiFi-event] event: %d\n", event);

    switch (event) {
        case ARDUINO_EVENT_WIFI_READY:
            Serial.println("WiFi interface ready");
            break;
        case ARDUINO_EVENT_WIFI_SCAN_DONE:
            Serial.println("Completed scan for access points");
            break;
        case ARDUINO_EVENT_WIFI_STA_START:
            Serial.println("WiFi client started");
            break;
        case ARDUINO_EVENT_WIFI_STA_STOP:
            Serial.println("WiFi clients stopped");
            break;
        case ARDUINO_EVENT_WIFI_STA_CONNECTED:
            Serial.println("Connected to access point");
            break;
        case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
            WiFi.begin(ssid, password);
            Serial.println("Disconnected from WiFi access point");
            epd_clear_area(line1Area);
            // cursor_x = line1Area.x;
            // cursor_y = line1Area.y + FiraSans.advance_y + FiraSans.descender;
            // writeln((GFXfont *)&FiraSans, "WiFi Disconnected", &cursor_x, &cursor_y, NULL);
            break;
        case ARDUINO_EVENT_WIFI_STA_AUTHMODE_CHANGE:
            Serial.println("Authentication mode of access point has changed");
            break;
        case ARDUINO_EVENT_WIFI_STA_GOT_IP:
            Serial.print("Obtained IP address: ");
            Serial.println(WiFi.localIP());

            memset(buf, 0, sizeof(buf));
            sprintf(buf, "Connected to %s", ssid);
            epd_clear_area(line1Area);
            // cursor_x = line1Area.x;
            // cursor_y = line1Area.y + FiraSans.advance_y + FiraSans.descender;
            // writeln((GFXfont *)&FiraSans, buf, &cursor_x, &cursor_y, NULL);

            epd_clear_area(line2Area);
            // cursor_x = line2Area.x;
            // cursor_y = line2Area.y + FiraSans.advance_y + FiraSans.descender;
            memset(buf, 0, sizeof(buf));
            // sprintf(buf, "Please visit http://%s.local/edit", host);
            // writeln((GFXfont *)&FiraSans, buf, &cursor_x, &cursor_y, NULL);
            break;
        case ARDUINO_EVENT_WIFI_STA_LOST_IP:
            Serial.println("Lost IP address and IP address is reset to 0");
            break;
        case ARDUINO_EVENT_WPS_ER_SUCCESS:
            Serial.println("WiFi Protected Setup (WPS): succeeded in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_FAILED:
            Serial.println("WiFi Protected Setup (WPS): failed in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_TIMEOUT:
            Serial.println("WiFi Protected Setup (WPS): timeout in enrollee mode");
            break;
        case ARDUINO_EVENT_WPS_ER_PIN:
            Serial.println("WiFi Protected Setup (WPS): pin code in enrollee mode");
            break;
        case ARDUINO_EVENT_WIFI_AP_START:
            Serial.println("WiFi access point started");
            break;
        case ARDUINO_EVENT_WIFI_AP_STOP:
            Serial.println("WiFi access point stopped");
            break;
        case ARDUINO_EVENT_WIFI_AP_STACONNECTED:
            Serial.println("Client connected");
            break;
        case ARDUINO_EVENT_WIFI_AP_STADISCONNECTED:
            Serial.println("Client disconnected");
            break;
        case ARDUINO_EVENT_WIFI_AP_STAIPASSIGNED:
            Serial.println("Assigned IP address to client");
            break;
        case ARDUINO_EVENT_WIFI_AP_PROBEREQRECVED:
            Serial.println("Received probe request");
            break;
        case ARDUINO_EVENT_WIFI_AP_GOT_IP6:
            Serial.println("AP IPv6 is preferred");
            break;
        case ARDUINO_EVENT_WIFI_STA_GOT_IP6:
            Serial.println("STA IPv6 is preferred");
            break;
        case ARDUINO_EVENT_ETH_GOT_IP6:
            Serial.println("Ethernet IPv6 is preferred");
            break;
        case ARDUINO_EVENT_ETH_START:
            Serial.println("Ethernet started");
            break;
        case ARDUINO_EVENT_ETH_STOP:
            Serial.println("Ethernet stopped");
            break;
        case ARDUINO_EVENT_ETH_CONNECTED:
            Serial.println("Ethernet connected");
            break;
        case ARDUINO_EVENT_ETH_DISCONNECTED:
            Serial.println("Ethernet disconnected");
            break;
        case ARDUINO_EVENT_ETH_GOT_IP:
            Serial.println("Obtained IP address");
            break;
        default: break;
    }
}
