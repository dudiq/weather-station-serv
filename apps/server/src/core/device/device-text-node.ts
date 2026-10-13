export type DeviceTextNode = {
  type: 'text'
  x: number
  y: number
  font:
    | 't-sm' // for small info, like opensans8
    | 't-md' // for readable descriptions
    | 't-lg' // for sub header
    | 't-xl' // for header
    | 'field-icons' // humidity, pressure, wind, cloud cover and UV
    | 'meteo-md' // meteo icons default
    | 'meteo-sm' // forecast icons, 8 pixels smaller at maximum size
    | 'meteo-xl' // meteo icons for header
    | 'moon' // ordinary moon icons

  text: string
  opacity?: number // 0-100; defaults to 100, rendered as grayscale on white
  footer?: boolean // firmware lays out footer blocks together with device status
  align: 'LEFT' | 'RIGHT' | 'CENTER' | 'V_CENTER' | 'H_CENTER' | 'BASELINE'
}
