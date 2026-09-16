import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Badge, Layout, Menu } from 'antd'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import Logo from './Logo'
import type { MenuProps } from 'antd'
import * as APIProfile from 'Api/Profile/endpoints'

import menu_voices from './menu_voices'
import { useAuthorization } from 'Modules/App/Authorization'
import _ from 'lodash'
import * as R from 'ramda'
import { ConsoleLogger } from 'aws-amplify/utils'
import colors from 'styles/colors.module.scss'

type MenuItem = Required<MenuProps>['items'][number]

const { Sider } = Layout

const log = new ConsoleLogger('Modules/Sidebar/index')

interface SideBarProps {
  collapsed: boolean
  general: any
  onGetMenuNotification: () => void
}

const StyledContainer = styled.div<any>`
  height: calc(100vh - 80px);
  width: ${(props: { collapsed: boolean }) =>
    props.collapsed ? '80px' : '100%'};
`

const StyledMenu = styled(Menu)`
  background-color: ${colors.primary} !important;

  .ant-menu-item {
    height: 46px;
    color: ${colors.white} !important;
    .ant-menu-title-content {
      a {
        color: ${colors.white} !important;
      }
    }
  }

  .ant-menu-submenu {
    span,
    i {
      color: ${colors.white} !important;
    }

    .ant-menu-submenu-title {
      &:hover {
        background-color: ${colors.danger} !important;
      }
    }
  }
  .ant-menu-sub {
    background-color: ${colors.primary_background} !important;
    color: ${colors.white} !important;
  }
`

const StyledSider = styled(Sider)`
  display: flex;
  background-color: ${colors.primary} !important;

  .ant-layout-sider-children {
    position: fixed;
    z-index: 2;
    width: 240px;

    .ant-menu-item-selected {
      background-color: ${colors.danger} !important;
    }

    .ant-menu-submenu-selected {
      .ant-menu-submenu-title {
        background-color: ${colors.danger} !important;
      }
    }
  }

  .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: ${colors.danger} !important;
  }
`

const StyledLink = styled(Link)`
  span {
    &:last-child {
      margin-left: 20px;
    }
  }
  opacity: 1;
  &:hover {
    opacity: 1;
  }
`
const StyledExternalLink = styled.a`
  span {
    &:last-child {
      margin-left: 20px;
    }
  }
  opacity: 1;
  &:hover {
    opacity: 1;
  }
`

