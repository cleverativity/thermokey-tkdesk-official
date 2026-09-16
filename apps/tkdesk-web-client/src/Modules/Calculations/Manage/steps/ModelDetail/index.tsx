import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'

import { StyledAlert, StyledButton } from 'Components/Styled'

import FreeCoolingCondenser from './FreeCoolingCondenser'

import GeneralInfo from './GeneralInfo'
import AirSide from './AirSide'
import CoolantSide from './CoolantSide'
import RefrigerantSide from './RefrigerantSide'
import FluidSide from './FluidSide'
import FanModelSide from './FanModelSide'
import GeometricDetails from './GeometricDetails'

const log = new ConsoleLogger('Modules/Calculations/ModelDetail')

const ModelDetail = (props: {
  useCase: string
  modelGeomType: string | null
  stepMode: string | null
  detailData: any
  onGoToSecondStep: any
  status: string
  stepModeC2?: string | null
}) => {
  log.info('render.props', props)

  const {
    useCase,
    modelGeomType,
    stepMode,
    stepModeC2,
    detailData,
    onGoToSecondStep,
    status,
  } = props

  const fan_model_details = _.get(detailData, 'fan_model_details', null)
  const fluid_c1 = _.get(detailData, 'refrigerant_details.fluid_c1.value', null)
  const pressure_drops_c1 = _.get(
    detailData,
    'refrigerant_details.pressure_drops_c1.value',
    null,
  )
  const inlet_warning = _.get(detailData, 'inlet_warning.value', null)

  return useCase === 'free_cooling_condenser' ? (
    <FreeCoolingCondenser
      useCase={useCase}
      stepMode={stepMode}
      detailData={detailData}
    />
  ) : (
    <>
      {status !== 'completed' && pressure_drops_c1 < 1 ? (
        <StyledAlert
          showIcon
          type='warning'
          message='data.calculations.model_detail.warning'
          description='data.calculations.model_detail.warning.description.low_pressure'
          action={
            <StyledButton
              id='button.model_detail.go_second_step'
              label='data.calculations.model_detail.warning.button'
              type='primary'
              onClick={onGoToSecondStep}
            />
          }
        />
      ) : inlet_warning ? (
        <StyledAlert
          showIcon
          type='warning'
          message='data.calculations.model_detail.warning'
          description='data.calculations.model_detail.warning.description.inlet_warning'
        />
      ) : null}

      <GeneralInfo useCase={useCase} />
      <AirSide />

      {useCase === 'air_cooled_condenser' ? (
        <RefrigerantSide />
      ) : _.startsWith(useCase, 'water_') ? (
        <FluidSide fluid_c1={fluid_c1} />
      ) : _.startsWith(useCase, 'double_flow') ? (
        <CoolantSide useCase={useCase} />
      ) : null}

      {!_.isEmpty(fan_model_details) ? (
        <FanModelSide data={fan_model_details} />
      ) : null}

      <GeometricDetails
        useCase={useCase}
        modelGeomType={modelGeomType}
        stepMode={stepMode}
        detailData={detailData}
        stepModeC2={stepModeC2}
      />
    </>
  )
}

export default ModelDetail
