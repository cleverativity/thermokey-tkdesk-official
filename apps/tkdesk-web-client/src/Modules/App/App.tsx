import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import _ from 'lodash'

import { Layout, Row, Col } from 'antd'
import { StyledSpinner } from 'Components/Styled'
import '@aws-amplify/ui-react/styles.css'
import Footer from 'Modules/General/Footer/Footer'
import SideBar from 'Modules/General/SideBar/SideBar'
import Header from 'Modules/General/Header/Header'
import actions from './actions'
import userActions from 'Modules/Users/actions'
import JEula from 'Modules/Auth/JEula'

import Dashboard from 'Modules/Dashboard'
import Calculations from 'Modules/Calculations'
import Users from 'Modules/Users'
import Selections from 'Modules/Selections'
import Settings from 'Modules/Settings'
import FanModels from 'Modules/FanModels'
import InfoPage from 'Modules/General/Info'
import HelpPage from 'Modules/General/Help'
import Development from 'Modules/General/Development'

import Forbidden from 'Modules/General/404/Forbidden'
import Blank from 'Modules/General/404/Blank'
import { AuthorizationProvider } from './Authorization/Context'
import { compose } from 'redux'
import { withCookies } from 'react-cookie'
import { signOut } from 'aws-amplify/auth'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from 'Components/Layout/Error/ErrorFallback'

const { Content } = Layout

const ConnectedSideBar: any = connect(
  (state: CommonState) => ({ ...state }),
  (dispatch) => ({}),
)(SideBar)

const ConnectedHeader = connect(
  (state: CommonState) => ({
    // ...state.app,
    ...state.general?.profile,
  }),
  (dispatch) => ({
    onProfileDetail: () => dispatch(userActions.profile.detail.route()),
  }),
)(Header)

const ConnectedAuthorization: any = connect((state: CommonState) => ({
  value: {
    user_permissions: state.general?.profile?.data?.role_permissions || [],
    user_type: state.general?.profile?.data?.user_type || '',
  },
}))(AuthorizationProvider as any)

const App = (props: any) => {
  const { onProfileLoad } = props
  const { loading, onLogout, data: profile, cookies = null } = props

  const cookieLang = _.isNil(cookies.get('language'))
    ? null
    : cookies.get('language')

  useEffect(
    () => {
      if (!_.isNil(onProfileLoad)) {
        onProfileLoad({ cookieLang })
      }
    },
    _.values(_.get(props, 'match.params', {})),
  )

  const [state, setState] = useState({
    collapsed: true,
  })

  const handleSidebarToggle = () => setState({ collapsed: !collapsed })

  const { collapsed } = state
  const hasAcceptEula = _.get(profile, 'eula', true)

  if (loading) {
    return (
      <Row align='middle' justify='center' style={{ height: '100vh' }}>
        <Col>
          <StyledSpinner size={50} />
        </Col>
      </Row>
    )
  }

  if (!hasAcceptEula && !loading) {
    return <JEula onBack={() => signOut()} />
  }

  return (
    <Layout>
      <ConnectedSideBar collapsed={collapsed} />
      <Layout style={{ minHeight: '100vh', zIndex: 20 }}>
        <ConnectedHeader
          collapsed={collapsed}
          handleSideBar={handleSidebarToggle}
          onLogout={onLogout}
        />
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => window.location.reload()} // Reload the app if the user presses 'Reload'
        >
          <Content
            style={{
              padding: '25px 25px 25px 25px',
              flexShrink: '0',
              background: '#f0f2f5',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Routes>
              <Route path='/' element={<Navigate to={`/dashboard`} />} />
              <Route path={`${Dashboard.prefix}/*`} element={<Dashboard />} />
              <Route
                path={`${Calculations.prefix}/*`}
                element={<Calculations />}
              />
              <Route path={`${Users.prefix}/*`} element={<Users />} />
              <Route path={`${Selections.prefix}/*`} element={<Selections />} />
              <Route path={`${Settings.prefix}/*`} element={<Settings />} />
              {/* <Route path={`${Orders.prefix}/*`} element={<Orders />} /> */}
              <Route
                path={`${Development.prefix}/*`}
                element={<Development />}
              />
              <Route path={`${InfoPage.prefix}/*`} element={<InfoPage />} />
              <Route path={`${HelpPage.prefix}/*`} element={<HelpPage />} />
              <Route path={`${FanModels.prefix}/*`} element={<FanModels />} />
              <Route path='forbidden' element={<Forbidden />} />
              <Route path='blank' element={<Blank />} />
              <Route path='*' element={<Navigate to='/blank' />} />
            </Routes>
          </Content>
        </ErrorBoundary>

        <Footer footerText='ui.footer.text' />
      </Layout>
    </Layout>
  )
}

const AppWithRouter = compose(
  withCookies,
  connect(
    (state: AppState) => ({
      ...state.general?.profile,
      loading: state?.general?.profile?.loading,
    }),
    (dispatch) => ({
      onProfileLoad: ({ cookieLang }: { cookieLang: 'it' | 'en' | null }) =>
        dispatch(actions.profile.load({ cookieLang })),
      onLogout: () => signOut(),
    }),
  ),
)(App) as React.ComponentType

const AppWithAuthorization = () => {
  return (
    <ConnectedAuthorization>
      <AppWithRouter />
    </ConnectedAuthorization>
  )
}

export default AppWithAuthorization
