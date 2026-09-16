import { getUnitsByIds, type UnitDef } from '../../unitsMeasureTable'
import { drycoolerDesignData } from './designData'
import { drycoolerDetailData } from './detailData'
import { drycoolerEanalysisData } from './eanalaysisData'
import { drycoolerModelData } from './modelData'
import { drycoolerRatingData } from './ratingData'
import { drycoolerWorkingData } from './workingData'

export type UnitsVariableDef = {
  id: number
  step: string
  section: string
  variable: string
  unitMeasuresIds: number[] | null
}

export const unitDrycooler: readonly UnitsVariableDef[] = [
  ...drycoolerDesignData,
  ...drycoolerModelData,
  ...drycoolerDetailData,
  ...drycoolerWorkingData,
  ...drycoolerEanalysisData,
  ...drycoolerRatingData,
]

function findUnitsVariable(query: {
  step: string
  section: string
  variable: string
}): UnitsVariableDef | undefined {
  return unitDrycooler.find(
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
