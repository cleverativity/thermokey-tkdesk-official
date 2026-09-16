import _ from 'lodash'
import { connect } from 'formik'
import { Col, Typography } from 'antd'

import SubmitModal from 'Components/Modal/SubmitModal'
import { StyledRow } from 'Components/Styled'
import { FieldSelectOrderStatus } from 'Components/Field'
import { FormattedMessage } from 'react-intl'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/Users/modal/EditValidityModal')
const { Text } = Typography

const ChangeStatusModal = connect((props: any) => {
  const { onCancel, modal, formik, onChangeStatus } = props

  const { id: order_id } = modal
  const onSubmit = (values: any, frk: any) => {
    log.info('ChangeStatusModal.onSubmit', { values, frk, props })

    const { objStatus } = values
    onChangeStatus({
      id: order_id,
      status: _.get(objStatus, `status_${order_id}`),
    })
  }

  return (
    <SubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title='data.orders.change_status'
    >
      <StyledRow style={{ marginBottom: 15 }}>
        <Col span={24}>
          <FormattedMessage id='data.orders.change_status_modal_text' />{' '}
          <Text code>{order_id}</Text>.
        </Col>
      </StyledRow>
      <StyledRow>
        <FieldSelectOrderStatus
          span={12}
          required
          name={`objStatus.status_${order_id}`}
        />
      </StyledRow>
      <StyledRow>
        <Col span={24}>
          <FormattedMessage id='data.orders.change_status_modal_subtext' />
        </Col>
      </StyledRow>
    </SubmitModal>
  )
})

export default ChangeStatusModal
