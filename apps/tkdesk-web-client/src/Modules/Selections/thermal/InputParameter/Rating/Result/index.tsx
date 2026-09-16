import { Col } from 'antd'
import { Span, SpanIntl } from 'Components/Span'
import {
  StyledCard,
  StyledCollapse,
  StyledCollapsePanel,
  StyledInputSearch,
  StyledRow,
  StyledTable,
} from 'Components/Styled'
import _ from 'lodash'
import { applyFiltersToColumns, applyOrdersToColumns } from 'Model/table'
import { staticColumnPefResults } from 'Model/Selections/table'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import AirData from './AirData'
import CoilData from './CoilData'
import LiquidData from './LiquidData'
import NoiseData from './NoiseData'
import PerfData from './PerfData'
import UnitData from './UnitData'
import VentilationData from './VentilationData'
import { PefMachine } from './types'

interface RatingResultProps {
  machines?: PefMachine[]
  loading?: boolean
  params?: SearchParameters
  onUpdateParams?: any
  filterContent?: React.ReactNode
  fieldsContent?: React.ReactNode
}

const PLACEHOLDER = '-'

/** Placeholder list until PEF results are loaded from the API. */
const SAMPLE_MACHINES: PefMachine[] = [
  {
    id: '1',
    modelCode: 'TMWH1190C12DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'C12',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 1,
    rows: 2,
    length: 1190,
    width: 900,
    height: 650,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '2',
    modelCode: 'TMWH1190C11DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'C11',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 1,
    rows: 1,
    length: 1190,
    width: 900,
    height: 650,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '3',
    modelCode: 'TMWH1190C22DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'C22',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 2,
    rows: 2,
    length: 1190,
    width: 900,
    height: 650,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '4',
    modelCode: 'TMWH1190C21DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'C21',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 2,
    rows: 1,
    length: 1190,
    width: 900,
    height: 650,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '5',
    modelCode: 'TMWH1190D12DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'D12',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 1,
    rows: 2,
    length: 1190,
    width: 900,
    height: 700,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '6',
    modelCode: 'TMWH1190D11DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'D11',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 1,
    rows: 1,
    length: 1190,
    width: 900,
    height: 700,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '7',
    modelCode: 'TMWH1190D22DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'D22',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 2,
    rows: 2,
    length: 1190,
    width: 900,
    height: 700,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '8',
    modelCode: 'TMWH1190D21DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'D21',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 2,
    rows: 1,
    length: 1190,
    width: 900,
    height: 700,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '9',
    modelCode: 'TMWH1190E12DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'E12',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 1,
    rows: 2,
    length: 1190,
    width: 950,
    height: 650,
    quantity: 1,
    fanQuantity: 1,
  },
  {
    id: '10',
    modelCode: 'TMWH1190E11DM2HTM',
    fanCode: 'FC090-SDS.7Q.6',
    coilCode: 'E11',
    series: 'TMWH',
    fanType: 'Axial',
    fanNumber: 1,
    rows: 1,
    length: 1190,
    width: 950,
    height: 650,
    quantity: 1,
    fanQuantity: 1,
  },
]

const RatingLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'filters'
    'machines'
    'fields'
    'calcs';
  gap: 16px 24px;

  @media (min-width: 992px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
    grid-template-areas:
      'filters machines'
      'fields calcs';
    align-items: stretch;
  }

  .rating-filters {
    grid-area: filters;
  }

  .rating-machines {
    grid-area: machines;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .rating-fields-col {
    grid-area: fields;
  }

  .rating-calcs {
    grid-area: calcs;
  }

  @media (min-width: 992px) {
    .rating-machines-inner {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
    }

    .rating-machines {
      position: relative;
    }
  }
`

const MachinesCard = styled(StyledCard)`
  && {
    height: 100%;
    margin-bottom: 20px !important;
    display: flex;
    flex-direction: column;
  }

  .ant-card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
`

const TableSection = styled.div`
  flex: 1;
  min-height: 160px;
  min-width: 0;

  > div {
    height: 100%;
  }

  .ant-table-wrapper,
  .ant-spin-nested-loading,
  .ant-spin-container {
    height: 100%;
  }

  .ant-spin-container {
    display: flex;
    flex-direction: column;
  }

  .ant-table {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ant-table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .ant-table-header {
    flex: 0 0 auto;
  }

  .ant-table-body {
    flex: 1 1 auto !important;
    max-height: none !important;
    overflow: auto !important;
  }
`

const DetailPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  padding-top: 8px;
  flex-shrink: 0;
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  font-family: 'Avenir Medium', sans-serif;
  font-size: 14px;
  color: #000;
  line-height: 1.4;
`

const DetailLabel = styled.span`
  flex: 0 1 auto;
  white-space: nowrap;
`

const DetailValue = styled.span`
  flex: 1 1 auto;
  text-align: right;
  word-break: break-word;
`

const FieldsetCardCol = styled(Col)`
  display: flex;

  > div {
    flex: 1;
    width: 100%;
  }
`

const joinOrDash = (
  parts: Array<string | number | null | undefined>,
  separator: string,
) => {
  if (
    parts.every((part) => part === null || part === undefined || part === '')
  ) {
    return null
  }
  return parts
    .map((part) =>
      part === null || part === undefined || part === ''
        ? PLACEHOLDER
        : String(part),
    )
    .join(separator)
}

const matchesQuery = (machine: PefMachine, query: string) => {
  if (_.isEmpty(query)) {
    return true
  }

  const normalizedQuery = _.toLower(_.trim(query))
  const searchableValues = [
    machine.modelCode,
    machine.fanCode,
    machine.coilCode,
    machine.series,
    machine.fanType,
    machine.fanNumber,
    machine.rows,
    machine.length,
    machine.width,
    machine.height,
  ]

  return _.some(searchableValues, (value) =>
    _.includes(_.toLower(String(value ?? '')), normalizedQuery),
  )
}

function RatingResult(props: RatingResultProps) {
  const {
    machines = SAMPLE_MACHINES,
    loading = false,
    params,
    onUpdateParams,
    filterContent,
    fieldsContent,
  } = props
  const { filters, orders, query = '' } = params || {}
  const [searchQuery, setSearchQuery] = useState<string>(query || '')
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectedMachineDetail, setSelectedMachineDetail] = useState<
    PefMachine[]
  >([])

  const selectedMachine = useMemo(
    () => selectedMachineDetail[0] ?? null,
    [selectedMachineDetail],
  )

  const filteredMachines = useMemo(
    () => _.filter(machines, (machine) => matchesQuery(machine, searchQuery)),
    [machines, searchQuery],
  )

  const tableColumns: any = _.flow([
    applyFiltersToColumns(filters),
    applyOrdersToColumns(orders),
  ])(_.concat(staticColumnPefResults))

  const handleQueryChange = (newQuery: string) => {
    setSearchQuery(newQuery)
    setSelectedRowKeys([])
    setSelectedMachineDetail([])

    if (onUpdateParams) {
      onUpdateParams({
        ...params,
        query: newQuery,
      })
    }
  }

  const handleTableChange = (
    pagination: any,
    tableFilters: any,
    sorter: any,
  ) => {
    if (!onUpdateParams) {
      return
    }

    onUpdateParams({
      ...params,
      filters: tableFilters,
      orders: sorter,
      pagination,
      query: searchQuery,
    })
  }

  const fanTypeNumber = selectedMachine
    ? joinOrDash(
        [
          selectedMachine.fanType,
          `${selectedMachine.fanNumber ?? PLACEHOLDER} rows x ${
            selectedMachine.rows ?? PLACEHOLDER
          }`,
        ],
        ' / ',
      )
    : null

  const dimensions = selectedMachine
    ? joinOrDash(
        [selectedMachine.length, selectedMachine.width, selectedMachine.height],
        ' x ',
      )
    : null

  const detailRows = [
    {
      labelId: 'data.thermal.rating.pef.model_code',
      value: selectedMachine?.modelCode,
      empty: PLACEHOLDER,
    },
    {
      labelId: 'data.thermal.rating.pef.fan_code',
      value: selectedMachine?.fanCode,
      empty: PLACEHOLDER,
    },
    {
      labelId: 'data.thermal.rating.pef.coil_code',
      value: selectedMachine?.coilCode,
      empty: PLACEHOLDER,
    },
    {
      labelId: 'data.thermal.rating.pef.series',
      value: selectedMachine?.series,
      empty: PLACEHOLDER,
    },
    {
      labelId: 'data.thermal.rating.pef.fan_type_number',
      value: fanTypeNumber,
      empty: `${PLACEHOLDER} / ${PLACEHOLDER} rows x ${PLACEHOLDER}`,
    },
    {
      labelId: 'data.thermal.rating.pef.dimensions',
      value: dimensions,
      empty: `${PLACEHOLDER} x ${PLACEHOLDER} x ${PLACEHOLDER}`,
    },
  ]

  const machinesCard = (
    <MachinesCard
      styles={{
        body: { padding: '16px 20px 20px' },
      }}
      style={{ border: '1px solid #7eb8d4' }}
    >
      <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
        <SpanIntl
          style={{ fontWeight: 'bold', margin: '10px 0 16px' }}
          value='data.thermal.rating.pef.compatible_machines_count'
        />
        <span style={{ fontWeight: 'bold', margin: '10px 0 16px' }}>
          {`: ${filteredMachines.length}`}
        </span>
      </StyledRow>

      <StyledRow justify='end' align='middle' style={{ margin: '0 0 16px 0' }}>
        <Col span={12}>
          <StyledInputSearch
            placeholder='data.users.input'
            name='pef-machines'
            query={searchQuery}
            onChangeQuery={handleQueryChange}
          />
        </Col>
      </StyledRow>

      <TableSection>
        <StyledTable
          rowKey='id'
          size='small'
          dataSource={filteredMachines}
          loading={loading}
          pagination={false}
          columns={tableColumns}
          scroll={{ x: true, y: 200 }}
          onChange={handleTableChange}
          rowSelection={{
            type: 'radio',
            hideSelectAll: true,
            selectedRowKeys,
            onChange: (keys: React.Key[], selectedRows: PefMachine[]) => {
              setSelectedRowKeys(keys)
              setSelectedMachineDetail(selectedRows)
            },
          }}
          onRow={(record: PefMachine) => ({
            onClick: () => {
              setSelectedRowKeys([record.id])
              setSelectedMachineDetail([record])
            },
          })}
        />
      </TableSection>
      <DetailPanel>
        {detailRows.map((row) => (
          <DetailRow key={row.labelId}>
            <DetailLabel>
              <SpanIntl value={row.labelId} />
            </DetailLabel>
            <DetailValue>
              <Span value={row.value} empty={row.empty} />
            </DetailValue>
          </DetailRow>
        ))}
      </DetailPanel>
    </MachinesCard>
  )

  const calculationsPanel = (
    <StyledCollapse
      defaultActiveKey={['calculations_results']}
      style={{ marginBottom: '20px' }}
    >
      <StyledCollapsePanel
        header='ui.thermal.panelHeader.rating_calculations_results'
        key='calculations_results'
      >
        <StyledRow gutter={[16, 16]} align='stretch'>
          <FieldsetCardCol xs={24} lg={8}>
            <PerfData selectedMachine={selectedMachine} />
          </FieldsetCardCol>
          <FieldsetCardCol xs={24} lg={8}>
            <AirData selectedMachine={selectedMachine} />
          </FieldsetCardCol>
          <FieldsetCardCol xs={24} lg={8}>
            <LiquidData selectedMachine={selectedMachine} />
          </FieldsetCardCol>
        </StyledRow>
        <StyledRow gutter={[16, 16]} align='stretch' style={{ marginTop: 16 }}>
          <FieldsetCardCol xs={24} lg={8}>
            <UnitData selectedMachine={selectedMachine} />
          </FieldsetCardCol>
          <FieldsetCardCol xs={24} lg={8}>
            <NoiseData selectedMachine={selectedMachine} />
          </FieldsetCardCol>
          <FieldsetCardCol xs={24} lg={8}>
            <CoilData selectedMachine={selectedMachine} />
          </FieldsetCardCol>
        </StyledRow>
        <StyledRow gutter={[16, 16]} style={{ marginTop: 16 }}>
          <FieldsetCardCol xs={24}>
            <VentilationData selectedMachine={selectedMachine} />
          </FieldsetCardCol>
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )

  if (filterContent || fieldsContent) {
    return (
      <RatingLayout>
        <div className='rating-filters rating-fields'>{filterContent}</div>
        <div className='rating-machines'>
          <div className='rating-machines-inner'>{machinesCard}</div>
        </div>
        <div className='rating-fields-col rating-fields'>{fieldsContent}</div>
        <div className='rating-calcs'>{calculationsPanel}</div>
      </RatingLayout>
    )
  }

  return (
    <>
      {machinesCard}
      {calculationsPanel}
    </>
  )
}

export default RatingResult
