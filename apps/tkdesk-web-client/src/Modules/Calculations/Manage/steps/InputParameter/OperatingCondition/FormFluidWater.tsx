import _ from 'lodash'
import { Col, Space } from 'antd'
import { useIntl } from 'react-intl'
import { useFormikContext } from 'formik'

import { StyledRow, StyledSeparator } from 'Components/Styled'
import {
  FieldDecimalNumber,
  FieldRangeSelect,
  FieldSelectFluidType,
  FieldSolveMode,
} from 'Components/Field'

import * as F from './functions'
import { useAuthorization } from 'Modules/App/Authorization'

const FormFluidWater = ({ user_type, refrigerants, use_case }: any) => {
  const intl = useIntl()
  const autho = useAuthorization()
  const formik = useFormikContext()
  const { values } = formik

  const fluid: string = _.get(values, 'input_data.fluid_c1.value', '')
  const mode: string = _.get(values, 'input_data.mode.value', 'verify')
  const inlet_temperature_c1 = _.get(
    values,
    'input_data.inlet_temperature_c1.value',
    null,
  )
  const inlet_temperature_air = _.get(
    values,
    'input_data.inlet_temperature_air.value',
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
  const delta_temperature_c1_validations: any = _.get(
    values,
    'input_data.delta_temperature_c1.validations',
    null,
  )

  const fluid_c1_outlet_mode: boolean = _.isEqual(
    _.get(values, 'input_data.fluid_c1_outlet_mode.value', 'temperature'),
    'temperature',
  )

  const enabledRefrigerants = F.getEnabledRefrigerants(refrigerants, user_type)

  const options = _.filter(
    enabledRefrigerants,
    (refrigerant: { name: string; visibility: string[] }) => {
      const fluidName = _.get(refrigerant, 'name')
      if (!_.includes(['water', 'propylene', 'ethylene'], fluidName)) {
        return false
      }
      return true
    },
  )

  const minMaxGlycolPercentage = autho.iAmOem ? { min: 25, max: 50 } : {}

  const { minimum: minAir, maximum: maxAir } =
    inlet_temperature_air_validations || {}
  const { minimum: minOutlet, maximum: maxOutlet } =
    outlet_temperature_c1_validations || {}
  const { minimum: minDelta, maximum: maxDelta } =
    delta_temperature_c1_validations || {}

  const inletDefinition = !_.isNil(inlet_temperature_air)
    ? use_case === 'water_cooler'
      ? autho.iAmAdmin
        ? {
            min: Number(inlet_temperature_air),
          }
        : { min: Number(inlet_temperature_air) - 5 }
      : {
          max: autho.iAmAdmin
            ? Number(inlet_temperature_air)
            : Number(inlet_temperature_air) - 5,
        }
    : null

  const minMaxInlet = inletDefinition
    ? {
        ...(!_.isNil(inletDefinition.min)
          ? {
              min: F.getValidationBound(
                inletDefinition.min,
                _.isNil(minAir) ? undefined : Number(minAir),
                _.isNil(minAir) ? undefined : Number(minAir),
                _.isNil(maxAir) ? undefined : Number(maxAir),
              ),
            }
          : {}),
        ...(!_.isNil(inletDefinition.max)
          ? {
              max: F.getValidationBound(
                inletDefinition.max,
                _.isNil(maxAir) ? undefined : Number(maxAir),
                _.isNil(minAir) ? undefined : Number(minAir),
                _.isNil(maxAir) ? undefined : Number(maxAir),
              ),
            }
          : {}),
      }
    : {}

  const outletDefinition =
    !_.isNil(inlet_temperature_air) && !_.isNil(inlet_temperature_c1)
      ? use_case === 'water_cooler'
        ? autho.iAmAdmin
          ? {
              min: Number(inlet_temperature_air) + 0.1,
              max: Number(inlet_temperature_c1) - 0.1,
            }
          : {
              min: Number(inlet_temperature_air) + 2,
              max: Number(inlet_temperature_c1) - 2,
            }
        : autho.iAmAdmin
          ? {
              min: Number(inlet_temperature_c1) + 0.1,
              max: Number(inlet_temperature_air) - 0.1,
            }
          : {
              min: Number(inlet_temperature_c1) + 2,
              max: Number(inlet_temperature_air) - 2,
            }
      : null

  const minMaxOutlet = outletDefinition
    ? {
        min: F.getValidationBound(
          outletDefinition.min,
          _.isNil(minOutlet) ? undefined : Number(minOutlet),
          _.isNil(minOutlet) ? undefined : Number(minOutlet),
          _.isNil(maxOutlet) ? undefined : Number(maxOutlet),
        ),
        max: F.getValidationBound(
          outletDefinition.max,
          _.isNil(maxOutlet) ? undefined : Number(maxOutlet),
          _.isNil(minOutlet) ? undefined : Number(minOutlet),
          _.isNil(maxOutlet) ? undefined : Number(maxOutlet),
        ),
      }
    : {}

  const deltaDefinition =
    !_.isNil(inlet_temperature_air) && !_.isNil(inlet_temperature_c1)
      ? use_case === 'water_cooler'
        ? {
            max: autho.iAmAdmin
              ? Number(inlet_temperature_c1) -
                Number(inlet_temperature_air) -
                0.1
              : Number(inlet_temperature_c1) -
                Number(inlet_temperature_air) -
                2,
          }
        : {
            max: autho.iAmAdmin
              ? Number(inlet_temperature_air) -
                Number(inlet_temperature_c1) -
                0.1
              : Number(inlet_temperature_air) -
                Number(inlet_temperature_c1) -
                2,
          }
      : null

  const minMaxDelta = deltaDefinition
    ? {
        max: F.getValidationBound(
          deltaDefinition.max,
          _.isNil(maxDelta) ? undefined : Number(maxDelta),
          _.isNil(minDelta) ? undefined : Number(minDelta),
          _.isNil(maxDelta) ? undefined : Number(maxDelta),
        ),
      }
    : {}

  const handleOverrideOnChange = (
    value: any,
    { field, form }: { field: any; form: any },
  ) => {
    const { setFieldValue, values } = form
    const { name } = field

    setFieldValue(`${name}.value`, value)

    const glycol_percentage_c1 = _.get(
      values,
      'input_data.glycol_percentage_c1',
      null,
    )

    if (value === 'water' && !_.isNil(glycol_percentage_c1)) {
      setFieldValue('input_data.glycol_percentage_c1.value', null, false)
    }
  }

  return (
    <>
      <StyledSeparator
        withText='ui.coils.microchannel.steps.input_parameters.entry_conditions.fluid'
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
          label='data.calculations.input_parameters.entry_conditions.fluid_type'
          name='input_data.fluid_c1'
          fluidTypes={options}
          overrideOnChange={handleOverrideOnChange}
        />
        <FieldDecimalNumber
          required={fluid !== 'water'}
          span={{ sm: 24, lg: 12, xl: 6 }}
          name='input_data.glycol_percentage_c1'
          label='data.calculations.input_parameters.entry_conditions.glycol_percentage'
          disabled={fluid === 'water'}
          scale={0}
          {...minMaxGlycolPercentage}
        />
        <FieldDecimalNumber
          required
          span={{ sm: 24, lg: 12, xl: 6 }}
          name='input_data.inlet_temperature_c1'
          label='data.calculations.input_parameters.entry_conditions.inlet_temperature'
          scale={1}
          {...minMaxInlet}
          dependOn={intl.formatMessage({
            id: 'data.calculations.model_detail.inlet_temperature_air.long',
          })}
        />

        {mode === 'design' ? (
          <Col sm={24} lg={12} xl={7}>
            <Space.Compact>
              <FieldRangeSelect
                style={{
                  flex: '0 0 auto',
                  minWidth: 150,
                  paddingLeft: 16,
                }}
                noIntl
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
                    label: 'Delta Temp.',
                    value: 'delta_temperature',
                  },
                ]}
              />

              {fluid_c1_outlet_mode ? (
                <FieldDecimalNumber
                  required
                  style={{ flex: 1 }}
                  name='input_data.outlet_temperature_c1'
                  label='data.calculations.input_parameters.entry_conditions.outlet_temperature_c1'
                  scale={1}
                  dependOn={`${intl.formatMessage({
                    id: 'data.calculations.model_detail.inlet_temperature_fluid.long',
                  })}, ${intl.formatMessage({
                    id: 'data.calculations.model_detail.inlet_temperature_air.long',
                  })}`}
                  {...minMaxOutlet}
                />
              ) : (
                <FieldDecimalNumber
                  required
                  name='input_data.delta_temperature_c1'
                  label='data.calculations.input_parameters.entry_conditions.delta_temperature_c1_water'
                  scale={1}
                  style={{ flex: 1 }}
                  incompatibilityError={
                    use_case === 'water_cooler' ? minMaxDelta.max < 0 : null
                  }
                  positiveValidation={use_case === 'water_heater'}
                  {...minMaxDelta}
                  dependOn={`${intl.formatMessage({
                    id: 'data.calculations.model_detail.inlet_temperature_fluid.long',
                  })}, ${intl.formatMessage({
                    id: 'data.calculations.model_detail.inlet_temperature_air.long',
                  })}`}
                />
              )}
            </Space.Compact>
          </Col>
        ) : (
          <FieldDecimalNumber
            required
            span={{ sm: 24, lg: 12, xl: 7 }}
            name='input_data.flow_rate_m3h_c1'
            label='data.calculations.input_parameters.entry_conditions.flow_rate'
          />
        )}
      </StyledRow>
    </>
  )
}

export default FormFluidWater
