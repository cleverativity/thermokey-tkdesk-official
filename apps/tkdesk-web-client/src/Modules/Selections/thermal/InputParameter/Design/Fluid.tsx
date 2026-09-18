import { useEffect } from 'react'
import _ from 'lodash'
import { Col, Space } from 'antd'
import {
  FieldRangeSelect,
  FieldThermalSelect,
  FieldUnitInput,
} from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import rawSaturationTempModes from 'Localization/Constants/saturation_temp_modes.json'
import {
  bubbleFromMidpoint,
  dewFromMidpoint,
  fromMidpoint,
  hasGlide,
  normalizeCondensingReference,
  toMidpoint,
} from 'Modules/Selections/units/shared/condenserGlide'
import {
  convertToTarget,
  readNumeric,
  resolveUnitName,
} from 'Modules/Selections/units/shared/condenserPayload'

interface FluidProps {
  data?: {
    refType?: any[]
  }
  unitTypes: string
}

type FieldSetter = (field: string, value: any, shouldValidate?: boolean) => void

const fieldPath = (values: any, path: string) => {
  const current = _.get(values, path)
  return current && typeof current === 'object' && !Array.isArray(current)
    ? `${path}.value`
    : path
}

const toNumber = (raw: any): number => {
  const value =
    raw && typeof raw === 'object'
      ? (raw.target?.value ?? raw.value ?? raw)
      : raw
  const n = Number(value)
  return Number.isFinite(n) ? n : NaN
}

const readOptionalNumber = (values: any, path: string) => {
  const n = Number(_.get(values, path))
  return Number.isFinite(n) ? n : undefined
}

const readRefrigerantType = (raw: unknown, fallback = 'R404A') => {
  if (typeof raw === 'string' && raw.trim() !== '') return raw
  if (raw && typeof raw === 'object') {
    const value = _.get(
      raw,
      'value',
      _.get(raw, 'condenser_type', _.get(raw, 'key')),
    )
    if (typeof value === 'string' && value.trim() !== '') return value
  }
  return fallback
}

const readMode = (values: any, path: string) => {
  const raw = _.get(values, path)
  const value = raw && typeof raw === 'object' ? (raw.value ?? raw.key) : raw
  return value ?? 'delta_temperature'
}

const readReference = (values: any) =>
  normalizeCondensingReference(
    _.get(
      values,
      'condenser.condensingReference',
      _.get(values, 'condenser.saturationTitle', 'ave'),
    ),
  )

const temperatureToC = (
  values: any,
  path: string,
  typePath: string,
  fallback: number,
  asDelta = false,
) =>
  convertToTarget(
    readNumeric(values, path),
    _.get(values, typePath),
    '°C',
    'Temperature',
    fallback,
    asDelta,
    false,
  )

type FluidField = 'condensing' | 'compressor' | 'inlet' | 'subCooling' | 'outlet'

type DisplayUnits = {
  unitTypes?: string
} & Partial<Record<FluidField, string>>

const systemDisplayUnit = (unitTypes: string | undefined, asDelta: boolean) => {
  if (unitTypes === 'imp') return '°F'
  if (unitTypes === 'si') return asDelta ? 'K' : '°C'
  return undefined
}

const currentDisplayUnit = (
  values: any,
  typePath: string,
  asDelta: boolean,
  override?: string,
  unitTypes?: string,
) =>
  override ||
  systemDisplayUnit(unitTypes, asDelta) ||
  resolveUnitName(_.get(values, typePath)) ||
  (asDelta ? 'K' : '°C')

const writeTemperature = (
  setFieldValue: FieldSetter,
  values: any,
  path: string,
  typePath: string,
  valueC: number,
  asDelta = false,
  targetUnit?: string,
) => {
  const unitName =
    targetUnit ||
    currentDisplayUnit(values, typePath, asDelta)
  const display = convertToTarget(
    valueC,
    asDelta ? 'K' : '°C',
    unitName,
    'Temperature',
    valueC,
    asDelta,
  )
  setFieldValue(fieldPath(values, path), display, false)
  if (targetUnit) {
    setFieldValue(fieldPath(values, typePath), targetUnit, false)
  }
}

