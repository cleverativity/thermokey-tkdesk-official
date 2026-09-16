import React, { useMemo } from 'react'
import styled from 'styled-components'
import { FieldRangeSelect } from 'Components/Field'
import { Span, SpanNumber } from 'Components/Span'
import {
  convertByMeasureUnit,
  useUnitMeasureField,
  type MeasureUnit,
  type UseUnitMeasureFieldArgs,
} from 'Modules/Selections/units/shared/variableUnitField'

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
  variable: string
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

const MAX_COLUMN_UM_FIELDS = 13
const TITLE_ID_PREFIX = 'data.thermal.columns.'
const SECTION = 'energy_analysis_table'

const COLUMN_UM_FIELDS: ColumnUMFieldConfig[] = [
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'air_temp_inlet',
    },
    dataIndex: 'airTempInlet',
    valueField: 'ea.tableAirTempInlet',
    unitField: 'ea.tableAirTempInletType',
    extraUnitFields: ['ea.tableAirTempInlet_unit'],
    defaultUnitIds: { si: 32, ip: 33 },
    baseField: 'ea.tableAirTempInletBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'capacity',
    },
    dataIndex: 'capacity',
    valueField: 'ea.tableCapacity',
    unitField: 'ea.tableCapacityType',
    extraUnitFields: ['ea.tableCapacity_unit'],
    defaultUnitIds: { si: 6, ip: 8 },
    baseField: 'ea.tableCapacityBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'air_flow',
    },
    dataIndex: 'airFlow',
    valueField: 'ea.tableAirFlow',
    unitField: 'ea.tableAirFlowType',
    extraUnitFields: ['ea.tableAirFlow_unit'],
    defaultUnitIds: { si: 23, ip: 26 },
    baseField: 'ea.tableAirFlowBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'dp_air',
    },
    dataIndex: 'dpAir',
    valueField: 'ea.tableDpAir',
    unitField: 'ea.tableDpAirType',
    extraUnitFields: ['ea.tableDpAir_unit'],
    defaultUnitIds: { si: 40, ip: 50 },
    baseField: 'ea.tableDpAirBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'spl',
    },
    dataIndex: 'spl',
    valueField: 'ea.tableSpl',
    unitField: 'ea.tableSplType',
    extraUnitFields: ['ea.tableSpl_unit'],
    defaultUnitIds: { si: 167, ip: 167 },
    baseField: 'ea.tableSplBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'rpm',
    },
    dataIndex: 'rpm',
    valueField: 'ea.tableRpm',
    unitField: 'ea.tableRpmType',
    extraUnitFields: ['ea.tableRpm_unit'],
    defaultUnitIds: { si: 168, ip: 168 },
    baseField: 'ea.tableRpmBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'power',
    },
    dataIndex: 'power',
    valueField: 'ea.tablePower',
    unitField: 'ea.tablePowerType',
    extraUnitFields: ['ea.tablePower_unit'],
    defaultUnitIds: { si: 5, ip: 5 },
    baseField: 'ea.tablePowerBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'current_all_fans',
    },
    dataIndex: 'currentFans',
    valueField: 'ea.tableCurrentAllFans',
    unitField: 'ea.tableCurrentAllFansType',
    extraUnitFields: ['ea.tableCurrentAllFans_unit'],
    defaultUnitIds: { si: 165, ip: 165 },
    baseField: 'ea.tableCurrentAllFansBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'tube_vol',
    },
    dataIndex: 'tubeVolume',
    valueField: 'ea.tableTubeVol',
    unitField: 'ea.tableTubeVolType',
    extraUnitFields: ['ea.tableTubeVol_unit'],
    defaultUnitIds: { si: 137, ip: 146 },
    baseField: 'ea.tableTubeVolBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'weight',
    },
    dataIndex: 'weight',
    valueField: 'ea.tableWeight',
    unitField: 'ea.tableWeightType',
    extraUnitFields: ['ea.tableWeight_unit'],
    defaultUnitIds: { si: 138, ip: 166 },
    baseField: 'ea.tableWeightBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'connections_outlet',
    },
    dataIndex: 'connectDiamInlet',
    valueField: 'ea.tableConnectionsOutlet',
    unitField: 'ea.tableConnectionsOutletType',
    extraUnitFields: ['ea.tableConnectionsOutlet_unit'],
    defaultUnitIds: { si: 2, ip: 4 },
    baseField: 'ea.tableConnectionsOutletBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'connections_inlet',
    },
    dataIndex: 'connectDiamOutlet',
    valueField: 'ea.tableConnectionsInlet',
    unitField: 'ea.tableConnectionsInletType',
    extraUnitFields: ['ea.tableConnectionsInlet_unit'],
    defaultUnitIds: { si: 2, ip: 4 },
    baseField: 'ea.tableConnectionsInletBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'price',
    },
    dataIndex: 'price',
    valueField: 'ea.tablePrice',
    unitField: 'ea.tablePriceType',
    extraUnitFields: ['ea.tablePrice_unit'],
    defaultUnitIds: { si: 131, ip: 131 },
    baseField: 'ea.tablePriceBaseW',
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
    valueField: `__eaColumnUM_unused_${index}`,
    unitField: `__eaColumnUM_unused_${index}_unit`,
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

  return {
    variable: config.query.variable,
    dataIndex: config.dataIndex ?? config.query.variable,
    unitField: config.unitField,
    sourceUnitId:
      unitTypes === 'imp'
        ? config.defaultUnitIds?.ip
        : config.defaultUnitIds?.si,
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
            unlocalizeMessage
            style={{ width: '100%' }}
            name={unitField}
            defaultValue={field.defaultUnitName}
            options={field.options}
            optionKeyPath={['value']}
            optionMessagePath={['label']}
            overrideOnChange={field.handleUnitChange}
            getPopupContainer={() => document.body}
            popupMatchSelectWidth={false}
            dropdownStyle={{ minWidth: 160 }}
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

function getColumnVariable(column: any) {
  const titleId = column?.title?.props?.id
  if (typeof titleId === 'string' && titleId.startsWith(TITLE_ID_PREFIX)) {
    return titleId.slice(TITLE_ID_PREFIX.length)
  }
  return undefined
}

function applyColumnUM(columns: any[], configs: AppliedColumnUMConfig[]) {
  const byVariable = new Map(
    configs.map((config) => [config.variable, config]),
  )
  const byDataIndex = new Map(
    configs.map((config) => [config.dataIndex, config]),
  )

  return columns.map((column: any) => {
    const config =
      byVariable.get(getColumnVariable(column) ?? '') ??
      byDataIndex.get(column.dataIndex)
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
    useBoundColumnUM(fields[12], 12, values, setFieldValue, unitTypes),
  ].filter((config): config is AppliedColumnUMConfig => Boolean(config))

  if (fields.length > MAX_COLUMN_UM_FIELDS) {
    throw new Error(
      `EnergyAnalysis ColumnUM supports at most ${MAX_COLUMN_UM_FIELDS} fields. Add another useBoundColumnUM slot.`,
    )
  }

  const tableColumns = useMemo(
    () => applyColumnUM(columns, bound),
    [bound, columns],
  )

  return { columns: tableColumns, configs: bound }
}

export default useColumnUM
