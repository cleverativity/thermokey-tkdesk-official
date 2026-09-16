import _ from 'lodash'
import FieldRangeSelect from './FieldRangeSelect'
import rawTrueFalse from 'Localization/Constants/true_false.json'

const FieldTrueFalse = (props: {
  name: string
  label: string
  mode?: string
  required?: boolean
  span?: number
  overrideOnChange?: any
}) => {
  const { name, span, mode, label, required = false, overrideOnChange } = props

  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      prefix='select.generic.trueFalse.'
      placeholder='ui.generic.placeholder'
      options={rawTrueFalse}
      required={required}
      name={name}
      mode={mode}
      span={span}
      label={label}
      overrideOnChange={_.isNil(overrideOnChange) ? null : overrideOnChange}
    />
  )
}

export default FieldTrueFalse
