import _ from 'lodash'

import { useFormikContext } from 'formik'

import FormCircuitFreeCooling from './FormCircuitFreeCooling'

import * as F from './functions'

const coreKey = ['c1', 'c2']

const CircuitFreeCooling = ({
  useCase,
  steps_config,
  availableNOfTubesValues,
}: any) => {
  const formikContext = useFormikContext()
  const { values }: any = formikContext

  const circuit = _.get(values, 'circuit')

  return _.map(coreKey, (key) => {
    const geomType = _.get(values, `input_data.${key}.geom_type.value`, '')

    const stepsConfig: any = F.getStepsConfigByUseCase(
      steps_config,
      useCase,
      geomType,
    )

    const filteredStepsConfig = [_.get(stepsConfig[0], key)]

    const numberOfTubes = _.map(F.keysStepsConfig(filteredStepsConfig), (el) =>
      Number(el),
    )

    const options = _.chain(numberOfTubes)
      .map((el) => Number(el))
      .map((el: any) => ({ key: el }))
      .value()

    return (
      <FormCircuitFreeCooling
        useCase={useCase}
        circuit={circuit}
        options={options}
        coreKey={key}
        geomType={geomType}
        availableNOfTubesValues={availableNOfTubesValues}
        steps_config={filteredStepsConfig}
      />
    )
  })
}

export default CircuitFreeCooling
