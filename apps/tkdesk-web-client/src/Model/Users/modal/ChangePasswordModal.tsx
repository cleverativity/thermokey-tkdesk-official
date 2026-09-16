import _ from 'lodash'
import { connect } from 'formik'

import { Col, Typography, message, Alert } from 'antd'
import { FieldInput } from 'Components/Field'
import WarningSubmitModal from 'Components/Modal/WarningSubmitModal'

import { StyledRow } from 'Components/Styled'
import { FormattedMessage, useIntl } from 'react-intl'
import Separator from 'Components/Styled/Separator'
import { ConsoleLogger } from 'aws-amplify/utils'
import {
  fetchAuthSession,
  getCurrentUser,
  signOut,
  updatePassword,
} from 'aws-amplify/auth'

const log = new ConsoleLogger('Topbar/ChangePasswordModal')

const { Text } = Typography

const ChangePasswordModal = connect((props: any) => {
  const { onCancel, modal } = props
  const intl = useIntl()
  const labels = {
    passwords_not_equal: intl.formatMessage({
      id: 'data.users.profile.change_password.passwords_not_equal',
    }),
    password_length: intl.formatMessage({
      id: 'data.users.profile.change_password.password_length',
    }),
    done: intl.formatMessage({
      id: 'data.users.profile.change_password.done',
    }),
    wait: intl.formatMessage({
      id: 'data.users.profile.change_password.wait',
    }),
    logout_in_progress: intl.formatMessage({
      id: 'data.users.profile.change_password.logout_in_progress',
    }),
  }

  const onLogout = () => signOut()

  const onSubmit = (values: any, frk: any) => {
    const { setFieldError } = frk
    const { old_password, password, repeat_password } = values

    if (password !== repeat_password) {
      setFieldError('repeat_password', labels.passwords_not_equal)
    } else if (password.length <= 6) {
      setFieldError('password', labels.password_length)
    } else {
      const getAuthenticatedUser = async () => {
        const { username, signInDetails } = await getCurrentUser()

        const { tokens: session } = await fetchAuthSession()

        return {
          username,
          signInUserSession: session,
          authenticationFlowType: signInDetails?.authFlowType,
        }
      }

      getAuthenticatedUser()
        .then((user: any) =>
          updatePassword({ oldPassword: old_password, newPassword: password }),
        )
        .then((data: any) => {
          log.debug('changePassword.data', data)
          message
            .success(labels.done, 2)
            .then(() => message.info(labels.wait, 2))
            .then(() => message.info(labels.logout_in_progress, 1))

          setTimeout(() => {
            onCancel()
            onLogout()
          }, 5000)
        })
        .catch((error: any) => {
          log.error('changePassword.error', error)
          message.error(_.get(error, 'message', ''), 5)
        })

      onCancel()
    }
  }

  return (
    <WarningSubmitModal
      titleText='data.users.profile.change_password'
      subtitleContent={
        <StyledRow align='middle' style={{ marginTop: 20 }}>
          <Col span={20}>
            <Text>
              <FormattedMessage id='data.users.profile.change_password.subtitle_desc' />
            </Text>
            <br />
            <br />
            <Text>
              <FormattedMessage id='data.users.profile.change_password.subtitle_warning' />
            </Text>
          </Col>
        </StyledRow>
      }
      modal={modal}
      width={650}
      onSubmit={onSubmit}
      onCancel={onCancel}
      okText='data.users.profile.change_password.confirm'
    >
      <StyledRow align='middle' style={{ marginTop: 20 }}>
        <Col span={2} />
        <Col span={20}>
          <FieldInput
            type='password'
            required
            name='old_password'
            label='data.users.profile.change_password.insert_password'
          />

          <Separator withText='data.users.profile.change_password.new_password' />
          <FieldInput
            type='password'
            required
            name='password'
            label='data.users.profile.change_password.insert_new_password'
          />
          <FieldInput
            type='password'
            required
            name='repeat_password'
            label='data.users.profile.change_password.repeat_password'
          />
          <Alert
            type='info'
            message={intl.formatMessage({
              id: 'ui.login.signin.password_info',
            })}
          />
        </Col>
      </StyledRow>
    </WarningSubmitModal>
  )
})

export default ChangePasswordModal
