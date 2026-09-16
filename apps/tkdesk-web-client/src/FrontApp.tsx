import { Amplify } from 'aws-amplify'
import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'

import moment from 'moment'

// Context Providers
import { connect } from 'react-redux'
import { ConfigProvider as AntdConfigProvider } from 'antd'
import { IntlProvider } from 'react-intl'
import App from 'Modules/App/App'
import CustomAuthenticator from 'Modules/Auth/Authenticator'

import config from 'amplifyconfiguration.json'
import localizations from 'Localization'

import * as Sentry from '@sentry/react'
import env from 'Configs/env'
import { Authenticator } from '@aws-amplify/ui-react'
import { compose } from 'redux'
import { withCookies } from 'react-cookie'

import colors from 'styles/colors.module.scss'

const log = new ConsoleLogger('FrontApp')

Amplify.configure(config)
const existingAmplifyConfig = Amplify.getConfig()

Amplify.configure({
  ...existingAmplifyConfig,
  Auth: {
    ...existingAmplifyConfig.Auth,
  } as any,
  API: {
    ...existingAmplifyConfig.API,
    REST: {
      ...existingAmplifyConfig.API?.REST,
    },
  },
})

// Sentry
if (!env.isDevelopment) {
  Sentry.init({
    dsn: 'https://9d5a15d8ef024addbc85f4814e2a6ca6@o249875.ingest.sentry.io/6301719',
    environment: env.VITE_ENV,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })
}

interface FrontAppProps {
  data?: any
  cookies?: any
}

const FrontApp = (props: FrontAppProps) => {
  const { data: profile, cookies = null } = props

  let language = _.get(profile, 'preferences.language', cookies.get('language'))

  // Localization
  const localeKey: 'it' | 'en' = _.isNil(language) ? 'it' : language
  const localeConfig = localizations[localeKey]

  const antdLocale: any = _.get(localeConfig, 'antd')
  moment.locale(localeKey)
  log.info('render.props', { props, profile })
  const app = (
    <AntdConfigProvider
      locale={antdLocale}
      theme={{
        token: {
          colorPrimary: colors.primary,
          fontFamily: 'Avenir',
          fontSize: 15,
          borderRadius: 8,
          colorText: colors.text,
        },
      }}
    >
      <IntlProvider
        locale={localeConfig.locale}
        messages={localeConfig.messages}
      >
        <Authenticator.Provider>
          <CustomAuthenticator locale={localeKey} component={App} />
        </Authenticator.Provider>
      </IntlProvider>
    </AntdConfigProvider>
  )

  return app
}
export default compose(
  withCookies,
  connect((state: CommonState) => ({
    ...state.general.profile,
  })),
)(FrontApp) as React.ComponentType<FrontAppProps>
