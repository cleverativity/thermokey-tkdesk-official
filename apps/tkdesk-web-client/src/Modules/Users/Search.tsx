import * as R from 'ramda'
import { Row, Col, Card } from 'antd'
import {
  StyledPageHeader,
  StyledInputSearch,
  StyledButton,
  StyledTable,
} from 'Components/Styled'
import { actionColumn, actionsCreator, staticColumns } from 'Model/Users/table'
import { applyFiltersToColumns, applyOrdersToColumns } from 'Model/table'
import { useAuthorization } from 'Modules/App/Authorization'
import { rawPermissions } from 'Model/App/Authorization/constant'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('App/Users/Search')

interface UserSearchProps {
  onUserNew: () => void
  onUserEdit: (user: any) => void
  onUserDetail: (user: any) => void
  onExport: (language: string) => void
  onUpdateParams: any
  data: User[]
  params: SearchParameters
  preferences: any
}

const UserSearch = (props: UserSearchProps) => {
  const {
    onUserNew,
    onUserEdit,
    onUserDetail,
    onExport,
    data: users,
    params,
    preferences,
  } = props
  log.info('render.props', props)

  const { filters, orders, pagination, query } = params
  const autho = useAuthorization()
  const language: string = _.get(preferences, 'language', 'it')

  log.info('UserSearch.params', params)
  const rowEvents = {
    onEdit: (id: any) => onUserEdit({ id }),
    onDetail: (id: any) => onUserDetail({ id }),
  }

  const tableColumns: any = R.pipe(
    applyFiltersToColumns(filters),
    applyOrdersToColumns(orders),
  )(R.append(actionColumn(actionsCreator(rowEvents, {})), staticColumns))

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

  const handleQueryChange = (query: string) => {
    const { onUpdateParams, params: paramss } = props
    if (!R.isNil(onUpdateParams)) {
      onUpdateParams({ ...paramss, query })
    }
  }

  return (
    <>
      <StyledPageHeader title='data.users.header' />
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
        <Col>
          {autho.check(rawPermissions.User.manage) ? (
            <StyledButton
              label='data.users.export_data'
              onClick={() => onExport(language)}
              id='button.search.export_data'
              data-cy='button.search.exportData'
              style={{ marginRight: 20 }}
            />
          ) : null}

          <StyledButton
            label='ui.users.create_user'
            onClick={onUserNew}
            type='primary'
            id='button.search.userNew'
            data-cy='button.search.userNew'
          />
        </Col>
      </Row>
      <Card>
        <StyledTable
          rowKey='id'
          dataSource={users}
          loading={false}
          pagination={pagination}
          // loading={updating}
          onChange={handleTableChange}
          columns={tableColumns}
        />
      </Card>
    </>
  )
}

export default UserSearch
