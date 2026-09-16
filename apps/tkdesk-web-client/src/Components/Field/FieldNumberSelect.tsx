import _ from 'lodash'

import { FieldRangeSelect } from './index'

const FieldNumberSelect = (props: any) => {
  return (
    <FieldRangeSelect
      overrideOnChange={(value: any, { field, form }: any) => {
        const { setFieldValue } = form
        const { name } = field

        const parsedValue = Array.isArray(value)
          ? _.map(value, (v) => Number(v))
          : Number(value)

        setFieldValue(`${name}.value`, parsedValue, false)
      }}
      {...props}
    />
  )
}

export default FieldNumberSelect
