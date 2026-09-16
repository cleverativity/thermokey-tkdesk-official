import _ from 'lodash'
import { useEffect } from 'react'

import { useFormikContext } from 'formik'
import { useAirflow } from 'Generic/hooks'

import { StyledRow } from 'Components/Styled'
import { DetailNumber } from 'Components/Detail'
import { FieldSelectAvailableTubes } from 'Components/Field'

import EffectiveNOfTubes from './EffectiveNOfTubes'
import FormCircuitDoubleFlow from './FormCircuitDoubleFlow'

import * as F from './functions'
import * as IPF from '../functions'
import * as OF from '../OperatingCondition/functions'

const CircuitDoubleFlow = ({
  useCase,
  steps_config,
  availableNOfTubesValues,
}: any) => {
  const { values, setFieldValue }: any = useFormikContext()
  const { geom_types } = useAirflow()

  const circuit = _.get(values, 'circuit')
  const nOfTubesWithPrefix = _.get(values, 'input_data.n_of_tubes')
  const override_steps = _.get(values, 'input_data.override_steps.value', false)

  const firstPrefix: any = _.head(
    IPF.getAllUniquePrefixOfGeometryTypes(geom_types),
  )

  const nOfTubesSelected = _.get(nOfTubesWithPrefix, `${firstPrefix}.value`)

  const { filteredTubes } = F.getIntersectionConfigByGeomType(
    steps_config,
    availableNOfTubesValues,
    useCase,
    firstPrefix,
  )

  useEffect(() => {
    if (!override_steps) {
      const core_height = OF.getCoreHeight(
        filteredTubes,
        nOfTubesSelected,
        useCase,
      )
      setFieldValue(`calculated_data.core_height`, core_height, false)
    }
  }, [override_steps, nOfTubesSelected])

  const stepsConfig: any = F.getStepsConfigByUseCase(
    steps_config,
    useCase,
    geom_types,
  )

  const intersectedStepsConfig = F.getCommonStepsConfig(stepsConfig[0])

  const numberOfTubes = _.map(F.keysStepsConfig(intersectedStepsConfig), (el) =>
    Number(el),
  )

  const options = _.chain(numberOfTubes)
    .map((el) => Number(el))
    .map((el: any) => ({ key: el }))
    .value()

  return (
    <>
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
          name={`input_data.n_of_tubes.${firstPrefix}`}
          disabled={override_steps}
        />

        {override_steps && (
          <EffectiveNOfTubes
            span={{ sm: 24, md: 12, lg: 4 }}
            circuit={circuit}
            hideLabel={false}
            label='data.calculations.input_parameters.geom_type.effective_n_of_tubes'
            style={{ marginBottom: '24px' }}
          />
        )}

        <DetailNumber
          hideLabel={false}
          span={{ sm: 24, md: 12, lg: 4 }}
          label='data.calculations.input_parameters.refrigerant_circuit.core_height'
          name={`calculated_data.core_height.${firstPrefix}`}
          limitTo={{ mm: 1300, in: 51.2 }}
          style={{ marginBottom: '24px' }}
        />
      </StyledRow>

      {_.map(['c1', 'c2'], (key: string) => (
        <FormCircuitDoubleFlow
          circuit={circuit}
          steps_config={steps_config}
          nOfTubesSelected={nOfTubesSelected}
          dataSource={_.get(circuit, `steps_${key}`)}
          coolantKey={key}
        />
      ))}
    </>
  )
}

export default CircuitDoubleFlow
