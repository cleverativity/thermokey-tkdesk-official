import { ConsoleLogger } from 'aws-amplify/utils'
import { FieldUnitInput } from 'Components/Field'
import { StyledRow } from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import {
  currentSystemUnitName,
  storedUnitName,
} from './CompactUnitField'

interface SingleCalculationProps {
  data?: any
  selectedItem?: string
  unitTypes?: string
}

const TEMP_UNITS = { si: 32, ip: 33 }
const DISTANCE_UNITS = { si: 1, ip: 3 }
const CAPACITY_UNITS = { si: 6, ip: 8 }
const SECTION = 'energy_analysis_calc_single'

function SingleCalculation(props: SingleCalculationProps) {
  const { data, unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()
  const log = new ConsoleLogger(
    'Model/Selections/SingleCalculation/ConsoleLogger',
  )
  log.info('SingleCalculation', data)

  const fixedCapacity = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'fixed_capacity',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'ea.currentFixCapacity',
    unitField: 'ea.currentFixCapacityType',
    defaultValue: data?.performance?.capacity || 0,
    defaultValueUnit: currentSystemUnitName(unitTypes, CAPACITY_UNITS),
    defaultUnitIds: CAPACITY_UNITS,
  })
  const inletAirTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'intel_air_temp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'ea.inletAirTemp',
    unitField: 'ea.inletAirTempType',
    defaultValue: 25,
    defaultUnitIds: TEMP_UNITS,
  })
  const distance = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'distance',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'ea.distance',
    unitField: 'ea.distanceType',
    defaultValue: data?.condenser?.distance || 0,
    defaultValueUnit:
      storedUnitName(values?.condenser?.distanceType) ??
      currentSystemUnitName(unitTypes, DISTANCE_UNITS),
    defaultUnitIds: DISTANCE_UNITS,
  })
  const condensingTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'condensing_temp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'ea.condensingTemp',
    unitField: 'ea.condensingTempType',
    defaultValue: data?.condenser?.condensing || 0,
    defaultValueUnit:
      storedUnitName(values?.condenser?.condensingType) ??
      currentSystemUnitName(unitTypes, TEMP_UNITS),
    defaultUnitIds: TEMP_UNITS,
  })

  return (
    <>
      <StyledRow
        gutter={[16, 16]}
        style={{
          width: '100%',
          paddingTop: '10px',
        }}
      >
        <FieldUnitInput
          unitSelectWidth={128}
          span={{ sm: 12, md: 12, lg: 12 }}
          labelId='data.thermal.performance.energy_analysis_field.fixed_capacity'
          field={fixedCapacity}
          valueName='ea.currentFixCapacity'
          unitName='ea.currentFixCapacityType'
        />
        <FieldUnitInput
          unitSelectWidth={128}
          span={{ sm: 12, md: 12, lg: 12 }}
          labelId='data.thermal.performance.energy_analysis_field.intel_air_temp'
          field={inletAirTemp}
          valueName='ea.inletAirTemp'
          unitName='ea.inletAirTempType'
        />
      </StyledRow>
      <StyledRow
        gutter={[16, 16]}
        style={{
          width: '100%',
        }}
      >
        <FieldUnitInput
          unitSelectWidth={128}
          span={{ sm: 12, md: 12, lg: 12 }}
          labelId='data.thermal.performance.energy_analysis_field.distance'
          field={distance}
          valueName='ea.distance'
          unitName='ea.distanceType'
        />
        <FieldUnitInput
          unitSelectWidth={128}
          span={{ sm: 12, md: 12, lg: 12 }}
          labelId='data.thermal.performance.energy_analysis_field.condensing_temp'
          field={condensingTemp}
          valueName='ea.condensingTemp'
          unitName='ea.condensingTempType'
        />
      </StyledRow>
    </>
  )
}

export default SingleCalculation
