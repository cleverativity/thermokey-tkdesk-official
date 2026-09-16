import { Col, Row } from 'antd'

import FieldCity from 'Components/Field/FieldCity'
import { FieldDatePicker } from 'Components/Field'

import SubmitModal from './SubmitModal'

const SubmitModalLocationDate = (props: {
  disabledDate: any
  [key: string]: any
}) => {
  const { disabledDate = null } = props
  return (
    <SubmitModal {...props}>
      <Row
        style={{ padding: '20px 0px 20px 0px' }}
        align='middle'
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col span={12}>
          <FieldCity
            required
            name='location'
            label='wallet.creation.complete.document_city'
          />
        </Col>
        <Col span={12}>
          <FieldDatePicker
            disabledDate={disabledDate}
            required
            name='date'
            label='wallet.creation.complete.document_date'
          />
        </Col>
      </Row>
    </SubmitModal>
  )
}

export default SubmitModalLocationDate
