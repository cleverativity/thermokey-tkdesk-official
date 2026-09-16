import type { UnitDef } from '../unitsMeasureTable'

export type ConvertibleUnit = Pick<UnitDef, 'delta' | 'decimalPlaces'> & {
  factor: number | string
}

type ConvertUnitOptions = {
  round?: boolean
  asDelta?: boolean
}

const toNumber = (value: number | string | undefined, fallback = 0) =>
  Number(value ?? fallback)

export function convertUnit(
  value: number,
  from: ConvertibleUnit,
  to: ConvertibleUnit,
  options: ConvertUnitOptions = {},
): number {
  const sourceFactor = toNumber(from.factor)
  const destFactor = toNumber(to.factor)

  if (
    !Number.isFinite(sourceFactor) ||
    !Number.isFinite(destFactor) ||
    destFactor === 0
  ) {
    return value
  }

  const fromDelta = options.asDelta ? 0 : toNumber(from.delta)
  const toDelta = options.asDelta ? 0 : toNumber(to.delta)
  const converted = ((value - fromDelta) * sourceFactor) / destFactor + toDelta

  if (options.round === false) return converted

  const decimals = to.decimalPlaces ?? 2
  const scale = 10 ** decimals
  return Math.round((converted + Number.EPSILON) * scale) / scale
}
