import _ from 'lodash'
import { Col, Typography } from 'antd'

import SubmitModal from 'Components/Modal/SubmitModal'
import { StyledRow } from 'Components/Styled'
import { FieldDatePicker } from 'Components/Field'
import { FormattedMessage } from 'react-intl'
import dayjs from 'dayjs'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/Users/modal/EditValidityModal')
const { Text } = Typography

const ConfirmActivateUser = (props: any) => {
  const { onCancel, modal, formik, onActivateUser } = props

  const user = _.get(modal, 'data.user', {})
  log.info('render.props', { props })
  const onSubmit = (values: any, frk: any) => {
    log.info('EditValidityModal.onSubmit', { values, frk, props })

    const { user } = values
    const { id, expiration_date } = user
    log.info('EditValidityModal.onSubmit body', { expiration_date, id })
    onActivateUser({ id, expiration_date })
    onCancel()
  }

  const modalTitle =
    _.get(user, 'status', 'active') === 'pending'
      ? 'data.users.activate_user'
      : 'data.users.reactivate_user'
  const modalText =
    _.get(user, 'status', 'active') === 'pending'
      ? 'data.users.activate_user_modal_text'
      : 'data.users.reactivate_user_modal_text'

  return (
    <SubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title={modalTitle}
    >
      <StyledRow style={{ marginBottom: 15 }}>
        <Col span={24}>
          <Text>
            <FormattedMessage id={modalText} />
          </Text>
        </Col>
      </StyledRow>
      <StyledRow>
        <FieldDatePicker
          disabledDate={(date: any) => date.isBefore(dayjs())}
          span={12}
          required
          label='data.users.expiration_date'
          name='user.expiration_date'
        />
      </StyledRow>
    </SubmitModal>
  )
}

export default ConfirmActivateUser
