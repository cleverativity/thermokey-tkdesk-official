import { Card, Col, Row } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
import * as R from 'ramda'

import {
  StyledInputSearch,
  StyledPageHeader,
  StyledTable,
} from 'Components/Styled'

import { applyFiltersToColumns, applyOrdersToColumns } from 'Model/table'
import {
  actionColumn,
  actionsCreator,
  staticColumns,
} from 'Model/Selections/table'

const log = new ConsoleLogger('Modules/Selections/Search')

const SelectionsSearch = (props: any) => {
  log.info('render.props', props)

  const { data: selections, params, onEdit } = props
  const { filters, orders, pagination, query } = params

  const rowEvents = {
    onEdit: (id: any) => onEdit({ id }),
  }

  const tableColumns: any = R.pipe(
    applyFiltersToColumns(filters),
    applyOrdersToColumns(orders),
  )(R.append(actionColumn(actionsCreator(rowEvents, {})), staticColumns))

  const handleQueryChange = (query: string) => {
    const { onUpdateParams, params: paramss } = props
    if (!R.isNil(onUpdateParams)) {
      onUpdateParams({ ...paramss, query })
    }
  }

  const handleTableChange = (
    pagination: any,
    filters: string[],
    orders: string[],
  ) => {
    const { onUpdateParams, params: parameters } = props

    if (!R.isNil(onUpdateParams)) {
      onUpdateParams({ ...parameters, filters, orders, pagination })
    }
  }

  return (
    <>
      <StyledPageHeader title='data.selections.list_header' />
      <Row
        justify='space-between'
        align='middle'
        style={{ margin: '0 0 16px 0' }}
      >
        <Col span={12}>
          <StyledInputSearch
            placeholder='data.users.input'
            name='users'
            query={query}
            onChangeQuery={handleQueryChange}
          />
        </Col>
      </Row>

      <Card>
        <StyledTable
          rowKey='id'
          dataSource={selections}
          loading={false}
          pagination={pagination}
          onChange={handleTableChange}
          columns={tableColumns}
        />
      </Card>
    </>
  )
}

export default SelectionsSearch
