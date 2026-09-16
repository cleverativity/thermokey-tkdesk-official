import _ from 'lodash'
import { Col, Image } from 'antd'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
  StyledSeparator,
  StyledTable,
} from 'Components/Styled'
import { FormikDependent } from 'Components/Formik'

import mpe_hp_mono from 'Images/Coils/Detail/MPE_32_25_HP_MONO.jpg'
import mpe_hp_multi from 'Images/Coils/Detail/MPE_32_25_HP_MULTI.jpg'

import mpe_lp_mono from 'Images/Coils/Detail/MPE_32_LP_MONO.jpg'
import mpe_lp_multi from 'Images/Coils/Detail/MPE_32_LP_MULTI.jpg'

import r717_mono from 'Images/Coils/Detail/R717_MONO.jpg'
import r717_multi from 'Images/Coils/Detail/R717_MULTI.jpg'

import df_rw_MONO from 'Images/Coils/Detail/df_rw_MONO.jpg'

import df_rw_REF_MONO from 'Images/Coils/Detail/df_rw_REF-MONO.jpg'
import df_rw_REF_MULTI from 'Images/Coils/Detail/df_rw_REF-MULTI.jpg'

import df_rw_MULTI from 'Images/Coils/Detail/df_rw_MULTI.jpg'

import GeometricDetailsTables from 'Model/Calculations/ModelDetail/table/GeometricDetailsTables'
import { staticColumnsPassNumber } from 'Model/Calculations/InputParameters/table'
import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'

import * as F from '../InputParameter/functions'

const getImageToShow = (
  useCase: string,
  stepMode: string,
  fluidC1: string | null,
  coreKey?: string,
  stepModeC2?: string,
): string | undefined => {
  const isMono = stepMode === 'monostep'
  const isMonoC2 = stepModeC2 === 'monostep'
  const isR717 = fluidC1 === 'r717'
  const isCondenser = useCase === 'air_cooled_condenser' || coreKey === 'c2'

  if (isR717) {
    return isMono ? r717_mono : r717_multi
  }

  if (useCase === 'double_flow_rw') {
    return isMono && isMonoC2
      ? df_rw_MONO
      : isMono && !isMonoC2
        ? df_rw_REF_MONO
        : !isMono && isMonoC2
          ? df_rw_REF_MULTI
          : df_rw_MULTI
  } else if (useCase === 'double_flow_ww') {
    // TODO: inserire immagini per df
    return undefined
  }

  if (isCondenser) {
    return isMono ? mpe_hp_mono : mpe_hp_multi
  } else {
    return isMono ? mpe_lp_mono : mpe_lp_multi
  }
}

const GeometricDetails = ({
  useCase,
  stepMode,
  detailData,
  coreKey = null,
  stepModeC2 = null,
}: any) => {
  const autho = useAuthorization()

  const fluidC1 = _.get(detailData, 'refrigerant_details.fluid_c1.value', null)
  const imageToShow = getImageToShow(
    useCase,
    stepMode,
    fluidC1,
    coreKey,
    stepModeC2,
  )

  return (
    <StyledCollapse defaultActiveKey={['6']}>
      <StyledCollapsePanel
        key='6'
        header='ui.coils.microchannel.model_detail.geometric_details'
      >
        {autho.check(rawPermissions.Calculation.manage) ? (
          <StyledRow style={{ marginBottom: 30 }}>
            <FormikDependent
              propsFunction={({ formik }) => {
                const circuit = _.get(formik.values, 'circuit')
                const geomType = _.get(
                  formik.values,
                  'detail_data.geometric_details.geom_type.value',
                  '2M',
                )

                const geometryPrefix = F.getPrefix(geomType)

                return { circuit, geometryPrefix }
              }}
              render={({ circuit, geometryPrefix }) => {
                const dataSource = _.get(
                  circuit,
                  _.isNil(coreKey) ? geometryPrefix : `steps_${coreKey}`,
                  [],
                )

                return (
                  <>
                    {_.startsWith(useCase, 'double_flow') ? (
                      _.map(['c1', 'c2'], (key: string) => (
                        <>
                          <StyledSeparator
                            withText={`ui.coils.microchannel.steps.input_parameters.entry_conditions.${key === 'c1' ? 'fluid_primary' : 'fluid_secondary'}`}
                          />
                          <Col span={24}>
                            <StyledTable
                              rowKey='key'
                              loading={false}
                              dataSource={_.get(circuit, `steps_${key}`)}
                              pagination={false}
                              columns={staticColumnsPassNumber}
                            />
                          </Col>
                        </>
                      ))
                    ) : (
                      <Col span={24}>
                        <StyledTable
                          rowKey='key'
                          loading={false}
                          dataSource={dataSource}
                          pagination={false}
                          columns={staticColumnsPassNumber}
                        />
                      </Col>
                    )}
                  </>
                )
              }}
            />
          </StyledRow>
        ) : null}

        <StyledRow style={{ display: 'flex', alignItems: 'flex-start' }}>
          <Col xs={24} sm={24} lg={24} xl={15}>
            <Image src={imageToShow} />
          </Col>
          <Col xs={24} sm={24} lg={24} xl={9}>
            <GeometricDetailsTables detailData={{ ...detailData, useCase }} />
          </Col>
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default GeometricDetails