const SideBar = (props: SideBarProps) => {
  log.debug('render.props', props)

  const { collapsed, general } = props

  const autho = useAuthorization()
  const location = useLocation()

  const userCode = _.get(general, 'profile.data.id')
  const count = _.get(general, 'profile.data.notifications.count', 0)

  const [badgeCount, setbadgeCount] = useState(count)

  useEffect(() => {
    let subscription: any

    if (autho.iAmAdmin) {
      const apiCall: any = APIProfile.onUpdateMenuNotificationSubscription(
        '5e11f175-794c-46cf-9f72-fc9fc0f280d',
      )

      // subscribe
      subscription = apiCall.subscribe({
        next: (data: any) => {
          log.info('onUpdateMenuNotificationByCode.subscription', data)

          const count = JSON.parse(
            _.get(data, 'data.onUpdateMenuNotificationByCode.count', 0),
          )
          log.info('onUpdateMenuNotificationByCode.count', { count })

          setbadgeCount(count)
        },
        error: (error: any) => log.warn('Error:', error),
      })
      return () => {
        //unsubscribe
        if (!_.isNil(subscription)) subscription.unsubscribe()
      }
    }
  }, [userCode])

  const getMenuItem = (menu_voice: MenuVoice): MenuItem => {
    const {
      key,
      label,
      children,
      icon: Icon = null,
      external = false,
      permission,
      preload,
    } = menu_voice

    const checkPermission = autho.check(permission)
    if (!checkPermission) {
      return null
    }

    if (preload) {
      return {
        label: (
          <StyledLink to='/'>
            <FormattedMessage id={label} />
          </StyledLink>
        ),
        key: key,
        icon: _.isNil(Icon) ? null : (
          <span
            role='img'
            className='anticon anticon-dashboard ant-menu-item-icon'
          >
            <Icon height='1em' width='1em' />
          </span>
        ),
      }
    }

    if (!_.isNil(children)) {
      return {
        label: <FormattedMessage data-cy={label} id={label} />,
        key: key,
        icon: _.isNil(Icon) ? null : (
          <span
            role='img'
            data-cy={`${key}-link`}
            className='anticon anticon-dashboard ant-menu-item-icon'
          >
            <Icon height='1em' width='1em' />
          </span>
        ),
        children: _.map(children, (option: MenuVoice) => getMenuItem(option)),
      }
    }

    if (external) {
      return {
        label: (
          <StyledExternalLink
            href={`${key}`}
            target='_blank'
            data-cy={`${key}-link`}
            rel='noopener noreferrer'
          >
            <FormattedMessage id={label} />
          </StyledExternalLink>
        ),
        key: key,
        icon: _.isNil(Icon) ? null : (
          <span
            role='img'
            className='anticon anticon-dashboard ant-menu-item-icon'
          >
            <Icon height='1em' width='1em' />
          </span>
        ),
      }
    }

    return {
      label: (
        <StyledLink to={`/${key}`} data-cy={`${key}-link`}>
          <FormattedMessage id={label} />
        </StyledLink>
      ),
      key: key,
      icon: _.isNil(Icon) ? null : (
        <span
          role='img'
          className='anticon anticon-dashboard ant-menu-item-icon'
        >
          {key === 'users' ? (
            <StyledBadge
              count={badgeCount}
              overflowCount={99}
              color={colors.danger}
              offset={[0, 5]}
              size='small'
            >
              <Icon style={{ fontSize: 20, color: colors.white }} />
            </StyledBadge>
          ) : (
            <Icon style={{ fontSize: 20 }} />
          )}
        </span>
      ),
    }
  }

  // TODO da rimuovere per abilitarlo agli oem
  const filteredMenuVoices = _.filter(menu_voices, (option: MenuVoice) => {
    if (_.startsWith(option.key, 'selections') && !autho.iAmAdmin) {
      return false
    }
    return true
  })

  // const authorizedOptions = getAuthorizedOptions()
  const items: MenuItem[] = _.map(filteredMenuVoices, (option: MenuVoice) =>
    getMenuItem(option),
  )
  // const items: MenuItem[] = _.map(menu_voices, (option: MenuVoice) =>
  //   getMenuItem(option),
  // )

  const menuSelectedKey =
    (R.pipe(
      R.flatten,
      R.map(R.prop('key')),
      R.filter(R.is(String)),
      R.sort((a, b) => b.length - a.length),
      R.find((key: string) => {
        const normalizedPath = location.pathname.replace(
          /^\/calculations\/[^/]+$/,
          '/calculations/edit',
        )
        const normalizedPath2 = location.pathname.replace(
          /^\/selections\/[^/]+$/,
          '/selections/edit',
        )
        return (
          R.includes(key, location.pathname) ||
          R.includes(key, normalizedPath) ||
          R.includes(key, normalizedPath2)
        )
      }),
    )(menu_voices) as string) || ''

  const menuOpenedKeys = !collapsed
    ? [
        R.pipe(
          R.find((parentEl: any) => {
            return R.any(
              (childEl: any) =>
                R.includes(`/${childEl.key}`, location.pathname) ||
                R.includes(`/${parentEl.key}`, location.pathname),
              parentEl.children ?? [],
            )
          }),
          R.prop('key'),
        )(menu_voices),
      ]
    : []

  return (
    <>
      <StyledSider trigger={null} collapsible collapsed={collapsed} width={240}>
        <Logo collapsed={collapsed} />
        {/* <Scrollbar
          style={{
            height: 'calc(100vh - 80px)',
            width: collapsed ? '80px' : '100%',
          }}
        > */}
        <StyledContainer collapsed={collapsed}>
          <StyledMenu
            theme='dark'
            mode='inline'
            items={items}
            selectedKeys={[menuSelectedKey]}
            defaultOpenKeys={menuOpenedKeys}
          />
        </StyledContainer>
        {/* </Scrollbar> */}
      </StyledSider>
    </>
  )
}

const StyledBadge = styled(Badge)`
  .ant-badge-count {
    box-shadow: none;

    .ant-scroll-number-only-unit {
      font-size: 12px;
      color: ${colors.white};
    }
  }
`

export default SideBar
