import { useEffect, useMemo, useRef } from 'react'
import { convertUnit } from './conversion/unitConvertion'
import {
  getUnitMeasuresIds,
  getUnitsForVariable,
  type UnitProduct,
} from './unitTable'

type FieldSetter = (field: string, value: any, shouldValidate?: boolean) => void

export type UnitsQuery = {
  product: UnitProduct
  step: string
  section: string
  variable: string
}

export type MeasureUnit = {
  id: number
  name: string
  type: string
  factor: number | string
  delta: number
  decimalPlaces: number
}

export interface UseUnitMeasureFieldArgs {
  query: UnitsQuery
  values: any
  setFieldValue: FieldSetter
  unitTypes?: string
  valueField: string
  unitField: string
  baseField?: string
  extraUnitFields?: string[]
  defaultValue?: number
  defaultValueUnit?: string
  defaultUnitIds?: { si: number; ip: number } | null
  enabled?: boolean
  asDelta?: boolean
  decimalPlaces?: number
}

const getPath = (source: any, path: string) =>
  path.split('.').reduce((acc, key) => acc?.[key], source)

const toNumber = (raw: any): number => {
  const value =
    raw && typeof raw === 'object'
      ? (raw.target?.value ?? raw.value ?? raw)
      : raw
  if (value == null || value === '') return NaN
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

const fieldPath = (values: any, path: string) => {
  const current = getPath(values, path)
  return current && typeof current === 'object' && !Array.isArray(current)
    ? `${path}.value`
    : path
}

export function convertByMeasureUnit(
  value: number,
  from?: MeasureUnit,
  to?: MeasureUnit,
  round = true,
  asDelta = false,
) {
  if (!from || !to || from.id === to.id) return value

  const rateCompatible =
    (from.type === 'Rate' || from.type === 'Rate Water') &&
    (to.type === 'Rate' || to.type === 'Rate Water')
  const temperatureCompatible =
    (from.type === 'Temperature' || from.type === 'Temperature Difference') &&
    (to.type === 'Temperature' || to.type === 'Temperature Difference')
  if (from.type !== to.type && !rateCompatible && !temperatureCompatible) {
    return value
  }

  return convertUnit(value, from, to, { round, asDelta })
}

const resolveUnit = (
  raw: any,
  byId: ReadonlyMap<number, MeasureUnit>,
  byName: ReadonlyMap<string, MeasureUnit>,
): MeasureUnit | undefined => {
  const candidate =
    raw && typeof raw === 'object'
      ? (raw.value ?? raw.id ?? raw.unit ?? raw.name)
      : raw
  if (candidate == null || candidate === '') return undefined
  if (typeof candidate === 'number') return byId.get(candidate)
  const asId = Number(candidate)
  if (String(candidate).trim() !== '' && Number.isFinite(asId)) {
    return byId.get(asId)
  }
  return byName.get(String(candidate))
}

export function useUnitMeasureField({
  query,
  values,
  setFieldValue,
  unitTypes,
  valueField,
  unitField,
  baseField: baseFieldArg,
  extraUnitFields = [],
  defaultValue,
  defaultValueUnit,
  defaultUnitIds,
  enabled = true,
  asDelta = false,
  decimalPlaces: decimalPlacesOverride,
}: UseUnitMeasureFieldArgs) {
  const convert = (
    value: number,
    from?: MeasureUnit,
    to?: MeasureUnit,
    round = true,
  ) => convertByMeasureUnit(value, from, to, round, asDelta)

  const unitMeasuresIds = useMemo(
    () => getUnitMeasuresIds(query),
    [query.product, query.section, query.step, query.variable],
  )
  const units = useMemo(
    () => getUnitsForVariable(query) as MeasureUnit[],
    [query.product, query.section, query.step, query.variable],
  )

  const byId = useMemo(
    () => new Map(units.map((unit) => [unit.id, unit])),
    [units],
  )
  const byName = useMemo(
    () => new Map(units.map((unit) => [unit.name, unit])),
    [units],
  )

  const siUnit =
    typeof defaultUnitIds?.si === 'number'
      ? byId.get(defaultUnitIds.si)
      : undefined
  const ipUnit =
    typeof defaultUnitIds?.ip === 'number'
      ? byId.get(defaultUnitIds.ip)
      : undefined
  const baseUnit =
    units.find(
      (unit) => Number(unit.factor) === 1 && Number(unit.delta ?? 0) === 0,
    ) ??
    siUnit ??
    units[0]
  const defaultUnit = (unitTypes === 'imp' ? ipUnit : siUnit) ?? baseUnit

  const persistBase = Boolean(units.length && baseFieldArg)
  const baseField = baseFieldArg ?? `${valueField}Base`
  const hasDefault = typeof defaultValue === 'number'

  const sourceDefaultUnit =
    (defaultValueUnit ? byName.get(defaultValueUnit) : undefined) ??
    siUnit ??
    baseUnit
  const defaultValueInBase =
    hasDefault && baseUnit
      ? convert(defaultValue, sourceDefaultUnit, baseUnit, false)
      : (defaultValue ?? 0)
  const defaultDisplayValue =
    hasDefault && baseUnit && defaultUnit
      ? convert(defaultValueInBase, baseUnit, defaultUnit)
      : defaultValue

  const options = useMemo(
    () => units.map((unit) => ({ label: unit.name, value: unit.name })),
    [units],
  )

  const rawValue = getPath(values, valueField)
  const currentUnit = resolveUnit(getPath(values, unitField), byId, byName)
  const activeUnit = currentUnit ?? defaultUnit
  const lastUnitRef = useRef<MeasureUnit | undefined>(undefined)
  const previousDefaultUnitRef = useRef(defaultUnit)

  const writeValue = (setter: FieldSetter, formValues: any, value: number) =>
    setter(fieldPath(formValues, valueField), value, false)

  const writeUnit = (
    setter: FieldSetter,
    unit: MeasureUnit,
    formValues: any = values,
  ) => {
    setter(fieldPath(formValues, unitField), unit.name, false)
    extraUnitFields.forEach((field) =>
      setter(fieldPath(formValues, field), unit.name, false),
    )
    lastUnitRef.current = unit
  }

  const writeBase = (
    setter: FieldSetter,
    value: number,
    from?: MeasureUnit,
  ) => {
    if (!persistBase || !baseUnit || !from) return
    setter(baseField, convert(value, from, baseUnit, false), false)
  }

  useEffect(() => {
    if (!enabled) return
    if (defaultUnit && !currentUnit) writeUnit(setFieldValue, defaultUnit)

    const displayValue = toNumber(rawValue)
    const storedBase = Number(getPath(values, baseField))
    const empty =
      !Number.isFinite(displayValue) ||
      (hasDefault &&
        persistBase &&
        displayValue === 0 &&
        !Number.isFinite(storedBase))

    if (empty) {
      if (!hasDefault || defaultDisplayValue == null) return
      if (activeUnit) writeUnit(setFieldValue, activeUnit)
      writeValue(setFieldValue, values, defaultDisplayValue)
      if (persistBase && baseUnit) {
        setFieldValue(baseField, defaultValueInBase, false)
      }
      return
    }

    if (!Number.isFinite(storedBase)) {
      writeBase(setFieldValue, displayValue, activeUnit)
    }
  }, [
    activeUnit?.id,
    baseField,
    baseUnit?.id,
    currentUnit,
    defaultDisplayValue,
    defaultUnit?.id,
    defaultValueInBase,
    hasDefault,
    persistBase,
    rawValue,
    setFieldValue,
    units.length,
    enabled,
  ])

  useEffect(() => {
    if (!enabled) return
    if (!defaultUnit || !baseUnit) return
    const previous = previousDefaultUnitRef.current
    if (previous?.id === defaultUnit.id) return
    previousDefaultUnitRef.current = defaultUnit

    const from = lastUnitRef.current ?? currentUnit ?? previous
    const displayValue = toNumber(rawValue)
    writeUnit(setFieldValue, defaultUnit)
    if (!from || !Number.isFinite(displayValue) || from.id === defaultUnit.id) {
      return
    }
    writeValue(setFieldValue, values, convert(displayValue, from, defaultUnit))
    writeBase(setFieldValue, displayValue, from)
  }, [baseUnit?.id, defaultUnit?.id, persistBase, setFieldValue, enabled])

  const handleUnitChange = (nextUnitRaw: any, { form }: any) => {
    const { values: formValues, setFieldValue: set } = form
    const next = resolveUnit(nextUnitRaw, byId, byName) ?? defaultUnit
    if (!next) return

    const formUnit = resolveUnit(getPath(formValues, unitField), byId, byName)
    const prev =
      (formUnit && formUnit.id !== next.id ? formUnit : lastUnitRef.current) ??
      formUnit ??
      defaultUnit
    const displayValue = toNumber(getPath(formValues, valueField))

    writeUnit(set, next, formValues)
    if (!prev || !Number.isFinite(displayValue) || prev.id === next.id) return
    writeValue(set, formValues, convert(displayValue, prev, next))
    writeBase(set, displayValue, prev)
  }

  const handleValueChange = (nextValue: number | string, { form }: any) => {
    const numericValue = toNumber(nextValue)
    if (!Number.isFinite(numericValue)) return

    const { values: formValues, setFieldValue: set } = form
    const storedBase = Number(getPath(formValues, baseField))
    if (
      persistBase &&
      numericValue === 0 &&
      Number.isFinite(storedBase) &&
      storedBase !== 0
    ) {
      return
    }

    const unit =
      resolveUnit(getPath(formValues, unitField), byId, byName) ??
      lastUnitRef.current ??
      defaultUnit

    writeValue(set, formValues, numericValue)
    writeBase(set, numericValue, unit)
  }

  return {
    unitType: units[0]?.type,
    unitMeasuresIds,
    options,
    units,
    activeUnit,
    decimalPlaces: activeUnit?.decimalPlaces ?? decimalPlacesOverride ?? 2,
    defaultUnitName: defaultUnit?.name,
    defaultValue: hasDefault ? defaultDisplayValue : undefined,
    handleUnitChange,
    handleValueChange,
  }
}
