import { createBrowserRouter } from 'react-router-dom'
import FrontApp from '../FrontApp'
import { setAppRouter } from './navigation'

export const appRouter = createBrowserRouter([
  {
    path: '/*',
    Component: FrontApp,
  },
])

setAppRouter(appRouter)
