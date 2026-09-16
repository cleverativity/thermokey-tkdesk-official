import { ConsoleLogger } from 'aws-amplify/utils'
import { FieldUnitInput } from 'Components/Field'
import { StyledRow } from 'Components/Styled'
import { useFormikContext } from 'formik'
import { useUnitMeasureField } from 'Modules/Selections/units/shared/variableUnitField'
import {
  currentSystemUnitName,
  storedUnitName,
} from './CompactUnitField'

interface CapacityCalculationProps {
  data?: any
  selectedItem?: string
  unitTypes?: string
}

const TEMP_UNITS = { si: 32, ip: 33 }
const DISTANCE_UNITS = { si: 1, ip: 3 }
const SECTION = 'energy_analysis_calc_capacity'

function CapacityCalculation(props: CapacityCalculationProps) {
  const { data, unitTypes } = props
  const { values, setFieldValue } = useFormikContext<any>()
  const log = new ConsoleLogger(
    'Model/Selections/CapacityCalculation/ConsoleLogger',
  )
  log.info('CapacityCalculation', data)

  const startingAirTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'starting_air_temp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'ea.startingAirTemp',
    unitField: 'ea.startingAirTempType',
    defaultValue: 25,
    defaultUnitIds: TEMP_UNITS,
  })
  const finalAirTemp = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'final_air_temp',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'ea.capacity_calc_finalAirTemp',
    unitField: 'ea.capacity_calc_finalAirTempType',
    defaultValue: 0,
    defaultUnitIds: TEMP_UNITS,
  })
  const step = useUnitMeasureField({
    query: {
      product: 'condenser',
      step: 'Model detail',
      section: SECTION,
      variable: 'step',
    },
    values,
    setFieldValue,
    unitTypes,
    valueField: 'ea.step',
    unitField: 'ea.stepType',
    defaultValue: 10,
    defaultUnitIds: TEMP_UNITS,
    asDelta: true,
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
          span={{ sm: 12, md: 12, lg: 8 }}
          labelId='data.thermal.performance.energy_analysis_field.starting_air_temp'
          field={startingAirTemp}
          valueName='ea.startingAirTemp'
          unitName='ea.startingAirTempType'
        />
        <FieldUnitInput
          unitSelectWidth={128}
          span={{ sm: 12, md: 12, lg: 8 }}
          labelId='data.thermal.performance.energy_analysis_field.final_air_temp'
          field={finalAirTemp}
          valueName='ea.capacity_calc_finalAirTemp'
          unitName='ea.capacity_calc_finalAirTempType'
        />
        <FieldUnitInput
          unitSelectWidth={128}
          span={{ sm: 12, md: 12, lg: 8 }}
          labelId='data.thermal.performance.energy_analysis_field.step'
          field={step}
          valueName='ea.step'
          unitName='ea.stepType'
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

export default CapacityCalculation
