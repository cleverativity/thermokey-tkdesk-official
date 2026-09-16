import styled from 'styled-components'

import smallLogo from '../../../Images/logoSideBar.png'

const StyledLogo = styled.div`
  position: relative;
  height: 80px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  transition: all ease 0.2s;
  &.open {
    width: 80px;
  }
  img {
    height: 60px;
    width: auto;
    transition: all ease 0.2s;
    transform: scale(0.6) translateZ(0);
  }
`

const Logo = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <StyledLogo className={collapsed ? 'open' : 'close'}>
      <img src={smallLogo} alt='logo' />
    </StyledLogo>
  )
}

export default Logo
