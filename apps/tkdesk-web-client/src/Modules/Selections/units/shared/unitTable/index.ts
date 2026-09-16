import type { UnitDef } from '../unitsMeasureTable'
import {
  getUnitMeasuresIds as getCondenserUnitMeasuresIds,
  getUnitsForVariable as getCondenserUnitsForVariable,
} from './condenser'
import {
  getUnitMeasuresIds as getDrycoolerUnitMeasuresIds,
  getUnitsForVariable as getDrycoolerUnitsForVariable,
} from './drycooler'

export type UnitProduct = 'condenser' | 'drycooler'

export type UnitsTableQuery = {
  product?: UnitProduct
  step: string
  section: string
  variable: string
}

export function getUnitMeasuresIds(query: UnitsTableQuery): number[] | null {
  const product = query.product ?? 'condenser'
  if (product === 'drycooler') return getDrycoolerUnitMeasuresIds(query)
  return getCondenserUnitMeasuresIds(query)
}

export function getUnitsForVariable(query: UnitsTableQuery): UnitDef[] {
  const product = query.product ?? 'condenser'
  if (product === 'drycooler') return getDrycoolerUnitsForVariable(query)
  return getCondenserUnitsForVariable(query)
}
