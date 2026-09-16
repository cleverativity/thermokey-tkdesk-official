import _ from 'lodash'
import { getIn } from 'formik'

import { StyledCollapse, StyledCollapsePanel } from 'Components/Styled'
import { FieldSwitch } from 'Components/Field'
import { FormikDependent } from 'Components/Formik'

import CorrectiveFactorsPerGeom from 'Model/Users/components/CorrectiveFactorsPerGeom'

import colors from 'styles/colors.module.scss'

const CalculationsEdit = ({ microchannel }) => {
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
            collapsible='disabled'
            headerElement={
              <FormikDependent
                propsFunction={({ formik }) => {
                  const geom_types_objs = getIn(
                    formik.values,
                    `user_permissions.microchannel.${key}`,
                  )

                  let allFalse = true
                  if (key === 'free_cooling_condenser') {
                    allFalse = _.every(geom_types_objs, (coreObj) =>
                      _.every(coreObj, ['enabled', false]),
                    )
                  } else {
                    allFalse = _.every(geom_types_objs, ['enabled', false])
                  }

                  return { geom_types_objs, allFalse }
                }}
                render={({ geom_types_objs, allFalse }) => {
                  return (
                    <FieldSwitch
                      defaultChecked={!allFalse}
                      hideLabel
                      style={{ marginBottom: 0 }}
                      hideRequired
                      name={`user_permissions.external.microchannel.${key}`}
                      overrideOnChange={(
                        value: any,
                        { field, form }: { field: any; form: any },
                      ) => {
                        const { setFieldValue } = form

                        setFieldValue(
                          `user_permissions.external.microchannel.${key}`,
                          value,
                        )

                        if (key === 'free_cooling_condenser') {
                          _.forEach(geom_types_objs, (coreObj, coreKey) => {
                            _.forEach(coreObj, (_geomVal, geomKey) => {
                              setFieldValue(
                                `user_permissions.microchannel.${key}.${coreKey}.${geomKey}.enabled`,
                                value,
                              )
                            })
                          })
                        } else {
                          const geom_types = _.keys(geom_types_objs)
                          _.forEach(geom_types, (geom_type: string) => {
                            setFieldValue(
                              `user_permissions.microchannel.${key}.${geom_type}.enabled`,
                              value,
                            )
                          })
                        }
                      }}
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

export default CalculationsEdit
