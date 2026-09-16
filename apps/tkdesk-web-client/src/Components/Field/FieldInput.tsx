import _ from 'lodash'
import { Input } from 'antd'
import { FormikField } from '../Formik'
import { useEffect } from 'react'
import { useFormikContext } from 'formik'

interface FieldInputProps {
  transformTo?:
    ((value: string | number | undefined) => string | number | undefined) | any
  prefix?: any
  suffix?: any
  style?: React.CSSProperties
  [key: string]: any
}

const FieldInput = (props: FieldInputProps) => {
  const {
    transform = null,
    transformTo = null,
    prefix = <span />,
    suffix = <span />,
    defaultValue = null,
    name = null,
    style = {},
    ...other
  } = props

  const { setFieldValue } = useFormikContext()
  useEffect(() => {
    if (defaultValue) {
      setFieldValue(name, defaultValue)
    }
  }, [defaultValue])

  const transformFunction = _.isNil(transformTo) ? null : transformTo

  // For Ant Design v5, use 'styles' prop to style the inner input element
  // This ensures textAlign and other styles are applied to the actual input
  const inputStyles = {
    input: style,
  }

  return (
    <FormikField
      {...other}
      name={name}
      prefix={prefix}
      suffix={suffix}
      transformTo={transformFunction}
      disableCustomOnChange
      component={Input}
      defaultValue={defaultValue}
      styles={inputStyles}
    />
  )
}

export default FieldInput
