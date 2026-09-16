import { connect } from 'formik'
import { Col, Typography } from 'antd'

import SubmitModal from 'Components/Modal/SubmitModal'
import { StyledRow } from 'Components/Styled'
import { FieldDatePicker } from 'Components/Field'
import { FormattedMessage } from 'react-intl'
import dayjs from 'dayjs'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/Users/modal/EditValidityModal')
const { Text } = Typography

const EditValidityModal = connect((props: any) => {
  const { onCancel, modal, formik, onChangeValidity } = props

  const onSubmit = (values: any, frk: any) => {
    log.info('EditValidityModal.onSubmit', { values, frk, props })

    const { user } = values
    log.info('EditValidityModal.onSubmit body', { ...user })
    onChangeValidity({ ...user })
    onCancel()
  }

  return (
    <SubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title='data.users.edit_validity'
    >
      <StyledRow style={{ marginBottom: 15 }}>
        <Col span={24}>
          <Text>
            <FormattedMessage id='data.users.edit_validity_modal_text' />
          </Text>
        </Col>
      </StyledRow>
      <StyledRow>
        <FieldDatePicker
          disabledDate={(date: any) =>
            date.isBefore(dayjs().subtract(1, 'day'))
          }
          span={12}
          required
          label='data.users.expiration_date'
          name='user.expiration_date'
        />
      </StyledRow>
    </SubmitModal>
  )
})

export default EditValidityModal
