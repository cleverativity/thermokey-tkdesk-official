import { useEffect } from 'react'
import _ from 'lodash'
import { useFormikContext } from 'formik'
import { Row } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'
import { useAirflow } from 'Generic/hooks'

import { StyledRow, StyledSeparator, StyledTable } from 'Components/Styled'
import {
  FieldCheckbox,
  FieldSelectAvailableTubes,
  FieldSelectNumOfSteps,
} from 'Components/Field'
import { Detail, DetailNumber } from 'Components/Detail'
import { FormikButton } from 'Components/Formik'

import { staticColumnsPassNumber } from 'Model/Calculations/InputParameters/table'

import rawNOfTubes from 'Localization/Constants/n_of_tubes_FC.json'

import * as F from './circuitFunctions'
import * as OF from '../OperatingCondition/functions'
import * as IPF from '../functions'

const FormCircuitFreeCooling = ({
  useCase,
  circuit,
  options,
  coreKey,
  geomType,
  availableNOfTubesValues,
  steps_config,
}: any) => {
  const autho = useAuthorization()
  const { battery_active_length } = useAirflow()
  const formik = useFormikContext()
  const { values, setFieldValue } = formik

  const nOfTubesSelected: any = _.get(
    values,
    `input_data.${coreKey}.n_of_tubes.value`,
  )
  const dataSource = _.get(circuit, `steps_${coreKey}`, [])
  const override_steps = _.get(
    values,
    `input_data.${coreKey}.override_steps.value`,
    false,
  )
  const coolantCircuit = _.get(circuit, `steps_${coreKey}`)
  const nOfSteps = _.get(values, `input_data.${coreKey}.n_of_steps.value`, 0)

  useEffect(() => {
    const filteredTubes = _.get(availableNOfTubesValues, `${geomType}`)

    const core_height = OF.getCoreHeight(
      filteredTubes,
      nOfTubesSelected,
      useCase,
    )

    setFieldValue(
      `calculated_data.core_height.${coreKey}`,
      _.get(core_height, coreKey),
      false,
    )
  }, [nOfTubesSelected])

  useEffect(() => {
    if (!override_steps) {
      IPF.setNewCircuit(
        steps_config,
        useCase,
        nOfTubesSelected,
        battery_active_length,
        coreKey,
        setFieldValue,
      )
    }
  }, [battery_active_length, nOfTubesSelected, override_steps])

  const handleOverrideOnChange = (value: number) => {
    IPF.setNewCircuitByNSteps(
      steps_config,
      useCase,
      nOfTubesSelected,
      coreKey,
      value,
      setFieldValue,
    )
  }

  const handlePlusMinusOnClick = (value: string) => {
    const newNOfSteps = value === 'minus' ? nOfSteps - 1 : nOfSteps + 1

    setFieldValue(`input_data.${coreKey}.n_of_steps.value`, newNOfSteps)

    if (value === 'minus') {
      F.removePassToCircuit(coolantCircuit, `steps_${coreKey}`, setFieldValue)
    } else {
      F.setNewPassToCircuit(coolantCircuit, `steps_${coreKey}`, setFieldValue)
    }
  }

  return (
    <>
      <StyledSeparator
        withText={`ui.coils.microchannel.steps.input_parameters.geometric_parameters.${coreKey}`}
      />

      {autho.check(rawPermissions.Calculation.manage) && (
        <FieldCheckbox
          hideLabel
          disabled={_.isNil(nOfTubesSelected)}
          name={`input_data.${coreKey}.override_steps`}
          options={[
            {
              label:
                'data.calculations.input_parameters.refrigerant_circuit.override_steps',
            },
          ]}
        />
      )}

      <StyledRow>
        <FieldSelectAvailableTubes
          required
          span={{ sm: 24, md: 12, lg: 4 }}
          label='data.calculations.input_parameters.geom_type.starter_n_of_tubes'
          options={options}
          disabled={override_steps}
          name={`input_data.${coreKey}.n_of_tubes`}
          overrideOnChange={(value, { field, form }) => {
            const { setFieldValue } = form
            const { name } = field
            setFieldValue(`${name}.value`, Number(value), false)

            const oppositeValue = _.get(rawNOfTubes, [coreKey, value])

            if (coreKey === 'c1') {
              setFieldValue(
                'input_data.c2.n_of_tubes.value',
                Number(oppositeValue),
                false,
              )
            } else {
              setFieldValue(
                'input_data.c1.n_of_tubes.value',
                Number(oppositeValue),
                false,
              )
            }
          }}
        />

        <FieldSelectNumOfSteps
          span={{ sm: 24, md: 12, lg: 4 }}
          name={`input_data.${coreKey}.n_of_steps`}
          disabled={override_steps}
          overrideOnChange={(value: any) => handleOverrideOnChange(value)}
        />

        {override_steps && (
          <Detail
            span={{ sm: 24, md: 12, lg: 4 }}
            hideLabel={false}
            label='data.calculations.input_parameters.geom_type.effective_n_of_tubes'
            style={{ marginBottom: '24px' }}
          >
            {_.sumBy(coolantCircuit, (obj: any) => _.get(obj, 'entry.port'))}
          </Detail>
        )}

        <DetailNumber
          span={{ sm: 24, md: 12, lg: 4 }}
          hideLabel={false}
          label='data.calculations.input_parameters.refrigerant_circuit.core_height'
          name={`calculated_data.core_height.${coreKey}`}
          limitTo={{ mm: 1300, in: 51.2 }}
          style={{ marginBottom: '24px' }}
        />
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

export default FormCircuitFreeCooling
