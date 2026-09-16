import actions from './actions'
import { createReducer } from '@reduxjs/toolkit'

import * as R from 'ramda'

import * as REDParams from 'Generic/SearchParams/reducer'

const initState: GlobalState = {
  search: {
    params: {
      orders: { order: 'descend', field: 'activation_date' },
      filters: { status: [] },
      query: '',
      pagination: {},
    },
    data: [],
    loading: true,
    error: false,
  },
  create: {
    params: undefined,
    data: [],
    loading: true,
    error: false,
  },
  edit: { params: undefined, data: {}, loading: true, error: false },
  detail: { params: undefined, data: {}, loading: true, error: false },
  profile: {
    detail: {
      params: undefined,
      data: {},
      loading: true,
      error: false,
    },
    edit: {},
  },
}

const searchReducer = createReducer(initState.search, (builder) => {
  builder

    // ROUTE
    .addCase(actions.search.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.search.load, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.search.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.search.loadSuccess, (s, action) => {
      const { users, pagination } = action.payload

      return {
        ...s,
        data: users,
        loading: false,
        error: false,
        params: {
          ...s?.params,
          pagination: {
            ...s?.params.pagination,
            ...pagination,
          },
        },
      }
    })

    .addCase(actions.search.updateQueryParameters, (s, action) => {
      return REDParams.createUpdateQueryParametersCase(
        initState.search,
        s,
        action,
      )
    })
})

const creationReducer = createReducer(initState.create, (builder) => {
  builder

    // ROUTE
    .addCase(actions.create.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.create.load, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.create.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.create.loadSuccess, (s, action) => {
      const { settings } = action.payload
      return {
        ...s,
        data: settings,
        loading: false,
        error: false,
      }
    })

    // CREATION COMPLETE
    .addCase(actions.create.complete, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.create.completeFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.create.completeSuccess, (s, action) => {
      const { user } = action.payload
      return {
        ...s,
        data: user,
        loading: false,
        error: false,
      }
    })
})

const editReducer = createReducer(initState.edit, (builder) => {
  builder

    // ROUTE
    .addCase(actions.edit.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.edit.load, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.edit.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.edit.loadSuccess, (s, action) => {
      const { user } = action.payload
      return {
        ...s,
        data: user,
        loading: false,
        error: false,
      }
    })

    // EDIT COMPLETE
    .addCase(actions.edit.complete, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.edit.completeFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.edit.completeSuccess, (s, action) => {
      const { user } = action.payload
      return {
        ...s,
        data: user,
        loading: false,
        error: false,
      }
    })
})

const detailReducer = createReducer(initState.detail, (builder) => {
  builder

    // ROUTE
    .addCase(actions.detail.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // LOAD
    .addCase(actions.detail.load, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.detail.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.loadSuccess, (s, action) => {
      const { user } = action.payload
      return {
        ...s,
        data: user,
        loading: false,
        error: false,
      }
    })

    // EDIT VALIDITY
    .addCase(actions.detail.editValidity, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.detail.editValidityFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.editValiditySuccess, (s, action) => {
      const { user } = action.payload
      return {
        ...s,
        data: user,
        loading: false,
        error: false,
      }
    })

    // ACTIVATE USER
    .addCase(actions.detail.activate, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.detail.activateFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.activateSuccess, (s, action) => {
      return {
        ...s,
        loading: false,
        error: false,
      }
    })

    // DELETE USER
    .addCase(actions.detail.delete, (s, action) => {
      return {
        ...s,
        loading: true,
        error: false,
      }
    })
    .addCase(actions.detail.deleteFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.deleteSuccess, (s, action) => {
      return {
        ...s,
        loading: false,
        error: false,
      }
    })

    // RESEND SIGN UP
    .addCase(actions.detail.resendSignUp, (s, action) => {
      return {
        ...s,
        loading: false,
        error: false,
      }
    })
    .addCase(actions.detail.resendSignUpFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.resendSignUpSuccess, (s, action) => {
      return {
        ...s,
        loading: false,
        error: false,
      }
    })
})

const profileReducer = createReducer(initState.profile, (builder) => {
  builder
    // DETAIL
    .addCase(actions.profile.detail.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })
})

export default function reducer(preState = initState, history: any) {
  const state: any = R.pipe(
    R.over<any, any>(R.lensProp('search'), (s) => searchReducer(s, history)),
    R.over<any, any>(R.lensProp('create'), (s) => creationReducer(s, history)),
    R.over<any, any>(R.lensProp('edit'), (s) => editReducer(s, history)),
    R.over<any, any>(R.lensProp('detail'), (s) => detailReducer(s, history)),
    R.over<any, any>(R.lensProp('profile'), (s) => profileReducer(s, history)),
  )(preState)

  return state
}
