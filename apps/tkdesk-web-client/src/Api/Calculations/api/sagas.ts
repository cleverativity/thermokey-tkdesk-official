import * as T from 'Model/table'

import { call } from 'redux-saga/effects'

import * as APICalculations from 'Api/Calculations/api/endpoints'
import * as APIFanModels from '../../FanModels/api/endpoints'
import * as MC from 'Model/Calculations/marshal'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Api/Coils/api/saga')

// CALCULATION NEW
export function* getOrCreateSaga() {
  log.debug('getOrCreateSaga')

  const response: {
    data: {
      id: string
      status:
        | 'created'
        | 'use_case_selected'
        | 'solved'
        | 'detailed'
        | 'completed'
    }
  } = yield call(APICalculations.getOrCreate)

  log.debug('getOrCreateSaga.response', response)
  const { data: calculation } = response

  const { id, status } = calculation
  return { id, status }
}

export function* setUseCaseSaga(id: string, use_case: string) {
  log.debug('setUseCaseSaga.values', { id, use_case })

  const response: { data: CalculationBack } = yield call(
    APICalculations.setUseCase,
    id,
    use_case,
  )

  log.debug('setUseCaseSaga.response', response)
  const { data: calculation } = response
  return MC.marshalCalculationFrom(calculation)
}

// SEARCH
export function* searchFanModelsSaga(params: SearchParameters) {
  log.debug('searchFanModelsSaga.params', params)

  const response: { data: FanModels[] } = yield call(
    APIFanModels.searchFanModels,
    params,
  )

  log.debug('searchFanModelsSaga.response', response)

  return {
    datas: response.data,
  }
}

// EXPORT
export function* exportSaga(filters: any) {
  log.debug('exportSaga.filters', filters)

  const marshaledData = MC.marshalFileters(filters)

  const response: { data: User } = yield call(
    APICalculations.exportCalculations,
    marshaledData,
  )
  log.debug('exportSaga.response', response)
  return response.data
}

// EXPORT SOLVE REPORT
export function* exportSolveReportSaga(dates: any) {
  log.debug('exportSolveReportSaga.dates', dates)

  const response: { data: User } = yield call(
    APICalculations.exportSolveReport,
    { from: dates[0], to: dates[1] },
  )
  log.debug('exportSolveReportSaga.response', response)
  return response.data
}

// SOLVE
export function* solveSaga(id: string, calculation: any) {
  log.debug('solveSaga.values', { id, calculation })

  const { use_case } = calculation

  const { fan_model_code } = calculation
  const data =
    use_case === 'free_cooling_condenser'
      ? MC.marshalCalculationTo(calculation)
      : { data: MC.marshalCalculationTo(calculation), fan_model_code }

  const response: { data: CalculationBack } = yield call(
    APICalculations.solve,
    id,
    data,
  )

  log.debug('solveSaga.response', response)
  const { data: new_calculation } = response
  return MC.marshalCalculationFrom(new_calculation)
}

export function* setDetailSaga(id: string, model_code: string) {
  log.debug('setDetailSaga.values', { id, model_code })

  const response: { data: CalculationBack } = yield call(
    APICalculations.setDetail,
    id,
    model_code,
  )

  log.debug('setDetailSaga.response', response)
  const { data: calculation } = response
  return MC.marshalCalculationFrom(calculation)
}

export function* completeSaga(id: string) {
  log.debug('completeSaga.values', { id })

  const response: { data: CalculationBack } = yield call(
    APICalculations.complete,
    id,
  )

  log.debug('completeSaga.response', response)
  const { data: calculation } = response
  return MC.marshalCalculationFrom(calculation)
}

export function* resetStatusSaga(id: string, status: string) {
  log.debug('resetStatus.values', { id, status })

  const response: { data: CalculationBack } = yield call(
    APICalculations.resetStatus,
    id,
    status,
  )

  log.debug('resetStatus.response', response)
  const { data: calculation } = response
  return MC.marshalCalculationFrom(calculation)
}

export function* generatePdfSaga(id: string) {
  log.debug('generatePdfSaga.values', { id })

  const response: { data: string } = yield call(APICalculations.generatePdf, id)

  return response
}

// CALCULATION SEARCH
export function* searchSaga(params: SearchParameters) {
  log.debug('searchSaga.params', params)

  const paramsTo = T.marshalParamsTo(params)
  const response: { data: CalculationBack[] } = yield call(
    APICalculations.searchCalculations,
    paramsTo,
  )

  log.debug('searchSaga.response', response)

  const newCalculations = _.map(
    response.data,
    (calculation: CalculationBack) => calculation,
  )

  return {
    datas: newCalculations,
    pagination: T.marshalPaginationFrom(response),
  }
}

// CALCULATION GET
export function* getCalculationSaga(id: string) {
  log.debug('getCalculationSaga.id', id)

  const response: { data: CalculationBack } = yield call(
    APICalculations.getCalculation,
    id,
  )

  const { data } = response
  const res = MC.marshalCalculationFrom(data)

  log.debug('getCalculationSaga.response', { response, res })

  return res
}
