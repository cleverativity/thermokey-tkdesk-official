import { Row } from 'antd'
import { DetailNumber, DetailText } from 'Components/Detail'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'

const UnitData = () => {
  const items = [
    {
      label: <SpanIntl value='data.selections.model_detail.type' />,
      children: <DetailText name='detail_data.general_info.type' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.length' />,
      children: <DetailNumber name='detail_data.general_info.length' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.width' />,
      children: <DetailNumber name='detail_data.general_info.width' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.height' />,
      children: <DetailNumber name='detail_data.general_info.height' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.weight' />,
      children: (
        <DetailNumber name='detail_data.general_info.weight' scale={0} />
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.inner_volume' />,
      children: (
        <DetailNumber name='detail_data.general_info.inner_volume' scale={1} />
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.exchange_area' />,
      span: 2,
      children: (
        <DetailNumber name='detail_data.general_info.exchange_area' scale={1} />
      ),
    },
    {
      label: <SpanIntl value='data.selections.model_detail.inlet_connection' />,
      children: (
        <Row style={{ gap: '8px' }}>
          <DetailNumber
            scale={0}
            name='detail_data.general_info.inlet_connection_number'
          />
          {'x'}
          <DetailText
            scale={0}
            name='detail_data.general_info.inlet_connection_diameter'
          />
        </Row>
      ),
    },
    {
      label: (
        <SpanIntl value='data.selections.model_detail.outlet_connection' />
      ),
      children: (
        <Row style={{ gap: '8px' }}>
          <DetailNumber
            scale={0}
            name='detail_data.general_info.outlet_connection_number'
          />
          {'x'}
          <DetailText
            scale={0}
            name='detail_data.general_info.outlet_connection_diameter'
          />
        </Row>
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['5']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='5'
        header='ui.selections.steps.model_detail.unit_data'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default UnitData
