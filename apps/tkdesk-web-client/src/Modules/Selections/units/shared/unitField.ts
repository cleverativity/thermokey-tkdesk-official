import { useEffect, useMemo, useRef } from 'react'
import { getUnitById, getUnitsByIds, type UnitDef } from './unitsMeasureTable'

type FieldSetter = (field: string, value: any, shouldValidate?: boolean) => void

export type UnitOption = {
  label: string
  value: number
  name: string
  type: UnitDef['type']
  decimalPlaces: number
}

export type UnitStorage = 'id' | 'name'

export type ConvertByUnitId = (
  value: number,
  fromId: number,
  toId: number,
  options?: { round?: boolean },
) => number

interface UseUnitFieldArgs {
  values: any
  setFieldValue: FieldSetter
  /** When `'imp'`, uses `defaultUnitIds.imp`; otherwise `defaultUnitIds.metric`. */
  unitTypes?: string
  valueField: string
  unitField: string
  /** Unit of measure ids from `unitsTableData` to show in the select. */
  allowedUnitIds: Iterable<number>
  /**
   * Canonical storage field for the value in `baseUnitId`.
   * Defaults to `${valueField}Base`. Ignored when `persistBase` is false.
   */
  baseField?: string
  /**
   * Unit id used as the canonical base for payload / interchange.
   * Defaults to the first allowed unit whose `factor === 1` and `delta === 0`,
   * otherwise the first allowed unit.
   */
  baseUnitId?: number
  /** Default numeric value expressed in `baseUnitId`. */
  defaultValueInBase?: number
  defaultUnitIds?: {
    imp: number
    metric: number
  }
  /**
   * What to write into `unitField`.
   * - `'id'`: store unit id (recommended)
   * - `'name'`: store unit name string (e.g. `'kW'`) for legacy form shapes
   */
  unitStorage?: UnitStorage
  /**
   * Alternate names that resolve to a unit id (e.g. `'m.c.a'` → `42`).
   * Used when reading form values.
   */
  nameAliases?: Record<string, number>
  /**
   * Preferred stored name per unit id when `unitStorage === 'name'`
   * (e.g. `42 → 'm.c.a'` instead of table name `'mH2O'`).
   */
  storedNames?: Record<number, string>
  /** Extra form paths that should mirror the selected unit (legacy fields). */
  extraUnitFields?: string[]
  /** When the value is an object, also write `${valueField}.type`. */
  syncValueObjectType?: boolean
  /**
   * Persist a canonical base value in `baseField`.
   * Disable for fields that only interchange display units (e.g. temperature).
   */
  persistBase?: boolean
  /** When false, do not write a numeric default if the value is missing. */
  seedMissingValue?: boolean
  /** Override default factor/delta conversion (e.g. rate-water density). */
  convert?: ConvertByUnitId
  resolveValueWritePath?: (valueField: string, raw: any) => string
}

const getNumericValue = (raw: any): number =>
  typeof raw === 'number'
    ? raw
    : typeof raw?.value === 'number'
      ? raw.value
      : Number(raw?.value ?? raw)

const getPathValue = (source: any, path: string) =>
  path.split('.').reduce((acc, key) => acc?.[key], source)

const roundToDecimalPlaces = (value: number, decimalPlaces: number) => {
  const factor = Math.pow(10, decimalPlaces)
  return Math.round((value + Number.EPSILON) * factor) / factor
}

/** Convert a numeric value between two units from `unitsTableData`. */
export function convertByUnitId(
  value: number,
  fromId: number,
  toId: number,
  options?: { round?: boolean },
): number {
  if (fromId === toId) return value

  const from = getUnitById(fromId)
  const to = getUnitById(toId)
  if (!from || !to) return value

  // Different physical quantities must not be interchanged.
  if (from.type !== to.type) return value

  const raw = ((value - from.delta) * from.factor) / to.factor + to.delta

  if (options?.round === false) return raw
  return roundToDecimalPlaces(raw, to.decimalPlaces)
}

