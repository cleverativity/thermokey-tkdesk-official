import { DetailNumber, DetailText } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'

const Coil = () => {
  const items = [
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.material.cooling_fins' />
      ),
      children: <DetailText name='detail_data.coil.fin_material' />,
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.fin_type' />,
      children: <DetailText name='detail_data.coil.fin_type' />,
    },
    {
      label: (
        <SpanIntl value='data.selections.input_parameters.tube_material' />
      ),
      children: <DetailText name='detail_data.coil.tube_material' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.tube_type' />,
      children: <DetailText name='detail_data.coil.tube_type' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.fin_spacing' />,
      children: <DetailNumber name='detail_data.coil.fin_spacing' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.fin_pitch' />,
      children: <DetailNumber name='detail_data.coil.fin_pitch' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.n_coils' />,
      children: <DetailNumber name='detail_data.coil.n_coils' scale={0} />,
    },
  ]
  return (
    <StyledCollapse defaultActiveKey={['8']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='8'
        header='ui.selections.steps.input_parameters.coil'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Coil
