import _ from 'lodash'
import { Descriptions } from 'antd'
import { useMediaQuery } from 'Generic/hooks'
import styled from 'styled-components'

const Style = styled(Descriptions)`
  .ant-descriptions-item-label {
    font-weight: 700;

    padding: 10px 20px !important;
  }

  .ant-descriptions-item-content {
    padding: 15px 20px !important;
  }
`

interface DescriptionsProps {
  items: any
  column?: number
  [key: string]: any
}

const StyledDescriptions = (props: DescriptionsProps) => {
  const { isSmallScreen } = useMediaQuery()

  const { items, column = isSmallScreen ? 2 : 4 } = props

  const newItems = _.filter(items, Boolean)

  return (
    <Style
      layout='vertical'
      bordered
      items={newItems}
      column={column}
      {...props}
    />
  )
}

export default StyledDescriptions
