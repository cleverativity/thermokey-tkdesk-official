import _ from 'lodash'
import FieldRangeSelect from './FieldRangeSelect'
import rawMacroSeries from 'Localization/Constants/macro_series.json'

const FieldSelectMacroSeries = (props: {
  name: string
  mode?: string
  span?: number
  required?: boolean
  hideRequired?: boolean
  overrideOnChange?: any
}) => {
  const {
    name,
    mode,
    span,
    required = false,
    hideRequired = false,
    overrideOnChange,
  } = props

  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      // prefix='select.coils.microchannel.use_case.'
      placeholder='ui.selections.steps.macro_series.placeholder'
      options={rawMacroSeries}
      required={required}
      hideRequired={hideRequired}
      name={name}
      mode={mode}
      span={span}
      overrideOnChange={_.isNil(overrideOnChange) ? null : overrideOnChange}
    />
  )
}

export default FieldSelectMacroSeries
