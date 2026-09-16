import { Tabs } from 'antd'
import { useIntl } from 'react-intl'
import { ConsoleLogger } from 'aws-amplify/utils'

import { StyledCard, StyledSeparator } from 'Components/Styled'
import { SpanIntl } from 'Components/Span'

import CalculationsEdit from './CalculationsEdit'
import SelectionsEdit from './SelectionsEdit'

import * as F from '../../functions'

const log = new ConsoleLogger('Modules/Users/Edit/CorrectiveFactors')

const CorrectiveFactors = ({ user }: { user: any }) => {
  log.info('render.props', { user })

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
      children: <CalculationsEdit microchannel={microchannel} />,
    },
    {
      label: intl.formatMessage({
        id: 'ui.settings.corrective_factors.tab.selections',
      }),
      key: '2',
      children: <SelectionsEdit selector={selector} />,
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
