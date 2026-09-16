import { useState } from 'react'

import { StyledButton, StyledPageHeader, StyledTable } from 'Components/Styled'
import { Card, Col, Row } from 'antd'
import { applyFiltersToColumns, applyOrdersToColumns } from 'Model/table'
import * as R from 'ramda'
import {
  actionColumn,
  actionsCreator,
  staticColumns,
} from 'Model/FanModels/Polynomials/table'
import _ from 'lodash'
import { useModal } from 'Generic/hooks'
import CreateEditPolynomial from 'Model/FanModels/Polynomials/modal/CreateEditPolynomial'
import { ConsoleLogger } from 'aws-amplify/utils'
import Graph from './Graph'
import ConfirmDeletePolynomial from 'Model/FanModels/Polynomials/modal/ConfirmDeletePolynomial'
import EditPolynomial from 'Model/FanModels/Polynomials/modal/EditPolynomial'

const log = new ConsoleLogger('Modules/Polynomials/Search')

interface PolynomialSearchProps {
  onCreate: () => void
  onBack: () => void
  onEdit: () => void
  onDelete: (id: any) => void
  data: Polynomials[]
  params: any
}

const PolynomialSearch = (props: PolynomialSearchProps) => {
  const {
    onCreate,
    onBack,
    onEdit,
    onDelete,
    data: polynomials,
    params,
  } = props
  log.info('render.props', props)

  const { filters, orders, fan_model_id } = params

  const [selectedPolynomial, setSelectedPolynomial] = useState<any>({
    data: [],
  })

  const {
    modal: modalCreate,
    handleOpenModal: handleOpenModalCreate,
    handleCloseModal: handleCloseModalCreate,
  } = useModal()

  const {
    modal: modalEdit,
    handleOpenModal: handleOpenModalEdit,
    handleCloseModal: handleCloseModalEdit,
  } = useModal()

  const {
    modal: modalConfirmDelete,
    handleOpenModal: handleOpenModalConfirmDelete,
    handleCloseModal: handleCloseModalConfirmDelete,
  } = useModal({ polynomials })

  const rowEvents = {
    onEdit: (polynomial: any) => {
      handleOpenModalEdit({ polynomial })
    },
    onDelete: (record: any) => {
      handleOpenModalConfirmDelete({ polynomials: record })
    },
  }

  const tableColumns: any = R.pipe(
    applyFiltersToColumns(filters),
    applyOrdersToColumns(orders),
  )(R.append(actionColumn(actionsCreator(rowEvents, {})), staticColumns))

  const handleOnChange = (values: any) => {
    const filteredPolynomial: any[] = _.filter(polynomials, {
      id: _.head(values),
    })
    setSelectedPolynomial({ data: filteredPolynomial })
  }

  const { data } = selectedPolynomial

  const usedOptions = _.chain(polynomials)
    .map((el) => {
      return el.polynomial_type
    })
    .uniq()
    .map((el) => {
      return { key: el }
    })
    .value()

  return (
    <>
      <StyledPageHeader title='data.fan_models.polynomial.header' />
      <Row
        justify='space-between'
        align='middle'
        style={{ marginBottom: '20px' }}
      >
        <Col>
          <StyledButton
            label='ui.generic.go_back'
            onClick={onBack}
            id='button.detail.goback'
          />
        </Col>
        <Col>
          <StyledButton
            label='ui.fan_models.polynomial.create'
            onClick={handleOpenModalCreate}
            type='primary'
            id='button.search.polynomial'
          />
        </Col>
      </Row>

      <Card>
        <StyledTable
          rowKey={(record: any) => _.get(record, 'id', '')}
          dataSource={polynomials}
          loading={false}
          bordered
          pagination={false}
          columns={tableColumns}
          rowSelection={{
            type: 'radio',
            onChange: (values: any) => {
              handleOnChange(values)
            },
          }}
        />
      </Card>

      {_.isEmpty(data) ? null : (
        <>
          {/* <FunctionPlot polynomials={data} /> */}
          <Graph polynomials={data} />
        </>
      )}

      <CreateEditPolynomial
        usedOptions={usedOptions}
        onCreate={onCreate}
        onEdit={onEdit}
        onCancel={handleCloseModalCreate}
        modal={{
          ...modalCreate,
          data: { __formik_state_reset: modalCreate.visible, fan_model_id },
          visible: modalCreate.visible,
          loading: false,
          progress: false,
          error: false,
        }}
        isNew='true'
      />

      <EditPolynomial
        onEdit={onEdit}
        onCancel={handleCloseModalEdit}
        modal={{
          ...modalEdit,
          visible: modalEdit.visible,
          loading: false,
          progress: false,
          error: false,
        }}
      />

      <ConfirmDeletePolynomial
        onDelete={onDelete}
        onCancel={handleCloseModalConfirmDelete}
        modal={{
          ...modalConfirmDelete,
          visible: modalConfirmDelete.visible,
          loading: false,
          progress: false,
          error: false,
        }}
      />
    </>
  )
}

export default PolynomialSearch
