import _ from 'lodash'
import { Col, Space } from 'antd'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'
import { useAuthorization } from 'Modules/App/Authorization'

import { StyledRow, StyledSeparator } from 'Components/Styled'
import {
  FieldDecimalNumber,
  FieldDecimalNumberSelect,
  FieldRangeSelect,
  FieldSelectFluidType,
  FieldSolveMode,
} from 'Components/Field'

import rawSaturationTempModes from 'Localization/Constants/saturation_temp_modes.json'
import rawRefrigerantsEnabledSelect from 'Localization/Constants/refrigerants_enabled_select.json'

import * as F from './functions'

const FormFluidAirCooled = ({ user_type, refrigerants, geometries }: any) => {
  const intl = useIntl()
  const autho = useAuthorization()

  const formik = useFormikContext()
  const { values } = formik

  const mode: string = _.get(values, 'input_data.mode.value', 'verify')
  const fluid_c1 = _.get(values, 'input_data.fluid_c1.value', null)
  const saturation_temperature_c1 = _.get(
    values,
    'input_data.saturation_temperature_c1.value',
    null,
  )
  const delta_temperature_c1 = _.get(
    values,
    'input_data.delta_temperature_c1.value',
    null,
  )
  const inlet_temperature_air: any = _.get(
    values,
    'input_data.inlet_temperature_air.value',
    null,
  )

  const saturation_temperature_c1_validations: any = _.get(
    values,
    'input_data.saturation_temperature_c1.validations',
    null,
  )
  const inlet_temperature_air_validations: any = _.get(
    values,
    'input_data.inlet_temperature_air.validations',
    null,
  )
  const outlet_temperature_c1_validations: any = _.get(
    values,
    'input_data.outlet_temperature_c1.validations',
    null,
  )

  const { minimum: minSaturation, maximum: maxSaturation } =
    saturation_temperature_c1_validations || {}
  const { minimum: minInlet, maximum: maxInlet } =
    inlet_temperature_air_validations || {}
  const { minimum: minOutlet, maximum: maxOutlet } =
    outlet_temperature_c1_validations || {}

  const is_fluid_c1_inlet_mode_temperature: boolean = _.isEqual(
    _.get(values, 'input_data.fluid_c1_inlet_mode.value', 'temperature'),
    'temperature',
  )
  const is_fluid_c1_outlet_mode_temperature: boolean = _.isEqual(
    _.get(values, 'input_data.fluid_c1_outlet_mode.value', 'temperature'),
    'temperature',
  )

  const isSpecificRefrigerant = _.includes(
    rawRefrigerantsEnabledSelect,
    fluid_c1,
  )

  const enabledRefrigerants = F.getEnabledRefrigerants(refrigerants, user_type)

  const options = _.filter(
    enabledRefrigerants,
    (refrigerant: { name: string; visibility: string[] }) => {
      const fluidName = _.get(refrigerant, 'name')

      if (
        (_.includes(geometries, '2M') || _.includes(geometries, '3M')) &&
        (fluidName === 'water' ||
          fluidName === 'propylene' ||
          fluidName === 'ethylene')
      ) {
        return false
      }

      if (
        _.includes(geometries, '3N') &&
        fluidName !== 'r1234zez' &&
        fluidName !== 'r245fa' &&
        fluidName !== 'r1234ze'
      ) {
        return false
      }
      return true
    },
  )

  const minMaxSaturation = !_.isNil(inlet_temperature_air)
    ? {
        min: F.getValidationBound(
          Number(inlet_temperature_air) + 5,
          _.isNil(minSaturation) ? undefined : Number(minSaturation),
          _.isNil(minSaturation) ? undefined : Number(minSaturation),
          _.isNil(maxSaturation) ? undefined : Number(maxSaturation),
        ),
      }
    : {}

  const minMaxInlet = !_.isNil(saturation_temperature_c1)
    ? autho.iAmAdmin
      ? {
          min: F.getValidationBound(
            Number(saturation_temperature_c1) + 3,
            _.isNil(minInlet) ? undefined : Number(minInlet),
            _.isNil(minInlet) ? undefined : Number(minInlet),
            _.isNil(maxInlet) ? undefined : Number(maxInlet),
          ),
        }
      : {
          min: Number(saturation_temperature_c1) + 5,
        }
    : {}

  const minMaxDeltaInlet = !_.isNil(saturation_temperature_c1)
    ? autho.iAmAdmin
      ? {
          max: 200 - Number(saturation_temperature_c1),
        }
      : {
          max: 120 - Number(saturation_temperature_c1),
        }
    : {}

  const getMinMaxOutlet = (is_fluid_c1_outlet_mode_temperature: boolean) => {
    return !_.isNil(saturation_temperature_c1) && !_.isNil(delta_temperature_c1)
      ? {
          min: F.getValidationBound(
            Number(saturation_temperature_c1) -
              (is_fluid_c1_outlet_mode_temperature
                ? autho.iAmAdmin
                  ? 50
                  : 10
                : Number(delta_temperature_c1)),
            _.isNil(minOutlet) ? undefined : Number(minOutlet),
            _.isNil(minOutlet) ? undefined : Number(minOutlet),
            _.isNil(maxOutlet) ? undefined : Number(maxOutlet),
          ),
          max: Number(saturation_temperature_c1),
        }
      : {}
  }

  const minMaxDelta = {
    max: autho.iAmAdmin ? 50 : 20,
  }

  const handleOverrideOnChange = (value: any, { field, form }: any) => {
    const { setFieldValue } = form

    setFieldValue(`${field.name}.value`, value, false)
    if (!_.includes(rawRefrigerantsEnabledSelect, value)) {
      setFieldValue('input_data.saturation_title_c1.value', 'ave', false)
    }
  }

  return (
    <>
      <StyledSeparator
        withText='ui.coils.microchannel.steps.input_parameters.entry_conditions.fluid_refrigerant'
        actions={
          <FieldSolveMode
            name='input_data.mode'
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
          />
        }
      />

      <StyledRow>
        <FieldSelectFluidType
          required
          span={{ sm: 24, lg: 12, xl: 4 }}
          label='data.calculations.input_parameters.entry_conditions.fluid_type_refrigerant'
          name='input_data.fluid_c1'
          fluidTypes={options}
          overrideOnChange={handleOverrideOnChange}
        />
        <FieldDecimalNumberSelect
          required
          span={{ sm: 24, lg: 12, xl: 6 }}
          name='input_data.saturation_temperature_c1'
          label='data.calculations.input_parameters.entry_conditions.saturation_temperature'
          optionsBefore={rawSaturationTempModes}
          nameBefore='input_data.saturation_title_c1'
          scale={1}
          disabledBefore={!isSpecificRefrigerant}
          {...minMaxSaturation}
          dependOn={intl.formatMessage({
            id: 'data.calculations.model_detail.inlet_temperature_air.long',
          })}
        />

        <Col sm={24} lg={12} xl={7}>
          <p
            style={{
              fontFamily: 'Avenir Medium, sans serif',
              paddingBottom: '8px',
            }}
          >
            <span style={{ color: '#ff4d4f' }}>* </span>
            {intl.formatMessage({
              id: is_fluid_c1_inlet_mode_temperature
                ? 'data.calculations.input_parameters.entry_conditions.inlet_temperature_condenser'
                : 'data.calculations.input_parameters.entry_conditions.delta_inlet_temperature_c1',
            })}
          </p>
          <Space.Compact>
            <FieldRangeSelect
              hideLabel
              style={{
                flex: '0 0 auto',
                minWidth: 150,
              }}
              allowClear={false}
              name='input_data.fluid_c1_inlet_mode'
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
            {is_fluid_c1_inlet_mode_temperature ? (
              <FieldDecimalNumber
                hideLabel
                required
                style={{ flex: 1 }}
                name='input_data.inlet_temperature_c1'
                label='data.calculations.input_parameters.entry_conditions.inlet_temperature_condenser'
                {...minMaxInlet}
                dependOn={`${intl.formatMessage({
                  id: 'data.calculations.model_detail.saturation_temperature_c1',
                })}`}
                scale={1}
              />
            ) : (
              <FieldDecimalNumber
                required
                hideLabel
                style={{ flex: 1 }}
                name='input_data.delta_inlet_temperature_c1'
                label='data.calculations.input_parameters.entry_conditions.delta_inlet_temperature_c1'
                {...minMaxDeltaInlet}
                dependOn={`${intl.formatMessage({
                  id: 'data.calculations.model_detail.saturation_temperature_c1',
                })}`}
                scale={1}
              />
            )}
          </Space.Compact>
        </Col>

        <Col sm={24} lg={12} xl={7}>
          {mode === 'design' ? (
            <>
              <p
                style={{
                  fontFamily: 'Avenir Medium, sans serif',
                  paddingBottom: '8px',
                }}
              >
                <span style={{ color: '#ff4d4f' }}>* </span>
                {intl.formatMessage({
                  id: is_fluid_c1_outlet_mode_temperature
                    ? 'data.calculations.input_parameters.entry_conditions.outlet_temperature_c1'
                    : 'data.calculations.input_parameters.entry_conditions.delta_temperature_c1',
                })}
              </p>
              <Space.Compact>
                <FieldRangeSelect
                  style={{
                    flex: '0 0 auto',
                    minWidth: 150,
                  }}
                  noIntl
                  hideLabel
                  allowClear={false}
                  name='input_data.fluid_c1_outlet_mode'
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

                {is_fluid_c1_outlet_mode_temperature ? (
                  <FieldDecimalNumber
                    required
                    style={{ flex: 1 }}
                    name='input_data.outlet_temperature_c1'
                    hideLabel
                    label='data.calculations.input_parameters.entry_conditions.outlet_temperature_c1'
                    scale={1}
                    dependOn={`${intl.formatMessage({
                      id: 'data.calculations.model_detail.saturation_temperature_c1',
                    })}`}
                    {...getMinMaxOutlet(is_fluid_c1_outlet_mode_temperature)}
                  />
                ) : (
                  <FieldDecimalNumber
                    required
                    style={{ flex: 1 }}
                    name='input_data.delta_temperature_c1'
                    label='data.calculations.input_parameters.entry_conditions.delta_temperature_c1'
                    scale={1}
                    hideLabel
                    {...minMaxDelta}
                  />
                )}
              </Space.Compact>
            </>
          ) : (
            <FieldDecimalNumber
              span={{ sm: 24, lg: 24, xl: 18 }}
              required
              name='input_data.flow_rate_kgh_c1'
              label='data.calculations.input_parameters.entry_conditions.flow_rate'
              scale={0}
            />
          )}
        </Col>
      </StyledRow>
    </>
  )
}

export default FormFluidAirCooled
