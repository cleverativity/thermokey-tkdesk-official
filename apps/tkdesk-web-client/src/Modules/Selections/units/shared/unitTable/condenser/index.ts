import { getUnitsByIds, type UnitDef } from '../../unitsMeasureTable'
import { condenserDesignData } from './designData'
import { condenserDetailData } from './detailData'
import { condenserEanalysisData } from './eanalaysisData'
import { condenserModelData } from './modelData'
import { condenserRatingData } from './ratingData'
import { condenserWorkingData } from './workingData'

export type UnitsVariableDef = {
  id: number
  step: string
  section: string
  variable: string
  unitMeasuresIds: number[] | null
}

export const unitCondenser: readonly UnitsVariableDef[] = [
  ...condenserDesignData,
  ...condenserModelData,
  ...condenserDetailData,
  ...condenserWorkingData,
  ...condenserEanalysisData,
  ...condenserRatingData,
]

function findUnitsVariable(query: {
  step: string
  section: string
  variable: string
}): UnitsVariableDef | undefined {
  return unitCondenser.find(
    (item) =>
      item.step === query.step &&
      item.section === query.section &&
      item.variable === query.variable,
  )
}

export function getUnitMeasuresIds(query: {
  step: string
  section: string
  variable: string
}): number[] | null {
  return findUnitsVariable(query)?.unitMeasuresIds ?? null
}

export function getUnitsForVariable(query: {
  step: string
  section: string
  variable: string
}): UnitDef[] {
  const unitMeasuresIds = getUnitMeasuresIds(query)
  if (!unitMeasuresIds?.length) return []
  return getUnitsByIds(unitMeasuresIds)
}
