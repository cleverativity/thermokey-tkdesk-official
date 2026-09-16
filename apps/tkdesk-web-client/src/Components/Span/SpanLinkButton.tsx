import styled from 'styled-components'

const StyledSvg = styled.svg`
  display: inline;
  cursor: pointer;
  margin-right: 8px;

  path {
    transition: all ease 0.3s;
  }
  &:hover {
    path {
      fill: #00497c;
    }
  }
`

const SpanLinkButton = (props: { [key: string]: any }) => {
  const { value = undefined, ...other } = props

  return (
    <StyledSvg
      width='12'
      height='12'
      xmlns='http://www.w3.org/2000/svg'
      {...other}
    >
      <path
        d='M8.111 1.41a.706.706 0 010-1.41h3.174c.39 0 .705.316.705.705V3.88a.705.705 0 01-1.41 0V2.408L6.494 6.494a.706.706 0 01-.998-.998l4.086-4.085H8.111zM10.58 6.7a.705.705 0 011.41 0v4.585c0 .39-.316.705-.705.705H.705A.705.705 0 010 11.285V.705C0 .315.316 0 .705 0H5.29a.705.705 0 010 1.41H1.41v9.17h9.17V6.7z'
        fill='#00497c'
        fillRule='nonzero'
      />
    </StyledSvg>
  )
}

export default SpanLinkButton
