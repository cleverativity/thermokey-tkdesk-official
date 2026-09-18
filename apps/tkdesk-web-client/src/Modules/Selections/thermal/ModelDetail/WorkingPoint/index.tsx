import React, { useLayoutEffect, useRef, useState } from 'react'
import { Col } from 'antd'
import { StyledRow, StyledTable } from 'Components/Styled'
import _ from 'lodash'
import { staticColumn } from 'Model/Selections/thermal/ModelDetail/workingPointTable'
import styled from 'styled-components'
import Ventilation from './Ventilation'
import Speed from './Speed'
import Liquid from './Liquid'
import Air from './Air'

interface WorkingPointDetailProps {
  preferences: any
  rows?: any[]
  loading?: boolean
}

const WorkingPointPage = styled.div`
  .wp-layout {
    align-items: stretch;
  }

  .wp-table {
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .wp-table .ant-spin-nested-loading,
  .wp-table .ant-spin-container,
  .wp-table .ant-table,
  .wp-table .ant-table-container {
    height: 100%;
  }
  .wp-fields {
    .ant-form-item {
      margin-bottom: 0;
    }

    .ant-form-item-explain,
    .ant-form-item-extra,
    .ant-form-item-additional {
      display: none;
    }

    p {
      margin-bottom: 0;
    }

    .ant-space-compact {
      display: flex;
      width: 100%;
      align-items: stretch;
    }

    .ant-space-compact > * {
      min-width: 0;
    }

    .ant-space-compact > *:not(:first-child) {
      margin-inline-start: -1px;
    }

    .ant-space-compact .ant-form-item,
    .ant-space-compact .ant-form-item-row,
    .ant-space-compact .ant-form-item-control,
    .ant-space-compact .ant-form-item-control-input,
    .ant-space-compact .ant-form-item-control-input-content {
      margin-bottom: 0;
      margin-inline: 0;
      width: 100%;
      height: 32px;
      min-height: 32px;
    }

    .ant-space-compact .ant-input-number,
    .ant-space-compact .ant-input-number-affix-wrapper {
      height: 32px !important;
      min-height: 32px !important;
      border-start-start-radius: 6px !important;
      border-end-start-radius: 6px !important;
      border-start-end-radius: 0 !important;
      border-end-end-radius: 0 !important;
    }

    .ant-space-compact .ant-select,
    .ant-space-compact .ant-select-selector {
      height: 32px !important;
      min-height: 32px !important;
      border-start-start-radius: 0 !important;
      border-end-start-radius: 0 !important;
      border-start-end-radius: 6px !important;
      border-end-end-radius: 6px !important;
    }

    .ant-space-compact .ant-input-number-input {
      height: 32px !important;
      line-height: 32px !important;
    }

    .ant-space-compact .ant-select-selector {
      display: flex !important;
      align-items: center;
      padding-top: 0 !important;
      padding-bottom: 0 !important;
    }

    .ant-space-compact .ant-select-selection-item,
    .ant-space-compact .ant-select-selection-item span {
      display: flex !important;
      align-items: center;
      line-height: 30px !important;
      overflow: hidden;
      white-space: nowrap;
    }

    .ant-space-compact .ant-input-number-focused,
    .ant-space-compact .ant-select-focused,
    .ant-space-compact .ant-select-open {
      z-index: 2;
    }
  }

  .wp-table .ant-table-thead > tr > th,
  .wp-table .ant-table-thead .ant-table-column-title {
    font-family: 'Avenir Heavy', sans-serif;
    font-size: 13px !important;
    line-height: 20px;
    white-space: nowrap;
    padding: 8px 14px;
  }

  .wp-table .ant-table-tbody > tr > td {
    font-family: 'Avenir Medium', sans-serif;
    font-size: 13px;
    line-height: 20px;
  }
`

function WorkingPoint(props: WorkingPointDetailProps) {
  const { preferences, rows = [], loading = false } = props
  const unitsType = _.get(preferences, 'um_system', 'si')
  const fieldsRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)
  const [tableBodyHeight, setTableBodyHeight] = useState(240)
  const tableScrollX = staticColumn.reduce(
    (sum, column) => sum + (Number(column.width) || 0),
    0,
  )

  useLayoutEffect(() => {
    const fields = fieldsRef.current
    const table = tableRef.current
    if (!fields) return

    const syncHeight = () => {
      const fieldsHeight = fields.getBoundingClientRect().height
      const thead = table?.querySelector('.ant-table-thead')
      const headerHeight = thead?.getBoundingClientRect().height ?? 40
      setTableBodyHeight(
        Math.max(Math.round(fieldsHeight - headerHeight - 20), 120),
      )
    }

    syncHeight()
    const observer = new ResizeObserver(syncHeight)
    observer.observe(fields)
    return () => observer.disconnect()
  }, [rows, loading])

  return (
    <WorkingPointPage>
      <StyledRow className='wp-layout' gutter={[24, 16]} align='stretch'>
        <Col xs={24} lg={8} className='wp-fields'>
          <div ref={fieldsRef}>
            <Speed unitTypes={unitsType} />
            <Air unitTypes={unitsType} />
            <Liquid unitTypes={unitsType} />
            <Ventilation unitTypes={unitsType} />
          </div>
        </Col>
        <Col xs={24} lg={16} style={{ minWidth: 0 }} className='wp-table'>
          <div ref={tableRef} style={{ height: '100%' }}>
            <StyledTable
              rowKey='id'
              size='small'
              dataSource={rows}
              loading={loading}
              pagination={false}
              columns={staticColumn}
              tableLayout='fixed'
              scroll={{ x: tableScrollX, y: tableBodyHeight }}
            />
          </div>
        </Col>
      </StyledRow>
    </WorkingPointPage>
  )
}

export default WorkingPoint