const writeCanonicals = (
  setFieldValue: FieldSetter,
  midpointC: number,
  compressorBaseK: number,
  subCoolingBaseK: number,
) => {
  setFieldValue('condenser.condensingMidpointC', midpointC, false)
  setFieldValue('condenser.compressorBaseK', compressorBaseK, false)
  setFieldValue('condenser.subCoolingBaseK', subCoolingBaseK, false)
}

const refreshDisplayFromCanonicals = (
  setFieldValue: FieldSetter,
  values: any,
  midpointC: number,
  compressorBaseK: number,
  subCoolingBaseK: number,
  reference: unknown,
  refrigerantType: string,
  skip?: FluidField,
  units?: DisplayUnits,
) => {
  const dew = dewFromMidpoint(midpointC, refrigerantType)
  const bubble = bubbleFromMidpoint(midpointC, refrigerantType)
  const unitFor = (field: FluidField, typePath: string, asDelta = false) =>
    currentDisplayUnit(
      values,
      typePath,
      asDelta,
      units?.[field],
      units?.unitTypes,
    )
  if (skip !== 'condensing') {
    writeTemperature(
      setFieldValue,
      values,
      'condenser.condensing',
      'condenser.condensingType',
      fromMidpoint(midpointC, reference, refrigerantType),
      false,
      unitFor('condensing', 'condenser.condensingType'),
    )
  }
  if (skip !== 'compressor') {
    writeTemperature(
      setFieldValue,
      values,
      'condenser.compressor',
      'condenser.compressorType',
      compressorBaseK,
      true,
      unitFor('compressor', 'condenser.compressorType', true),
    )
  }
  if (skip !== 'inlet') {
    writeTemperature(
      setFieldValue,
      values,
      'condenser.inletTemperature',
      'condenser.inletTemperatureType',
      compressorBaseK + dew,
      false,
      unitFor('inlet', 'condenser.inletTemperatureType'),
    )
  }
  if (skip !== 'subCooling') {
    writeTemperature(
      setFieldValue,
      values,
      'condenser.subCooling',
      'condenser.subCoolingType',
      subCoolingBaseK,
      true,
      unitFor('subCooling', 'condenser.subCoolingType', true),
    )
  }
  if (skip !== 'outlet') {
    writeTemperature(
      setFieldValue,
      values,
      'condenser.outletTemperature',
      'condenser.outletTemperatureType',
      bubble - subCoolingBaseK,
      false,
      unitFor('outlet', 'condenser.outletTemperatureType'),
    )
  }
}

