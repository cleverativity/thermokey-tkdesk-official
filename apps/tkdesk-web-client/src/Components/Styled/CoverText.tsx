import styled from 'styled-components'

const Style = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 3;
  position: absolute;
  width: 100%;
  color: #fefefe;
  font-family: 'Avenir medium', sans-serif;
  font-size: 23px;
  text-align: center;
`

const StyledCoverText = (props: any) => {
  return <Style {...props} />
}

export default StyledCoverText
