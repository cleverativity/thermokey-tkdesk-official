import _ from 'lodash'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'
import { Col } from 'antd'

import { useModal } from 'Generic/hooks'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledCover,
  StyledCoverText,
} from 'Components/Styled'
import ConditionalWrapper from 'Components/Generic/ConditionalWrapper'

import FanManagement from 'Model/Calculations/modal/FanManagement'
import * as MC from 'Model/Calculations/marshal'

import FormFluidAirCooled from './FormFluidAirCooled'
import FormFluidWater from './FormFluidWater'
import FormFluidDoubleFlow from './FormFluidDoubleFlow'
import FormFluidFreeCooling from './FormFluidFreeCooling'
import FormAirSide from './FormAirSide'

import * as F from './functions'

const OperatingCondition = ({
  params,
  userType,
  refrigerants,
  fanModels,
  onUpdateParams,
  selectGeomTypes,
}: any) => {
  const { geomSelected } = selectGeomTypes

  const intl = useIntl()
  const {
    modal: modalCreate,
    handleOpenModal: handleOpenModalCreate,
    handleCloseModal: handleCloseModalCreate,
  } = useModal({})

  const formik = useFormikContext()
  const { values }: any = formik

  const useCase: any = _.get(values, 'use_case', null)
  const geometries: string[] = _.get(values, 'input_data.geom_types.value', [])

  const setRangesAndHandleOpenModal = (event: any) => {
    F.setFanDiameter({ values, geometries, params, onUpdateParams })

    handleOpenModalCreate(event)
  }

  return (
    <>
      <StyledCollapse defaultActiveKey={['3']} style={{ marginTop: '30px' }}>
        <StyledCollapsePanel
          header='ui.coils.microchannel.steps.input_parameters.entry_conditions'
          key='3'
        >
          <div style={{ position: 'relative' }}>
            {!geomSelected && (
              <>
                <StyledCover />
                <StyledCoverText>
                  {intl.formatMessage({
                    id: 'ui.coils.microchannel.steps.input_parameters.entry_conditions.enable_section',
                  })}
                </StyledCoverText>
              </>
            )}

            <ConditionalWrapper
              condition={!geomSelected}
              wrapper={(children: any) => (
                <Col span={24} style={{ paddingLeft: '20px' }}>
                  {children}
                </Col>
              )}
            >
              {useCase === 'air_cooled_condenser' ? (
                <FormFluidAirCooled
                  user_type={userType}
                  refrigerants={refrigerants}
                  geometries={geometries}
                />
              ) : useCase === 'water_cooler' || useCase === 'water_heater' ? (
                <FormFluidWater
                  user_type={userType}
                  refrigerants={refrigerants}
                  use_case={useCase}
                />
              ) : _.startsWith(useCase, 'double_flow') ? (
                <FormFluidDoubleFlow
                  use_case={useCase}
                  user_type={userType}
                  refrigerants={refrigerants}
                />
              ) : useCase === 'free_cooling_condenser' ? (
                <FormFluidFreeCooling
                  userType={userType}
                  refrigerants={refrigerants}
                />
              ) : null}

              <FormAirSide
                handleOpenModalCreate={setRangesAndHandleOpenModal}
              />
            </ConditionalWrapper>
          </div>
        </StyledCollapsePanel>
      </StyledCollapse>

      <FanManagement
        onCancel={handleCloseModalCreate}
        onUpdateParams={onUpdateParams}
        modal={{
          ...modalCreate,
          params,
          data: {
            __formik_state_reset: modalCreate.visible,
            ...(values ?? {}),
            fan_models: fanModels,
            params: MC.marshalParamsFrom(params),
          },
          visible: modalCreate.visible,
          loading: false,
          progress: false,
          error: false,
        }}
      />
    </>
  )
}

export default OperatingCondition
