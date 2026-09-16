import React from 'react'
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
}

const TABLE_BODY_HEIGHT = 240

const WorkingPointPage = styled.div`
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

    .ant-space-compact > *:not(:first-child) {
      margin-inline-start: -1px;
    }

    .ant-space-compact .ant-form-item,
    .ant-space-compact .ant-form-item-row,
    .ant-space-compact .ant-form-item-control,
    .ant-space-compact .ant-form-item-control-input,
    .ant-space-compact .ant-form-item-control-input-content {
      margin-bottom: 0;
      height: 32px;
      min-height: 32px;
    }

    .ant-space-compact .ant-input-number,
    .ant-space-compact .ant-input-number-affix-wrapper,
    .ant-space-compact .ant-select,
    .ant-space-compact .ant-select-selector {
      height: 32px !important;
      min-height: 32px !important;
      border-radius: 0 !important;
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

    .ant-space-compact > *:first-child .ant-input-number,
    .ant-space-compact > *:first-child .ant-input-number-affix-wrapper {
      border-start-start-radius: 6px !important;
      border-end-start-radius: 6px !important;
    }

    .ant-space-compact > *:last-child .ant-select-selector {
      border-start-end-radius: 6px !important;
      border-end-end-radius: 6px !important;
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

  .wp-table .ant-table-body,
  .wp-table .ant-table-content {
    max-height: ${TABLE_BODY_HEIGHT}px !important;
  }
`

function WorkingPoint(props: WorkingPointDetailProps) {
  const { preferences } = props
  const unitsType = _.get(preferences, 'um_system', 'si')
  const tableScrollX = staticColumn.reduce(
    (sum, column) => sum + (Number(column.width) || 0),
    0,
  )

  return (
    <WorkingPointPage>
      <StyledRow gutter={[24, 16]} align='top'>
        <Col xs={24} lg={8} className='wp-fields'>
          <Speed />
          <Air unitTypes={unitsType} />
          <Liquid unitTypes={unitsType} />
          <Ventilation unitTypes={unitsType} />
        </Col>
        <Col xs={24} lg={16} style={{ minWidth: 0 }} className='wp-table'>
          <StyledTable
            rowKey='id'
            size='small'
            dataSource={[]}
            loading={false}
            pagination={false}
            columns={staticColumn}
            tableLayout='fixed'
            scroll={{ x: tableScrollX, y: TABLE_BODY_HEIGHT }}
          />
        </Col>
      </StyledRow>
    </WorkingPointPage>
  )
}

export default WorkingPoint
