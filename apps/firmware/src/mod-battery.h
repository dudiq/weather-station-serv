#pragma once

#include "enum.h"

class ModBattery
{
private:
    /* data */
public:
    float voltage()
    {
        int vref = 1100;
        // Correct the ADC reference voltage
        esp_adc_cal_characteristics_t adc_chars;
        esp_adc_cal_value_t val_type = esp_adc_cal_characterize(ADC_UNIT_1, ADC_ATTEN_DB_11, ADC_WIDTH_BIT_12, 1100, &adc_chars);
        if (val_type == ESP_ADC_CAL_VAL_EFUSE_VREF)
        {
            Serial.printf("eFuse Vref:%u mV", adc_chars.vref);
            vref = adc_chars.vref;
        }
        uint16_t v = analogRead(BATT_PIN);
        float battery_voltage = ((float)v / 4095.0) * 2.0 * 3.3 * (vref / 1000.0);
        return battery_voltage;
    }

    uint8_t percent(float voltage)
    {
        uint8_t percentage = 100;
        percentage = 2836.9625 * pow(voltage, 4) - 43987.4889 * pow(voltage, 3) + 255233.8134 * pow(voltage, 2) - 656689.7123 * voltage + 632041.7303;
        if (voltage >= 4.20)
            percentage = 100;
        if (voltage <= 3.20)
            percentage = 0; // orig 3.5

        return percentage;
    }
};
