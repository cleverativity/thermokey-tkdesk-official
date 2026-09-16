import * as Sentry from '@sentry/react'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'

import applicationSaga from 'Modules/App/sagas'
import calculationsSaga from 'Modules/Calculations/sagas'
import dashboardSaga from 'Modules/Dashboard/sagas'
import fanModelsSaga from 'Modules/FanModels/sagas'
import ordersSaga from 'Modules/Orders/sagas'
import selectionsSaga from 'Modules/Selections/sagas'
import settingsSaga from 'Modules/Settings/sagas'
import usersSaga from 'Modules/Users/sagas'

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
})

const sagaMiddleware: any = createSagaMiddleware()

let storeInstance

export const createStoreFromHistory = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware),
    enhancers: (getDefaultEnhancers) =>
      getDefaultEnhancers().concat(sentryReduxEnhancer),
  })

  storeInstance = store

  sagaMiddleware.run(applicationSaga)
  sagaMiddleware.run(dashboardSaga)
  sagaMiddleware.run(calculationsSaga)
  sagaMiddleware.run(usersSaga)
  sagaMiddleware.run(selectionsSaga)
  sagaMiddleware.run(settingsSaga)
  sagaMiddleware.run(ordersSaga)
  sagaMiddleware.run(fanModelsSaga)

  return store
}

export const getStore = () => storeInstance
