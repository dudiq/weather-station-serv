// Utility conversions
const mpsToKmh = (mps: number) => mps * 3.6;
const cToF = (c: number) => c * 9/5 + 32;
const fToC = (f: number) => (f - 32) * 5/9;

// 1) Vapour pressure (Magnus formula), returns hPa
function vapourPressure_hPa(tempC: number, rhPercent: number): number {
  // Magnus approximation (common, stable)
  const a = 17.67;
  const b = 243.5; // °C
  const alpha = (a * tempC) / (b + tempC);
  const es = 6.112 * Math.exp(alpha); // saturation vapour pressure in hPa
  return (rhPercent / 100) * es;
}

// 2) Apparent temperature (T + 0.33·e − 0.70·v − 4.00)
// tempC: °C, windMps: m/s, rhPercent: 0..100
export function apparentTemperature(tempC: number, windMps: number, rhPercent: number): number {
  const e = vapourPressure_hPa(tempC, rhPercent);
  return tempC + 0.33 * e - 0.70 * windMps - 4.0;
}

// 3) Wind chill (Canadian / WMO formula)
// Valid when tempC <= 10 and windKmh > 4.8
export function windChill(tempC: number, windMps: number): number {
  const vKmh = mpsToKmh(windMps);
  if (tempC > 10 || vKmh <= 4.8) return tempC; // outside validity — return actual temp
  const wc = 13.12 + 0.6215 * tempC - 11.37 * Math.pow(vKmh, 0.16) + 0.3965 * tempC * Math.pow(vKmh, 0.16);
  return wc;
}

// 4) Heat Index (NOAA Rothfusz regression). Valid for warm/humid conditions.
// We'll implement using °F formula and convert result back to °C.
// Use when tempC >= 27 (≈80°F) and rhPercent >= ~40
export function heatIndex(tempC: number, rhPercent: number): number {
  const T = cToF(tempC);
  const R = rhPercent;
  // Rothfusz regression (NOAA)
  let HI = -42.379
    + 2.04901523 * T
    + 10.14333127 * R
    - 0.22475541 * T * R
    - 6.83783e-3 * T * T
    - 5.481717e-2 * R * R
    + 1.22874e-3 * T * T * R
    + 8.5282e-4 * T * R * R
    - 1.99e-6 * T * T * R * R;

  // Adjustment for low humidity
  if (R < 13 && T >= 80 && T <= 112) {
    const adj = ((13 - R) / 4) * Math.sqrt((17 - Math.abs(T - 95)) / 17);
    HI -= adj;
  }

  // Adjustment for high humidity
  if (R > 85 && T >= 80 && T <= 87) {
    const adj = ((R - 85) / 10) * ((87 - T) / 5);
    HI += adj;
  }

  return fToC(HI);
}

// 5) Convenience function: choose best "feels like"
// Priority:
//  - if cold (T <= 10°C and wind > threshold) -> wind chill
//  - else if hot (T >= 27°C and RH high) -> heat index
//  - otherwise -> apparent temperature
export function getFeelsLikeTemp(tempC: number, windMps: number, rhPercent: number): { value: number; method: 'windchill'|'heatindex'|'apparent' } {
  const vKmh = mpsToKmh(windMps);

  if (tempC <= 10 && vKmh > 4.8) {
    return { value: windChill(tempC, windMps), method: 'windchill' };
  }

  if (tempC >= 27 && rhPercent >= 40) {
    return { value: heatIndex(tempC, rhPercent), method: 'heatindex' };
  }

  return { value: apparentTemperature(tempC, windMps, rhPercent), method: 'apparent' };
}
