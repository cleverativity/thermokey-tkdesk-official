import { Col } from 'antd'
import dayjs from 'dayjs'
import { FormattedMessage } from 'react-intl'
import { connect } from 'formik'

import { FieldDateRangePicker } from 'Components/Field'
import SubmitModal from 'Components/Modal/SubmitModal'
import { StyledRow } from 'Components/Styled'

const DownloadSolveReport = connect((props: any) => {
  const { onCancel, modal, onExportSolveReport } = props

  const disabledDate = (current: any) => {
    const startLimit = dayjs('2025-06-01')

    return current && (current < startLimit || current > dayjs().endOf('day'))
  }

  const onSubmit = (values: any, frk: any) => {
    const { date_period } = values

    onExportSolveReport(date_period)
    onCancel()
  }

  return (
    <SubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title='data.calculations.export_data.solve'
      okText='data.calculations.export_data'
    >
      <StyledRow>
        <Col>
          <FormattedMessage id='data.calculations.export_data.solve.modal' />
        </Col>
      </StyledRow>

      <FieldDateRangePicker
        name='date_period'
        disabledDate={disabledDate}
        required
        hideRequired
      />
    </SubmitModal>
  )
})

export default DownloadSolveReport