export function unitsToOptions(units: readonly UnitDef[]): UnitOption[] {
  return units.map((unit) => ({
    label: unit.name,
    value: unit.id,
    name: unit.name,
    type: unit.type,
    decimalPlaces: unit.decimalPlaces,
  }))
}

export function findUnitIdByName(
  name: string,
  allowedByName: ReadonlyMap<string, UnitDef>,
  nameAliases?: Record<string, number>,
): number | undefined {
  const aliasId = nameAliases?.[name]
  if (typeof aliasId === 'number') return aliasId
  return allowedByName.get(name)?.id
}

const extractUnitId = (
  raw: any,
  allowedById: ReadonlyMap<number, UnitDef>,
  allowedByName: ReadonlyMap<string, UnitDef>,
  nameAliases?: Record<string, number>,
): number | undefined => {
  const candidate = (() => {
    if (typeof raw === 'number' && Number.isFinite(raw)) return raw
    if (typeof raw === 'string') {
      const asNumber = Number(raw)
      if (raw.trim() !== '' && Number.isFinite(asNumber)) return asNumber
      return raw
    }
    if (raw && typeof raw === 'object') {
      if (typeof raw.value === 'number') return raw.value
      if (typeof raw.id === 'number') return raw.id
      if (typeof raw.value === 'string') return raw.value
      if (typeof raw.type === 'string') return raw.type
      if (typeof raw.unit === 'string') return raw.unit
      if (typeof raw.name === 'string') return raw.name
      if (typeof raw.key === 'string') return raw.key
      if (typeof raw.label === 'string') return raw.label
      if (typeof raw.target?.value === 'number') return raw.target.value
      if (typeof raw.target?.value === 'string') return raw.target.value
    }
    return undefined
  })()

  if (candidate === undefined || candidate === null) return undefined

  if (typeof candidate === 'number') {
    return allowedById.has(candidate) ? candidate : undefined
  }

  const resolvedId = findUnitIdByName(candidate, allowedByName, nameAliases)
  if (resolvedId === undefined) return undefined
  return allowedById.has(resolvedId) ? resolvedId : undefined
}

const resolveDefaultBaseUnitId = (units: UnitDef[]): number => {
  const identity = units.find((unit) => unit.factor === 1 && unit.delta === 0)
  return (identity ?? units[0]).id
}

const resolveUnitWritePath = (formValues: any, fieldPath: string) => {
  const existingUnitValue = getPathValue(formValues, fieldPath)
  return existingUnitValue &&
    typeof existingUnitValue === 'object' &&
    !Array.isArray(existingUnitValue)
    ? `${fieldPath}.value`
    : fieldPath
}

/**
 * Reusable number + unit-of-measure field driven by unit ids in `unitsTableData`.
 *
 * Domain hooks (`useCapacityField`, `useMeasureField`, …) are thin wrappers over this.
 */
