import _ from 'lodash'
import { useFormikContext } from 'formik'

import { useAuthorization } from 'Modules/App/Authorization'

import { StyledRow, StyledSeparator } from 'Components/Styled'
import {
  FieldDecimalNumber,
  FieldDecimalNumberSelect,
  FieldRangeSelect,
  FieldSelectFluidType,
  FieldSolveMode,
  FieldSwitch,
} from 'Components/Field'

import rawSaturationTempModes from 'Localization/Constants/saturation_temp_modes.json'
import rawRefrigerantsEnabledSelect from 'Localization/Constants/refrigerants_enabled_select.json'

import * as F from './functions'
import { Col, Space } from 'antd'

const LIQUID = ['water', 'propylene', 'ethylene']

const FormFluidFreeCooling = ({ userType, refrigerants }: any) => {
  const autho = useAuthorization()
  const formik = useFormikContext()
  const { values } = formik

  const glycolPercentage = _.get(
    values,
    'input_data.c1.glycol_percentage',
    null,
  )
  const fluid_c2 = _.get(values, 'input_data.c2.fluid.value', null)

  const is_fluid_c2_inlet_mode_temperature: boolean = _.isEqual(
    _.get(values, 'input_data.c2.fluid_inlet_mode.value', 'temperature'),
    'temperature',
  )
  const is_fluid_c2_outlet_mode_temperature: boolean = _.isEqual(
    _.get(values, 'input_data.c2.fluid_outlet_mode.value', 'temperature'),
    'temperature',
  )

  const enabledRefrigerants = F.getEnabledRefrigerants(refrigerants, userType)

  const isSpecificRefrigerant = _.includes(
    rawRefrigerantsEnabledSelect,
    fluid_c2,
  )

  const options = _.filter(
    enabledRefrigerants,
    (refrigerant: { name: string; visibility: string[] }) => {
      const fluidName = _.get(refrigerant, 'name')
      if (!_.includes(LIQUID, fluidName)) {
        return false
      }
      return true
    },
  )

  const newFluidTypes = _.filter(
    enabledRefrigerants,
    (refrigerant: { name: string; visibility: string[] }) => {
      const fluidName = _.get(refrigerant, 'name')
      if (_.includes(LIQUID, fluidName)) {
        return false
      }
      return true
    },
  )

  const minMaxGlycolPercentage = autho.iAmOem ? { min: 25, max: 50 } : {}

  const handlePrimaryOverrideOnChange = (
    value: string,
    { field, form }: { field: any; form: any },
  ) => {
    const { setFieldValue } = form

    setFieldValue(`${field.name}.value`, value, false)

    if (value === 'water' && !_.isNil(glycolPercentage)) {
      setFieldValue('input_data.c1.glycol_percentage.value', null, false)
    }
  }

  const handleSecondaryOverrideOnChange = (
    value: string,
    { field, form }: { field: any; form: any },
  ) => {
    const { setFieldValue } = form

    setFieldValue(`${field.name}.value`, value, false)

    if (!_.includes(rawRefrigerantsEnabledSelect, value)) {
      setFieldValue('input_data.c2.saturation_title.value', 'ave', false)
    }
  }

  const renderSection = (coreKey: string) => {
    const isFirstCore = coreKey === 'c1'

    const mode: string = _.get(
      values,
      `input_data.${coreKey}.mode.value`,
      'verify',
    )
    const enabled = _.get(values, `input_data.${coreKey}.enabled.value`, false)
    const fluid: string = _.get(values, `input_data.${coreKey}.fluid.value`, '')

    return (
      <>
        <StyledSeparator
          withText={`ui.coils.microchannel.steps.input_parameters.entry_conditions.${isFirstCore ? 'liquid' : 'fluid_refrigerant'}`}
          actions={
            <FieldSolveMode
              name={`input_data.${coreKey}.mode`}
              options={[
                {
                  label: 'Design',
                  value: 'design',
                },
                {
                  label: 'Verify',
                  value: 'verify',
                },
              ]}
              tooltip='data.calculations.input_parameters.solve_mode'
              required={enabled}
              disabled={!enabled}
            />
          }
        />

        <StyledRow>
          <FieldSwitch
            span={{ sm: 24, lg: 12, xl: 2 }}
            name={`input_data.${coreKey}.enabled`}
            label='data.calculations.input_parameters.entry_conditions.battery_status'
            overrideOnChange={(
              value: boolean,
              { field, form }: { field: any; form: any },
            ) => {
              const { setFieldValue } = form
              const { name } = field
              setFieldValue(`${name}.value`, value)
              if (!value) {
                setFieldValue(`input_data.${coreKey}.mode.value`, null)
                setFieldValue(`input_data.${coreKey}.fluid.value`, null)
                // setFieldValue(`input_data.${coreKey}.inlet_temperature.value`, null)

                if (isFirstCore) {
                  setFieldValue('input_data.c1.glycol_percentage.value', null)
                  setFieldValue('input_data.c1.flow_rate_m3h.value', null)
                } else {
                  setFieldValue(
                    'input_data.c2.saturation_temperature.value',
                    null,
                  )
                  setFieldValue('input_data.c2.inlet_temperature.value', null)
                  setFieldValue('input_data.c2.flow_rate_kgh.value', null)
                }
              }
            }}
          />

          <FieldSelectFluidType
            span={{ sm: 24, lg: 12, xl: 4 }}
            required={enabled}
            disabled={!enabled}
            name={`input_data.${coreKey}.fluid`}
            label='data.calculations.input_parameters.entry_conditions.fluid_type'
            fluidTypes={isFirstCore ? options : newFluidTypes}
            overrideOnChange={
              isFirstCore
                ? handlePrimaryOverrideOnChange
                : handleSecondaryOverrideOnChange
            }
          />

          {isFirstCore ? (
            <>
              <FieldDecimalNumber
                span={{ sm: 24, lg: 12, xl: 6 }}
                required={fluid !== 'water' && enabled}
                disabled={fluid === 'water' || !enabled}
                name='input_data.c1.glycol_percentage'
                label='data.calculations.input_parameters.entry_conditions.glycol_percentage'
                scale={0}
                {...minMaxGlycolPercentage}
              />
              <FieldDecimalNumber
                span={{ sm: 24, lg: 12, xl: 6 }}
                required={enabled}
                disabled={!enabled}
                name={`input_data.c1.inlet_temperature`}
                scale={1}
                label='data.calculations.input_parameters.entry_conditions.inlet_temperature'
              />
              {mode === 'design' ? (
                <FieldDecimalNumber
                  span={{ sm: 24, lg: 12, xl: 6 }}
                  required
                  name='input_data.c1.outlet_temperature'
                  label='data.calculations.input_parameters.entry_conditions.outlet_temperature_c1'
                  scale={1}
                />
              ) : (
                <FieldDecimalNumber
                  span={{ sm: 24, lg: 12, xl: 6 }}
                  name='input_data.c1.flow_rate_m3h'
                  required={enabled}
                  disabled={!enabled}
                  label='data.calculations.input_parameters.entry_conditions.flow_rate'
                />
              )}
            </>
          ) : (
            <>
              <FieldDecimalNumberSelect
                span={{ sm: 24, lg: 12, xl: 6 }}
                required={enabled}
                disabled={!enabled}
                name='input_data.c2.saturation_temperature'
                label='data.calculations.input_parameters.entry_conditions.saturation_temperature'
                scale={1}
                nameBefore='input_data.c2.saturation_title'
                optionsBefore={rawSaturationTempModes}
                disabledBefore={!enabled || !isSpecificRefrigerant}
              />

              <Col sm={24} lg={12} xl={6}>
                <Space.Compact>
                  <FieldRangeSelect
                    style={{ minWidth: 150 }}
                    disabled={!enabled}
                    allowClear={false}
                    name='input_data.c2.fluid_inlet_mode'
                    optionKeyPath={['key']}
                    optionMessagePath={['label']}
                    options={[
                      {
                        label:
                          'data.calculations.input_parameters.entry_conditions.inlet_temperature',
                        value: 'temperature',
                      },
                      {
                        label:
                          'data.calculations.input_parameters.entry_conditions.delta_inlet_temperature_c1',
                        value: 'delta_temperature',
                      },
                    ]}
                  />
                  {is_fluid_c2_inlet_mode_temperature ? (
                    <FieldDecimalNumber
                      scale={1}
                      required={enabled}
                      disabled={!enabled}
                      name={`input_data.c2.inlet_temperature`}
                      label='data.calculations.input_parameters.entry_conditions.inlet_temperature'
                    />
                  ) : (
                    <FieldDecimalNumber
                      scale={1}
                      required={enabled}
                      disabled={!enabled}
                      name={`input_data.c2.delta_inlet_temperature`}
                      label='data.calculations.input_parameters.entry_conditions.delta_inlet_temperature_c1'
                    />
                  )}
                </Space.Compact>
              </Col>

              {mode === 'design' ? (
                <Space.Compact>
                  <FieldRangeSelect
                    style={{
                      flex: '0 0 auto',
                      minWidth: 150,
                    }}
                    noIntl
                    allowClear={false}
                    name='input_data.c2.fluid_outlet_mode'
                    optionKeyPath={['key']}
                    optionMessagePath={['label']}
                    options={[
                      {
                        label: 'Outlet Temp.',
                        value: 'temperature',
                      },
                      {
                        label: 'Subcooling',
                        value: 'delta_temperature',
                      },
                    ]}
                  />
                  {is_fluid_c2_outlet_mode_temperature ? (
                    <FieldDecimalNumber
                      required
                      name='input_data.c2.outlet_temperature'
                      label='data.calculations.input_parameters.entry_conditions.outlet_temperature_c1'
                      scale={1}
                    />
                  ) : (
                    <FieldDecimalNumber
                      required
                      name='input_data.c2.delta_temperature'
                      label='data.calculations.input_parameters.entry_conditions.delta_temperature_c1'
                      scale={1}
                    />
                  )}
                </Space.Compact>
              ) : (
                <FieldDecimalNumber
                  span={{ sm: 24, lg: 12, xl: 6 }}
                  required={enabled}
                  disabled={!enabled}
                  scale={0}
                  name='input_data.c2.flow_rate_kgh'
                  label='data.calculations.input_parameters.entry_conditions.flow_rate'
                />
              )}
            </>
          )}
        </StyledRow>
      </>
    )
  }

  return (
    <>
      {renderSection('c1')}
      {renderSection('c2')}
    </>
  )
}

export default FormFluidFreeCooling
