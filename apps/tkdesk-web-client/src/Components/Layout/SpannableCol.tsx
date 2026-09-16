import { Col } from 'antd'
import * as R from 'ramda'
import styled from 'styled-components'

export const makeSpannable = (Component: any) => (props: any) => {
  const { span, inline, ...other } = props

  if (!R.isNil(span)) {
    if (R.is(Number, span)) {
      return (
        <StyledCol span={span} inline={inline}>
          <Component inline={inline} {...other} />
        </StyledCol>
      )
    } else {
      return (
        <StyledCol {...span} inline={inline}>
          <Component inline={inline} {...other} />
        </StyledCol>
      )
    }
  } else {
    return <Component inline={inline} {...other} />
  }
}

const StyledCol = styled<any>(Col)`
  padding: ${(props) => (props.inline ? '0 !important' : 'unset')};
  height: 100%;
`
