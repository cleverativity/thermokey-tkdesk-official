import _ from 'lodash'
import FieldRangeSelect from './FieldRangeSelect'

const FieldSelectFrequency = (props: {
  name: string
  mode?: string
  required?: boolean
  span?: any
  overrideOnChange?: any
  [key: string]: any
}) => {
  const {
    name,
    span,
    mode,
    required = false,
    overrideOnChange,
    ...other
  } = props

  return (
    <FieldRangeSelect
      {...other}
      unlocalizeMessage
      label='data.fan_models.frequency'
      placeholder='ui.generic.placeholder'
      options={[{ key: 50 }, { key: 60 }]}
      required={required}
      name={name}
      mode={mode}
      span={span}
      overrideOnChange={_.isNil(overrideOnChange) ? null : overrideOnChange}
    />
  )
}

export default FieldSelectFrequency
