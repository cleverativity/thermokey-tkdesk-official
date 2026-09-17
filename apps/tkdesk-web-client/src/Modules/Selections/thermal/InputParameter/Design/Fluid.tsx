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

interface FluidProps {
  data?: {
    refType?: any[]
  }
  unitTypes: string
}

function Fluid(props: FluidProps) {
  const { refType } = props.data ?? {}
  const { unitTypes } = props

  const intl = useIntl()
  const { values, setFieldValue } = useFormikContext<any>()

  const handleCondensingReferenceChange = (value: any) => {
    const reference =
      value && typeof value === 'object'
        ? (value.value ?? value.key)
        : value
    setFieldValue('condenser.condensingReference', reference, false)
  }

  const isCompressorInletTemperature = _.isEqual(
    _.get(
      values,
      'condenser.compressorInletMode.value',
      _.get(values, 'condenser.compressorInletMode', 'delta_temperature'),
    ),
    'temperature',
  )

  const isOutletTemperature = _.isEqual(
    _.get(
      values,
      'condenser.subCoolingMode.value',
      _.get(values, 'condenser.subCoolingMode', 'delta_temperature'),
    ),
    'temperature',
  )

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
                    optionKeyPath={['key']}
                    optionMessagePath={['label']}
                    options={[
                      {
                        label: 'data.thermal.field.desuperheating',
                        value: 'delta_temperature',
                      },
                      {
                        label: 'data.thermal.field.inlet_temp',
                        value: 'temperature',
                      },
                    ]}
                  />
                </div>
                {isCompressorInletTemperature ? (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <FieldUnitInput
                      field={inletTempField}
                      valueName='condenser.inletTemperature'
                      unitName='condenser.inletTemperatureType'
                      required
                      unitSelectWidth={64}
                    />
                  </div>
                ) : (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <FieldUnitInput
                      field={compressorField}
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
                    field={condensingField}
                    valueName='condenser.condensing'
                    unitName='condenser.condensingType'
                    required
                    unitSelectWidth={64}
                  />
                </div>
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
                    optionKeyPath={['key']}
                    optionMessagePath={['label']}
                    options={[
                      {
                        label: 'data.thermal.field.subcooling',
                        value: 'delta_temperature',
                      },
                      {
                        label: 'data.thermal.field.outlet_temp',
                        value: 'temperature',
                      },
                    ]}
                  />
                </div>
                {isOutletTemperature ? (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <FieldUnitInput
                      field={outletTempField}
                      valueName='condenser.outletTemperature'
                      unitName='condenser.outletTemperatureType'
                      required
                      unitSelectWidth={64}
                    />
                  </div>
                ) : (
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <FieldUnitInput
                      field={subCoolingField}
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
