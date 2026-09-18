import {
  bubbleFromMidpoint,
  bubblePoint,
  convertCondensingForRefrigerantChange,
  convertCondensingReference,
  dewFromMidpoint,
  dewPoint,
  fromMidpoint,
  glideK,
  hasGlide,
  normalizeCondensingReference,
  toMidpoint,
} from '../condenserGlide'

describe('condenserGlide', () => {
  it('matches the Cardano glide table', () => {
    expect(glideK('R-407C')).toBe(5)
    expect(glideK('r407c')).toBe(5)
    expect(glideK('R22')).toBe(0)
    expect(glideK('R-134a')).toBe(0)
    expect(hasGlide('R407C')).toBe(true)
    expect(hasGlide('R22')).toBe(false)
  })

  it('normalizes dew / ave / bubble and quality X', () => {
    expect(normalizeCondensingReference('DEW')).toBe('dew')
    expect(normalizeCondensingReference('1')).toBe('dew')
    expect(normalizeCondensingReference({ value: 'bubble' })).toBe('bubble')
    expect(normalizeCondensingReference('0')).toBe('bubble')
    expect(normalizeCondensingReference('0.5')).toBe('ave')
    expect(normalizeCondensingReference(undefined)).toBe('ave')
  })

  it('converts UI condensing to engine midpoint like the C# converter', () => {
    expect(toMidpoint(40, 'ave', 'R407C')).toBe(40)
    expect(toMidpoint(40, 'dew', 'R407C')).toBe(37.5)
    expect(toMidpoint(40, 'bubble', 'R407C')).toBe(42.5)
    expect(toMidpoint(40, 'dew', 'R-134a')).toBe(40)
    expect(toMidpoint(40, 'bubble', 'R-134a')).toBe(40)
  })

  it('inverts midpoint back to the selected reference', () => {
    expect(fromMidpoint(37.5, 'dew', 'R407C')).toBe(40)
    expect(fromMidpoint(37.5, 'ave', 'R407C')).toBe(37.5)
    expect(fromMidpoint(37.5, 'bubble', 'R407C')).toBe(35)
  })

  it('derives dew and bubble from the UI condensing value', () => {
    expect(dewPoint(40, 'dew', 'R407C')).toBe(40)
    expect(dewPoint(40, 'ave', 'R407C')).toBe(42.5)
    expect(dewPoint(40, 'bubble', 'R407C')).toBe(45)
    expect(bubblePoint(40, 'dew', 'R407C')).toBe(35)
    expect(bubblePoint(40, 'ave', 'R407C')).toBe(37.5)
    expect(bubblePoint(40, 'bubble', 'R407C')).toBe(40)
    expect(dewPoint(40, 'dew', 'R22')).toBe(40)
    expect(bubblePoint(40, 'bubble', 'R22')).toBe(40)
  })

  it('converts dew / middle / bubble while preserving midpoint', () => {
    expect(convertCondensingReference(40, 'dew', 'ave', 'R407C')).toBe(37.5)
    expect(convertCondensingReference(40, 'dew', 'bubble', 'R407C')).toBe(35)
    expect(convertCondensingReference(35, 'bubble', 'dew', 'R407C')).toBe(40)
  })

  it('preserves midpoint when the refrigerant loses glide', () => {
    expect(
      convertCondensingForRefrigerantChange(40, 'dew', 'R407C', 'R22'),
    ).toEqual({
      condensingC: 37.5,
      reference: 'ave',
    })
  })

  it('preserves midpoint when switching between glide refrigerants', () => {
    const next = convertCondensingForRefrigerantChange(
      40,
      'dew',
      'R407C',
      'R448A',
    )
    expect(next.reference).toBe('dew')
    expect(next.condensingC).toBeCloseTo(40.55, 10)
  })

  it('round-trips R404A middle and bubble from the unrounded midpoint', () => {
    const midpoint = 40
    const bubble = fromMidpoint(midpoint, 'bubble', 'R404A')
    expect(bubble).toBe(39.75)
    expect(Math.round(bubble * 10) / 10).toBe(39.8)
    expect(fromMidpoint(midpoint, 'ave', 'R404A')).toBe(40)
    expect(fromMidpoint(midpoint, 'dew', 'R404A')).toBe(40.25)
  })

  it('does not drift when toggling R404A ave to bubble to ave from the canonical midpoint', () => {
    const midpoint = 40
    const roundedBubbleDisplay = Math.round(
      fromMidpoint(midpoint, 'bubble', 'R404A') * 10,
    ) / 10
    expect(roundedBubbleDisplay).toBe(39.8)
    expect(toMidpoint(roundedBubbleDisplay, 'bubble', 'R404A')).toBe(40.05)
    expect(fromMidpoint(midpoint, 'ave', 'R404A')).toBe(40)
  })

  it('round-trips desuperheat and inlet from midpoint dew', () => {
    const midpoint = 40
    const desuperheat = 25
    const inlet = desuperheat + dewFromMidpoint(midpoint, 'R404A')
    expect(inlet).toBe(65.25)
    expect(inlet - dewFromMidpoint(midpoint, 'R404A')).toBe(25)
    expect(dewFromMidpoint(midpoint, 'R407C')).toBe(42.5)
    expect(bubbleFromMidpoint(midpoint, 'R407C')).toBe(37.5)
  })

  it('does not drift when toggling desuperheat to inlet from the canonical dew', () => {
    const midpoint = 40
    const compressorBaseK = 25
    const dew = dewFromMidpoint(midpoint, 'R404A')
    const inlet = compressorBaseK + dew
    const roundedInletDisplay = Math.round(inlet * 10) / 10
    expect(roundedInletDisplay).toBe(65.3)
    expect(roundedInletDisplay - dew).toBeCloseTo(25.05, 10)
    expect(inlet - dew).toBe(25)
  })

  it('keeps SI midpoint 40 when the rounded imperial display would be converted back', () => {
    const midpoint = 40
    const bubbleC = fromMidpoint(midpoint, 'bubble', 'R404A')
    const bubbleF = bubbleC * (9 / 5) + 32
    const displayedF = Math.round(bubbleF * 10) / 10
    const displayedCFromF = (displayedF - 32) * (5 / 9)
    expect(displayedF).toBe(103.6)
    expect(displayedCFromF).not.toBe(bubbleC)
    expect(fromMidpoint(midpoint, 'ave', 'R404A')).toBe(40)
  })
})
