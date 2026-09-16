import _ from 'lodash'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import { useIntl } from 'react-intl'

import { makeSpannable } from 'Components/Layout/SpannableCol'

export const emptyValue = '•'
export const errorValue = 'Ɂ'

const Detail = (props: any) => {
  const {
    label = 'no-value',
    unlocalizeLabel = false,
    children,
    transform = null,
    size = 'small',
    style = undefined,
    bordered,
    hideLabel = true,
  } = props

  const intl = useIntl()

  const localLabel = unlocalizeLabel ? label : intl.formatMessage({ id: label })

  const data = children

  const transformed = _.isNil(data)
    ? emptyValue
    : _.isNil(transform)
      ? data
      : transform(data)

  return (
    <StyledDetail
      className={size}
      hideLabel={hideLabel}
      style={
        bordered ? { ...style, borderBottom: '1px solid #76767633' } : style
      }
    >
      <span>
        {hideLabel ? null : (
          <Row>
            <Col>{label && <div className='label'>{localLabel}</div>}</Col>
          </Row>
        )}
        <Row>
          <Col>
            <span>
              <span className={bordered ? 'bordered detail' : 'detail'}>
                {transformed}
              </span>
            </span>
          </Col>
        </Row>
      </span>
    </StyledDetail>
  )
}

const StyledDetail = styled.div<{ hideLabel?: boolean }>`
  .label {
    white-space: normal;
    max-width: none;
    overflow-wrap: break-word;
    text-align: left;
    width: 100%;

    line-height: normal;
    padding-bottom: 8px;
    margin-right: 8px;
    display: table-cell;
    font-weight: 500;
  }

  .detail {
    line-height: normal;
    width: 100%;
    color: #2d3347;
    display: table-cell;
    &.bordered {
      padding-bottom: 8px;
    }
    span > span {
      white-space: break-spaces !important;
    }
  }

  &.large {
    .label {
      font-size: 16px !important;
      line-height: normal;
    }

    .detail {
      span {
        font-size: 24px;
        line-height: normal;
      }
    }
  }

  &.medium {
    .label {
      font-size: 15px;
      line-height: normal;
    }
    .detail {
      span: {
        font-size: 20px;
        line-height: normal;
      }
    }
  }
`

export default makeSpannable(Detail)
