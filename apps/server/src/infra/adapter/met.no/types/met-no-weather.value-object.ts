import {MetNoWeatherSymbolValueObject} from "./met-no-weather-symbol-value-object";

export type MetNoWeatherValueObject = {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number, number];
  };
  properties: {
    meta: {
      updated_at: string;
      units: {
        air_pressure_at_sea_level: string;
        air_temperature: string;
        cloud_area_fraction: string;
        precipitation_amount: string;
        relative_humidity: string;
        wind_from_direction: string;
        wind_speed: string;
      };
    };
    timeseries: Array<{
      time: string;
      data: {
        instant: {
          details: {
            air_pressure_at_sea_level: number;
            air_temperature: number;
            cloud_area_fraction: number;
            relative_humidity: number;
            wind_from_direction: number;
            wind_speed: number;
          };
        };
        next_12_hours: {
          summary: {
            symbol_code: MetNoWeatherSymbolValueObject;
          };
          details: Record<string, never>;
        };
        next_1_hours?: {
          summary: {
            symbol_code: MetNoWeatherSymbolValueObject;
          };
          details: {
            precipitation_amount: number;
          };
        };
        next_6_hours: {
          summary: {
            symbol_code: MetNoWeatherSymbolValueObject;
          };
          details: {
            precipitation_amount: number;
          };
        };
      };
    }>;
  };
};
