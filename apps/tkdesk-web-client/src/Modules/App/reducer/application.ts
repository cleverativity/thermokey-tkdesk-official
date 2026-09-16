import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/App/reducer/application')

const applicationInit: CommonState = {
  error: false,
  loading: false,
  updating: false,
}

export const applicationReducer = createReducer(applicationInit, (builder) => {
  builder

    // DOWNLOAD_EULA
    .addCase(actions.application.downloadEula, (s, action) => {
      return {
        ...s,
        loading: false,
        updating: true,
      }
    })
    .addCase(actions.application.downloadEulaFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        error,
        loading: false,
        updating: false,
      }
    })
    .addCase(actions.application.downloadEulaSuccess, (s, action) => {
      return {
        ...s,
        error: false,
        loading: false,
        updating: false,
      }
    })

    // REQUEST CREDENTIALS
    .addCase(actions.application.requestCredentials, (s, action) => {
      return {
        ...s,
        loading: true,
        updating: true,
      }
    })
    .addCase(actions.application.requestCredentialsFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        error,
        loading: false,
        updating: false,
        data: { profile_info: {} },
      }
    })
    .addCase(actions.application.requestCredentialsSuccess, (s, action) => {
      const { payload } = action
      return {
        ...s,
        error: false,
        loading: false,
        updating: false,
        data: payload,
      }
    })
})
