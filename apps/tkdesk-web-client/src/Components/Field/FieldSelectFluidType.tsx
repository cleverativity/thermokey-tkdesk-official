import _ from 'lodash'
import FieldRangeSelect from './FieldRangeSelect'
import { connect } from 'react-redux'

interface Fluid {
  name: string
  visibility: string[]
}

const FieldSelectFluidType = (props: {
  name: string
  mode?: string
  label: string
  required?: boolean
  disabled?: boolean
  fluidTypes: Fluid[]
  span?: number
  overrideOnChange?: any
  data?: any
}) => {
  const {
    name,
    mode,
    label,
    required,
    disabled,
    fluidTypes,
    span,
    overrideOnChange,
    data: profile,
  } = props

  const language = _.get(profile, 'preferences.language', 'it')

  const newRawFluidTypesString = _.map(fluidTypes, (el) => {
    return _.get(el, 'name')
  })

  return (
    <FieldRangeSelect
      optionKeyPath={['name']}
      optionMessagePath={['name']}
      prefix='select.coils.microchannel.fluid_type.'
      label={label}
      showSearch
      options={fluidTypes}
      name={name}
      mode={mode}
      required={required}
      disabled={disabled}
      span={span}
      overrideOnChange={!_.isNil(overrideOnChange) ? overrideOnChange : null}
      validate={(el: any) => {
        if (
          !_.isNil(el.value) &&
          !_.includes(newRawFluidTypesString, el.value)
        ) {
          return 'data.generic.form.message.validation.fluid_c1'
        }
        return undefined
      }}
    />
  )
}

export default connect(
  (state: any, props: any) => ({ ...state.general.profile }),
  (dispatch) => ({}),
)(FieldSelectFluidType)
