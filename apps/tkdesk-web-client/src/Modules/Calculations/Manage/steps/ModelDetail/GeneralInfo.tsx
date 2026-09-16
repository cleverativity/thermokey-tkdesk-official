import _ from 'lodash'

import {
  DetailDate,
  DetailIntl,
  DetailNumber,
  DetailText,
} from 'Components/Detail'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

const GeneralInfo = ({ useCase }: any) => {
  const items = [
    {
      label: (
        <SpanIntl
          value={
            _.startsWith(useCase, 'double_flow')
              ? 'data.calculations.model_detail.heat_transfer_rate.df'
              : 'data.calculations.model_detail.heat_transfer_rate'
          }
        />
      ),
      children: (
        <DetailNumber
          size='large'
          scale={1}
          name='detail_data.heat_transfer_rate'
          sign='absolute'
        />
      ),
    },
    {
      label: <SpanIntl value='ui.generic.model_code' />,
      children: <DetailText name='detail_data.model_code' />,
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.updating_date' />,
      span: 2,
      children: <DetailDate name='date' />,
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
          name='detail_data.geometric_details.connections_material'
        />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.coil_weight' />,
      children: (
        <DetailNumber name='detail_data.geometric_details.coil_weight' />
      ),
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.geom_type' />,
      children: (
        <DetailIntl
          prefix='select.coils.microchannel.geom_type.'
          name='detail_data.geometric_details.geom_type'
        />
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='4'
        header='ui.coils.microchannel.model_detail.general_info'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default GeneralInfo
