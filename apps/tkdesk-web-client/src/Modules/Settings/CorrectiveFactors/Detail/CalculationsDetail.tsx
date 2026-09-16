import _ from 'lodash'
import { getIn } from 'formik'

import { FormikDependent } from 'Components/Formik'
import { StyledCollapse, StyledCollapsePanel } from 'Components/Styled'
import { FieldSwitch } from 'Components/Field'

import CorrectiveFactorsPerGeom from './CorrectiveFactorsPerGeom'

import colors from 'styles/colors.module.scss'

const CalculationsDetail = ({ microchannel }) => {
  return (
    <StyledCollapse
      backgroundColor={colors.disabled}
      defaultActiveKey={_.map(microchannel, (val, key) => key)}
    >
      {_.map(microchannel, (val, key) => {
        return (
          <StyledCollapsePanel
            header={`select.coils.microchannel.use_case.${key}`}
            key={key}
            headerElement={
              <FormikDependent
                propsFunction={({ formik }) => {
                  const geom_types_objs = getIn(
                    formik.values,
                    `microchannel.${key}`,
                  )

                  let allFalse = true
                  if (key === 'free_cooling_condenser') {
                    allFalse = _.every(geom_types_objs, (coreObj) =>
                      _.every(coreObj, ['enabled', false]),
                    )
                  } else {
                    allFalse = _.every(geom_types_objs, ['enabled', false])
                  }

                  return { allFalse }
                }}
                render={({ allFalse }) => {
                  return (
                    <FieldSwitch
                      defaultChecked={!allFalse}
                      hideLabel
                      style={{ marginBottom: 0 }}
                      hideRequired
                      disabled
                    />
                  )
                }}
              />
            }
          >
            {key === 'free_cooling_condenser' ? (
              <StyledCollapse defaultActiveKey={['c1', 'c2']}>
                {_.map(val, (core, core_key) => {
                  return (
                    <StyledCollapsePanel
                      header={`select.coils.microchannel.core.${core_key}`}
                      key={core_key}
                    >
                      {CorrectiveFactorsPerGeom(core, `${key}.${core_key}`)}
                    </StyledCollapsePanel>
                  )
                })}
              </StyledCollapse>
            ) : (
              CorrectiveFactorsPerGeom(val, key)
            )}
          </StyledCollapsePanel>
        )
      })}
    </StyledCollapse>
  )
}

export default CalculationsDetail
