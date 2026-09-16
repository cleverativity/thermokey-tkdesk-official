import _ from 'lodash'

import { DetailDate } from 'Components/Detail'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
} from 'Components/Styled'
import { SpanIntl, SpanNumber } from 'Components/Span'

const GeneralInfo = ({ detailData }: any) => {
  const c1Weight = _.get(
    detailData,
    'c1.geometric_details.coil_weight.value',
    0,
  )
  const c2Weight = _.get(
    detailData,
    'c2.geometric_details.coil_weight.value',
    0,
  )
  const unit_of_measurement = _.get(
    detailData,
    'c2.geometric_details.coil_weight.unit_of_measurement',
    0,
  )

  const items = [
    {
      label: <SpanIntl value='data.calculations.model_detail.updating_date' />,
      span: 2,
      children: <DetailDate name='date' />,
    },
    {
      label: <SpanIntl value='data.calculations.model_detail.coil_weight' />,
      children: (
        <>
          <SpanNumber value={c1Weight + c2Weight} />
          {unit_of_measurement}
        </>
      ),
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='1'
        header='ui.coils.microchannel.model_detail.general_info'
      >
        <StyledDescriptions items={items} />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default GeneralInfo
