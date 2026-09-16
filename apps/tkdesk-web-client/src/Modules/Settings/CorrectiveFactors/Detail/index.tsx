import { Card, Row, Tabs } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
import { useIntl } from 'react-intl'

import { FormikForm } from 'Components/Formik'
import { StyledPageHeader, StyledButton } from 'Components/Styled'

import CalculationsDetail from './CalculationsDetail'
import SelectionsDetail from './SelectionsDetail'

const log = new ConsoleLogger('Modules/CorrectiveFactorsDetail')

interface CorrectiveFactorsDetailProps {
  data: any
  onEdit: () => void
}
const CorrectiveFactorsDetail = (props: CorrectiveFactorsDetailProps) => {
  log.info('render.props', props)
  const { data: corrective_factors, onEdit } = props
  const { microchannel, selector } = corrective_factors

  const intl = useIntl()

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
    <>
      <StyledPageHeader title='data.settings.corrective_factors.header' />

      <FormikForm initialValues={corrective_factors}>
        <Row justify='end' style={{ marginBottom: '16px' }}>
          <StyledButton
            label='ui.settings.corrective_factors.edit'
            onClick={onEdit}
            type='primary'
            id='button.detail.corrective_factors'
          />
        </Row>

        <Card>
          <Tabs items={tabsPanels} defaultActiveKey='1' />
        </Card>
      </FormikForm>
    </>
  )
}

export default CorrectiveFactorsDetail

CorrectiveFactorsDetail.prefix = 'corrective-factors'
