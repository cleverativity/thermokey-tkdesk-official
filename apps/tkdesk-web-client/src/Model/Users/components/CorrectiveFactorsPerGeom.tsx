import _ from 'lodash'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledTable,
} from 'Components/Styled'

import { FieldSwitch } from 'Components/Field'

import { staticColumnsEdit } from 'Model/Settings/table/userCorrectiveFactorsTable'

const CorrectiveFactorsPerGeom = (val: any, key: string) => {
  return (
    <StyledCollapse
      defaultActiveKey={_.map(val, (geoms, geoms_key) => geoms_key)}
    >
      {_.map(val, (geoms, geoms_key) => {
        return (
          <StyledCollapsePanel
            header={`select.coils.microchannel.geom_type.${geoms_key}`}
            key={geoms_key}
            collapsible='disabled'
            headerElement={
              <FieldSwitch
                hideLabel
                style={{ marginBottom: 0 }}
                hideRequired
                name={`user_permissions.microchannel.${key}.${geoms_key}.enabled`}
                overrideOnChange={(
                  value: any,
                  { field, form }: { field: any; form: any },
                ) => {
                  const { setFieldValue, values } = form

                  setFieldValue(field.name, value, true)

                  const geom_types_objs = _.get(
                    values,
                    `user_permissions.microchannel.${key}`,
                  )

                  const allFalse = _.every(
                    _.filter(
                      geom_types_objs,
                      (value, g_key) => g_key !== geoms_key,
                    ),
                    ['enabled', false],
                  )

                  const fieldPath = _.startsWith(key, 'free_cooling_condenser')
                    ? 'user_permissions.external.microchannel.free_cooling_condenser'
                    : `user_permissions.external.microchannel.${key}`

                  if (allFalse && !value) {
                    setFieldValue(fieldPath, false)
                  } else {
                    setFieldValue(fieldPath, true)
                  }
                }}
              />
            }
          >
            <StyledTable
              rowKey='key'
              dataSource={geoms.values}
              loading={false}
              pagination={false}
              columns={staticColumnsEdit({
                basePath: `user_permissions.microchannel.${key}.${geoms_key}`,
                enabledPath: `user_permissions.microchannel.${key}.${geoms_key}.enabled`,
              })}
            />
          </StyledCollapsePanel>
        )
      })}
    </StyledCollapse>
  )
}

export default CorrectiveFactorsPerGeom
