import actions from './actions'
import { createReducer } from '@reduxjs/toolkit'

import * as R from 'ramda'

const initState: GlobalState = {
  corrective_factors: {
    detail: {
      params: undefined,
      loading: true,
      error: false,
      data: {},
    },
    edit: {
      params: undefined,
      loading: true,
      error: false,
      data: {},
    },
  },

  refrigerants: {
    detail: {
      params: undefined,
      loading: true,
      error: false,
      data: {},
    },
    edit: {
      params: undefined,
      loading: true,
      error: false,
      data: {},
    },
  },
}

const correctiveFactorDetailReducer = createReducer(
  initState.corrective_factors?.detail,
  (builder) => {
    builder
      //ROUTE
      .addCase(actions.corrective_factors.detail.route, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      // DETAIL LOAD
      .addCase(actions.corrective_factors.detail.load, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      .addCase(actions.corrective_factors.detail.loadFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error }
      })

      .addCase(actions.corrective_factors.detail.loadSuccess, (s, action) => {
        const { settings } = action.payload
        return {
          ...s,
          data: settings,
          loading: false,
          error: false,
        }
      })
  },
)

const correctiveFactorEditReducer = createReducer(
  initState.corrective_factors?.edit,
  (builder) => {
    builder
      //ROUTE
      .addCase(actions.corrective_factors.edit.route, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      // EDIT LOAD
      .addCase(actions.corrective_factors.edit.load, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      .addCase(actions.corrective_factors.edit.loadFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error }
      })

      .addCase(actions.corrective_factors.edit.loadSuccess, (s, action) => {
        const { settings } = action.payload
        return {
          ...s,
          data: settings,
          loading: false,
          error: false,
        }
      })

      // EDIT COMPLETE
      .addCase(actions.corrective_factors.edit.complete, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      .addCase(actions.corrective_factors.edit.completeFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error }
      })

      .addCase(actions.corrective_factors.edit.completeSuccess, (s, action) => {
        const { settings } = action.payload
        return {
          ...s,
          data: settings,
          loading: false,
          error: false,
        }
      })
  },
)

// REFRIGERANTS
const refrigerantsDetailReducer = createReducer(
  initState.refrigerants?.detail,
  (builder) => {
    builder
      //ROUTE
      .addCase(actions.refrigerants.detail.route, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      // DETAIL LOAD
      .addCase(actions.refrigerants.detail.load, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      .addCase(actions.refrigerants.detail.loadFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error }
      })

      .addCase(actions.refrigerants.detail.loadSuccess, (s, action) => {
        const { settings } = action.payload
        return {
          ...s,
          data: settings,
          loading: false,
          error: false,
        }
      })
  },
)

const refrigerantsEditReducer = createReducer(
  initState.refrigerants?.edit,
  (builder) => {
    builder
      //ROUTE
      .addCase(actions.refrigerants.edit.route, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      // EDIT LOAD
      .addCase(actions.refrigerants.edit.load, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      .addCase(actions.refrigerants.edit.loadFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error }
      })

      .addCase(actions.refrigerants.edit.loadSuccess, (s, action) => {
        const { settings } = action.payload
        return {
          ...s,
          data: settings,
          loading: false,
          error: false,
        }
      })

      // EDIT COMPLETE
      .addCase(actions.refrigerants.edit.complete, (s, action) => {
        return { ...s, loading: true, error: false }
      })

      .addCase(actions.refrigerants.edit.completeFail, (s, action) => {
        const { error } = action.payload
        return { ...s, loading: false, error }
      })

      .addCase(actions.refrigerants.edit.completeSuccess, (s, action) => {
        const { settings } = action.payload
        return {
          ...s,
          data: settings,
          loading: false,
          error: false,
        }
      })
  },
)

export default function reducer(preState = initState, history: any) {
  const state: any = R.pipe(
    R.over<any, any>(R.lensPath(['corrective_factors', 'detail']), (s) =>
      correctiveFactorDetailReducer(s, history),
    ),
    R.over<any, any>(R.lensPath(['corrective_factors', 'edit']), (s) =>
      correctiveFactorEditReducer(s, history),
    ),
    R.over<any, any>(R.lensPath(['refrigerants', 'detail']), (s) =>
      refrigerantsDetailReducer(s, history),
    ),
    R.over<any, any>(R.lensPath(['refrigerants', 'edit']), (s) =>
      refrigerantsEditReducer(s, history),
    ),
  )(preState)

  return state
}
