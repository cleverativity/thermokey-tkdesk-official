import styled from 'styled-components'
import { Table } from 'antd'
import colors from 'styles/colors.module.scss'

const locale = {
  filterConfirm: 'Ok',
  filterReset: 'Reset',
}

interface TableProps {
  size?: any
  rowKey: any
  dataSource: any[]
  loading: boolean
  pagination: any
  columns: any[]
  rowSelection?: any
  onChange?: any
  expandable?: any
  bordered?: boolean
  style?: any
  scroll?: any
  tableLayout?: any
  [key: string]: any
}

const StyledTable = (props: TableProps) => {
  const { size = 'middle', ...other } = props

  const newProps = other

  return (
    <TableStyle>
      <Table locale={locale} size={size} {...newProps} />
    </TableStyle>
  )
}

const TableStyle = styled.div`
  width: 100%;

  .disabled-row {
    color: ${colors.disabled};
  }

  /* selected row */
  .ant-table-row-selected .ant-table-cell {
    background-color: ${colors.disabled_background} !important;
  }

  .ant-pagination-options {
    display: none;
  }

  .ant-table-row-expand-icon {
    &:hover {
      color: ${colors.primary_hover};
    }
    &:focus {
      color: ${colors.primary_disabled};
    }
  }
`
StyledTable.rowClassNames = {
  disabled: 'styled-table-disabled',
  highlight: 'styled-table-highlight',
}

export default StyledTable
