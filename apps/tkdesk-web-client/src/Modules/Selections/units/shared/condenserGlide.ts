export type CondensingReference = 'ave' | 'dew' | 'bubble'

// Keep in sync with Cardano.Application CondensingReferenceConverter.GlideKByRefrigerant.
// Typical dew−bubble glide (K) at ~40 °C condensing. Pure / azeotropic fluids are 0.
const GLIDE_K_BY_REFRIGERANT: Record<string, number> = {
  R404A: 0.5,
  R407C: 5.0,
  R407F: 6.4,
  R410A: 0.1,
  R448A: 6.1,
  R449A: 6.0,
  R450A: 0.6,
  R452A: 3.5,
}

const refrigerantKey = (refrigerantType?: string | null) => {
  if (!refrigerantType || typeof refrigerantType !== 'string') return ''
  return refrigerantType.replace(/-/g, '').trim().toUpperCase()
}

export function glideK(refrigerantType?: string | null) {
  const key = refrigerantKey(refrigerantType)
  return GLIDE_K_BY_REFRIGERANT[key] ?? 0
}

export function hasGlide(refrigerantType?: string | null) {
  return glideK(refrigerantType) > 0
}

export function normalizeCondensingReference(
  raw: unknown,
): CondensingReference {
  const value =
    raw && typeof raw === 'object'
      ? String(
          (raw as { value?: unknown; key?: unknown }).value ??
            (raw as { key?: unknown }).key ??
            '',
        )
      : String(raw ?? '')

  const trimmed = value.trim().toLowerCase()
  if (trimmed === 'dew' || trimmed === '1') return 'dew'
  if (trimmed === 'bubble' || trimmed === '0') return 'bubble'
  if (trimmed === 'ave' || trimmed === '0.5') return 'ave'
  return 'ave'
}

export function toMidpoint(
  condensingC: number,
  reference: unknown,
  refrigerantType?: string | null,
) {
  const kind = normalizeCondensingReference(reference)
  if (kind === 'ave') return condensingC

  const halfGlide = glideK(refrigerantType) / 2
  if (halfGlide <= 0) return condensingC

  return kind === 'dew' ? condensingC - halfGlide : condensingC + halfGlide
}

export function fromMidpoint(
  midpointC: number,
  reference: unknown,
  refrigerantType?: string | null,
) {
  const kind = normalizeCondensingReference(reference)
  if (kind === 'ave') return midpointC

  const halfGlide = glideK(refrigerantType) / 2
  if (halfGlide <= 0) return midpointC

  return kind === 'dew' ? midpointC + halfGlide : midpointC - halfGlide
}

export function dewFromMidpoint(
  midpointC: number,
  refrigerantType?: string | null,
) {
  return midpointC + glideK(refrigerantType) / 2
}

export function bubbleFromMidpoint(
  midpointC: number,
  refrigerantType?: string | null,
) {
  return midpointC - glideK(refrigerantType) / 2
}

export function dewPoint(
  condensingC: number,
  reference: unknown,
  refrigerantType?: string | null,
) {
  return dewFromMidpoint(
    toMidpoint(condensingC, reference, refrigerantType),
    refrigerantType,
  )
}

export function bubblePoint(
  condensingC: number,
  reference: unknown,
  refrigerantType?: string | null,
) {
  return bubbleFromMidpoint(
    toMidpoint(condensingC, reference, refrigerantType),
    refrigerantType,
  )
}

export function convertCondensingReference(
  condensingC: number,
  fromReference: unknown,
  toReference: unknown,
  refrigerantType?: string | null,
) {
  return fromMidpoint(
    toMidpoint(condensingC, fromReference, refrigerantType),
    toReference,
    refrigerantType,
  )
}

export function convertCondensingForRefrigerantChange(
  condensingC: number,
  reference: unknown,
  fromRefrigerant?: string | null,
  toRefrigerant?: string | null,
) {
  const midpoint = toMidpoint(condensingC, reference, fromRefrigerant)
  const nextReference = hasGlide(toRefrigerant)
    ? normalizeCondensingReference(reference)
    : 'ave'
  return {
    condensingC: fromMidpoint(midpoint, nextReference, toRefrigerant),
    reference: nextReference,
  }
}
