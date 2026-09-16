import _ from 'lodash'
import { getIn } from 'formik'

import {
  StyledCollapsePanel,
  StyledCollapse,
  StyledTable,
} from 'Components/Styled'
import { FieldSwitch } from 'Components/Field'

import { staticColumnsEdit } from 'Model/Settings/table/globalCorrectiveFactorsTable'

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
                name={`microchannel.${key}.${geoms_key}.enabled`}
                overrideOnChange={(
                  value: any,
                  { field, form }: { field: any; form: any },
                ) => {
                  const { setFieldValue, values } = form

                  setFieldValue(field.name, value, true)

                  const geom_types_objs = getIn(values, `microchannel.${key}`)

                  const allFalse = _.every(
                    _.filter(
                      geom_types_objs,
                      (value, g_key) => g_key !== geoms_key,
                    ),
                    ['enabled', false],
                  )

                  const fieldPath = _.startsWith(key, 'free_cooling_condenser')
                    ? 'external.microchannel.free_cooling_condenser'
                    : `external.microchannel.${key}`

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
              columns={staticColumnsEdit(`microchannel.${key}.${geoms_key}`)}
            />
          </StyledCollapsePanel>
        )
      })}
    </StyledCollapse>
  )
}

export default CorrectiveFactorsPerGeom
