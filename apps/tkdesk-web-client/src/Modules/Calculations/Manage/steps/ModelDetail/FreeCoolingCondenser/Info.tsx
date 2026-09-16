import { DetailIntl, DetailNumber, DetailText } from 'Components/Detail'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

const Info = ({ coreKey }: any) => {
  const items = [
    {
      label: (
        <SpanIntl value={'data.calculations.model_detail.heat_transfer_rate'} />
      ),
      children: (
        <DetailNumber
          size='large'
          scale={1}
          name={`detail_data.${coreKey}.heat_transfer_rate`}
          sign='absolute'
        />
      ),
    },
    {
      label: <SpanIntl value='ui.generic.model_code' />,
      children: <DetailText name={`detail_data.${coreKey}.model_code`} />,
      span: 2,
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.geom_type' />,
      children: (
        <DetailIntl
          prefix='select.coils.microchannel.geom_type.'
          name={`detail_data.${coreKey}.geometric_details.geom_type`}
        />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.material.tubes' />,
      children: (
        <DetailIntl prefix='data.calculations.model_detail.material.'>
          aluminium
        </DetailIntl>
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.material.cooling_fins' />
      ),
      children: (
        <DetailIntl prefix='data.calculations.model_detail.material.'>
          aluminium
        </DetailIntl>
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.material.frame' />,
      children: (
        <DetailIntl prefix='data.calculations.model_detail.material.'>
          aluminium
        </DetailIntl>
      ),
    },
    {
      label: (
        <SpanIntl value='data.calculations.model_detail.material.connections_material' />
      ),
      children: (
        <DetailIntl
          prefix='data.calculations.model_detail.material.'
          name={`detail_data.${coreKey}.geometric_details.connections_material`}
        />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['2']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='2'
        header='ui.coils.microchannel.model_detail.general_info'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default Info
