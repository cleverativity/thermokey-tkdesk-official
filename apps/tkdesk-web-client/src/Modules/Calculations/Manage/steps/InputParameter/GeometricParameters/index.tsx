import _ from 'lodash'
import { useFormikContext } from 'formik'

import rawFpi from 'Localization/Constants/fpi.json'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'
import { FieldDecimalNumber, FieldNumberSelect } from 'Components/Field'

import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'

import FormGeometricParameters from './FormGeometricParameters'

const INCLUDED_USE_CASES = [
  'air_cooled_condenser',
  'water_cooler',
  'water_heater',
]

const GeometricParameters = ({
  useCase,
  enabledCorrectiveFactors,
  geometricConstants = [],
  selectGeomTypes,
}: any) => {
  const autho = useAuthorization()
  const formik = useFormikContext()

  const fluidC1: string = _.get(formik.values, 'input_data.fluid_c1.value', '')

  const minMaxBattery =
    autho.iAmOem || autho.iAmInternal
      ? {
          min: 700,
          max:
            _.includes(INCLUDED_USE_CASES, useCase) && fluidC1 === 'r717'
              ? 3000
              : 4000,
        }
      : {}

  return (
    <StyledCollapse defaultActiveKey={['1']}>
      <StyledCollapsePanel
        header='ui.coils.microchannel.steps.input_parameters.geometric_parameters'
        key='1'
      >
        <StyledRow>
          <FieldDecimalNumber
            required
            span={{ sm: 24, md: 12, lg: 4 }}
            {...minMaxBattery}
            name='input_data.battery_active_length'
            scale={0}
            label='data.calculations.input_parameters.battery_active_length'
          />

          {autho.check(rawPermissions.Calculation.manage) ? (
            <FieldDecimalNumber
              scale={0}
              required
              span={{ sm: 24, md: 12, lg: 5 }}
              name='input_data.channel_discretization_count'
              label='data.calculations.input_parameters.channel_discretization_count'
            />
          ) : null}

          {useCase !== 'free_cooling_condenser' && (
            <FieldNumberSelect
              span={{ sm: 24, md: 12, lg: 5 }}
              name='input_data.fpi'
              label='data.calculations.input_parameters.fpi'
              options={rawFpi}
              unlocalizeMessage
            />
          )}
        </StyledRow>

        <FormGeometricParameters
          useCase={useCase}
          enabledCorrectiveFactors={enabledCorrectiveFactors}
          geometricConstants={geometricConstants}
          selectGeomTypes={selectGeomTypes}
        />
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default GeometricParameters
