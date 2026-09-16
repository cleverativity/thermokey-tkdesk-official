import _ from 'lodash'
import { Card, Col, Dropdown, Row } from 'antd'
import { ConsoleLogger } from 'aws-amplify/utils'
import { DownOutlined } from '@ant-design/icons'
import { useIntl } from 'react-intl'
import dayjs from 'dayjs'

import {
  actionColumn,
  actionsCreator,
  staticColumns,
} from 'Model/Calculations/table'
import { applyFiltersToColumns, applyOrdersToColumns } from 'Model/table'
import { rawPermissions } from 'Model/App/Authorization/constant'
import DownloadSolveReport from 'Model/Calculations/modal/DownloadSolveReport'

import {
  StyledButton,
  StyledInputSearch,
  StyledPageHeader,
  StyledTable,
} from 'Components/Styled'

import { useAuthorization } from 'Modules/App/Authorization'
import { useModal } from 'Generic/hooks'

const log = new ConsoleLogger('App/Calculations/Search')

interface CalculationSearchProps {
  data: CalculationFront[]
  params: SearchParameters
  onUpdateParams: any
  onCalculationEdit: (id: any) => void
  onExport: (filters: any) => void
  onExportSolveReport: (dates: any) => void
}

const CalculationsSearch = (props: CalculationSearchProps) => {
  const {
    data: calculations,
    params,
    onCalculationEdit,
    onExport,
    onExportSolveReport,
  } = props
  log.info('render.props', props)

  const { filters, orders, pagination, query } = params
  const autho = useAuthorization()
  const intl = useIntl()

  const startOfMonth = dayjs().startOf('month')
  const today = dayjs()

  const {
    modal: modalDownloadSolveReport,
    handleOpenModal: handleOpenModalDownloadSolveReport,
    handleCloseModal: handleCloseModalDownloadSolveReport,
  } = useModal({})

  const items = [
    {
      label: intl.formatMessage({ id: 'data.calculations.export_data.list' }),
      key: '1',
    },
    {
      label: intl.formatMessage({ id: 'data.calculations.export_data.solve' }),
      key: '2',
    },
  ]

  const handleMenuClick = ({ key }: any) => {
    if (key === '1') {
      onExport(filters)
    } else {
      handleOpenModalDownloadSolveReport({})
    }
  }

  const menuProps = {
    items,
    onClick: handleMenuClick,
  }

  const rowEvents = {
    onEdit: (id: any) => onCalculationEdit({ id }),
  }

  const tableColumns: any = _.flow([
    applyFiltersToColumns(filters),
    applyOrdersToColumns(orders),
  ])(_.concat(staticColumns, actionColumn(actionsCreator(rowEvents, {}))))

  const handleTableChange = (
    pagination: any,
    filters: string[],
    orders: string[],
  ) => {
    const { onUpdateParams, params: parameters } = props
    if (!_.isNil(onUpdateParams)) {
      onUpdateParams({ ...parameters, filters, orders, pagination })
    }
  }

  const handleQueryChange = (query: string) => {
    const { onUpdateParams, params: paramss } = props
    if (!_.isNil(onUpdateParams)) {
      onUpdateParams({ ...paramss, query })
    }
  }

  return (
    <>
      <StyledPageHeader title='data.calculations.list_header' />
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
          {autho.check(rawPermissions.Calculation.manage) ? (
            <Dropdown menu={menuProps}>
              <StyledButton
                label='data.calculations.export_data'
                onClick={() => {}}
                id='button.search.export_data'
                data-cy='button.search.exportData'
                icon={<DownOutlined />}
                style={{ flexDirection: 'row-reverse' }}
              />
            </Dropdown>
          ) : null}
        </Col>
      </Row>

      <Card>
        <StyledTable
          rowKey='id'
          dataSource={calculations}
          loading={false}
          pagination={pagination}
          onChange={handleTableChange}
          columns={tableColumns}
        />
      </Card>

      <DownloadSolveReport
        onExportSolveReport={onExportSolveReport}
        onCancel={handleCloseModalDownloadSolveReport}
        modal={{
          ...modalDownloadSolveReport,
          visible: modalDownloadSolveReport.visible,
          data: {
            __formik_state_reset: modalDownloadSolveReport.visible,
            date_period: [
              startOfMonth.format('YYYY-MM-DD'),
              today.format('YYYY-MM-DD'),
            ],
          },
          loading: false,
          progress: false,
          error: false,
        }}
      />
    </>
  )
}

export default CalculationsSearch
