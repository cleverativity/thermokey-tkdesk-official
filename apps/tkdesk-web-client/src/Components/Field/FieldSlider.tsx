import _ from 'lodash'
import { Slider } from 'antd'
import { useFormikContext } from 'formik'

import { FormikItem } from 'Components/Formik'

const FieldSlider = (props: any) => {
  const {
    name,
    range = true,
    step = 10,
    min,
    max,
    onChangeComplete,
    ...other
  } = props
  const { values, setFieldValue } = useFormikContext()

  const value: any = _.get(values, name, [min, max])

  const sliderValue = Array.isArray(value) ? value : [value.from, value.to]

  const handleChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setFieldValue(name, { from: newValue[0], to: newValue[1] })
    }
  }

  return (
    <FormikItem name={name} {...other}>
      <Slider
        range={range}
        step={step}
        min={min}
        max={max}
        value={sliderValue}
        onChange={handleChange}
        onChangeComplete={onChangeComplete}
      />
    </FormikItem>
  )
}

export default FieldSlider
