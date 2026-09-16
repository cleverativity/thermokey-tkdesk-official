import { ConsoleLogger } from 'aws-amplify/utils'

import GeometricParameters from './GeometricParameters'
import RefrigerantCircuit from './RefrigerantCircuit'
import OperatingCondition from './OperatingCondition'

const log = new ConsoleLogger('Modules/Calculations/InputParameter')

const InputParameter = ({
  params,
  data,
  enabledCorrectiveFactors,
  user_type,
  um_system,
  onUpdateParams,
  selectGeomTypes,
}: {
  params: any
  data: CalculationData
  enabledCorrectiveFactors: any
  user_type: any
  um_system: string
  onUpdateParams: any
  selectGeomTypes: any
}) => {
  log.info('render.props', { data, enabledCorrectiveFactors })

  const {
    steps_config,
    available_n_of_tubes_values,
    calculation = {},
    geometric_constants,
    refrigerants,
    fan_models,
  } = data
  const { use_case = '' } = calculation

  return (
    <>
      <GeometricParameters
        useCase={use_case}
        enabledCorrectiveFactors={enabledCorrectiveFactors}
        geometricConstants={geometric_constants}
        selectGeomTypes={selectGeomTypes}
      />
      <RefrigerantCircuit
        umSystem={um_system}
        useCase={use_case}
        steps_config={steps_config}
        availableNOfTubesValues={available_n_of_tubes_values}
        geometricConstants={geometric_constants}
        selectGeomTypes={selectGeomTypes}
      />
      <OperatingCondition
        params={params}
        onUpdateParams={onUpdateParams}
        userType={user_type}
        refrigerants={refrigerants}
        fanModels={fan_models}
        selectGeomTypes={selectGeomTypes}
      />
    </>
  )
}

InputParameter.prefix = 'input-parameters'

export default InputParameter
