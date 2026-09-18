import React from 'react'
import { FormattedMessage } from 'react-intl'
import { FieldRangeSelect } from 'Components/Field'
import { Span, SpanNumber } from 'Components/Span'
import {
  convertByMeasureUnit,
  useUnitMeasureField,
  type MeasureUnit,
  type UseUnitMeasureFieldArgs,
} from '../../units/shared/variableUnitField'

type DetailUMField = {
  unitMeasuresIds?: number[] | null
  defaultUnitName?: string
  options: { label: string; value: string }[]
  handleUnitChange: (next: any, ctx: any) => void
  decimalPlaces: number
  units: MeasureUnit[]
  activeUnit?: MeasureUnit
}

export type AppliedDetailUMConfig = {
  dataIndex: string
  unitField: string
  field: DetailUMField
  sourceUnitId?: number
}

export type DetailUMFieldConfig = Omit<
  UseUnitMeasureFieldArgs,
  'values' | 'setFieldValue' | 'unitTypes' | 'enabled'
> & {
  dataIndex?: string
}

type FieldSetter = UseUnitMeasureFieldArgs['setFieldValue']

const MAX_DETAIL_UM_FIELDS = 12

const DETAIL_UM_FIELDS: DetailUMFieldConfig[] = [
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'capacity',
    },
    valueField: 'condenser.detailCapacity',
    unitField: 'condenser.detailCapacityType',
    extraUnitFields: ['condenser.detailCapacity_unit'],
    defaultUnitIds: { si: 6, ip: 8 },
    baseField: 'condenser.detailCapacityBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'airflow',
    },
    valueField: 'condenser.detailAirflow',
    unitField: 'condenser.detailAirflowType',
    extraUnitFields: ['condenser.detailAirflow_unit'],
    defaultUnitIds: { si: 23, ip: 26 },
    baseField: 'condenser.detailAirflowBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'spl',
    },
    valueField: 'condenser.detailSpl',
    unitField: 'condenser.detailSplType',
    extraUnitFields: ['condenser.detailSpl_unit'],
    defaultUnitIds: { si: 168, ip: 168 },
    baseField: 'condenser.detailSplBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'fan_motors_no',
    },
    dataIndex: 'no_Fans',
    valueField: 'condenser.detailFanMotorsNo',
    unitField: 'condenser.detailFanMotorsNoType',
    extraUnitFields: ['condenser.detailFanMotorsNo_unit'],
    defaultUnitIds: { si: 0, ip: 0 },
    baseField: 'condenser.detailFanMotorsNoBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'fan_motors_rpm',
    },
    dataIndex: 'rpm',
    valueField: 'condenser.detailFanMotorsRPM',
    unitField: 'condenser.detailFanMotorsRPMType',
    extraUnitFields: ['condenser.detailFanMotorsRPM_unit'],
    defaultUnitIds: { si: 169, ip: 169 },
    baseField: 'condenser.detailFanMotorsRPMBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'fan_motors_power',
    },
    dataIndex: 'power',
    valueField: 'condenser.detailFanMotorsPower',
    unitField: 'condenser.detailFanMotorsPowerType',
    extraUnitFields: ['condenser.detailFanMotorsPower_unit'],
    defaultUnitIds: { si: 5, ip: 5 },
    baseField: 'condenser.detailFanMotorsPowerBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'fan_motors_current',
    },
    dataIndex: 'current_a',
    valueField: 'condenser.detailFanMotorsCurrent',
    unitField: 'condenser.detailFanMotorsCurrentType',
    extraUnitFields: ['condenser.detailFanMotorsCurrent_unit'],
    defaultUnitIds: { si: 166, ip: 166 },
    baseField: 'condenser.detailFanMotorsCurrentBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'tube_volume',
    },
    dataIndex: 'internal_Volume',
    valueField: 'condenser.detailTubeVolume',
    unitField: 'condenser.detailTubeVolumeType',
    extraUnitFields: ['condenser.detailTubeVolume_unit'],
    defaultUnitIds: { si: 138, ip: 147 },
    baseField: 'condenser.detailTubeVolumeBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'weight',
    },
    dataIndex: 'weights',
    valueField: 'condenser.detailWeight',
    unitField: 'condenser.detailWeightType',
    extraUnitFields: ['condenser.detailWeight_unit'],
    defaultUnitIds: { si: 139, ip: 167 },
    baseField: 'condenser.detailWeightBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'connection_outlet',
    },
    dataIndex: 'outlet_Connection',
    valueField: 'condenser.detailConnectionOutlet',
    unitField: 'condenser.detailConnectionOutletType',
    extraUnitFields: ['condenser.detailConnectionOutlet_unit'],
    defaultUnitIds: { si: 2, ip: 4 },
    baseField: 'condenser.detailConnectionOutletBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'connection_inlet',
    },
    dataIndex: 'inlet_Connection',
    valueField: 'condenser.detailConnectionInlet',
    unitField: 'condenser.detailConnectionInletType',
    extraUnitFields: ['condenser.detailConnectionInlet_unit'],
    defaultUnitIds: { si: 2, ip: 4 },
    baseField: 'condenser.detailConnectionInletBaseW',
  },
  {
    query: {
      product: 'condenser',
      step: 'Model choice',
      section: 'Model list table',
      variable: 'price',
    },
    dataIndex: 'price',
    valueField: 'condenser.detailPrice',
    unitField: 'condenser.detailPriceType',
    extraUnitFields: ['condenser.detailPrice_unit'],
    defaultUnitIds: { si: 132, ip: 132 },
    baseField: 'condenser.detailPriceBaseW',
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
    valueField: `__detailUM_unused_${index}`,
    unitField: `__detailUM_unused_${index}_unit`,
    enabled: false,
  }
}

