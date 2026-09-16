import _ from 'lodash'
import FieldRangeSelect from './FieldRangeSelect'
import rawFanType from 'Localization/Constants/fan_types.json'

const FieldSelectFanType = (props: {
  name: string
  required?: boolean
  span?: any
  overrideOnChange?: any
}) => {
  const { name, span, required = false, overrideOnChange } = props

  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      placeholder='ui.fan_models.placholder_fan_type'
      options={rawFanType}
      required={required}
      name={name}
      span={span}
      label='data.fan_models.fan_type'
      prefix='select.fan_models.fan_type.'
      showSearch
      overrideOnChange={_.isNil(overrideOnChange) ? null : overrideOnChange}
    />
  )
}

export default FieldSelectFanType
