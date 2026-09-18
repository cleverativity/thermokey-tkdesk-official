import React, { useMemo } from 'react'
import styled from 'styled-components'
import { FieldRangeSelect } from 'Components/Field'
import { Span, SpanNumber } from 'Components/Span'
import {
  convertByMeasureUnit,
  useUnitMeasureField,
  type MeasureUnit,
  type UseUnitMeasureFieldArgs,
} from '../../units/shared/variableUnitField'

type ColumnUMField = {
  unitMeasuresIds?: number[] | null
  defaultUnitName?: string
  options: { label: string; value: string }[]
  handleUnitChange: (next: any, ctx: any) => void
  decimalPlaces: number
  units: MeasureUnit[]
  activeUnit?: MeasureUnit
}

export type AppliedColumnUMConfig = {
  dataIndex: string
  unitField: string
  field: ColumnUMField
  sourceUnitId?: number
}

export type ColumnUMFieldConfig = Omit<
  UseUnitMeasureFieldArgs,
  'values' | 'setFieldValue' | 'unitTypes' | 'enabled'
> & {
  dataIndex?: string
}

type FieldSetter = UseUnitMeasureFieldArgs['setFieldValue']

const MAX_COLUMN_UM_FIELDS = 12

const COLUMN_UM_FIELDS: ColumnUMFieldConfig[] = [
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'capacity',
    },
    valueField: 'condenser.modelCapacity',
    unitField: 'condenser.modelCapacityType',
    extraUnitFields: ['condenser.modelCapacity_unit'],
    defaultUnitIds: { si: 6, ip: 8 },
    baseField: 'condenser.modelCapacityBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'airflow',
    },
    valueField: 'condenser.modelAirflow',
    unitField: 'condenser.modelAirflowType',
    extraUnitFields: ['condenser.modelAirflow_unit'],
    defaultUnitIds: { si: 23, ip: 26 },
    baseField: 'condenser.modelAirflowBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'spl',
    },
    valueField: 'condenser.modelSpl',
    unitField: 'condenser.modelSplType',
    extraUnitFields: ['condenser.modelSpl_unit'],
    defaultUnitIds: { si: 168, ip: 168 },
    baseField: 'condenser.modelSplBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'fan_motors_no',
    },
    dataIndex: 'no_Fans',
    valueField: 'condenser.modelFanMotorsNo',
    unitField: 'condenser.modelFanMotorsNoType',
    extraUnitFields: ['condenser.modelFanMotorsNo_unit'],
    defaultUnitIds: { si: 0, ip: 0 },
    baseField: 'condenser.modelFanMotorsNoBaseW',
    decimalPlaces: 0,
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'fan_motors_rpm',
    },
    dataIndex: 'rpm',
    valueField: 'condenser.modelFanMotorsRPM',
    unitField: 'condenser.modelFanMotorsRPMType',
    extraUnitFields: ['condenser.modelFanMotorsRPM_unit'],
    defaultUnitIds: { si: 169, ip: 169 },
    baseField: 'condenser.modelFanMotorsRPMBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'fan_motors_power',
    },
    dataIndex: 'power',
    valueField: 'condenser.modelFanMotorsPower',
    unitField: 'condenser.modelFanMotorsPowerType',
    extraUnitFields: ['condenser.modelFanMotorsPower_unit'],
    defaultUnitIds: { si: 5, ip: 5 },
    baseField: 'condenser.modelFanMotorsPowerBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'fan_motors_current',
    },
    dataIndex: 'current_a',
    valueField: 'condenser.modelFanMotorsCurrent',
    unitField: 'condenser.modelFanMotorsCurrentType',
    extraUnitFields: ['condenser.modelFanMotorsCurrent_unit'],
    defaultUnitIds: { si: 166, ip: 166 },
    baseField: 'condenser.modelFanMotorsCurrentBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'tube_volume',
    },
    dataIndex: 'internal_Volume',
    valueField: 'condenser.modelTubeVolume',
    unitField: 'condenser.modelTubeVolumeType',
    extraUnitFields: ['condenser.modelTubeVolume_unit'],
    defaultUnitIds: { si: 138, ip: 147 },
    baseField: 'condenser.modelTubeVolumeBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'connection_outlet',
    },
    dataIndex: 'outlet_Connection',
    valueField: 'condenser.modelConnectionOutlet',
    unitField: 'condenser.modelConnectionOutletType',
    extraUnitFields: ['condenser.modelConnectionOutlet_unit'],
    defaultUnitIds: { si: 2, ip: 4 },
    baseField: 'condenser.modelConnectionOutletBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'connection_inlet',
    },
    dataIndex: 'inlet_Connection',
    valueField: 'condenser.modelConnectionInlet',
    unitField: 'condenser.modelConnectionInletType',
    extraUnitFields: ['condenser.modelConnectionInlet_unit'],
    defaultUnitIds: { si: 2, ip: 4 },
    baseField: 'condenser.modelConnectionInletBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'price',
    },
    dataIndex: 'price',
    valueField: 'condenser.modelPrice',
    unitField: 'condenser.modelPriceType',
    extraUnitFields: ['condenser.modelPrice_unit'],
    defaultUnitIds: { si: 132, ip: 132 },
    baseField: 'condenser.modelPriceBaseW',
  },
]

function unusedFieldArgs(
  index: number,
  values: any,
  setFieldValue: FieldSetter,
  unitTypes?: string,
): UseUnitMeasureFieldArgs {
  return {
    query: { product: 'condenser', step: '', section: '', variable: '' },
    values,
    setFieldValue,
    unitTypes,
    valueField: `__columnUM_unused_${index}`,
    unitField: `__columnUM_unused_${index}_unit`,
    enabled: false,
  }
}

