#pragma once

#include "enum.h"
#include "../env.h"
#define ARDUINOJSON_ENABLE_ARDUINO_STRING 1
#include <ArduinoJson.h> // https://arduinojson.org/
#include <HTTPClient.h>

const long DOCUMENT_SIZE = 64 * 1024;
DynamicJsonDocument jsonDoc(DOCUMENT_SIZE);

typedef bool (*PHandler)(WiFiClient &json);

class ModRequest
{
private:
public:
    DynamicJsonDocument getJson()
    {
        return jsonDoc;
    }

    bool decodeData(WiFiClient &json)
    {
        Serial.print(F("\ndeserializeJson "));
        DeserializationError error = deserializeJson(jsonDoc, json); // Deserialize the JSON document
        if (error)
        { // Test if parsing succeeds.
            Serial.print(F("deserializeJson() failed: "));
            Serial.println(error.c_str());
            return false;
        }

        Serial.print(F("\nDeserialization successful... "));

        return true;
    }

    bool fetchRequest(WiFiClient &wifiClient)
    {
        wifiClient.stop(); // close any connections before sending a new request
        HTTPClient http;

        Serial.println("Start connection to:" + WX_API_ENDPOINT_PATH);

        http.useHTTP10(true);
        http.begin(wifiClient, WX_API_ENDPOINT_PATH);
        http.addHeader("a-t", WX_API_TOKEN);
        http.addHeader("d-w", String(EPD_WIDTH), false, false);
        http.addHeader("d-h", String(EPD_HEIGHT), false, false);

        int httpCode = http.GET();
        if (httpCode != HTTP_CODE_OK)
        {
            Serial.printf("connection failed, error: %s", http.errorToString(httpCode).c_str());
            Serial.println(";");
            wifiClient.stop();
            http.end();
            return false;
        }

        //        String payload = http.getString(); Serial.println(payload); return false;  // used for debugging API problems

        bool handlerResult = this->decodeData(http.getStream());

        wifiClient.stop();
        http.end();
        return handlerResult;
    }
};
