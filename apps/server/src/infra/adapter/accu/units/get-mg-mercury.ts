const MB_TO_MM_MERCURY_K = 1.3332239

export function getMgMercury(value: number): number {
  return value / MB_TO_MM_MERCURY_K
}
