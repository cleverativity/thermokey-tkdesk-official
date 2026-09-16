import { useState } from 'react'

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react'
import { useIntl } from 'react-intl'

import { StyledButton, StyledSpinner } from 'Components/Styled'
import JCredentials from './JCredentials'
import App from 'Modules/App/App'
import LoginLayout from '../Auth/signin.style'
import logo from '../../Images/logo.png'
import itAws from 'Localization/Messages/it-IT/it-IT.aws'
import enAws from 'Localization/Messages/en-US/en-US.aws'
import { connect } from 'react-redux'
import actions from 'Modules/App/actions'
import _ from 'lodash'
import { Alert, Col, Row } from 'antd'
import { ConsoleLogger, I18n } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/Auth/Authenticator')

const CustomAuthenticator = ({
  locale,
  onRequestCredentials,
}: {
  component: any
  locale: string
  onRequestCredentials?: (values: { [key: string]: any }) => void
}) => {
  const intl = useIntl()
  const {
    user: loggedUser,
    route,
    toForgotPassword,
  } = useAuthenticator((context) => [context.route])

  log.debug('loggedUser', {
    loggedUser,
    // authStatus,
    locale,
    route,
  })

  const [requestCredentials, setRequestCredentials] = useState(false)

  const goToRequestCredentials = () => {
    setRequestCredentials(true)
  }

  I18n.setLanguage(locale)

  I18n.putVocabularies({
    ...itAws,
    ...enAws,
  })

  const components = {
    Header() {
      return (
        <div>
          <img
            alt='#'
            src={logo}
            style={{ width: '240px', paddingBottom: 0 }}
          />
        </div>
      )
    },
    ResetPassword: {
      Header() {
        return (
          <div>
            <p
              style={{
                textAlign: 'center',
                fontFamily: 'Avenir Medium, sans-serif',
                paddingBottom: '10px',
              }}
            >
              {intl.formatMessage({
                id: 'ui.login.signin.forgot_password_text',
              })}
            </p>
          </div>
        )
      },
    },
    ConfirmResetPassword: {
      Header() {
        return (
          <div>
            <p
              style={{
                textAlign: 'center',
                fontFamily: 'Avenir Medium, sans-serif',
                paddingBottom: '10px',
              }}
            >
              {intl.formatMessage({
                id: 'ui.login.signin.confirm_forgot_password_text',
              })}
            </p>
          </div>
        )
      },
    },

    ForceNewPassword: {
      FormFields() {
        return (
          <>
            <p
              style={{
                textAlign: 'center',
                fontFamily: 'Avenir Medium, sans-serif',
                paddingBottom: '10px',
              }}
            >
              {intl.formatMessage({
                id: 'ui.login.signin.force_new_password_text',
              })}
            </p>
            <Authenticator.ForceNewPassword.FormFields />
            <Alert
              type='info'
              message={intl.formatMessage({
                id: 'ui.login.signin.password_info',
              })}
            />
          </>
        )
      },
    },

    SignIn: {
      Header() {
        return (
          <div>
            <p
              style={{
                textAlign: 'center',
                fontFamily: 'Avenir Medium, sans-serif',
                paddingTop: '28px',
              }}
            >
              {intl.formatMessage({ id: 'ui.login.signin.login_text' })}
            </p>
          </div>
        )
      },
      Footer() {
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <StyledButton
              data-cy='button.login.requestCredentials'
              id='button.login.requestCredentials'
              label='ui.login.signin.request_credentials'
              onClick={goToRequestCredentials}
              style={{ width: '100%', marginTop: 0, marginBottom: '20px' }}
            />
            <StyledButton
              id='button.login.forgotPassword'
              type='link'
              label='ui.login.signin.forgot_password'
              onClick={toForgotPassword}
            />
          </div>
        )
      },
    },
  }

  if (route === 'idle' && _.isNil(loggedUser)) {
    return (
      <Row justify='center' align='middle' style={{ height: '80%' }}>
        <Col>
          <StyledSpinner />
        </Col>
      </Row>
    )
  }

  if (route === 'authenticated') {
    return <App />
  } else {
    if (requestCredentials) {
      return (
        <JCredentials
          back={setRequestCredentials}
          onSubmit={onRequestCredentials}
        />
      )
    } else {
      return (
        <LoginLayout>
          <Authenticator hideSignUp components={components} />
        </LoginLayout>
      )
    }
  }
}

export default connect(
  (state: AppState) => ({ ...state.general?.profile?.preferences?.language }),
  (dispatch) => ({
    onRequestCredentials: (values: any) =>
      dispatch(actions.application.requestCredentials(values)),
  }),
)(CustomAuthenticator)
