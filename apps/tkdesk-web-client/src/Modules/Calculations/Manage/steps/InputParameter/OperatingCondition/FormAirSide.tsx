import _ from 'lodash'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { Row, Tooltip } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

import { useFormikContext } from 'formik'
import { useAirflow } from 'Generic/hooks'
import { useAuthorization } from 'Modules/App/Authorization'

import { StyledButton, StyledRow, StyledSeparator } from 'Components/Styled'
import { DetailIntl, DetailList } from 'Components/Detail'
import { FieldDecimalNumber, FieldSolveMode } from 'Components/Field'

import * as F from './functions'

import colors from 'styles/colors.module.scss'

const FormAirSide = ({ handleOpenModalCreate }: any) => {
  const intl = useIntl()
  const autho = useAuthorization()
  const formik = useFormikContext()
  const { setFieldValue, values } = formik

  const { battery_active_length, geom_types, inlet_velocity_air, n_of_tubes } =
    useAirflow()

  const geomTypesString = JSON.stringify(geom_types)
  const nOfTubesString = JSON.stringify(n_of_tubes)

  const air_mode = _.get(values, 'input_data.air_mode.value', 'velocity')
  const flow_rate_air = _.get(values, 'input_data.flow_rate_air.value')
  const calculated_inlet_velocity_air = _.get(
    values,
    'calculated_data.inlet_velocity_air',
  )

  useEffect(() => {
    if (air_mode === 'velocity') {
      F.calculateFlowRateAir(
        {
          battery_active_length,
          geom_types,
          inlet_velocity_air,
          n_of_tubes,
        },
        setFieldValue,
      )
    } else {
      F.calculateVelocityAir(
        {
          battery_active_length,
          geom_types,
          n_of_tubes,
          flow_rate_air,
        },
        setFieldValue,
      )
    }
  }, [
    battery_active_length,
    geomTypesString,
    inlet_velocity_air,
    flow_rate_air,
    nOfTubesString,
  ])

  const mode = _.get(values, 'input_data.mode.value', 'design')
  const use_case: string = _.get(values, 'use_case', '')

  const isFanButtonDisabled = geom_types.length !== 1

  const handleDependOn =
    mode === 'design' &&
    (use_case === 'water_cooler'
      ? intl.formatMessage({
          id: 'data.calculations.model_detail.inlet_temperature_fluid.long',
        })
      : null)

  const handleAirFlowRateChange = (value: any, { field, form }: any) => {
    const { setFieldValue } = form

    setFieldValue(`${field.name}.value`, value, false)
  }

  const handleOnChange = () => {
    if (air_mode === 'velocity') {
      const flow_rate_air = _.get(
        values,
        'calculated_data.flow_rate_air',
        undefined,
      )

      if (flow_rate_air) {
        const firstFlowRateAir = F.getFirstValue(flow_rate_air, 0)

        handleAirFlowRateChange(firstFlowRateAir, {
          field: { name: 'input_data.flow_rate_air' },
          form: formik,
        })
      }
    } else if (air_mode === 'flow') {
      const inlet_velocity_air = _.get(
        values,
        'calculated_data.inlet_velocity_air',
        undefined,
      )

      if (inlet_velocity_air) {
        const firstInletVelocityAir = F.getFirstValue(inlet_velocity_air, 2)

        setFieldValue(
          'input_data.inlet_velocity_air.value',
          firstInletVelocityAir,
          false,
        )
      }
    }
  }

  const getInletVelocityAirError = (value: any) => {
    const validations = _.get(
      values,
      'input_data.inlet_velocity_air.validations',
      {},
    )
    const minValue = _.get(validations, 'minimum', null)
    const maxValue = _.get(validations, 'maximum', null)

    if (_.isNil(value) || _.isNil(minValue) || _.isNil(maxValue)) return

    const min = Number(minValue)
    const max = Number(maxValue)

    if (!Number.isFinite(min) || !Number.isFinite(max)) return

    const hasInvalidValue = _.some(_.values(value), (option) => {
      const currentValue = Number(_.get(option, 'value'))

      return (
        Number.isFinite(currentValue) &&
        (currentValue < min || currentValue > max)
      )
    })

    if (hasInvalidValue) {
      if (min === max) {
        return intl.formatMessage(
          { id: 'data.generic.form.message.validation.number.betweenEqual' },
          { min: min + ' m/s', max: max + ' m/s' },
        )
      } else {
        return intl.formatMessage(
          { id: 'data.generic.form.message.validation.number.between' },
          { min: min + ' m/s', max: max + ' m/s' },
        )
      }
    }
  }

  return (
    <>
      <StyledSeparator
        withText='ui.coils.microchannel.steps.input_parameters.entry_conditions.fluid_c3'
        actions={
          <Row>
            <FieldSolveMode
              name='input_data.air_mode'
              options={[
                {
                  label: 'Velocity',
                  value: 'velocity',
                },
                {
                  label: 'Airflow',
                  value: 'flow',
                },
              ]}
              tooltip='data.calculations.input_parameters.velocity_flow'
              onChange={handleOnChange}
            />

            {autho.iAmAdmin &&
              use_case !== 'free_cooling_condenser' &&
              !_.startsWith(use_case, 'double_flow') && (
                <Tooltip
                  title={
                    isFanButtonDisabled
                      ? intl.formatMessage({
                          id: 'data.calculations.input_parameters.entry_conditions.warning.tooltip',
                        })
                      : ''
                  }
                  open={isFanButtonDisabled ? undefined : false}
                >
                  <StyledButton
                    disabled={isFanButtonDisabled}
                    id='button.calculations.fan_management'
                    label='ui.fan_models.modal.button'
                    onClick={handleOpenModalCreate}
                    icon={
                      isFanButtonDisabled && (
                        <WarningOutlined style={{ color: colors.warning }} />
                      )
                    }
                  />
                </Tooltip>
              )}
          </Row>
        }
      />

      <StyledRow>
        <DetailIntl
          span={{ sm: 24, lg: 12, xl: 4 }}
          hideLabel={false}
          prefix='select.coils.microchannel.fluid_type.'
          label='data.calculations.input_parameters.entry_conditions.air_fluid_type'
        >
          air
        </DetailIntl>
        <FieldDecimalNumber
          required
          span={{ sm: 24, lg: 12, xl: 4 }}
          name='input_data.inlet_temperature_air'
          scale={1}
          label='data.calculations.input_parameters.entry_conditions.inlet_temperature'
          dependOn={handleDependOn}
        />
        <FieldDecimalNumber
          span={{ sm: 24, lg: 12, xl: 4 }}
          name='input_data.humidity'
          label='data.calculations.input_parameters.entry_conditions.humidity'
          scale={0}
        />
        <FieldDecimalNumber
          required
          span={{ sm: 24, lg: 12, xl: 4 }}
          scale={0}
          name='input_data.altitude'
          label='data.calculations.input_parameters.entry_conditions.altitude'
        />
        {air_mode === 'velocity' ? (
          <>
            <FieldDecimalNumber
              required
              span={{ sm: 24, lg: 12, xl: 4 }}
              name='input_data.inlet_velocity_air'
              label='data.calculations.input_parameters.entry_conditions.inlet_velocity_air'
            />
            <DetailList
              hideLabel={false}
              span={{ sm: 24, lg: 12, xl: 4 }}
              label='data.calculations.input_parameters.entry_conditions.flow_rate_air'
              name='calculated_data.flow_rate_air'
              scale={0}
            />
          </>
        ) : (
          <>
            <DetailList
              hideLabel={false}
              span={{ sm: 24, lg: 12, xl: 4 }}
              label='data.calculations.input_parameters.entry_conditions.inlet_velocity_air'
              scale={2}
              error={getInletVelocityAirError(calculated_inlet_velocity_air)}
            >
              {calculated_inlet_velocity_air}
            </DetailList>
            <FieldDecimalNumber
              required
              span={{ sm: 24, lg: 12, xl: 4 }}
              overrideOnChange={handleAirFlowRateChange}
              label='data.calculations.input_parameters.entry_conditions.flow_rate_air'
              name='input_data.flow_rate_air'
            />
          </>
        )}
      </StyledRow>
    </>
  )
}

export default FormAirSide
