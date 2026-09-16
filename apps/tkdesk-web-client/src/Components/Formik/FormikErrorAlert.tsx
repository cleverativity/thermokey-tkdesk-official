import { ComponentType } from 'react'
import { Alert } from 'antd'
import { Field, getIn } from 'formik'
import _ from 'lodash'
import { useIntl } from 'react-intl'

type FormikErrorAlertProps = {
  name: string
  validate: (args: any) => any
  style?: object
}

const FormikErrorAlert: ComponentType<FormikErrorAlertProps> = (props) => {
  const intl = useIntl()
  const { name, validate, style = {} } = props
  return (
    <Field name={name} validate={validate}>
      {({ form }: { form: any }) => {
        const { errors, touched, submitCount } = form

        const isTouched = getIn(touched, name) || false
        const hasError = _.has(errors, name)
        const error = getIn(errors, name)
        const showError = hasError && (isTouched || submitCount > 0)

        return showError && _.isString(error) ? (
          <Alert
            message={intl.formatMessage({ id: error })}
            type='error'
            style={style}
          />
        ) : null
      }}
    </Field>
  )
}

export default FormikErrorAlert
