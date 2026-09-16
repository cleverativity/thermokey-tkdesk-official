import rawSexes from 'Localization/Constants/sexes.json'
import { FieldRangeSelect } from './index'

const FieldSex = (props: any) => {
  return (
    <FieldRangeSelect
      {...props}
      prefix='select.generic.sex.'
      options={rawSexes}
    />
  )
}

export default FieldSex
