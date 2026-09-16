import dayjs from 'dayjs'
import { Col, Row } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'

import { StyledButton, StyledPageHeader } from 'Components/Styled'
import { FormikForm, FormikSubmit } from 'Components/Formik'

import CreationForm from '../../../Model/Users/components/CreationForm'
import CorrectiveFactors from './CorrectiveFactors'

import * as F from '../functions'

const log = new ConsoleLogger('Modules/Users/Creation')

interface UserCreationProps {
  data: any
  onBack?: () => void
  onCreate?: (data: User) => void
}

const UserCreation = (props: UserCreationProps) => {
  const { onCreate, onBack, data: global_settings } = props
  const today = dayjs(new Date()).format('YYYY-MM-DD')

  const handleSubmit = (values: any, frk: any) => {
    if (onCreate) onCreate(values)
  }

  const mergedCorrectiveFactors =
    F.mergeCorrectiveFactorsForCreation(global_settings)
  log.debug('render.props', { props, mergedCorrectiveFactors })

  const { microchannel, selector } = mergedCorrectiveFactors

  return (
    <>
      <StyledPageHeader title='data.users.create_user_header' />
      <FormikForm
        onSubmit={handleSubmit}
        initialValues={{
          expiration_date: today,
          user_permissions: { microchannel, selector },
        }}
      >
        <Row
          justify='space-between'
          align='middle'
          style={{ margin: '0 0 16px 0' }}
        >
          <Col>
            <StyledButton
              label='ui.generic.go_back'
              onClick={onBack}
              id='button.create.goback'
            />
          </Col>
          <Col>
            <FormikSubmit
              label='ui.users.confirm_creation'
              id='button.create.confirm_creation'
            />
          </Col>
        </Row>

        <CreationForm mode='creation' />

        <CorrectiveFactors microchannel={microchannel} selector={selector} />
      </FormikForm>
    </>
  )
}

export default UserCreation
