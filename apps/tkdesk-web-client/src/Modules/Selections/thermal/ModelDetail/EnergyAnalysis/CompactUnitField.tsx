import { getUnitById } from 'Modules/Selections/units/shared/unitsMeasureTable'

export function currentSystemUnitName(
  unitTypes: string | undefined,
  ids: { si: number; ip: number },
) {
  return getUnitById(unitTypes === 'imp' ? ids.ip : ids.si)?.name
}

export function storedUnitName(raw: any): string | undefined {
  if (typeof raw === 'string' && raw.trim() !== '') return raw
  if (raw && typeof raw === 'object') {
    const token = raw.value ?? raw.name ?? raw.unit
    if (typeof token === 'string' && token.trim() !== '') return token
  }
  return undefined
}
