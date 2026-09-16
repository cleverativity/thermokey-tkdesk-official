import styled from 'styled-components'
import { Radio } from 'antd'

// TODO rimuovere questo componente ed utilizarre fieldRadio
const StyledRadioGroup = (props: any) => (
  <RadioStyle>
    <Radio.Group optionType='button' {...props}>
      {props.children}
    </Radio.Group>
  </RadioStyle>
)

export const RadioStyle = styled.div`
  .ant-radio-wrapper {
    margin-right: 25px;
  }
`

export default StyledRadioGroup
