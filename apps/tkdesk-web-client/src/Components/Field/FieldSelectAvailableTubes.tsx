import _ from 'lodash'
import FieldRangeSelect from './FieldRangeSelect'

const FieldSelectAvailableTubes = (props: {
  name: string
  mode?: string
  options: any
  span?: any
  overrideOnChange?: any
  disabled?: boolean
  label: string
  required?: boolean
  validate?: any
}) => {
  const {
    name,
    mode,
    options,
    span,
    overrideOnChange,
    disabled = false,
    label,
    required = false,
    validate,
  } = props

  return (
    <FieldRangeSelect
      required={required}
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      label={label}
      options={options}
      name={name}
      mode={mode}
      unlocalizeMessage
      allowClear={false}
      span={span}
      disabled={disabled}
      validate={_.isNil(validate) ? null : validate}
      overrideOnChange={
        _.isNil(overrideOnChange)
          ? (value: any, { field, form }: any) => {
              const { setFieldValue } = form
              const { name } = field
              setFieldValue(`${name}.value`, Number(value), false)
            }
          : overrideOnChange
      }
    />
  )
}

export default FieldSelectAvailableTubes
