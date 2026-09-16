import _ from 'lodash'
import { Field } from 'formik'

import { DetailNumber, DetailText } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'

const liquidTypeByValue: Record<number, string> = {
  1: 'water',
  2: 'ethylene',
  3: 'propylene',
}

const EntryConditions = ({ hasOutletTemp, hasHumidity }) => {
  const items = [
    {
      label: <SpanIntl value='data.selections.input_parameters.capacity' />,
      span: 4,
      children: (
        <DetailNumber scale={1} name='input_data.performance.capacity' />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.fluid_c1.refrigerant' />
      ),
      children: (
        <Field name='input_data.liquid.type.value'>
          {({ field }: { field: { value?: number } }) => (
            <SpanIntl
              prefix='select.coils.microchannel.fluid_type.'
              value={liquidTypeByValue[field.value || 0] || ''}
            />
          )}
        </Field>
      ),
    },
    {
      label: (
        <SpanIntl value='data.selections.input_parameters.volume_fraction' />
      ),
      children: (
        <DetailNumber scale={1} name='input_data.liquid.volume_fraction' />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.input_parameters.entry_conditions.inlet_temperature' />
      ),
      children: (
        <DetailNumber scale={1} name='input_data.liquid.inlet_temperature' />
      ),
    },
    hasOutletTemp
      ? {
          label: (
            <SpanIntl value='data.calculations.model_detail.outlet_temp' />
          ),
          children: (
            <DetailNumber
              scale={1}
              name='input_data.liquid.outlet_temperature'
            />
          ),
        }
      : {
          label: <SpanIntl value='data.selections.model_detail.flow_rate' />,
          children: (
            <DetailNumber scale={0} name='input_data.liquid.flow_rate' />
          ),
        },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.inlet_temperature_air.long' />
      ),
      children: (
        <DetailNumber scale={1} name='input_data.air.inlet_temperature' />
      ),
    },
    hasHumidity
      ? {
          label: <SpanIntl value='data.selections.input_parameters.humidity' />,
          children: <DetailNumber scale={1} name='input_data.air.humidity' />,
        }
      : {
          label: (
            <SpanIntl value='data.selections.input_parameters.wet_bulb_temperature' />
          ),
          children: (
            <DetailNumber
              scale={1}
              name='input_data.air.wet_bulb_temperature'
            />
          ),
        },
    {
      label: <SpanIntl value='data.fan_models.fan_type' />,
      children: (
        <DetailText
          name='input_data.ventilation.type'
          transform={(value: any) =>
            _.get(value, 'props.value.value', '').toUpperCase()
          }
        />
      ),
    },
    {
      label: <SpanIntl value='data.selections.input_parameters.esp' />,
      children: <DetailNumber scale={0} name='input_data.ventilation.esp' />,
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
