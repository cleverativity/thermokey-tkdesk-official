import actions from './actions'
import { actionsFunctionsProfile } from 'Modules/App/actions/profile'
import { createReducer } from '@reduxjs/toolkit'
import _ from 'lodash'

import * as REDParams from 'Generic/SearchParams/reducer'

const initState: any = {
  generic: {
    params: undefined,
    data: {},
    loading: true,
    error: false,
  },
  search: {
    params: {
      orders: { order: 'descend', field: 'date' },
      filters: { status: [] },
      query: '',
      pagination: {},
    },
    data: [],
    loading: true,
    error: false,
  },
  detail: {
    params: undefined,
    data: {},
    loading: true,
    error: false,
  },
  manage: {
    params: {
      isFirstTimeLanguageRendered: true,
      isLanguageChanged: false,
      isRegenerating: false,
      pagination: { pageSize: 1000 },
      filters: {
        enabled: [true],
        phase_type: ['tri'],
        fan_type: ['ec'],
        frequency: [50],
      },
      ranges: {
        fan_diameter: {
          from: 500,
          to: 1500,
        },
        voltage: {
          from: 400,
          to: 500,
        },
      },
    },
    data: {},
    loading: true,
    error: false,
    update_field: false,
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
      const { calculations, pagination } = action.payload

      return {
        ...s,
        data: calculations,
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

const genericReducer = createReducer(initState.generic, (builder) => {
  builder

    // ROUTE
    .addCase(actions.generic.route, (s, action) => {
      return { ...s, loading: true, error: false }
    })

    // PRELOAD
    .addCase(actions.generic.preload, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.generic.preloadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.generic.preloadSuccess, (s, action) => {
      const { id } = action.payload

      return {
        ...s,
        data: { calculation: { id } },
        loading: true,
        error: false,
      }
    })
})

const detailReducer = createReducer(initState.detail, (builder) => {
  builder
    .addCase(actions.detail.load, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.detail.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.detail.loadSuccess, (s, action) => {
      const { calculation } = action.payload

      return {
        ...s,
        data: { calculation },
        loading: false,
        error: false,
      }
    })
})

const manageReducer = createReducer(initState.manage, (builder) => {
  builder

    // LOAD
    .addCase(actions.manage.load, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.loadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.loadSuccess, (s, action) => {
      const {
        calculation,
        steps_config,
        available_n_of_tubes_values,
        geometric_constants,
        calculated_data = {},
        refrigerants,
        fan_models,
      } = action.payload

      return {
        ...s,
        data: {
          calculation,
          steps_config,
          available_n_of_tubes_values,
          geometric_constants,
          calculated_data,
          refrigerants,
          fan_models,
        },
        loading: false,
        error: false,
      }
    })

    // SET USE CASE
    .addCase(actions.manage.setUseCase, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.setUseCaseFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.setUseCaseSuccess, (s, action) => {
      const {
        calculation,
        calculated_data,
        available_n_of_tubes_values,
        refrigerants,
        fan_models,
      } = action.payload

      return {
        ...s,
        data: {
          ...s?.data,
          calculation,
          calculated_data,
          available_n_of_tubes_values,
          refrigerants,
          fan_models,
        },
        loading: false,
        error: false,
      }
    })

    // SOLVE
    .addCase(actions.manage.solve, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.solveFail, (s, action) => {
      const { error, input_data, circuit } = action.payload

      const input_data_updated = _.cloneDeep(
        s?.data.calculation.input_data ?? {},
      )

      const keys_input_data_updated = _.keys(input_data_updated)

      keys_input_data_updated.forEach((key) => {
        const next_value = input_data?.[key]

        if (_.isPlainObject(next_value) && !_.has(next_value, 'value')) {
          input_data_updated[key] = _.merge(
            {},
            input_data_updated[key],
            next_value,
          )
          return
        }

        const updated_value = _.has(next_value, 'value')
          ? next_value.value
          : input_data_updated[key]?.value

        input_data_updated[key] = {
          ...input_data_updated[key],
          ...next_value,
          value: updated_value,
        }
      })

      return {
        ...s,
        data: {
          ...s?.data,
          calculation: {
            ...s?.data.calculation,
            input_data: { ...input_data, ...input_data_updated },
            ...(circuit !== undefined ? { circuit } : {}),
          },
        },
        loading: false,
        error,
      }
    })
    .addCase(actions.manage.solveSuccess, (s, action) => {
      const { calculation } = action.payload

      return {
        ...s,
        data: { ...s?.data, calculation },
        loading: false,
        error: false,
      }
    })

    // SET DETAIL
    .addCase(actions.manage.setDetail, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.setDetailFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.setDetailSuccess, (s, action) => {
      const { calculation } = action.payload

      return {
        ...s,
        data: { ...s?.data, calculation },
        loading: false,
        error: false,
      }
    })

    // COMPLETE
    .addCase(actions.manage.complete, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.completeFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.completeSuccess, (s, action) => {
      const { calculation } = action.payload

      return {
        ...s,
        data: { ...s?.data, calculation },
        loading: false,
        error: false,
      }
    })

    // RESET STATUS
    .addCase(actions.manage.resetStatus, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.resetStatusFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.resetStatusSuccess, (s, action) => {
      const { calculation, calculated_data } = action.payload

      return {
        ...s,
        data: { ...s?.data, calculation, calculated_data },
        loading: false,
        error: false,
      }
    })

    // CREATE ORDER
    .addCase(actions.manage.createOrder, (s, action) => {
      return { ...s, loading: true, error: false }
    })
    .addCase(actions.manage.createOrderFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })
    .addCase(actions.manage.createOrderSuccess, (s, action) => {
      const { order } = action.payload

      return {
        ...s,
        // data: { ...s?.data },
        loading: false,
        error: false,
      }
    })

    // CALC CORE HEIGHT
    .addCase(actions.manage.calcCoreHeight, (s, action) => {
      return { ...s, loading: false, error: false, update_field: true }
    })
    .addCase(actions.manage.calcCoreHeightFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error, update_field: false }
    })
    .addCase(actions.manage.calcCoreHeightSuccess, (s, action) => {
      const { core_height } = action.payload

      return {
        ...s,
        data: {
          ...s?.data,
          calculated_data: {
            ...s?.data?.calculated_data,
            core_height,
          },
        },
        loading: false,
        error: false,
        update_field: false,
      }
    })

    // CALC FLOW RATE AIR
    .addCase(actions.manage.calcFlowRateAir, (s, action) => {
      return { ...s, loading: false, error: false, update_field: true }
    })
    .addCase(actions.manage.calcFlowRateAirFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error, update_field: false }
    })
    .addCase(actions.manage.calcFlowRateAirSuccess, (s, action) => {
      const { flow_rate_air } = action.payload

      return {
        ...s,
        data: {
          ...s?.data,
          calculated_data: {
            ...s?.data?.calculated_data,
            flow_rate_air,
          },
        },
        loading: false,
        error: false,
        update_field: false,
      }
    })

    // CALC VELOCITY AIR
    .addCase(actions.manage.calcVelocityAir, (s, action) => {
      return { ...s, loading: false, error: false, update_field: true }
    })
    .addCase(actions.manage.calcVelocityAirFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error, update_field: false }
    })
    .addCase(actions.manage.calcVelocityAirSuccess, (s, action) => {
      const { inlet_velocity_air } = action.payload

      return {
        ...s,
        data: {
          ...s?.data,
          calculated_data: {
            ...s?.data?.calculated_data,
            inlet_velocity_air,
          },
        },
        loading: false,
        error: false,
        update_field: false,
      }
    })

    // MANAGE UPDATE QUERY PARAMETERS
    .addCase(actions.manage.updateQueryParameters, (s, action) => {
      return { ...s, loading: false, error: false }
    })

    .addCase(actions.manage.updateQueryParametersSuccess, (s, action) => {
      const { fan_models, params, currentCalculations, calculated_data } =
        action.payload

      return {
        ...s,
        data: {
          ...s?.data,
          calculation: { ...currentCalculations },
          calculated_data,
          fan_models,
        },
        params: { ...s?.params, ...params },
        loading: false,
        error: false,
      }
    })

    .addCase(actions.manage.updateQueryParametersFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: false, error }
    })

    // DOWNLOAD
    .addCase(actions.manage.download, (s, action) => {
      return { ...s, loading: false, error: false }
    })

    .addCase(actions.manage.downloadFail, (s, action) => {
      const { error } = action.payload
      return { ...s, loading: true, error }
    })

    .addCase(actions.manage.regenerate, (s, action) => {
      return {
        ...s,
        params: {
          ...s?.params,
          isRegenerating: true,
          isLanguageChanged: false,
        },
        loading: false,
      }
    })
    .addCase(actions.manage.regenerateSuccess, (s, action) => {
      return {
        ...s,
        params: {
          ...s?.params,
          isRegenerating: true,
          isLanguageChanged: false,
        },
        loading: false,
      }
    })
    .addCase(actions.manage.regenerateFail, (s, action) => {
      return {
        ...s,
        params: {
          ...s?.params,
          isRegenerating: false,
          isLanguageChanged: false,
        },
        loading: false,
        error: true,
      }
    })

    .addCase(actions.manage.receivedUpdate, (s, action) => {
      return {
        ...s,
        params: {
          ...s?.params,
          isRegenerating: false,
        },
      }
    })

    .addCase(actionsFunctionsProfile.setLanguage, (s, action) => {
      return { ...s }
    })
    .addCase(actionsFunctionsProfile.setLanguageSuccess, (s, action) => {
      return {
        ...s,
        params: {
          ...s?.params,
          isFirstTimeLanguageRendered: false,
          isLanguageChanged: !s?.params.isFirstTimeLanguageRendered,
        },
      }
    })
})

export default function reducer(preState = initState, history: any) {
  const generic = genericReducer(_.get(preState, 'generic'), history)
  const manage = manageReducer(_.get(preState, 'manage'), history)
  const search = searchReducer(_.get(preState, 'search'), history)
  const detail = detailReducer(_.get(preState, 'detail'), history)

  const state: any = { generic, search, detail, manage }

  return state
}
