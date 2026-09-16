import * as R from 'ramda'
import { DatePicker } from 'antd'
import { useIntl } from 'react-intl'
import { useFormikContext } from 'formik'

import { FormikItem } from 'Components/Formik'
import styled from 'styled-components'
import dayjs from 'dayjs'

const { RangePicker } = DatePicker

const rawDataFormat = 'YYYY-MM-DD'

const FieldDateRangePicker = (props: any) => {
  const {
    name,
    disabledDate = null,
    defaultValue = null,
    overrideOnChange,
    ...other
  } = props
  const intl = useIntl()
  const { locale } = intl
  const formikContext: any = useFormikContext()

  const userDataFormat = locale === 'it-IT' ? 'DD/MM/YYYY' : 'MM/DD/YYYY'

  const rawValue: any = R.propOr(null, name, formikContext.values)

  const parsedValue: any =
    rawValue && rawValue.length === 2
      ? [dayjs(rawValue[0]), dayjs(rawValue[1])]
      : null

  const onChange = !R.isNil(overrideOnChange)
    ? (dates: any) => {
        if (dates) {
          const [from, to] = dates
          overrideOnChange([from, to], formikContext)
        } else {
          overrideOnChange([], formikContext)
        }
      }
    : (dates: any) => {
        if (dates) {
          const [from, to] = dates
          formikContext.setFieldValue(name, [
            from.format(rawDataFormat),
            to.format(rawDataFormat),
          ])
        } else {
          formikContext.setFieldValue(name, dates)
        }
      }

  return (
    <FormikItem name={name} {...other}>
      <StyledDateRangePicker
        onChange={onChange}
        format={userDataFormat}
        disabledDate={disabledDate}
        value={parsedValue}
      />
    </FormikItem>
  )
}

const StyledDateRangePicker = styled(RangePicker)`
  width: 100%;
`

export default FieldDateRangePicker
