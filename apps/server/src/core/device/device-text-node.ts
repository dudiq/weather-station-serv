export type DeviceTextNode = {
  type: 'text'
  x: number
  y: number
  font:
    | 't-sm' // for small info, like opensans8
    | 't-md' // for readable descriptions
    | 't-lg' // for sub header
    | 't-xl' // for header
    | 'meteo-md' // meteo icons default
    | 'meteo-xl' // meteo icons for header
    | 'moon' // ordinary moon icons

  text: string
  align: 'LEFT' | 'RIGHT' | 'CENTER' | 'V_CENTER' | 'H_CENTER'
}