export function useUnitField({
  values,
  setFieldValue,
  unitTypes,
  valueField,
  unitField,
  allowedUnitIds,
  baseField: baseFieldArg,
  baseUnitId: baseUnitIdArg,
  defaultValueInBase = 0,
  defaultUnitIds,
  unitStorage = 'id',
  nameAliases,
  storedNames,
  extraUnitFields = [],
  syncValueObjectType = false,
  persistBase = true,
  seedMissingValue = true,
  convert = convertByUnitId,
  resolveValueWritePath = (field, raw) =>
    raw && typeof raw === 'object' && 'value' in raw ? `${field}.value` : field,
}: UseUnitFieldArgs) {
  const allowedUnitIdsKey = useMemo(
    () => Array.from(allowedUnitIds).join(','),
    [allowedUnitIds],
  )

  const allowedUnits = useMemo(
    () =>
      getUnitsByIds(
        allowedUnitIdsKey.split(',').map(Number).filter(Number.isFinite),
      ),
    [allowedUnitIdsKey],
  )

  const options = useMemo(() => unitsToOptions(allowedUnits), [allowedUnits])

  const allowedById = useMemo(() => {
    const map = new Map<number, UnitDef>()
    for (const unit of allowedUnits) map.set(unit.id, unit)
    return map
  }, [allowedUnits])

  const allowedByName = useMemo(() => {
    const map = new Map<string, UnitDef>()
    for (const unit of allowedUnits) map.set(unit.name, unit)
    return map
  }, [allowedUnits])

  const baseUnitId =
    baseUnitIdArg ??
    (allowedUnits.length > 0 ? resolveDefaultBaseUnitId(allowedUnits) : 0)

  const baseField = baseFieldArg ?? `${valueField}Base`
  const valueObjectTypeField = `${valueField}.type`

  const resolvedDefaultUnitIds = useMemo(() => {
    if (defaultUnitIds) return defaultUnitIds
    const metric =
      allowedUnits.find((unit) => unit.id === baseUnitId)?.id ??
      allowedUnits[0]?.id
    const imp = allowedUnits.find((unit) => unit.id !== metric)?.id ?? metric
    return { imp: imp!, metric: metric! }
  }, [allowedUnits, baseUnitId, defaultUnitIds])

  const defaultUnitId =
    unitTypes === 'imp'
      ? resolvedDefaultUnitIds.imp
      : resolvedDefaultUnitIds.metric

  const toUnitId = (raw: any, fallback: number): number =>
    extractUnitId(raw, allowedById, allowedByName, nameAliases) ?? fallback

  const toStoredUnitValue = (unitId: number): number | string => {
    if (unitStorage === 'name') {
      return (
        storedNames?.[unitId] ?? allowedById.get(unitId)?.name ?? String(unitId)
      )
    }
    return unitId
  }

  const getUnitName = (unitId: number): string =>
    String(storedNames?.[unitId] ?? allowedById.get(unitId)?.name ?? unitId)

  const rawValue = getPathValue(values, valueField)
  const currentUnitId = extractUnitId(
    getPathValue(values, unitField),
    allowedById,
    allowedByName,
    nameAliases,
  )
  const previousDefaultUnitRef = useRef<number>(defaultUnitId)

  const setUnitValue = (setter: FieldSetter, raw: any, value: number) =>
    setter(resolveValueWritePath(valueField, raw), value, false)

  const setUnit = (
    setter: FieldSetter,
    nextUnitId: number,
    sourceValues: any = values,
  ) => {
    const stored = toStoredUnitValue(nextUnitId)
    setter(resolveUnitWritePath(sourceValues, unitField), stored, false)

    for (const extraField of extraUnitFields) {
      setter(resolveUnitWritePath(sourceValues, extraField), stored, false)
    }

    if (syncValueObjectType) {
      const fieldRawValue = getPathValue(sourceValues, valueField)
      const isObjectValue =
        fieldRawValue &&
        typeof fieldRawValue === 'object' &&
        !Array.isArray(fieldRawValue)
      if (isObjectValue) {
        setter(valueObjectTypeField, stored, false)
      }
    }
  }

  const setNumberAndUnit = (
    setter: FieldSetter,
    formValues: any,
    nextValue: number,
    nextUnitId: number,
  ) => {
    const raw = getPathValue(formValues, valueField)
    setUnit(setter, nextUnitId, formValues)
    setUnitValue(setter, raw, nextValue)
  }

  const defaultDisplayValue = convert(
    defaultValueInBase,
    baseUnitId,
    defaultUnitId,
  )

  const activeUnitId = currentUnitId ?? defaultUnitId
  const activeUnit = allowedById.get(activeUnitId)
  const decimalPlaces = activeUnit?.decimalPlaces ?? 2

  // Seed unit when missing or outside the allowed set.
  useEffect(() => {
    if (allowedUnits.length === 0) return
    if (currentUnitId) return
    setUnit(setFieldValue, defaultUnitId)
  }, [allowedUnits.length, currentUnitId, defaultUnitId, setFieldValue])

  // Seed value (+ optional base) when missing.
  useEffect(() => {
    if (allowedUnits.length === 0) return

    const displayValue = getNumericValue(rawValue)

    if (!Number.isFinite(displayValue)) {
      if (!seedMissingValue) return
      setNumberAndUnit(setFieldValue, values, defaultDisplayValue, activeUnitId)
      if (persistBase) {
        setFieldValue(baseField, defaultValueInBase, false)
      }
      return
    }

    if (!persistBase) return

    const storedBase = Number(getPathValue(values, baseField))
    if (!Number.isFinite(storedBase)) {
      setFieldValue(
        baseField,
        convert(displayValue, activeUnitId, baseUnitId, { round: false }),
        false,
      )
    }
  }, [
    activeUnitId,
    allowedUnits.length,
    baseField,
    baseUnitId,
    convert,
    defaultDisplayValue,
    defaultValueInBase,
    persistBase,
    rawValue,
    seedMissingValue,
    setFieldValue,
  ])

  // Handle unitsType interchange (imp <-> metric).
  useEffect(() => {
    if (allowedUnits.length === 0) return

    const previousDefaultUnit = previousDefaultUnitRef.current
    if (previousDefaultUnit === defaultUnitId) return
    previousDefaultUnitRef.current = defaultUnitId

    const sourceUnitId = currentUnitId ?? previousDefaultUnit
    const displayValue = getNumericValue(rawValue)

    setUnit(setFieldValue, defaultUnitId)

    if (!Number.isFinite(displayValue) || sourceUnitId === defaultUnitId) {
      return
    }

    const converted = convert(displayValue, sourceUnitId, defaultUnitId)
    setUnitValue(setFieldValue, rawValue, converted)

    if (persistBase) {
      const nextBase = convert(displayValue, sourceUnitId, baseUnitId, {
        round: false,
      })
      setFieldValue(baseField, nextBase, false)
    }
  }, [
    allowedUnits.length,
    baseField,
    baseUnitId,
    convert,
    currentUnitId,
    defaultUnitId,
    persistBase,
    rawValue,
    setFieldValue,
  ])

  const handleUnitChange = (nextUnitRaw: any, { form }: any) => {
    const { values: formValues, setFieldValue: formSetFieldValue } = form
    const raw = getPathValue(formValues, valueField)
    const prevUnitId = toUnitId(
      getPathValue(formValues, unitField),
      defaultUnitId,
    )
    const nextUnitId = toUnitId(nextUnitRaw, defaultUnitId)
    const displayValue = getNumericValue(raw)

    setUnit(formSetFieldValue, nextUnitId, formValues)

    if (!Number.isFinite(displayValue) || prevUnitId === nextUnitId) {
      return
    }

    const converted = convert(displayValue, prevUnitId, nextUnitId)
    setUnitValue(formSetFieldValue, raw, converted)

    if (persistBase) {
      const nextBase = convert(displayValue, prevUnitId, baseUnitId, {
        round: false,
      })
      formSetFieldValue(baseField, nextBase, false)
    }
  }

  const handleValueChange = (nextValue: number, { form }: any) => {
    if (!Number.isFinite(nextValue)) return

    const { values: formValues, setFieldValue: formSetFieldValue } = form
    const unitId = toUnitId(getPathValue(formValues, unitField), defaultUnitId)

    setUnitValue(
      formSetFieldValue,
      getPathValue(formValues, valueField),
      nextValue,
    )

    if (persistBase) {
      formSetFieldValue(
        baseField,
        convert(nextValue, unitId, baseUnitId, { round: false }),
        false,
      )
    }
  }

  return {
    options,
    allowedUnits,
    defaultUnitId,
    defaultUnitValue: toStoredUnitValue(defaultUnitId),
    defaultUnitName: getUnitName(defaultUnitId),
    defaultValue: defaultDisplayValue,
    decimalPlaces,
    baseUnitId,
    baseField,
    convert,
    getUnitName,
    toUnitId,
    handleUnitChange,
    handleValueChange,
  }
}