function useBoundColumnUM(
  config: ColumnUMFieldConfig | undefined,
  index: number,
  values: any,
  setFieldValue: FieldSetter,
  unitTypes?: string,
): AppliedColumnUMConfig | undefined {
  const field = useUnitMeasureField(
    config
      ? { ...config, values, setFieldValue, unitTypes }
      : unusedFieldArgs(index, values, setFieldValue, unitTypes),
  )

  if (!config) return undefined

  // Results are always requested in SI, so SI is the only valid source unit.
  // The preference still drives the default display unit via defaultUnitIds.
  return {
    dataIndex: config.dataIndex ?? config.query.variable,
    unitField: config.unitField,
    sourceUnitId: config.defaultUnitIds?.si,
    field,
  }
}

const HeaderCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  width: 100%;
  min-width: 96px;
`

const HeaderLabel = styled.div<{ $align?: 'left' | 'center' }>`
  display: flex;
  align-items: flex-end;
  justify-content: ${({ $align }) =>
    $align === 'left' ? 'flex-start' : 'center'};
  min-height: 2.6em;
  text-align: ${({ $align }) => ($align === 'left' ? 'left' : 'center')};
  line-height: 1.3;
  white-space: normal;
`

const HeaderUnit = styled.div`
  width: 100%;
  min-height: 32px;
`

function withTopAlignedHeader(column: any, extra?: Record<string, unknown>) {
  const prev = column.onHeaderCell
  return {
    ...column,
    ...extra,
    onHeaderCell: (col: any) => {
      const prevProps = typeof prev === 'function' ? prev(col) : prev
      return {
        ...prevProps,
        style: {
          verticalAlign: 'top',
          ...prevProps?.style,
        },
      }
    },
  }
}

function ColumnUMTitle({
  title,
  config,
  align = 'center',
}: {
  title: React.ReactNode
  config?: AppliedColumnUMConfig
  align?: 'left' | 'center'
}) {
  const showUnitSelect = Boolean(config?.field.unitMeasuresIds?.length)
  const { field, unitField } = config ?? {}

  return (
    <HeaderCell onClick={(event) => event.stopPropagation()}>
      <HeaderLabel $align={align}>{title}</HeaderLabel>
      <HeaderUnit>
        {showUnitSelect && field && unitField ? (
          <FieldRangeSelect
            hideLabel
            hasFeedback={false}
            allowClear={false}
            style={{ width: '100%' }}
            name={unitField}
            defaultValue={field.defaultUnitName}
            options={field.options}
            optionKeyPath={['value']}
            optionMessagePath={['label']}
            overrideOnChange={field.handleUnitChange}
          />
        ) : null}
      </HeaderUnit>
    </HeaderCell>
  )
}

function isNumericValue(value: any) {
  if (typeof value === 'number') return Number.isFinite(value)
  if (typeof value !== 'string' || value.trim() === '') return false
  return Number.isFinite(Number(value))
}

function renderColumnUMValue(value: any, config?: AppliedColumnUMConfig) {
  if (!isNumericValue(value)) {
    return value == null || value === '' ? null : <Span value={value} />
  }

  const numeric = Number(value)
  if (!config) {
    return <SpanNumber value={numeric} scale={2} isPointed={true} />
  }

  const { field, sourceUnitId } = config
  const sourceUnit =
    (typeof sourceUnitId === 'number'
      ? field.units.find((unit) => unit.id === sourceUnitId)
      : undefined) ?? field.activeUnit
  const displayUnit = field.activeUnit ?? sourceUnit
  const converted =
    Number.isFinite(numeric) && sourceUnit && displayUnit
      ? convertByMeasureUnit(numeric, sourceUnit, displayUnit)
      : numeric

  return (
    <SpanNumber
      value={converted}
      scale={field.decimalPlaces}
      isPointed={true}
    />
  )
}

function applyColumnUM(columns: any[], configs: AppliedColumnUMConfig[]) {
  const byDataIndex = new Map(
    configs.map((config) => [config.dataIndex, config]),
  )

  const applyColumns = (items: any[]): any[] =>
    items.map((column: any) => {
      if (Array.isArray(column.children)) {
        return withTopAlignedHeader({
          ...column,
          children: applyColumns(column.children),
        })
      }

      const config = byDataIndex.get(column.dataIndex)
      if (!config) {
        return withTopAlignedHeader(column, {
          title: <ColumnUMTitle title={column.title} align='left' />,
        })
      }

      return withTopAlignedHeader(column, {
        align: 'center',
        title: <ColumnUMTitle title={column.title} config={config} />,
        render: (value: string) => renderColumnUMValue(value, config),
      })
    })

  return applyColumns(columns)
}

export function useColumnUM({
  columns,
  values,
  setFieldValue,
  unitTypes,
}: {
  columns: any[]
  values: any
  setFieldValue: FieldSetter
  unitTypes?: string
}) {
  const fields = COLUMN_UM_FIELDS
  const bound = [
    useBoundColumnUM(fields[0], 0, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[1], 1, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[2], 2, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[3], 3, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[4], 4, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[5], 5, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[6], 6, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[7], 7, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[8], 8, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[9], 9, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[10], 10, values, setFieldValue, unitTypes),
    useBoundColumnUM(fields[11], 11, values, setFieldValue, unitTypes),
  ].filter((config): config is AppliedColumnUMConfig => Boolean(config))

  if (fields.length > MAX_COLUMN_UM_FIELDS) {
    throw new Error(
      `ColumnUM supports at most ${MAX_COLUMN_UM_FIELDS} fields. Add another useBoundColumnUM slot.`,
    )
  }

  const tableColumns = useMemo(
    () => applyColumnUM(columns, bound),
    [bound, columns],
  )

  return { columns: tableColumns, configs: bound }
}

export default useColumnUM
