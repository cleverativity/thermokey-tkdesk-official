import { Row } from 'antd'

const defaultProps = {
  gutter: { xs: 8, sm: 10, md: 10, lg: 20 },
  align: 'top',
  justify: 'start',
}

const StyledRow = (props: any) => {
  return <Row {...defaultProps} {...props} />
}

export default StyledRow
