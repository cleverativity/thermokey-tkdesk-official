import _ from 'lodash'
import { useIntl } from 'react-intl'
import { Col } from 'antd'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledCover,
  StyledCoverText,
} from 'Components/Styled'
import ConditionalWrapper from 'Components/Generic/ConditionalWrapper'
import { FieldCheckbox } from 'Components/Field'

import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'
import { useAirflow } from 'Generic/hooks'

import Circuit from './Circuit'
import CircuitDoubleFlow from './CircuitDoubleFlow'
import CircuitFreeCooling from './CircuitFreeCooling'

const RefrigerantCircuit = ({
  useCase,
  steps_config,
  availableNOfTubesValues,
  geometricConstants,
  umSystem,
  selectGeomTypes,
}: any) => {
  const { geomSelected } = selectGeomTypes

  const intl = useIntl()
  const autho = useAuthorization()
  const { battery_active_length, geom_types, n_of_tubes } = useAirflow()

  const isDfGeomSelected = _.startsWith(useCase, 'double_flow')
  const isFreeCooling = useCase === 'free_cooling_condenser'

  return (
    <StyledCollapse defaultActiveKey={['2']} style={{ marginTop: '30px' }}>
      <StyledCollapsePanel
        header='ui.coils.microchannel.steps.input_parameters.refrigerant_circuit'
        key='2'
      >
        <div style={{ position: 'relative' }}>
          {(!geomSelected || battery_active_length === 0) && (
            <>
              <StyledCover />
              <StyledCoverText>
                {intl.formatMessage({
                  id: 'ui.coils.microchannel.steps.input_parameters.refrigerant_circuit.enable_section',
                })}
              </StyledCoverText>
            </>
          )}

          <ConditionalWrapper
            condition={!geomSelected || battery_active_length === 0}
            wrapper={(children: any) => (
              <Col span={24} style={{ paddingLeft: '20px' }}>
                {children}
              </Col>
            )}
          >
            {autho.check(rawPermissions.Calculation.manage) &&
              !isFreeCooling && (
                <FieldCheckbox
                  disabled={_.isEmpty(geom_types) || _.isNil(n_of_tubes)}
                  hideLabel
                  name='input_data.override_steps'
                  options={[
                    {
                      label:
                        'data.calculations.input_parameters.refrigerant_circuit.override_steps',
                    },
                  ]}
                />
              )}

            {isDfGeomSelected ? (
              <CircuitDoubleFlow
                useCase={useCase}
                steps_config={steps_config}
                availableNOfTubesValues={availableNOfTubesValues}
              />
            ) : isFreeCooling ? (
              <CircuitFreeCooling
                useCase={useCase}
                steps_config={steps_config}
                availableNOfTubesValues={availableNOfTubesValues}
              />
            ) : (
              <Circuit
                um_system={umSystem}
                use_case={useCase}
                steps_config={steps_config}
                available_n_of_tubes_values={availableNOfTubesValues}
                geometric_constants={geometricConstants}
              />
            )}
          </ConditionalWrapper>
        </div>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default RefrigerantCircuit
