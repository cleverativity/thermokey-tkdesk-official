import _ from 'lodash'
import { Col, Divider, Row } from 'antd'
import styled from 'styled-components'
import { useIntl } from 'react-intl'

import colors from 'styles/colors.module.scss'

const StyledSeparator = (props: {
  withText?: string | null
  style?: { [key: string]: any }
  title?: boolean
  actions?: any
  intlValues?: { [key: string]: any }
}) => {
  const intl = useIntl()
  const {
    withText = null,
    title = false,
    actions,
    intlValues = {},
    ...otherProps
  } = props

  const text = _.isNil(withText)
    ? null
    : intl.formatMessage({ id: withText }, intlValues)

  return (
    <Row style={{ marginBottom: '20px' }}>
      <Col style={{ flex: 1 }}>
        <Style titlePlacement='left' {...otherProps}>
          {!_.isNil(withText) ? (title ? _.toUpper(text) : text) : null}
        </Style>
      </Col>

      {!_.isNil(actions) ? (
        <Col style={{ marginLeft: '20px', alignContent: 'center' }}>
          {actions}
        </Col>
      ) : null}
    </Row>
  )
}

const Style = styled(Divider)`
  .ant-divider-inner-text {
    font-family: 'Avenir Heavy', sans-serif;
    color: ${colors.description};
  }

  .ant-divider-rail {
    border-top: 1px solid !important;
    color: ${colors.description};
  }
`

export default StyledSeparator