function useBoundDetailUM(
  config: DetailUMFieldConfig | undefined,
  index: number,
  values: any,
  setFieldValue: FieldSetter,
  unitTypes?: string,
): AppliedDetailUMConfig | undefined {
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

function isNumericValue(value: any) {
  if (typeof value === 'number') return Number.isFinite(value)
  if (typeof value !== 'string' || value.trim() === '') return false
  return Number.isFinite(Number(value))
}

function renderDetailUMValue(value: any, config?: AppliedDetailUMConfig) {
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

const getBodyPopupContainer = () => document.body

function DetailUMCell({ config }: { config?: AppliedDetailUMConfig }) {
  if (!config?.field.unitMeasuresIds?.length) return null

  const { field, unitField } = config

  return (
    <div
      onMouseDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
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
        getPopupContainer={getBodyPopupContainer}
        popupMatchSelectWidth={false}
        dropdownStyle={{ minWidth: 160 }}
      />
    </div>
  )
}

export function getCondenserDataTableColumns(configs: AppliedDetailUMConfig[]) {
  const byDataIndex = new Map(
    configs.map((config) => [config.dataIndex, config]),
  )

  return [
    {
      title: <FormattedMessage id='ui.thermal.columns.field' />,
      dataIndex: 'key',
      render: (key: string) => <Span value={key} />,
    },
    {
      title: <FormattedMessage id='ui.thermal.columns.value' />,
      dataIndex: 'value',
      render: (value: any, record: any) =>
        renderDetailUMValue(value, byDataIndex.get(record.dataIndex)),
    },
    {
      title: <FormattedMessage id='ui.thermal.columns.um' />,
      dataIndex: 'um',
      width: 156,
      ellipsis: false,
      render: (_: unknown, record: any) => (
        <DetailUMCell config={byDataIndex.get(record.dataIndex)} />
      ),
    },
  ]
}

export function useTableDetailUM({
  values,
  setFieldValue,
  unitTypes,
}: {
  values: any
  setFieldValue: FieldSetter
  unitTypes?: string
}) {
  const fields = DETAIL_UM_FIELDS
  const bound = [
    useBoundDetailUM(fields[0], 0, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[1], 1, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[2], 2, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[3], 3, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[4], 4, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[5], 5, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[6], 6, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[7], 7, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[8], 8, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[9], 9, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[10], 10, values, setFieldValue, unitTypes),
    useBoundDetailUM(fields[11], 11, values, setFieldValue, unitTypes),
  ].filter((config): config is AppliedDetailUMConfig => Boolean(config))

  if (fields.length > MAX_DETAIL_UM_FIELDS) {
    throw new Error(
      `TableDetailUM supports at most ${MAX_DETAIL_UM_FIELDS} fields. Add another useBoundDetailUM slot.`,
    )
  }

  return { configs: bound }
}

export default useTableDetailUM
