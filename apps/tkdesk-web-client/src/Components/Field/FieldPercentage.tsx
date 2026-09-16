import FieldDecimalNumber from './FieldDecimalNumber'

const FieldPercentage = (props: any) => {
  return (
    <FieldDecimalNumber
      min={0}
      max={100}
      defaultValue={0}
      fast={false}
      addonAfter={'%'}
      // scale={0}
      {...props}
    />
  )
}

export default FieldPercentage
