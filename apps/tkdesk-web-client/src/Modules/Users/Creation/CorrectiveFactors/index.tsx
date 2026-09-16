import { Tabs } from 'antd'
import { useIntl } from 'react-intl'

import { StyledCard, StyledSeparator } from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

import CalculationsCreate from './CalculationsCreate'
import SelectionsCreate from './SelectionsCreate'

const CorrectiveFactors = ({
  microchannel,
  selector,
}: {
  microchannel: any
  selector: any
}) => {
  const intl = useIntl()

  const tabsPanels = [
    {
      label: intl.formatMessage({
        id: 'ui.settings.corrective_factors.tab.calculations',
      }),
      key: '1',
      children: <CalculationsCreate microchannel={microchannel} />,
    },
    {
      label: intl.formatMessage({
        id: 'ui.settings.corrective_factors.tab.selections',
      }),
      key: '2',
      children: <SelectionsCreate selector={selector} />,
    },
  ]

  return (
    <StyledCard>
      <StyledSeparator withText='ui.users.permission' />

      <SpanIntl value='ui.users.permission.description' />

      <Tabs
        items={tabsPanels}
        defaultActiveKey='1'
        style={{ marginTop: '24px' }}
      />
    </StyledCard>
  )
}

export default CorrectiveFactors
