import { createAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import * as R from 'ramda'

export const getRouteLoadActions = (
  prefix: string,
): { [key: string]: string } => {
  return {
    ROUTE: `${prefix}_ROUTE`,

    LOAD: `${prefix}_LOAD`,
    LOAD_SUCCESS: `${prefix}_LOAD_SUCCESS`,
    LOAD_FAIL: `${prefix}_LOAD_FAIL`,
  }
}

export const getRouteLoadQueryActions = (
  prefix: string,
): { [key: string]: string } => {
  return {
    ROUTE: `${prefix}_ROUTE`,

    LOAD: `${prefix}_LOAD`,
    LOAD_SUCCESS: `${prefix}_LOAD_SUCCESS`,
    LOAD_FAIL: `${prefix}_LOAD_FAIL`,

    UPDATE_QUERY_PARAMETERS: `${prefix}_UPDATE_QUERY_PARAMETERS`,
    UPDATE_QUERY_PARAMETERS_SUCCESS: `${prefix}_UPDATE_QUERY_PARAMETERS_SUCCESS`,
    UPDATE_QUERY_PARAMETERS_FAIL: `${prefix}_UPDATE_QUERY_PARAMETERS_FAIL`,
  }
}

export const getAsyncActions = (prefix: string, actions: string[]) => {
  return R.reduce(
    (acc: any, action: string) => ({
      ...acc,
      [action]: `${prefix}_${action}`,
      [`${action}_SUCCESS`]: `${prefix}_${action}_SUCCESS`,
      [`${action}_FAIL`]: `${prefix}_${action}_FAIL`,
    }),
    {},
    actions,
  )
}

export const getAsyncActionsFunctions = (
  actions: any,
  baseActions: string[],
): { [key: string]: any } => {
  return R.reduce(
    (acc: any, baseAction: string) => {
      const camelCaseBaseAction = _.camelCase(baseAction)
      return {
        ...acc,
        [camelCaseBaseAction]: createAction<any>(actions[baseAction]),
        [`${camelCaseBaseAction}Success`]: createAction<any>(
          actions[`${baseAction}_SUCCESS`],
        ),
        [`${camelCaseBaseAction}Fail`]: createAction<any>(
          actions[`${baseAction}_FAIL`],
        ),
      }
    },
    {},
    baseActions,
  )
}

export const getRouteLoadActionsFunctions = (
  actions: any,
): { [key: string]: any } => {
  return {
    route: createAction(actions.ROUTE),

    load: createAction(actions.LOAD),
    loadSuccess: createAction<any>(actions.LOAD_SUCCESS),
    loadFail: createAction<any>(actions.LOAD_FAIL),
  }
}

export const getRouteLoadQueryActionsFunctions = (
  actions: any,
): { [key: string]: any } => {
  return {
    ...getRouteLoadActionsFunctions(actions),
    updateQueryParameters: createAction<any>(actions.UPDATE_QUERY_PARAMETERS),
    updateQueryParametersSuccess: createAction<any>(
      actions.UPDATE_QUERY_PARAMETERS_SUCCESS,
    ),
    updateQueryParametersFail: createAction<any>(
      actions.UPDATE_QUERY_PARAMETERS_FAIL,
    ),
  }
}
