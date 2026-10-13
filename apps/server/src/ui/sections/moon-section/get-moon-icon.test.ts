import { getMoonIcon, getMoonPhase } from './get-moon-icon'

const reference = Date.UTC(2021, 0, 13, 5)
const cycle = 29.530588853 * 24 * 60 * 60 * 1000
const atStep = (step: number) => reference + cycle * step / 28

describe('moon phase and font glyph', () => {
  it('uses the actual font orientation at the four principal phases', () => {
    // Atlas: 0 = black disk, @ = white disk, G/T = right/left illuminated half.
    for (const [step, phase, glyph] of [
      [0, 'New', '0'], [7, 'First', 'G'],
      [14, 'Full', '@'], [21, 'Last', 'T'],
    ] as const) {
      expect(getMoonPhase(atStep(step))).toBe(phase)
      expect(getMoonIcon(undefined, atStep(step))).toBe(glyph)
      expect(getMoonIcon(phase)).toBe(glyph)
    }
  })

  it('keeps adjacent crescents/gibbous phases separate from the quarter itself', () => {
    expect(getMoonPhase(atStep(6))).toBe('WaxingCrescent')
    expect(getMoonPhase(atStep(8))).toBe('WaxingGibbous')
    expect(getMoonPhase(atStep(20))).toBe('WaningGibbous')
    expect(getMoonPhase(atStep(22))).toBe('WaningCrescent')
  })

  it('changes the glyph within a named phase', () => {
    expect(getMoonPhase(atStep(2))).toBe('WaxingCrescent')
    expect(getMoonPhase(atStep(5))).toBe('WaxingCrescent')
    expect(getMoonIcon(undefined, atStep(2))).not.toBe(getMoonIcon(undefined, atStep(5)))
  })

  it('wraps the cycle, including dates before the reference', () => {
    expect(getMoonPhase(atStep(28))).toBe('New')
    expect(getMoonIcon(undefined, atStep(28))).toBe('0')
    expect(getMoonPhase(atStep(-1))).toBe('WaningCrescent')
    expect(getMoonIcon(undefined, atStep(-1))).toBe('Z')
  })

  it('shows a waxing crescent on 14 October 2026', () => {
    // NASA: new moon 10 Oct 15:50 UT, first quarter 18 Oct 16:13 UT.
    // https://eclipse.gsfc.nasa.gov/phase/phases2001.html
    expect(getMoonPhase(Date.UTC(2026, 9, 14, 12))).toBe('WaxingCrescent')
  })
})
