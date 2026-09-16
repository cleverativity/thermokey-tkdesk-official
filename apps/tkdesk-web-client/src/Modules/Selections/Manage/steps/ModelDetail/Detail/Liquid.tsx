import _ from 'lodash'

import { DetailNumber, DetailText } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'

const Liquid = ({ liquid }) => {
  const showVolumeFraction =
    _.toLower(_.get(liquid, 'type.value', '')) !== 'water'

  const items = [
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.fluid_c1.refrigerant' />
      ),
      children: <DetailText name='detail_data.liquid.type' />,
    },
    showVolumeFraction && {
      label: (
        <SpanIntl value='data.selections.input_parameters.volume_fraction' />
      ),
      children: (
        <DetailNumber name='detail_data.liquid.volume_fraction' scale={0} />
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.input_parameters.entry_conditions.inlet_temperature' />
      ),
      children: (
        <DetailNumber name='detail_data.liquid.inlet_temperature' scale={1} />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.outlet_temp' />,
      children: (
        <DetailNumber name='detail_data.liquid.outlet_temperature' scale={1} />
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.flow_rate' />,
      children: <DetailNumber name='detail_data.liquid.flow_rate' scale={1} />,
    },
    {
      label: (
        <SpanIntl value='data.selections.model_detail.total_pressure_drop' />
      ),
      children: (
        <DetailNumber name='detail_data.liquid.total_pressure_drop' scale={0} />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='4'
        header='ui.selections.steps.input_parameters.liquid'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Liquid
