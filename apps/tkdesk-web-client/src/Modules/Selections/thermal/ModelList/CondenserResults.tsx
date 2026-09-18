import { Col } from 'antd'
import {
  StyledCard,
  StyledInputSearch,
  StyledRow,
  StyledTable,
} from 'Components/Styled'
import { useFormikContext } from 'formik'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import useTable from '../hooks/useTable'
import * as APISettings from 'Api/Thermal/api/endpoints'
import { applyFiltersToColumns, applyOrdersToColumns } from 'Model/table'
import { staticColumnThermalResults } from 'Model/Selections/table'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'
import { SpanIntl } from 'Components/Span'
import styled from 'styled-components'
import colors from 'styles/colors.module.scss'
import { CondenserDataTable } from 'Model/Selections/steps/ModelList/table'
import useCondenserPayload from '../../units/shared/condenserPayload'
import { useColumnUM } from './ColumnUM'
import { getCondenserDataTableColumns, useTableDetailUM } from './TableDetailUM'
import EntryConditions from '../ModelDetail/EntryConditions'

interface CondenserResultProps {
  condenser?: any
  data?: any
  params?: SearchParameters
  onUpdateParams?: any
  onLoadAccessories?: (payload: any) => void
  onLoadAccessoriesPrice?: (payload: any) => void

  saveMachineId?: any
  saveCondenserId?: any
  loading?: boolean
  preferences: any
}

const log = new ConsoleLogger('Modules/Selections/Thermal/ModelList')

