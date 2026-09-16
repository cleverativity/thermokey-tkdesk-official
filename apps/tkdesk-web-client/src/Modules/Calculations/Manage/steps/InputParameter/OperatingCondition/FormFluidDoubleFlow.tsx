import _ from 'lodash'
import { useFormikContext } from 'formik'

import { useAuthorization } from 'Modules/App/Authorization'

import { StyledRow, StyledSeparator } from 'Components/Styled'
import {
  FieldDecimalNumber,
  FieldDecimalNumberSelect,
  FieldSelectFluidType,
} from 'Components/Field'

import rawSaturationTempModes from 'Localization/Constants/saturation_temp_modes.json'
import rawRefrigerantsEnabledSelect from 'Localization/Constants/refrigerants_enabled_select.json'

import * as F from './functions'

const LIQUID = ['water', 'propylene', 'ethylene']
const EXLUDED_FLUIDS = [
  'water',
  'propylene',
  'ethylene',
  'r410a',
  'r452a',
  'r454a',
  'r454b',
  'r454c',
  'r455a',
]

const FormFluidDoubleFlow = ({ user_type, refrigerants, use_case }: any) => {
  const { values, setFieldValue } = useFormikContext()
  const autho = useAuthorization()

  const isRW = use_case === 'double_flow_rw'
  const fluid_c1 = _.get(values, 'input_data.fluid_c1.value', '')

  const enabledRefrigerants = F.getEnabledRefrigerants(refrigerants, user_type)

  const availableFluidOptions = isRW
    ? _.filter(
        enabledRefrigerants,
        ({ name }) => !_.includes(EXLUDED_FLUIDS, name), // tutta la lista dei refrigeranti abilitati, tranne R410a, R452a, R454a, R454b, R454C, R455a, acqua, propylene e ethylene
      )
    : _.filter(enabledRefrigerants, ({ name }) => _.includes(LIQUID, name))

  const secondaryFluidOptions = _.filter(enabledRefrigerants, ({ name }) =>
    _.includes(LIQUID, name),
  )

  const minMaxGlycolPercentage = autho.iAmOem ? { min: 25, max: 50 } : {}

  const handleFluidChange = (
    value: string,
    { field }: any,
    isPrimary: boolean,
  ) => {
    setFieldValue(`${field.name}.value`, value, false)

    if (isRW && isPrimary && !_.includes(rawRefrigerantsEnabledSelect, value)) {
      setFieldValue('input_data.saturation_title_c1.value', 'ave', false)
    }

    if (value === 'water') {
      setFieldValue(
        `input_data.glycol_percentage_${isPrimary ? 'c1' : 'c2'}.value`,
        null,
        false,
      )
    }
  }

  const renderSection = (fluidKey: 'c1' | 'c2', isPrimary: boolean) => {
    const fluidValue: string = _.get(
      values,
      `input_data.fluid_${fluidKey}.value`,
      '',
    )

    return (
      <>
        <StyledSeparator
          withText={`ui.coils.microchannel.steps.input_parameters.entry_conditions.${isPrimary ? 'fluid_primary' : 'fluid_secondary'}`}
        />
        <StyledRow>
          <FieldSelectFluidType
            required
            span={{ sm: 24, lg: 12, xl: 4 }}
            name={`input_data.fluid_${fluidKey}`}
            label='data.calculations.input_parameters.entry_conditions.fluid_type'
            fluidTypes={
              isRW && !isPrimary ? secondaryFluidOptions : availableFluidOptions
            }
            overrideOnChange={(value: string, formik: any) =>
              handleFluidChange(value, formik, isPrimary)
            }
          />
          {(!isRW || !isPrimary) && (
            <FieldDecimalNumber
              required={fluidValue !== 'water'}
              disabled={fluidValue === 'water'}
              span={{ sm: 24, lg: 12, xl: 6 }}
              name={`input_data.glycol_percentage_${fluidKey}`}
              scale={0}
              label='data.calculations.input_parameters.entry_conditions.glycol_percentage'
              {...minMaxGlycolPercentage}
            />
          )}
          {isRW && isPrimary && (
            <FieldDecimalNumberSelect
              required
              span={{ sm: 24, lg: 12, xl: 6 }}
              scale={1}
              name='input_data.saturation_temperature_c1'
              label='data.calculations.input_parameters.entry_conditions.saturation_temperature'
              optionsBefore={rawSaturationTempModes}
              nameBefore='input_data.saturation_title_c1'
              disabledBefore={
                !_.includes(rawRefrigerantsEnabledSelect, fluid_c1)
              }
            />
          )}
          <FieldDecimalNumber
            required
            span={{ sm: 24, lg: 12, xl: 6 }}
            name={`input_data.inlet_temperature_${fluidKey}`}
            scale={1}
            label='data.calculations.input_parameters.entry_conditions.inlet_temperature_condenser'
          />
          <FieldDecimalNumber
            required
            span={{ sm: 24, lg: 12, xl: 6 }}
            name={`input_data.${fluidKey === 'c1' ? (isRW ? 'flow_rate_kgh_c1' : 'flow_rate_m3h_c1') : 'flow_rate_m3h_c2'}`}
            label='data.calculations.input_parameters.entry_conditions.flow_rate'
            scale={fluidKey === 'c1' ? 0 : undefined}
          />
        </StyledRow>
      </>
    )
  }

  return (
    <>
      {renderSection('c1', true)}
      {renderSection('c2', false)}
    </>
  )
}

export default FormFluidDoubleFlow
