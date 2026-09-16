import _ from 'lodash'

import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledTable,
} from 'Components/Styled'

import { staticColumnsEdit } from 'Model/Settings/table/userCorrectiveFactorsTable'

import colors from 'styles/colors.module.scss'

const SelectionsEdit = ({ selector }) => {
  return (
    <StyledCollapse
      backgroundColor={colors.disabled}
      defaultActiveKey={_.map(selector, (val, key) => key)}
    >
      {_.map(selector, (val, key) => (
        <StyledCollapsePanel
          header={`select.selector.use_case.${key}`}
          key={key}
        >
          <StyledTable
            rowKey={key}
            dataSource={val.values}
            loading={false}
            pagination={false}
            columns={staticColumnsEdit({
              basePath: `user_permissions.selector.${key}`,
            })}
          />
        </StyledCollapsePanel>
      ))}
    </StyledCollapse>
  )
}

export default SelectionsEdit
