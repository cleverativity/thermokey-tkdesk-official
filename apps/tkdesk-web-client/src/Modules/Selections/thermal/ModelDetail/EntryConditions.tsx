import _ from 'lodash'
import { useFormikContext } from 'formik'

import { DetailNumber, DetailText } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'

const readUnit = (values: any, path?: string) => {
  if (!path) return ''
  const raw = _.get(values, path)
  if (typeof raw === 'string') return raw
  return _.get(raw, 'name', _.get(raw, 'value', ''))
}

const DetailMeasured = ({
  name,
  unitName,
  scale = 1,
  fallbackUnit = '',
}: {
  name: string
  unitName?: string
  scale?: number
  fallbackUnit?: string
}) => {
  const { values } = useFormikContext<any>()
  const raw = _.get(values, name)
  const value = Number(_.get(raw, 'value', raw))
  const unit = readUnit(values, unitName) || fallbackUnit

  return (
    <DetailNumber scale={scale}>
      {{
        value: Number.isFinite(value) ? value : null,
        unit_of_measurement: unit,
      }}
    </DetailNumber>
  )
}

function EntryConditions() {
  const { values } = useFormikContext<any>()
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

  const items = [
    {
      label: <SpanIntl value='data.thermal.field.thermalCapacity' />,
      span: 4,
      children: (
        <DetailMeasured
          name='condenser.thermalCapacity'
          unitName='condenser.thermalCapacityType'
          fallbackUnit='kW'
        />
      ),
    },
    {
      label: <SpanIntl value='data.thermal.field.refrigerant_type' />,
      children: <DetailText name='condenser.refrigerantType' />,
    },
    {
      label: (
        <SpanIntl
          value={
            isCompressorInletTemperature
              ? 'data.thermal.field.inlet_temp'
              : 'data.thermal.field.desuperheating'
          }
        />
      ),
      children: (
        <DetailMeasured
          name={
            isCompressorInletTemperature
              ? 'condenser.inletTemperature'
              : 'condenser.compressor'
          }
          unitName={
            isCompressorInletTemperature
              ? 'condenser.inletTemperatureType'
              : 'condenser.compressorType'
          }
        />
      ),
    },
    {
      label: <SpanIntl value='data.thermal.field.condensing' />,
      children: (
        <DetailMeasured
          name='condenser.condensing'
          unitName='condenser.condensingType'
          fallbackUnit='°C'
        />
      ),
    },
    {
      label: (
        <SpanIntl
          value={
            isOutletTemperature
              ? 'data.thermal.field.desired_outlet_temp'
              : 'data.thermal.field.subcooling_delta_long'
          }
        />
      ),
      children: (
        <DetailMeasured
          name={
            isOutletTemperature
              ? 'condenser.outletTemperature'
              : 'condenser.subCooling'
          }
          unitName={
            isOutletTemperature
              ? 'condenser.outletTemperatureType'
              : 'condenser.subCoolingType'
          }
          fallbackUnit={isOutletTemperature ? '°C' : 'K'}
        />
      ),
    },
    {
      label: <SpanIntl value='data.thermal.field.dry_bulb' />,
      children: (
        <DetailMeasured
          name='condenser.dryBulb'
          unitName='condenser.dryBulbType'
          fallbackUnit='°C'
        />
      ),
    },
    {
      label: <SpanIntl value='data.thermal.field.rel_humidity' />,
      children: (
        <DetailMeasured
          name='condenser.relHumidity'
          fallbackUnit='%'
        />
      ),
    },
    {
      label: <SpanIntl value='data.thermal.field.fans_connection' />,
      children: <DetailText name='condenser.fansConnection' />,
    },
    {
      label: <SpanIntl value='data.thermal.field.atmospheric' />,
      children: (
        <DetailMeasured
          name='condenser.atmosphericPress'
          unitName='condenser.atmosphericPressType'
          fallbackUnit='kPa'
        />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: 24 }}>
      <StyledCollapsePanel
        key='1'
        header='ui.selections.steps.model_list.entry_conditions'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default EntryConditions
