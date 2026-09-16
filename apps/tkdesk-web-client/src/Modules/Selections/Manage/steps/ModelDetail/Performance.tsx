import { useAuthorization } from 'Modules/App/Authorization'

import { DetailNumber, DetailText } from 'Components/Detail'
import { FieldDecimalNumber } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledRow,
} from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

const Performance = () => {
  const autho = useAuthorization()

  const items = [
    {
      label: <SpanIntl value='data.selections.input_parameters.capacity' />,
      children: (
        <DetailNumber scale={1} name='detail_data.performance.capacity' />
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.ratio' />,
      children: <DetailNumber scale={1} name='detail_data.performance.ratio' />,
    },
    {
      label: (
        <SpanIntl value='data.selections.model_detail.nominal_energy_class' />
      ),
      children: (
        <DetailText name='detail_data.performance.nominal_energy_class' />
      ),
    },
    {
      label: (
        <SpanIntl value='data.selections.model_detail.working_point_energy_class' />
      ),
      children: (
        <DetailText name='detail_data.performance.working_point_energy_class' />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='1'
        header='ui.selections.steps.input_parameters.performance'
      >
        {autho.iAmAdmin ? (
          <StyledRow>
            <FieldDecimalNumber
              span={{ sm: 24, lg: 12, xl: 4 }}
              scale={1}
              name='detail_data.performance.capacity'
              label='data.selections.input_parameters.capacity'
            />
            <FieldDecimalNumber
              span={{ sm: 24, lg: 12, xl: 5 }}
              scale={1}
              name='detail_data.performance.ratio'
              label='data.selections.model_detail.ratio'
            />
            <DetailText
              span={{ sm: 24, lg: 12, xl: 5 }}
              hideLabel={false}
              name='detail_data.performance.nominal_energy_class'
              label='data.selections.model_detail.nominal_energy_class'
            />
            <DetailText
              span={{ sm: 24, lg: 12, xl: 5 }}
              hideLabel={false}
              name='detail_data.performance.working_point_energy_class'
              label='data.selections.model_detail.working_point_energy_class'
            />
            <DetailText
              span={{ sm: 24, lg: 12, xl: 5 }}
              hideLabel={false}
              name='detail_data.performance.mode'
              label='data.selections.model_detail.mode'
            />
          </StyledRow>
        ) : (
          <StyledDescriptions items={items} />
        )}
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Performance
