import { createRoot } from 'react-dom/client'

import * as Sentry from '@sentry/browser'

import { createStoreFromHistory } from './redux/store'
import './swagger-ui.css'

// Context Providers
import { Provider as ReduxProvider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import { appRouter } from 'Generic/router'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('ReactDOM')

const store = createStoreFromHistory()

log.info('ReactDOM.render')

try {
  const container = document.getElementById('root')
  if (!container) throw new Error('Failed to find the root element')

  const root = createRoot(container)
  root.render(
    <ReduxProvider store={store}>
      <CookiesProvider>
        <RouterProvider router={appRouter} />
      </CookiesProvider>
    </ReduxProvider>,
  )
} catch (err) {
  Sentry.captureException(err)
}
