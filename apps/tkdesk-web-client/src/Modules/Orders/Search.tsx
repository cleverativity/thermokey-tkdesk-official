import { useState } from 'react'
import _ from 'lodash'

import { actionColumn, actionsCreator, staticColumns } from 'Model/Orders/table'
import { applyFiltersToColumns, applyOrdersToColumns } from 'Model/table'
import {
  StyledInputSearch,
  StyledPageHeader,
  StyledTable,
} from 'Components/Styled'
import { Card, Col, Row } from 'antd'
import ChangeStatusModal from 'Model/Orders/modal/ChangeStatus'
import { FormikForm } from 'Components/Formik'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('App/Orders/Search')

interface OrdersSearchProps {
  onUpdateParams: any
  data: OrderFront[]
  params: SearchParameters
  onCalculationDetail: any
  onChangeStatus: any
  language: 'it' | 'en'
}

const OrdersSearch = (props: OrdersSearchProps) => {
  const {
    data: orderss,
    params,
    onCalculationDetail,
    onChangeStatus,
    language,
  } = props
  log.info('render.props', props)

  const { filters, orders, pagination, query } = params

  const [modalChangeStatus, setModalChangeStatus] = useState({
    visible: false,
    error: false,
    loading: false,
    id: null,
  })

  const rowEvents = {
    onCalculationDetail: (id: any) => onCalculationDetail({ id }),
    onChangeStatus: (id: any) =>
      setModalChangeStatus({ ...modalChangeStatus, visible: true, id }),
  }

  const handleCloseModalChangeStatus = () => {
    setModalChangeStatus({ ...modalChangeStatus, visible: false })
  }

  const tableColumns: any = _.flow([
    applyFiltersToColumns(filters),
    applyOrdersToColumns(orders),
  ])([...staticColumns, actionColumn(actionsCreator(rowEvents, {}))])

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

  const objStatus = _.reduce(
    orderss,
    (acc: any, order: OrderFront) => ({
      ...acc,
      [`status_${order.id}`]: order.status,
    }),
    {},
  )

  return (
    <>
      <StyledPageHeader title='data.orders.header' />
      <Row
        justify='space-between'
        align='middle'
        style={{ margin: '0 0 16px 0' }}
      >
        <Col span={12}>
          <StyledInputSearch
            placeholder='data.orders.input'
            name='users'
            query={query}
            onChangeQuery={handleQueryChange}
          />
        </Col>
        <Col></Col>
      </Row>
      <FormikForm initialValues={objStatus}>
        <Card>
          <StyledTable
            rowKey='id'
            dataSource={orderss}
            loading={false}
            pagination={pagination}
            // loading={updating}
            onChange={handleTableChange}
            columns={tableColumns}
          />
        </Card>
        <ChangeStatusModal
          onChangeStatus={onChangeStatus}
          onCancel={handleCloseModalChangeStatus}
          modal={{
            ...modalChangeStatus,
            visible: modalChangeStatus.visible,
            data: {
              __formik_state_reset: modalChangeStatus.visible,
              objStatus,
            },
            loading: false,
            progress: false,
            error: false,
          }}
        />
      </FormikForm>
    </>
  )
}

export default OrdersSearch
