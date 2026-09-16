import _ from 'lodash'
import { Col, Collapse, Row } from 'antd'
import { useIntl } from 'react-intl'

const CollapsePanel = Collapse.Panel

const StyledCollapsePanel = (props: any) => {
  const intl = useIntl()
  const {
    header = null,
    prefix = null,
    id = null,
    unlocalizeHeader = false,
    style = {},
    headerElement = null,
    ...other
  } = props

  let newHeader = ''
  let local = ''
  if (unlocalizeHeader) {
    newHeader = header
  } else {
    if (!_.isNil(prefix)) {
      local = prefix + header
    } else {
      local = header
    }

    newHeader = intl.formatMessage({ id: local })
  }

  let newId = ''

  if (!_.isNil(id)) {
    newId = _.defaultTo(prefix, '') + id
  } else if (!_.isEmpty(local)) {
    newId = local
  } else {
    newId = header
  }

  return (
    <CollapsePanel
      style={{ ...style }}
      forceRender
      header={
        <Row align='middle'>
          {_.isNil(headerElement) ? null : headerElement}
          <Col>
            <span
              style={{
                fontFamily: 'Avenir Heavy, sans-serif',
                marginLeft: '10px',
              }}
              id={newId}
            >
              {newHeader}
            </span>
          </Col>
        </Row>
      }
      {...other}
    >
      {props.children}
    </CollapsePanel>
  )
}

export default StyledCollapsePanel
