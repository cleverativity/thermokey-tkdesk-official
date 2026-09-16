import { useAuthorization } from 'Modules/App/Authorization/Context'

import { DetailDate, DetailText } from 'Components/Detail'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledRow,
} from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

const GeneralInfo = () => {
  const autho = useAuthorization()

  const items = [
    {
      label: <SpanIntl value='data.selections.model_detail.model_code' />,
      children: <DetailText name='detail_data.general_info.model_code' />,
    },
    {
      label: <SpanIntl value='data.selections.model_detail.date' />,
      children: <DetailDate name='detail_data.general_info.date.value' />,
    },
  ]

  return (
    <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='1'
        header='ui.coils.microchannel.model_detail.general_info'
      >
        {autho.iAmAdmin ? (
          <StyledRow>
            <DetailText
              span={{ sm: 24, lg: 12, xl: 4 }}
              hideLabel={false}
              name='detail_data.general_info.model_code'
              label='data.selections.model_detail.model_code'
            />
            <DetailDate
              span={{ sm: 24, lg: 12, xl: 5 }}
              hideLabel={false}
              name='detail_data.general_info.date.value'
              label='data.selections.model_detail.date'
            />
          </StyledRow>
        ) : (
          <StyledDescriptions items={items} />
        )}
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default GeneralInfo
