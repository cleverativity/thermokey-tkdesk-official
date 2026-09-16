import styled from 'styled-components'

const Style = styled.p`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #8a8a8a;
  z-index: 2;
  opacity: 0.85;
  border-radius: 4px;
`

const StyledCover = (props: any) => {
  return <Style {...props} />
}

export default StyledCover
