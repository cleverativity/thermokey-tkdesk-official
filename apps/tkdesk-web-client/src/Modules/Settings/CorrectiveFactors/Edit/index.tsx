import { Card, Col, Row, Tabs } from 'antd'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'
import { useIntl } from 'react-intl'

import { FormikForm, FormikSubmit } from 'Components/Formik'
import { StyledPageHeader, StyledButton } from 'Components/Styled'

import confirmEditCorrectiveFactorsEn from 'Model/Settings/modal/confirmEditCorrectiveFactors/confirmEditCorrectiveFactorsEn'
import confirmEditCorrectiveFactorsIt from 'Model/Settings/modal/confirmEditCorrectiveFactors/confirmEditCorrectiveFactorsIt'

import CalculationsEdit from './CalculationsEdit'
import SelectionsEdit from './SelectionsEdit'

const log = new ConsoleLogger('Modules/CorrectiveFactorsEdit')

interface CorrectiveFactorsEditProps {
  data: any
  profile: any
  onBack: () => void
  onComplete: (data: SettingFront) => void
}
const CorrectiveFactorsEdit = (props: CorrectiveFactorsEditProps) => {
  log.info('render.props', props)
  const { profile, data: corrective_factors, onBack, onComplete } = props
  const { microchannel, selector } = corrective_factors

  const language = _.get(profile, 'data.preferences.language', 'it')

  const intl = useIntl()

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

  const handleSubmit = (values: SettingFront, frk: any) => {
    log.info('handleSubmit.values', values)
    if (language === 'it') {
      confirmEditCorrectiveFactorsIt(() => onComplete(values))()
    } else {
      confirmEditCorrectiveFactorsEn(() => onComplete(values))()
    }
    frk.setSubmitting(false)
  }

  return (
    <>
      <StyledPageHeader title='data.settings.corrective_factors.edit_header' />

      <FormikForm initialValues={corrective_factors} onSubmit={handleSubmit}>
        <Row
          justify='space-between'
          align='middle'
          style={{ margin: '0 0 16px 0' }}
        >
          <Col>
            <StyledButton
              label='ui.generic.go_back'
              onClick={onBack}
              id='button.edit.corrective_factors'
            />
          </Col>
          <Col>
            <FormikSubmit
              label='ui.settings.corrective_factors.complete'
              type='primary'
              id='button.edit.corrective_factors'
            />
          </Col>
        </Row>

        <Card>
          <Tabs items={tabsPanels} defaultActiveKey='1' />
        </Card>
      </FormikForm>
    </>
  )
}

export default CorrectiveFactorsEdit
