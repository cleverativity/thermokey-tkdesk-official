import { useEffect } from 'react'
import _ from 'lodash'
import { useFormikContext } from 'formik'
import { Row } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'
import { useAirflow } from 'Generic/hooks'

import { StyledRow, StyledSeparator, StyledTable } from 'Components/Styled'
import { FieldCheckbox, FieldSelectNumOfSteps } from 'Components/Field'
import { FormikButton } from 'Components/Formik'

import { staticColumnsPassNumber } from 'Model/Calculations/InputParameters/table'

import * as F from './circuitFunctions'
import * as IPF from '../functions'

const FormCircuitDoubleFlow = ({
  circuit,
  steps_config,
  nOfTubesSelected,
  dataSource,
  coolantKey,
}: any) => {
  const isPrimary = coolantKey === 'c1'

  const autho = useAuthorization()
  const { battery_active_length, geom_types } = useAirflow()
  const formik = useFormikContext()

  const { values, setFieldValue } = formik

  const use_case: string = _.get(values, 'use_case', '')
  const override_steps = _.get(values, 'input_data.override_steps.value', false)
  const nOfSteps = _.get(
    values,
    `input_data.n_of_steps${isPrimary ? '' : '_c2'}.value`,
    0,
  )
  const fluid_input_c2 = _.get(values, 'input_data.fluid_input_c2.value', null)
  const fluid_direction_c2 = _.get(
    values,
    'input_data.fluid_direction_c2.value',
    null,
  )

  useEffect(() => {
    if (!override_steps) {
      const prefixes = IPF.getAllUniquePrefixOfGeometryTypes(geom_types)
      _.forEach(prefixes, (prefix) => {
        const n_of_tubes: any = _.get(
          formik.values,
          `input_data.n_of_tubes.${prefix}.value`,
        )

        F.setNewCircuit(
          steps_config,
          use_case,
          n_of_tubes,
          battery_active_length,
          setFieldValue,
          {
            fluid_input_c2,
            fluid_direction_c2,
          },
        )
      })
    }
  }, [battery_active_length, override_steps, nOfTubesSelected])

  const handleStepsChange = (value: number) => {
    F.setNewCircuitByNSteps(
      circuit,
      steps_config,
      use_case,
      nOfTubesSelected,
      value,
      coolantKey,
      {
        fluid_input_c2,
        fluid_direction_c2,
      },
      setFieldValue,
    )
  }

  const handleDirectionChange = () => {
    const entries = _.get(circuit, 'steps_c2', [])

    _.forEach(entries, (entry) => {
      const currentDirection = _.get(entry, 'entry.direction')

      if (_.isNumber(currentDirection)) {
        _.set(entry, 'entry.direction', currentDirection * -1)
      }
    })
  }

  const handlePlusMinusOnClick = (value: string) => {
    const coolantCircuit = _.get(circuit, `steps_${coolantKey}`)

    const newNOfSteps = value === 'minus' ? nOfSteps - 1 : nOfSteps + 1

    setFieldValue(
      `input_data.n_of_steps${isPrimary ? '' : '_c2'}.value`,
      newNOfSteps,
    )

    if (value === 'minus') {
      F.removePassToCircuit(
        coolantCircuit,
        `steps_${coolantKey}`,
        setFieldValue,
        fluid_input_c2,
      )
    } else {
      F.setNewPassToCircuit(
        coolantCircuit,
        `steps_${coolantKey}`,
        setFieldValue,
        fluid_input_c2,
      )
    }
  }

  return (
    <>
      <StyledSeparator
        withText={`ui.coils.microchannel.steps.input_parameters.entry_conditions.${isPrimary ? 'fluid_primary' : 'fluid_secondary'}`}
      />

      <StyledRow>
        <FieldSelectNumOfSteps
          span={{ sm: 24, md: 12, lg: 4 }}
          name={`input_data.n_of_steps${isPrimary ? '' : '_c2'}`}
          disabled={override_steps}
          overrideOnChange={(value: any) => handleStepsChange(value)}
        />
        {!isPrimary && override_steps ? (
          <FieldCheckbox
            span={{ sm: 24, md: 12, lg: 5 }}
            name='invert_direction'
            onChange={handleDirectionChange}
            options={[
              {
                label:
                  'data.calculations.input_parameters.refrigerant_circuit.invert_direction',
              },
            ]}
          />
        ) : null}
      </StyledRow>

      {autho.check(rawPermissions.Calculation.manage) && (
        <>
          <StyledTable
            rowKey='key'
            loading={false}
            dataSource={dataSource}
            pagination={false}
            columns={staticColumnsPassNumber}
          />

          <Row style={{ marginTop: '20px' }}>
            <FormikButton
              id='minus_button'
              disabled={nOfSteps <= 1 || !override_steps}
              onClick={({ setFieldValue }: any) =>
                handlePlusMinusOnClick('minus')
              }
              icon={<MinusCircleOutlined />}
              style={{
                borderRadius: '50%',
                marginRight: '15px',
              }}
            />
            <FormikButton
              id='plus_button'
              disabled={nOfSteps >= 8 || !override_steps}
              onClick={({ setFieldValue }: any) =>
                handlePlusMinusOnClick('plus')
              }
              icon={<PlusCircleOutlined />}
              style={{ borderRadius: '50%' }}
            />
          </Row>
        </>
      )}
    </>
  )
}

export default FormCircuitDoubleFlow
