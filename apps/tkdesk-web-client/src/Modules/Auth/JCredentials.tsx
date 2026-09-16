import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import _ from 'lodash'
import { Alert, Col } from 'antd'
import { StyledRow, StyledSeparator, StyledButton } from 'Components/Styled'
import { FieldInput, FieldPhoneNumber } from 'Components/Field'
import { FormikForm, FormikSubmit } from 'Components/Formik'
import LoginLayout from './signin.style'
import { connect } from 'react-redux'
import { ConsoleLogger } from 'aws-amplify/utils'
import * as F from 'Utils/functions'

const log = new ConsoleLogger('Modules/Auth/JCredentials')

const JCredentials = (props: {
  back: any
  profile?: CommonObject
  loading?: boolean
  error?: any
  data?: any
  onSubmit?: (values: { [key: string]: any }) => void
}) => {
  const intl = useIntl()
  const {
    back,
    onSubmit,
    profile,
    loading,
    error = null,
    data,
    ...other
  } = props

  const handleSubmit = (values: ObjNumber, frk: any) => {
    if (onSubmit) onSubmit({ back, ...values })
    frk.setSubmitting(false)
  }
  const firstUpdate = useRef(true)

  const [errorState, setErrorState] = useState(false)

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false
      setErrorState(false)
      return
    }
    setErrorState(error)
  }, [error])

  log.debug('render.props', { props, errorState })
  return (
    <LoginLayout style={{ width: '600px', padding: '20px 35px' }}>
      <StyledSeparator title withText='ui.login.signin.request_credentials' />

      <FormikForm initialValues={{}} onSubmit={handleSubmit}>
        <StyledRow>
          <Col span={12}>
            <FieldInput
              name='registry.name'
              required
              label='data.request_credentials.name'
            ></FieldInput>
          </Col>
          <Col span={12}>
            <FieldInput
              name='registry.surname'
              required
              label='data.request_credentials.surname'
            ></FieldInput>
          </Col>
        </StyledRow>
        <StyledRow>
          <Col span={12}>
            <FieldInput
              name='registry.company_email'
              required
              label='data.request_credentials.email'
              validate={F.validateEmail}
            />
          </Col>
          <Col span={12}>
            <FieldPhoneNumber
              name='registry.company_telephone'
              required
              label='data.request_credentials.phone'
            />
          </Col>
        </StyledRow>
        <StyledRow>
          <Col span={12}>
            <FieldInput
              name='registry.company_name'
              required
              label='data.request_credentials.business_name'
            ></FieldInput>
          </Col>
        </StyledRow>
        <StyledRow justify='end'>
          <Col>
            <StyledButton
              id='button.login.backLogin'
              onClick={() => {
                setErrorState(false)
                back(false)
              }}
              label='ui.login.signin.back_to_login'
            />
          </Col>
          <Col>
            <FormikSubmit
              style={{ marginTop: 0 }}
              type='primary'
              loading={loading}
              label='ui.login.signin.confirm'
            />
          </Col>
        </StyledRow>
        {!_.isNil(errorState) && errorState ? (
          <Alert
            style={{ marginTop: '20px' }}
            showIcon
            type='error'
            message={intl.formatMessage({ id: 'data.generic.error_title' })}
            description={intl.formatMessage({
              id: 'data.generic.error_description',
            })}
          />
        ) : null}
      </FormikForm>
    </LoginLayout>
  )
}

export default connect((state: AppState) => ({
  ...state.general.application,
}))(JCredentials)
