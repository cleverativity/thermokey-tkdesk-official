import * as R from 'ramda'
import { Card, Col, Row } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ConsoleLogger } from 'aws-amplify/utils'

import useModal from 'Generic/hooks/useModal'

import {
  StyledButton,
  StyledInputSearch,
  StyledPageHeader,
  StyledRow,
  StyledTable,
} from 'Components/Styled'
import { FieldMinMax } from 'Components/Field'
import { FormikForm, FormikSubmit } from 'Components/Formik'

import { applyFiltersToColumns, applyOrdersToColumns } from 'Model/table'
import {
  actionColumn,
  actionsCreator,
  staticColumns,
} from 'Model/FanModels/table'
import ImportFanModels from 'Model/FanModels/modal/ImportFanModels'

const log = new ConsoleLogger('App/FanModels/Search')

interface FanModelSearchProps {
  data: FanModels[]
  params: SearchParameters
  isUploading: boolean
  onFanModelNew: () => void
  onImportFans: (documents: any) => void
  onFanModelEdit: (fan_model: any) => void
  onFanModelDetail: (fan_model: any) => void
  onUpdateParams: any
}

const FanModelSearch = (props: FanModelSearchProps) => {
  const {
    data,
    params,
    isUploading,
    onFanModelNew,
    onImportFans,
    onFanModelEdit,
    onFanModelDetail,
    onUpdateParams,
  } = props
  log.info('render.props', { props })

  const { filters, orders, pagination, query, ranges } = params

  const {
    modal: modalImportFanModels,
    handleOpenModal: handleOpenModalImportFanModels,
    handleCloseModal: handleCloseModalImportFanModels,
  } = useModal({})

  const rowEvents = {
    onEdit: (id: any) => onFanModelEdit({ id }),
    onDetail: (id: any) => onFanModelDetail({ id }),
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
    const { onUpdateParams, params: parameters } = props
    if (!R.isNil(onUpdateParams)) {
      onUpdateParams({ ...parameters, query })
    }
  }

  const handleRangesChange = (values: any) => {
    const { params: parameters } = props

    onUpdateParams({
      ...parameters,
      ranges: { ...ranges, ...values },
    })
  }

  return (
    <>
      <StyledPageHeader title='data.fan_models.header' />
      <Row
        justify='space-between'
        align='middle'
        style={{ margin: '0 0 16px 0' }}
      >
        <Col span={12}>
          <StyledInputSearch
            placeholder='data.fan_models.input'
            name='fan_models'
            query={query}
            onChangeQuery={handleQueryChange}
          />
        </Col>

        <Col>
          <StyledButton
            label='ui.fan_models.create.import'
            onClick={handleOpenModalImportFanModels}
            id='button.search.importFans'
            loading={isUploading}
            disabled={isUploading}
            data-cy='button.search.importFans'
            style={{ marginRight: 20 }}
          />
          <StyledButton
            label='ui.fan_models.create'
            onClick={onFanModelNew}
            type='primary'
            id='button.search.fanModelNew'
            data-cy='button.search.fanModelNew'
          />
        </Col>
      </Row>

      <FormikForm initialValues={ranges} onSubmit={handleRangesChange}>
        <StyledRow style={{ alignItems: 'end' }}>
          <FieldMinMax
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='fan_diameter'
            label='data.fan_models.fan_diameter'
            scale={0}
            isRange
          />
          <FieldMinMax
            span={{ sm: 24, lg: 12, xl: 6 }}
            name='voltage'
            label='data.fan_models.voltage'
            scale={0}
            isRange
          />

          <FormikSubmit
            id='button.search.ranges.voltage'
            icon={<SearchOutlined />}
            label='ui.generic.search'
            style={{ marginBottom: '24px' }}
          />
        </StyledRow>
      </FormikForm>

      <Card>
        <StyledTable
          rowKey='id'
          dataSource={data}
          loading={false}
          pagination={pagination}
          onChange={handleTableChange}
          columns={tableColumns}
        />
      </Card>

      <ImportFanModels
        onImportFans={onImportFans}
        onCancel={handleCloseModalImportFanModels}
        modal={{
          ...modalImportFanModels,
          visible: modalImportFanModels.visible,
        }}
      />
    </>
  )
}

export default FanModelSearch
