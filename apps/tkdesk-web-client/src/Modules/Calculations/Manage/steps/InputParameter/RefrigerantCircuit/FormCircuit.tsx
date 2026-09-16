import { useEffect, useState } from 'react'
import _ from 'lodash'
import { useFormikContext } from 'formik'
import { Row } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'
import { useAirflow } from 'Generic/hooks'

import { StyledRow, StyledSeparator, StyledTable } from 'Components/Styled'
import {
  FieldSelectAvailableTubes,
  FieldSelectNumOfSteps,
} from 'Components/Field'
import { Detail, DetailNumber } from 'Components/Detail'
import { FormikButton } from 'Components/Formik'

import { staticColumnsPassNumber } from 'Model/Calculations/InputParameters/table'

import * as CF from './circuitFunctions'
import * as IPF from '../functions'
import * as OF from '../OperatingCondition/functions'

const FormCircuit = ({
  um_system,
  pitch,
  geometryPrefix,
  circuitPerGeometry,
  n_of_tubes_selected,
  options,
  stepsConfig,
  onChangeNOfTubes,
  getIntersectionConfigAndFilteredTubes,
  modifiedSteps,
}: any) => {
  const [changedNOfSteps, setChangedNOfSteps] = useState(false)
  const { battery_active_length } = useAirflow()
  const autho = useAuthorization()
  const formik = useFormikContext()

  const { values, setFieldValue } = formik

  const { isModifiedNOfSteps, setIsModifiedNOfSteps } = modifiedSteps
  const { isModified, type } = isModifiedNOfSteps

  const setNOfSteps = (value: number) =>
    setFieldValue('input_data.n_of_steps.value', value)

  const use_case: string = _.get(values, 'use_case', '')
  const override_steps = _.get(values, 'input_data.override_steps.value', false)
  const nOfSteps = _.get(values, 'input_data.n_of_steps.value', 0)

  const unitOfMeasurement = um_system === 'si' ? ' mm' : ' in'

  const formattedPitch = um_system === 'si' ? pitch : _.round(pitch, 3)

  const { filteredTubes } =
    getIntersectionConfigAndFilteredTubes(geometryPrefix)

  useEffect(() => {
    if (n_of_tubes_selected) {
      if (!override_steps) {
        const core_height = OF.getCoreHeight(
          filteredTubes,
          n_of_tubes_selected,
          use_case,
        )

        setFieldValue(
          `calculated_data.core_height.${geometryPrefix}`,
          _.get(core_height, geometryPrefix),
          false,
        )
      }
    }
  }, [override_steps, n_of_tubes_selected])

  useEffect(() => {
    if (!override_steps) {
      IPF.setNewCircuit(
        stepsConfig,
        use_case,
        n_of_tubes_selected,
        battery_active_length,
        geometryPrefix,
        setFieldValue,
      )
    }
  }, [battery_active_length, override_steps, n_of_tubes_selected])

  // this is for change the circuit in the opposite prefix
  useEffect(() => {
    if (!override_steps) {
      if (!changedNOfSteps) {
        handleOverrideOnChange(nOfSteps)
      } else {
        setChangedNOfSteps(false)
      }
    }
  }, [nOfSteps])

  useEffect(() => {
    if (isModified) {
      if (type === 'minus') {
        setFieldValue(
          `circuit.${geometryPrefix}`,
          _.initial(circuitPerGeometry),
        )
      } else {
        IPF.setNewPassToCircuit(
          circuitPerGeometry,
          geometryPrefix,
          setFieldValue,
        )
      }
      setIsModifiedNOfSteps({ isModified: false })
    }
  }, [isModified])

  useEffect(() => {
    if (override_steps && !circuitPerGeometry) {
      const circuit = CF.createEmptyCircuit(nOfSteps, geometryPrefix)

      setFieldValue(`circuit.${geometryPrefix}`, circuit)
    }
  }, [circuitPerGeometry])

  const handleOverrideOnChange = (value: number) => {
    IPF.setNewCircuitByNSteps(
      stepsConfig,
      use_case,
      n_of_tubes_selected,
      geometryPrefix,
      value,
      setFieldValue,
    )
  }

  const handlePlusMinusOnClick = (value: string) => {
    const newNOfSteps = value === 'minus' ? nOfSteps - 1 : nOfSteps + 1
    setNOfSteps(newNOfSteps)
    setChangedNOfSteps(true)

    setIsModifiedNOfSteps({ isModified: true, type: value })
  }

  return (
    <>
      <StyledSeparator
        withText={
          'ui.coils.microchannel.steps.input_parameters.refrigerant_circuit.geom_type'
        }
        intlValues={{ pitch: formattedPitch + unitOfMeasurement }}
      />

      <StyledRow>
        <FieldSelectAvailableTubes
          required={!override_steps}
          span={{ sm: 24, md: 12, lg: 4 }}
          label={
            override_steps
              ? 'data.calculations.input_parameters.geom_type.starter_n_of_tubes'
              : 'data.calculations.input_parameters.geom_type.n_of_tubes'
          }
          options={options}
          name={`input_data.n_of_tubes.${geometryPrefix}`}
          disabled={override_steps}
          overrideOnChange={(value: any) => onChangeNOfTubes(value, pitch)}
        />

        <FieldSelectNumOfSteps
          span={4}
          name='input_data.n_of_steps'
          disabled={override_steps}
          overrideOnChange={(value: number) => {
            handleOverrideOnChange(value)
            setChangedNOfSteps(true)
          }}
        />

        {override_steps && (
          <Detail
            // name='effective_n_of_tubes'
            hideLabel={false}
            label='data.calculations.input_parameters.geom_type.effective_n_of_tubes'
            span={{ sm: 24, md: 12, lg: 4 }}
            style={{ marginBottom: '24px' }}
          >
            {_.sumBy(circuitPerGeometry, (obj: any) =>
              _.get(obj, 'entry.port'),
            )}
          </Detail>
        )}

        <DetailNumber
          hideLabel={false}
          span={{ sm: 24, md: 12, lg: 4 }}
          label='data.calculations.input_parameters.refrigerant_circuit.core_height'
          name={`calculated_data.core_height.${geometryPrefix}`}
          limitTo={{ mm: 1300, in: 51.2 }}
          style={{ marginBottom: '24px' }}
        />
      </StyledRow>

      {autho.check(rawPermissions.Calculation.manage) && (
        <>
          {!_.isEmpty(circuitPerGeometry) && (
            <StyledTable
              rowKey='key'
              loading={false}
              dataSource={circuitPerGeometry}
              pagination={false}
              columns={staticColumnsPassNumber}
            />
          )}

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

export default FormCircuit
