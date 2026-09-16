import _ from 'lodash'
import { Col, Typography } from 'antd'

import { StyledRow } from 'Components/Styled'
import { FieldInput } from 'Components/Field'
import { FormattedMessage, useIntl } from 'react-intl'
import DangerSubmitModal from 'Components/Modal/DangerSubmitModal'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/Users/modal/EditValidityModal')
const { Text } = Typography

const ConfirmDeleteUser = (props: any) => {
  const { onCancel, modal, formik, onDeleteUser } = props

  const intl = useIntl()
  const user = _.get(modal, 'data.user', {})
  const { code, username } = user
  log.info('render.props', { props })

  const onSubmit = (values: any, frk: any) => {
    const { setFieldError } = frk

    log.info('EditValidityModal.onSubmit', { values, frk, props })

    const { user } = values
    const { id, code } = user

    const { repeat_code } = values

    if (repeat_code !== code) {
      setFieldError(
        'repeat_code',
        intl.formatMessage({ id: 'ui.generic.codes_not_match' }),
      )
    } else {
      log.info('EditValidityModal.onSubmit body', { id })
      onDeleteUser(id)
      onCancel()
    }
  }

  const modalTitle = 'data.users.delete_user'

  const modalText = 'data.users.delete_user_modal_text'

  return (
    <DangerSubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      subtitleContent={
        <Text>
          <FormattedMessage id='data.users.delete_user_modal_subtitle' />
          <code>{username}</code>?
        </Text>
      }
      titleText={modalTitle}
    >
      <StyledRow style={{ marginBottom: 10 }}>
        <Col span={24}>
          <Text style={{ marginTop: 20, display: 'block' }}>
            <FormattedMessage id={modalText} />
            <br />
            <code>{code}</code>
          </Text>
        </Col>
      </StyledRow>
      <StyledRow>
        <FieldInput
          span={24}
          placeholder={code}
          required
          name='repeat_code'
          hideLabel
          unlocalizedLabel
        />
      </StyledRow>
    </DangerSubmitModal>
  )
}

export default ConfirmDeleteUser