function CondenserResults(props: CondenserResultProps) {
  const {
    data,
    params,
    onUpdateParams,
    saveMachineId,
    saveCondenserId,
    condenser,
    preferences,
  } = props

  const formik = useFormikContext<any>()
  const { values, setFieldValue } = formik
  const unitsType = _.get(preferences, 'um_system', 'si')
  const liveCondenser = _.get(values, 'condenser', condenser)
  const buildCondenserPayload = useCondenserPayload()
  const lastComputationPayloadRef = useRef<any>(null)

  const computationPayload = useMemo(() => {
    const condenserForRequest = _.omitBy(liveCondenser || {}, (_value, key) => {
      const field = String(key)
      return field.startsWith('detail') || field.startsWith('model')
    })

    // Inputs are normalized to SI, so results must be requested in SI too.
    // Display units are applied client-side from the UM selectors.
    return {
      ...buildCondenserPayload({ condenser: condenserForRequest }),
      selection_id: data?.id,
      unitsType: 'si',
      currentUnitType: 'si',
    }
  }, [buildCondenserPayload, data?.id, liveCondenser])

  const { filters, orders, query } = params || {}

  const [selectedModel, setSelectedModel] = useState([])
  const [selectedModelDetail, setSelectedModelDetail] = useState([])
  const tablesContainerRef = useRef(null)
  const isSyncingScrollRef = useRef(false)

  useEffect(() => {
    const tableBodies = _.map(
      tablesContainerRef.current?.querySelectorAll(
        '.synced-detail-table .ant-table-body',
      ) ?? [],
      (tableBody) => tableBody,
    )

    if (_.size(tableBodies) < 2) {
      return
    }

    const syncScroll = (event) => {
      if (isSyncingScrollRef.current) {
        return
      }

      const source = event.currentTarget

      isSyncingScrollRef.current = true

      _.forEach(tableBodies, (tableBody) => {
        if (tableBody !== source) {
          tableBody.scrollTop = source.scrollTop
        }
      })

      isSyncingScrollRef.current = false
    }

    _.forEach(tableBodies, (tableBody) => {
      tableBody.addEventListener('scroll', syncScroll)
    })

    return () => {
      _.forEach(tableBodies, (tableBody) => {
        tableBody.removeEventListener('scroll', syncScroll)
      })
    }
  }, [selectedModelDetail])

  const {
    handleQueryChange,
    handleTableChange,
    setDataTable,
    tableResults,
    tableLoading,
    tablePagination,
  } = useTable({
    params: props.params,
    onUpdateParams: onUpdateParams,
    getComputationResult: APISettings.getComputationResult,
  })

  //const um_system = um_system == 'imp' ? 'I-P (English)' : 'SI (Metric)'

  useEffect(() => {
    if (_.isEqual(lastComputationPayloadRef.current, computationPayload)) {
      return
    }

    lastComputationPayloadRef.current = computationPayload
    log.info('useEffect.types', { newValue: computationPayload })
    setDataTable(computationPayload)
  }, [computationPayload, setDataTable])

  const columns = useMemo(
    () =>
      _.flow([applyFiltersToColumns(filters), applyOrdersToColumns(orders)])(
        _.concat(staticColumnThermalResults),
      ),
    [filters, orders],
  )

  const { columns: tableColumns } = useColumnUM({
    columns,
    values,
    setFieldValue,
    unitTypes: unitsType,
  })
  const { configs: detailUMConfigs } = useTableDetailUM({
    values,
    setFieldValue,
    unitTypes: unitsType,
  })
  const condenserDetailColumns = getCondenserDataTableColumns(detailUMConfigs)

  log.info('CondenserResults', selectedModelDetail)

  const selectedMachineId = _.get(values, 'machineId')

  const selectModel = (model: any) => {
    const modelId = _.get(model, 'id', '')
    if (String(selectedMachineId) === String(modelId)) return

    setFieldValue('machineId', modelId)
    setFieldValue('condenser.modelId', model?.modelId)
    setFieldValue('condenser.id', model?.id)
    setFieldValue('condenser.current_a', model?.current_a)
    setFieldValue('condenser.price', model?.price)
    setFieldValue('condenser.remoteModel', model?.modelName)
    saveMachineId(model?.modelId)
  }

  type CondenserRow = Record<string, any>
  return (
    <>
      <EntryConditions />
      <StyledCard>
        <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
          <SpanIntl
            style={{ fontWeight: 'bold', margin: '10px 0 34px' }}
            value='ui.selections.steps.model_list'
          />
        </StyledRow>
        <StyledRow
          justify='end'
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
        </StyledRow>
        {/* <Row justify='end' align='middle' style={{ margin: '0 0 16px 0' }}>
            <Col span={12}>
              <StyledInputSearch
                placeholder='data.users.input'
                name='users'
                query={query}
                onChangeQuery={handleQueryChange}
              />
            </Col>
          </Row> */}

        {/* TABLE */}

        <ColumnUMTable>
          <StyledTable
            rowKey='id'
            dataSource={tableResults || []}
            loading={tableLoading}
            pagination={tablePagination}
            onChange={handleTableChange}
            columns={tableColumns}
            bordered
            tableLayout='auto'
            scroll={{ x: 'max-content', y: 55 * 5 }}
            rowSelection={{
              // type: 'radio',
              hideSelectAll: true,
              selectedRowKeys: selectedModel,
              onChange: (
                selectedRowKeys: React.Key[],
                selectedRows: CondenserRow[],
              ) => {
                if (selectedRowKeys.length > 3) {
                  return
                } else {
                  setSelectedModel(selectedRowKeys)
                  setSelectedModelDetail(selectedRows)
                }

                log.info('Selected table:', {
                  selectedRows,
                  selectedRowKeys,
                })
              },
            }}
          />
        </ColumnUMTable>
      </StyledCard>

      {_.isEmpty(selectedModelDetail) ? null : (
        <div ref={tablesContainerRef}>
          <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
            <SpanIntl
              style={{ fontWeight: 'bold', margin: '24px 0' }}
              value='ui.coils.microchannel.model_list'
            />
          </StyledRow>
          <ModelCardsGrid>
            {_.map(selectedModelDetail, (model: any) => {
              const modelId = _.get(model, 'id', '')
              const selected = String(selectedMachineId) === String(modelId)

              return (
                <ModelCard
                  key={modelId}
                  $selected={selected}
                  onClick={() => selectModel(model)}
                >
                  <StyledRow
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <SpanIntl
                      style={{ fontWeight: 'bold', marginBottom: '20px' }}
                      value={_.get(model, 'modelName', '')}
                    />
                  </StyledRow>

                  <div
                    onClick={(event) => event.stopPropagation()}
                    onMouseDown={(event) => event.stopPropagation()}
                  >
                    <CondenserDataTable
                      className='synced-detail-table'
                      data={model}
                      scroll={{ y: 320 }}
                      columns={condenserDetailColumns}
                    />
                  </div>
                </ModelCard>
              )
            })}
          </ModelCardsGrid>
        </div>
      )}
    </>
  )
}

const ColumnUMTable = styled.div`
  .ant-table-thead > tr > th {
    vertical-align: top;
  }

  .ant-table-thead .ant-table-column-title {
    width: 100%;
    display: block;
  }
`

const ModelCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`

const ModelCard = styled.div<{ $selected?: boolean }>`
  padding: 24px;
  border-radius: 8px;
  border: 1px solid
    ${({ $selected }) => ($selected ? colors.primary : colors.border)};
  background: ${colors.white};
  cursor: pointer;
  box-shadow: ${({ $selected }) =>
    $selected ? `0 0 0 1px ${colors.primary}` : 'none'};

  .synced-detail-table .ant-form-item {
    margin-bottom: 0;
  }

  .synced-detail-table .ant-form-item-explain,
  .synced-detail-table .ant-form-item-extra,
  .synced-detail-table .ant-form-item-additional {
    display: none;
  }

  .synced-detail-table .ant-select {
    min-width: 120px;
  }

  .synced-detail-table .ant-select-selector {
    padding-inline: 8px !important;
  }

  .synced-detail-table .ant-select-selection-item {
    overflow: visible;
    text-overflow: unset;
    white-space: nowrap;
  }
`

export default CondenserResults
