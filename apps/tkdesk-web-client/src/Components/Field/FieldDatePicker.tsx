import _ from 'lodash'
import { Field } from 'formik'
import { DatePicker, Form } from 'antd'
import { useIntl } from 'react-intl'
import { makeSpannable } from 'Components/Layout/SpannableCol'
import { composeValidate, requiredValidate } from './ValidateFunctions'
import styled from 'styled-components'
import dayjs from 'dayjs'

const AntdFormItem = Form.Item

const rawDataFormat = 'YYYY-MM-DD'
const userDataFormat = 'DD/MM/YYYY'
const userDataPlaceholder = 'DD/MM/AAAA'

interface DatePickerProps {
  name: string
  label: string
  required?: boolean
  validate: any
  data?: string
  [key: string]: any
}

const CustomDatePicker = (props: DatePickerProps) => {
  const intl = useIntl()
  const { name, label, required = false, validate, ...other } = props

  const { locale } = intl

  let customValidate = validate

  if (required) {
    customValidate = composeValidate(requiredValidate, validate)
  }

  return (
    <Field name={name} validate={customValidate}>
      {({ field, form }: { field: any; form: any }) => {
        const { value } = field
        const { errors, touched, submitCount, setFieldValue, setFieldTouched } =
          form

        const isTouched = _.get(touched, name, false)
        const hasError = _.has(errors, name)
        const showError = hasError && (isTouched || submitCount > 0)

        const errorMessage = showError
          ? intl.formatMessage({ id: _.get(errors, name) })
          : ''

        const onChange = (event: any) => {
          if (event) {
            const date = dayjs(event)
            setFieldValue(name, date.format(rawDataFormat))
          }
        }

        let newValue = value
        if (typeof value === 'string') {
          newValue = dayjs(value)
        }

        return (
          <AntdFormItem
            required={required}
            colon={false}
            hasFeedback={false}
            help={errorMessage}
            label={label ? intl.formatMessage({ id: label }) : undefined}
            validateStatus={showError ? 'error' : hasError ? '' : 'success'}
          >
            <div id={name}>
              <StyledDatePicker
                {...other}
                data-cy={`cy.${name}`}
                format={userDataFormat}
                placeholder={userDataPlaceholder}
                value={newValue}
                // onBlur={onBlur}
                onChange={onChange}
              />
            </div>
          </AntdFormItem>
        )
      }}
    </Field>
  )
}

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`

export default makeSpannable(CustomDatePicker)
