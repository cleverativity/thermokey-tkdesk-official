import _ from 'lodash'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledTable,
} from 'Components/Styled'
import { FieldSwitch } from 'Components/Field'

import { staticColumnsDetail as globalStaticColumnsDetail } from 'Model/Settings/table/globalCorrectiveFactorsTable'
import { staticColumnsDetail as userStaticColumnsDetail } from 'Model/Settings/table/userCorrectiveFactorsTable'

const CorrectiveFactorsPerGeom = (val: any, key: string, isUser?: boolean) => {
  return (
    <StyledCollapse>
      {_.map(val, (geoms, geoms_key) => (
        <StyledCollapsePanel
          header={`select.coils.microchannel.geom_type.${geoms_key}`}
          key={geoms_key}
          headerElement={
            <FieldSwitch
              hideLabel
              style={{ marginBottom: 0 }}
              hideRequired
              name={`user_permissions.microchannel.${key}.${geoms_key}.enabled`}
              disabled
            />
          }
        >
          <StyledTable
            rowKey='key'
            dataSource={geoms.values}
            loading={false}
            pagination={false}
            columns={
              isUser
                ? userStaticColumnsDetail({
                    basePath: `user_permissions.microchannel.${key}.${geoms_key}`,
                    enabledPath: `user_permissions.microchannel.${key}.${geoms_key}.enabled`,
                  })
                : globalStaticColumnsDetail(`microchannel.${key}.${geoms_key}`)
            }
          />
        </StyledCollapsePanel>
      ))}
    </StyledCollapse>
  )
}

export default CorrectiveFactorsPerGeom