function Fluid(props: FluidProps) {
  const { refType } = props.data ?? {}
  const { unitTypes } = props

  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<any>()

  const refrigerantType = readRefrigerantType(
    _.get(values, 'condenser.refrigerantType'),
  )
  const showGlideSelector = hasGlide(refrigerantType)
  const condensingReference = readReference(values)

  const isCompressorInletTemperature = _.isEqual(
    readMode(values, 'condenser.compressorInletMode'),
    'temperature',
  )

  const isOutletTemperature = _.isEqual(
    readMode(values, 'condenser.subCoolingMode'),
    'temperature',
  )

  const readCanonicals = (formValues = values) => {
    const refrigerant = readRefrigerantType(
      _.get(formValues, 'condenser.refrigerantType'),
    )
    const reference = readReference(formValues)
    const midpoint =
      readOptionalNumber(formValues, 'condenser.condensingMidpointC') ??
      toMidpoint(
        temperatureToC(
          formValues,
          'condenser.condensing',
          'condenser.condensingType',
          40,
        ),
        reference,
        refrigerant,
      )
    const compressorBaseK =
      readOptionalNumber(formValues, 'condenser.compressorBaseK') ??
      temperatureToC(
        formValues,
        'condenser.compressor',
        'condenser.compressorType',
        25,
        true,
      )
    const subCoolingBaseK =
      readOptionalNumber(formValues, 'condenser.subCoolingBaseK') ??
      temperatureToC(
        formValues,
        'condenser.subCooling',
        'condenser.subCoolingType',
        3,
        true,
      )
    return { midpoint, compressorBaseK, subCoolingBaseK, refrigerant, reference }
  }

  const nextDisplayUnit = (raw: any, fallback: string) => {
    const fromName = resolveUnitName(raw)
    if (fromName) return fromName
    if (raw && typeof raw === 'object') {
      const value = raw.value ?? raw.key
      if (typeof value === 'string' && value.trim() !== '') return value
    }
    return typeof raw === 'string' && raw.trim() !== '' ? raw : fallback
  }

  const handleCondensingReferenceChange = (value: any) => {
    const nextReference = normalizeCondensingReference(value)
    const { midpoint, compressorBaseK, subCoolingBaseK } = readCanonicals()
    setFieldValue('condenser.condensingReference', nextReference, false)
    refreshDisplayFromCanonicals(
      setFieldValue,
      values,
      midpoint,
      compressorBaseK,
      subCoolingBaseK,
      nextReference,
      refrigerantType,
    )
  }

  const handleRefrigerantChange = (value: any) => {
    const nextRefrigerant = readRefrigerantType(value, refrigerantType)
    const { midpoint, compressorBaseK, subCoolingBaseK } = readCanonicals()
    const nextReference = hasGlide(nextRefrigerant)
      ? condensingReference
      : 'ave'
    setFieldValue('condenser.condensingReference', nextReference, false)
    refreshDisplayFromCanonicals(
      setFieldValue,
      values,
      midpoint,
      compressorBaseK,
      subCoolingBaseK,
      nextReference,
      nextRefrigerant,
    )
  }

  const handleCompressorInletModeChange = (value: any) => {
    const nextMode =
      value && typeof value === 'object' ? (value.value ?? value.key) : value
    const { midpoint, compressorBaseK, subCoolingBaseK } = readCanonicals()
    refreshDisplayFromCanonicals(
      setFieldValue,
      values,
      midpoint,
      compressorBaseK,
      subCoolingBaseK,
      condensingReference,
      refrigerantType,
    )
    setFieldValue('condenser.compressorInletMode', nextMode, false)
  }

  const handleSubCoolingModeChange = (value: any) => {
    const nextMode =
      value && typeof value === 'object' ? (value.value ?? value.key) : value
    const { midpoint, compressorBaseK, subCoolingBaseK } = readCanonicals()
    refreshDisplayFromCanonicals(
      setFieldValue,
      values,
      midpoint,
      compressorBaseK,
      subCoolingBaseK,
      condensingReference,
      refrigerantType,
    )
    setFieldValue('condenser.subCoolingMode', nextMode, false)
  }

  const compressorField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Fluid',
      variable: 'compressor',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.compressor',
    unitField: 'condenser.compressorType',
    defaultValue: 25,
    defaultValueUnit: unitTypes === 'imp' ? '°F' : 'K',
    asDelta: true,
    defaultUnitIds: { si: 35, ip: 33 },
    enabled: !isCompressorInletTemperature,
  })
  const inletTempField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Fluid',
      variable: 'inletTemperature',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.inletTemperature',
    unitField: 'condenser.inletTemperatureType',
    defaultValue: 22,
    defaultUnitIds: { si: 32, ip: 33 },
    enabled: isCompressorInletTemperature,
  })
  const condensingField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Fluid',
      variable: 'condensing',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.condensing',
    unitField: 'condenser.condensingType',
    defaultValue: 40,
    defaultUnitIds: { si: 32, ip: 33 },
  })
  const subCoolingField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Fluid',
      variable: 'subCooling',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.subCooling',
    unitField: 'condenser.subCoolingType',
    defaultValue: 3,
    defaultValueUnit: unitTypes === 'imp' ? '°F' : 'K',
    asDelta: true,
    defaultUnitIds: { si: 35, ip: 33 },
    enabled: !isOutletTemperature,
  })
  const outletTempField = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Input parameters',
      section: 'Fluid',
      variable: 'outletTemperature',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'condenser.outletTemperature',
    unitField: 'condenser.outletTemperatureType',
    defaultValue: 37,
    defaultUnitIds: { si: 32, ip: 33 },
    enabled: isOutletTemperature,
  })

  const condensingFieldSynced = {
    ...condensingField,
    handleValueChange: (nextValue: any, ctx: any) => {
      condensingField.handleValueChange(nextValue, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const typedC = convertToTarget(
        toNumber(nextValue),
        _.get(formValues, 'condenser.condensingType'),
        '°C',
        'Temperature',
        40,
        false,
        false,
      )
      const refrigerant = readRefrigerantType(
        _.get(formValues, 'condenser.refrigerantType'),
      )
      const reference = readReference(formValues)
      const midpoint = toMidpoint(typedC, reference, refrigerant)
      const { compressorBaseK, subCoolingBaseK } = readCanonicals(formValues)
      writeCanonicals(setter, midpoint, compressorBaseK, subCoolingBaseK)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        'condensing',
      )
    },
    handleUnitChange: (nextUnitRaw: any, ctx: any) => {
      condensingField.handleUnitChange(nextUnitRaw, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const { midpoint, compressorBaseK, subCoolingBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        undefined,
        { condensing: nextDisplayUnit(nextUnitRaw, '°C') },
      )
    },
  }

  const compressorFieldSynced = {
    ...compressorField,
    handleValueChange: (nextValue: any, ctx: any) => {
      compressorField.handleValueChange(nextValue, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const compressorBaseK = convertToTarget(
        toNumber(nextValue),
        _.get(formValues, 'condenser.compressorType'),
        '°C',
        'Temperature',
        25,
        true,
        false,
      )
      const { midpoint, subCoolingBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      writeCanonicals(setter, midpoint, compressorBaseK, subCoolingBaseK)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        'compressor',
      )
    },
    handleUnitChange: (nextUnitRaw: any, ctx: any) => {
      compressorField.handleUnitChange(nextUnitRaw, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const { midpoint, compressorBaseK, subCoolingBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        undefined,
        { compressor: nextDisplayUnit(nextUnitRaw, 'K') },
      )
    },
  }

  const inletTempFieldSynced = {
    ...inletTempField,
    handleValueChange: (nextValue: any, ctx: any) => {
      inletTempField.handleValueChange(nextValue, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const inlet = convertToTarget(
        toNumber(nextValue),
        _.get(formValues, 'condenser.inletTemperatureType'),
        '°C',
        'Temperature',
        NaN,
        false,
        false,
      )
      if (!Number.isFinite(inlet)) return
      const { midpoint, subCoolingBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      const compressorBaseK = inlet - dewFromMidpoint(midpoint, refrigerant)
      writeCanonicals(setter, midpoint, compressorBaseK, subCoolingBaseK)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        'inlet',
      )
    },
    handleUnitChange: (nextUnitRaw: any, ctx: any) => {
      inletTempField.handleUnitChange(nextUnitRaw, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const { midpoint, compressorBaseK, subCoolingBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        undefined,
        { inlet: nextDisplayUnit(nextUnitRaw, '°C') },
      )
    },
  }

  const subCoolingFieldSynced = {
    ...subCoolingField,
    handleValueChange: (nextValue: any, ctx: any) => {
      subCoolingField.handleValueChange(nextValue, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const subCoolingBaseK = convertToTarget(
        toNumber(nextValue),
        _.get(formValues, 'condenser.subCoolingType'),
        '°C',
        'Temperature',
        3,
        true,
        false,
      )
      const { midpoint, compressorBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      writeCanonicals(setter, midpoint, compressorBaseK, subCoolingBaseK)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        'subCooling',
      )
    },
    handleUnitChange: (nextUnitRaw: any, ctx: any) => {
      subCoolingField.handleUnitChange(nextUnitRaw, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const { midpoint, compressorBaseK, subCoolingBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        undefined,
        { subCooling: nextDisplayUnit(nextUnitRaw, 'K') },
      )
    },
  }

  const outletTempFieldSynced = {
    ...outletTempField,
    handleValueChange: (nextValue: any, ctx: any) => {
      outletTempField.handleValueChange(nextValue, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const outlet = convertToTarget(
        toNumber(nextValue),
        _.get(formValues, 'condenser.outletTemperatureType'),
        '°C',
        'Temperature',
        NaN,
        false,
        false,
      )
      if (!Number.isFinite(outlet)) return
      const { midpoint, compressorBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      const subCoolingBaseK =
        bubbleFromMidpoint(midpoint, refrigerant) - outlet
      writeCanonicals(setter, midpoint, compressorBaseK, subCoolingBaseK)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        'outlet',
      )
    },
    handleUnitChange: (nextUnitRaw: any, ctx: any) => {
      outletTempField.handleUnitChange(nextUnitRaw, ctx)
      const formValues = ctx?.form?.values ?? values
      const setter = ctx?.form?.setFieldValue ?? setFieldValue
      const { midpoint, compressorBaseK, subCoolingBaseK, refrigerant, reference } =
        readCanonicals(formValues)
      refreshDisplayFromCanonicals(
        setter,
        formValues,
        midpoint,
        compressorBaseK,
        subCoolingBaseK,
        reference,
        refrigerant,
        undefined,
        { outlet: nextDisplayUnit(nextUnitRaw, '°C') },
      )
    },
  }

  useEffect(() => {
    const canonicals = readCanonicals()
    writeCanonicals(
      setFieldValue,
      canonicals.midpoint,
      canonicals.compressorBaseK,
      canonicals.subCoolingBaseK,
    )
    refreshDisplayFromCanonicals(
      setFieldValue,
      values,
      canonicals.midpoint,
      canonicals.compressorBaseK,
      canonicals.subCoolingBaseK,
      canonicals.reference,
      canonicals.refrigerant,
      undefined,
      { unitTypes },
    )
    // Seed missing SI canonicals and refresh visible fields after SI/IP switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitTypes, setFieldValue])

  return (
    <>
      <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '20px' }}>
        <StyledCollapsePanel header='ui.thermal.panelHeader.fluid' key='2'>
          <StyledRow>
            <FieldThermalSelect
              span={{ sm: 24, md: 12, lg: 6, xl: 6 }}
              data={refType}
              name='condenser.refrigerantType'
              label='data.thermal.field.refrigerant_type'
              field='condenser_type'
              required
              defaultValue='R404A'
              overrideOnChange={handleRefrigerantChange}
            />

            <Col sm={24} md={12} lg={6} xl={6} style={{ minWidth: 0 }}>
              <p
                style={{
                  fontFamily: 'Avenir Medium, sans-serif',
                  paddingBottom: '8px',
                }}
              >
                <span style={{ color: '#ff4d4f' }}>* </span>
                {intl.formatMessage({
                  id: isCompressorInletTemperature
                    ? 'data.thermal.field.inlet_temp_long'
                    : 'data.thermal.field.desuperheating',
                })}
              </p>
              <Space.Compact style={{ width: '100%', minWidth: 0 }}>
                <div style={{ flex: '0 0 auto', minWidth: 150 }}>
                  <FieldRangeSelect
                    hideLabel
                    hasFeedback={false}
                    style={{ width: '100%' }}
                    allowClear={false}
                    defaultValue='delta_temperature'
                    name='condenser.compressorInletMode'
                    overrideOnChange={handleCompressorInletModeChange}
                    optionKeyPath={['key']}
                    optionMessagePath={['label']}
                    options={[
                      {
                        key: 'delta_temperature',
                        label: 'data.thermal.field.desuperheating',
                        value: 'delta_temperature',
                      },
                      {
                        key: 'temperature',
                        label: 'data.thermal.field.inlet_temp',
                        value: 'temperature',
                      },
                    ]}
                  />
                </div>
                {isCompressorInletTemperature ? (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <FieldUnitInput
                      field={inletTempFieldSynced}
                      valueName='condenser.inletTemperature'
                      unitName='condenser.inletTemperatureType'
                      required
                      unitSelectWidth={64}
                    />
                  </div>
                ) : (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <FieldUnitInput
                      field={compressorFieldSynced}
                      valueName='condenser.compressor'
                      unitName='condenser.compressorType'
                      required
                      unitSelectWidth={64}
                    />
                  </div>
                )}
              </Space.Compact>
            </Col>

            <Col sm={24} md={12} lg={6} xl={6} style={{ minWidth: 0 }}>
              <p
                style={{
                  fontFamily: 'Avenir Medium, sans-serif',
                  paddingBottom: '8px',
                }}
              >
                <span style={{ color: '#ff4d4f' }}>* </span>
                {intl.formatMessage({ id: 'data.thermal.field.condensing' })}
              </p>
              <Space.Compact style={{ width: '100%' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <FieldUnitInput
                    field={condensingFieldSynced}
                    valueName='condenser.condensing'
                    unitName='condenser.condensingType'
                    required
                    unitSelectWidth={64}
                  />
                </div>
                {showGlideSelector ? (
                  <div style={{ flex: '0 0 auto', minWidth: 150 }}>
                    <FieldRangeSelect
                      hideLabel
                      hasFeedback={false}
                      style={{ width: '100%' }}
                      allowClear={false}
                      defaultValue='ave'
                      name='condenser.condensingReference'
                      overrideOnChange={handleCondensingReferenceChange}
                      optionKeyPath={['key']}
                      optionMessagePath={['key']}
                      prefix='select.sat_temp_modes.'
                      options={rawSaturationTempModes}
                    />
                  </div>
                ) : null}
              </Space.Compact>
            </Col>

            <Col sm={24} md={12} lg={6} xl={6} style={{ minWidth: 0 }}>
              <p
                style={{
                  fontFamily: 'Avenir Medium, sans-serif',
                  paddingBottom: '8px',
                }}
              >
                <span style={{ color: '#ff4d4f' }}>* </span>
                {intl.formatMessage({
                  id: isOutletTemperature
                    ? 'data.thermal.field.desired_outlet_temp'
                    : 'data.thermal.field.subcooling_delta_long',
                })}
              </p>
              <Space.Compact style={{ width: '100%', minWidth: 0 }}>
                <div style={{ flex: '0 0 auto', minWidth: 150 }}>
                  <FieldRangeSelect
                    hideLabel
                    hasFeedback={false}
                    style={{ width: '100%' }}
                    allowClear={false}
                    defaultValue='delta_temperature'
                    name='condenser.subCoolingMode'
                    overrideOnChange={handleSubCoolingModeChange}
                    optionKeyPath={['key']}
                    optionMessagePath={['label']}
                    options={[
                      {
                        key: 'delta_temperature',
                        label: 'data.thermal.field.subcooling',
                        value: 'delta_temperature',
                      },
                      {
                        key: 'temperature',
                        label: 'data.thermal.field.outlet_temp',
                        value: 'temperature',
                      },
                    ]}
                  />
                </div>
                {isOutletTemperature ? (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <FieldUnitInput
                      field={outletTempFieldSynced}
                      valueName='condenser.outletTemperature'
                      unitName='condenser.outletTemperatureType'
                      required
                      unitSelectWidth={64}
                    />
                  </div>
                ) : (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <FieldUnitInput
                      field={subCoolingFieldSynced}
                      valueName='condenser.subCooling'
                      unitName='condenser.subCoolingType'
                      required
                      unitSelectWidth={64}
                    />
                  </div>
                )}
              </Space.Compact>
            </Col>
          </StyledRow>
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default Fluid
