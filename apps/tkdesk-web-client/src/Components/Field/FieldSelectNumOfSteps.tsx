import _ from 'lodash'

import FieldRangeSelect from './FieldRangeSelect'

const FieldSelectNumOfSteps = (props: any) => {
  const {
    name,
    required = false,
    span,
    disabled = false,
    overrideOnChange,
    ...other
  } = props
  const options = [{ key: 1 }, { key: 2 }, { key: 4 }]

  return (
    <FieldRangeSelect
      span={span}
      unlocalizeMessage
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      label='data.calculations.input_parameters.geom_type.n_of_steps'
      options={options}
      overrideOnChange={
        _.isNil(overrideOnChange)
          ? (value: any, { field, form }: any) => {
              const { setFieldValue } = form
              const { name } = field
              setFieldValue(`${name}.value`, Number(value), false)
            }
          : overrideOnChange
      }
      required={required}
      name={name}
      disabled={disabled}
      {...other}
    />
  )
}

export default FieldSelectNumOfSteps
