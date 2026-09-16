import _ from 'lodash'
import FieldRangeSelect from './FieldRangeSelect'
import rawPhaseType from 'Localization/Constants/phase_types.json'

const FieldSelectPhaseType = (props: {
  name: string
  mode?: string
  required?: boolean
  span?: any
  overrideOnChange?: any
}) => {
  const { name, span, mode, required = false, overrideOnChange } = props

  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      prefix='select.fan_models.phase_type.'
      placeholder='ui.fan_models.placholder_phase_type'
      options={rawPhaseType}
      required={required}
      name={name}
      mode={mode}
      span={span}
      label='data.fan_models.phase_type'
      overrideOnChange={_.isNil(overrideOnChange) ? null : overrideOnChange}
    />
  )
}

export default FieldSelectPhaseType
