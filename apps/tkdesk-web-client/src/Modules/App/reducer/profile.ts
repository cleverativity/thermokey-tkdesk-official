import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/App/reducer/profile')

const profileInit: CommonState = {
  error: false,
  loading: true,
  updating: false,
}

export const profileReducer = createReducer(profileInit, (builder) => {
  builder
    // LOAD
    .addCase(actions.profile.load, (s, action) => {
      return {
        ...s,
        loading: true,
        updating: true,
      }
    })
    .addCase(actions.profile.loadFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        error,
        loading: false,
        updating: false,
        data: {},
      }
    })
    .addCase(actions.profile.loadSuccess, (s, action) => {
      const { profile, notifications } = action.payload

      return {
        ...s,
        error: false,
        loading: false,
        updating: false,
        data: { ...profile, notifications },
      }
    })

    // ACCEPT EULA
    .addCase(actions.profile.acceptEula, (s, action) => {
      return {
        ...s,
        loading: true,
        updating: true,
      }
    })
    .addCase(actions.profile.acceptEulaFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        error,
        loading: false,
        updating: false,
        data: {},
      }
    })
    .addCase(actions.profile.acceptEulaSuccess, (s, action) => {
      const { profile } = action.payload
      return {
        ...s,
        error: false,
        loading: false,
        updating: false,
        data: profile,
      }
    })

    // RESET EULA
    .addCase(actions.profile.resetEula, (s, action) => {
      return {
        ...s,
        loading: true,
        updating: true,
      }
    })
    .addCase(actions.profile.resetEulaFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        error,
        loading: false,
        updating: false,
        data: {},
      }
    })
    .addCase(actions.profile.resetEulaSuccess, (s, action) => {
      const { profile } = action.payload
      return {
        ...s,
        error: false,
        loading: false,
        updating: false,
        data: profile,
      }
    })

    // SET LANGUAGE
    .addCase(actions.profile.setLanguage, (s, action) => {
      return {
        ...s,
        loading: true,
        updating: true,
      }
    })
    .addCase(actions.profile.setLanguageFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        error,
        loading: false,
        updating: false,
        data: {
          ...s?.data,
          preferences: {
            ...s?.data?.preferences,
            language: 'it',
          },
        },
      }
    })
    .addCase(actions.profile.setLanguageSuccess, (s, action) => {
      const { language } = action.payload
      return {
        ...s,
        error: false,
        loading: false,
        updating: false,
        data: {
          ...s?.data,
          preferences: {
            ...s?.data?.preferences,
            language,
          },
        },
      }
    })

    // SET UM SYSTEM
    .addCase(actions.profile.setUMSwitch, (s, action) => {
      return {
        ...s,
        loading: true,
        updating: true,
      }
    })
    .addCase(actions.profile.setUMSwitchFail, (s, action) => {
      const { error } = action.payload
      return {
        ...s,
        error,
        loading: false,
        updating: false,
        data: {
          ...s?.data,
          preferences: {
            ...s?.data.preferences,
            um_system: 'si',
          },
        },
      }
    })
    .addCase(actions.profile.setUMSwitchSuccess, (s, action) => {
      const { um_system } = action.payload
      return {
        ...s,
        error: false,
        loading: false,
        updating: false,
        data: {
          ...s?.data,
          preferences: {
            ...s?.data.preferences,
            um_system,
          },
        },
      }
    })
})
