import { Tabs } from 'antd'
import { useIntl } from 'react-intl'
import { ConsoleLogger } from 'aws-amplify/utils'

import { StyledCard, StyledSeparator } from 'Components/Styled'

import CalculationsDetail from './CalculationsDetail'
import SelectionsDetail from './SelectionsDetail'

import * as F from '../../functions'

const log = new ConsoleLogger('Modules/Users/Detail/CorrectiveFactors')

const CorrectiveFactors = (props: any) => {
  log.info('render.props', { props })

  const { data: user } = props
  const { user_permissions, global_settings } = user

  const intl = useIntl()

  const mergedCorrectiveFactors = F.mergeCorrectiveFactors(
    global_settings,
    user_permissions,
  )

  const { microchannel, selector } = mergedCorrectiveFactors

  const tabsPanels = [
    {
      label: intl.formatMessage({
        id: 'ui.settings.corrective_factors.tab.calculations',
      }),
      key: '1',
      children: <CalculationsDetail microchannel={microchannel} />,
    },
    {
      label: intl.formatMessage({
        id: 'ui.settings.corrective_factors.tab.selections',
      }),
      key: '2',
      children: <SelectionsDetail selector={selector} />,
    },
  ]

  return (
    <StyledCard>
      <StyledSeparator withText='ui.users.permission' />

      <Tabs
        items={tabsPanels}
        defaultActiveKey='1'
        style={{ marginTop: '24px' }}
      />
    </StyledCard>
  )
}

export default CorrectiveFactors
