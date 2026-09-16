import { ConsoleLogger } from 'aws-amplify/utils'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import UserProfileIcon from './UserProfileIcon'
import { FieldLanguage, FieldUMSwitch } from 'Components/Field'
import env from 'Configs/env'
import colors from 'styles/colors.module.scss'

const { Header: AntdHeader } = Layout

const log = new ConsoleLogger('Modules/Topbar/Topbar')

interface HeaderProps {
  data?: User
  collapsed: boolean
  handleSideBar: () => void
  onLogout: () => void
  onProfileDetail?: () => void
}

const StyledHeader = styled(AntdHeader)`
  padding: 0 20px !important;
  width: 100%;
  height: 70px;
  position: relative;
  left: 0;

  &.mainTopbar {
    display: flex;
    justify-content: space-between;
    background-color: ${colors.white};
    border-bottom: 1px solid #ededed;
    padding: 0 31px 0 265px;
    z-index: 1000;
    transition: all ease 0.2s;
    &.collapsed {
      @media only screen and (max-width: 767px) {
        padding: 0px 15px !important;
      }
    }
  }

  .triggerBtn {
    width: 70px;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: start;
    background-color: transparent;
    border: 0;
    outline: 0;
    position: relative;
    cursor: pointer;

    .trigger {
      font-size: 20px;
      transition: color 0.3s;
    }

    .trigger:hover {
      color: ${colors.primary_hover};
    }
  }
  .topbar-left {
    display: flex;
    align-items: center;
  }
  .topbar-right {
    display: flex;
    align-items: center;
    padding-right: 15px;
    margin: 0;
  }
`

const StyledEnv = styled.div`
  width: 100%;

  display: ${(props) => {
    if (
      env.VITE_ENV !== 'local' &&
      env.VITE_ENV !== 'staging' &&
      env.VITE_ENV !== 'development' &&
      env.VITE_ENV !== 'localfront'
    ) {
      return 'none'
    }
    return 'flex'
  }};
  font-size: 12px;
  align-items: center;
  justify-content: center;
  font-family: 'Avenir Medium', sans-serif;
  color: white;
  height: ${(props) => {
    if (
      env.VITE_ENV !== 'local' &&
      env.VITE_ENV !== 'staging' &&
      env.VITE_ENV !== 'development' &&
      env.VITE_ENV !== 'localfront'
    ) {
      return '0px'
    }
    return '15px'
  }};
  background-color: ${(props) => {
    if (env.VITE_ENV === 'local') {
      return '#62ab55'
    } else if (env.VITE_ENV === 'development') {
      return '#AF2D1F'
    } else if (env.VITE_ENV === 'staging') {
      return '#2092b5'
    } else if (env.VITE_ENV === 'localfront') {
      return '#8bbb08'
    }
    return '#00497C'
  }};
`

const Header = (props: HeaderProps) => {
  const {
    collapsed,
    handleSideBar,
    onLogout,
    onProfileDetail,
    data: profile,
  } = props
  const headerStyle = {
    width: '100%',
    height: 70,
    left: '0',
  }

  const menuIconStyle = {
    fontSize: '23px',
  }

  const handleProfileDetail = () => {
    if (onProfileDetail) onProfileDetail()
  }

  log.info('Header.props', props)
  return (
    <div style={{ position: 'relative', zIndex: 1 }} data-test-id='topbar'>
      <StyledEnv>{env.VITE_ENV.toUpperCase()} MODE</StyledEnv>
      <StyledHeader style={headerStyle} className='mainTopbar'>
        <div className='topbar-left'>
          <button type='button' className='triggerBtn' onClick={handleSideBar}>
            {collapsed ? (
              <MenuUnfoldOutlined className='trigger' style={menuIconStyle} />
            ) : (
              <MenuFoldOutlined className='trigger' style={menuIconStyle} />
            )}
          </button>
        </div>

        <ul className='topbar-right'>
          <FieldUMSwitch style={{ marginRight: '20px', marginBottom: 0 }} />
          <FieldLanguage style={{ marginRight: '20px', marginBottom: 0 }} />
          <UserProfileIcon
            profile={profile}
            onProfileDetail={handleProfileDetail}
            onLogout={onLogout}
          />
        </ul>
      </StyledHeader>
    </div>
  )
}

export default Header
