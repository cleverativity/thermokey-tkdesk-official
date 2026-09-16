import { call } from 'redux-saga/effects'
import { ConsoleLogger } from 'aws-amplify/utils'

import * as APISelections from './endpoints'

import * as T from 'Model/table'
import * as MS from 'Model/Selections/marshal'

const log = new ConsoleLogger('Api/Selections/api/saga')

// SEARCH
export function* searchSaga(params: SearchParameters) {
  log.debug('searchSaga.params', params)

  const paramsTo = T.marshalParamsTo(params)
  const response: { data: SelectionBack[] } = yield call(
    APISelections.searchSelections,
    paramsTo,
  )

  log.debug('searchSaga.response', response)

  return {
    datas: response.data,
    pagination: T.marshalPaginationFrom(response),
  }
}

export function* getOrCreateSaga() {
  const response: {
    data: any
  } = yield call(APISelections.getOrCreate)

  log.debug('getOrCreateSaga.response', response)
  const { data } = response
  const { id } = data

  return { id }
}

export function* getSelectionSaga(id: string) {
  log.debug('getSelectionSaga.id', id)

  const response: { data: SelectionBack } = yield call(
    APISelections.getSelection,
    id,
  )

  log.debug('getSelectionSaga.response', response)
  const { data } = response

  return data
}

export function* resetStatusSaga(id: string, status: string) {
  log.debug('resetStatus.values', { id, status })

  const response: { data: SelectionBack } = yield call(
    APISelections.resetStatus,
    id,
    status,
  )

  log.debug('resetStatus.response', response)
  const { data } = response

  return data
}

// STEPS
export function* setUseCaseSaga(id: string, macro_serie: string) {
  log.debug('setUseCaseSaga.values', { id, macro_serie })

  const response: { data: SelectionBack } = yield call(
    APISelections.setUseCase,
    id,
    macro_serie,
  )

  log.debug('setUseCaseSaga.response', response)
  const { data } = response

  return data
}

export function* solveSaga(id: string, selection: any) {
  log.debug('solveSaga.values', { id, selection })

  const { input_data } = selection

  const marshaledSelections = MS.marshalSelectionTo(input_data)

  const data = { data: marshaledSelections }

  const response: { data: SelectionBack } = yield call(
    APISelections.solve,
    id,
    data,
  )

  log.debug('solveSaga.response', response)
  const { data: new_selection } = response

  return new_selection
}

export function* setDetailSaga(id: string, machine_id: number) {
  log.debug('setDetailSaga.values', { id, machine_id })

  const response: { data: SelectionBack } = yield call(
    APISelections.setDetail,
    id,
    machine_id,
  )

  log.debug('setDetailSaga.response', response)
  const { data: new_selection } = response

  return new_selection
}

export function* getSeriesAndSubseriesRelationsSaga() {
  const response: { data: any } = yield call(
    APISelections.getSeriesAndSubseriesRelations,
  )

  log.debug('getSeriesAndSubseriesRelationsSaga.response', response)
  const { data } = response

  return data
}

export function* getDiametersSaga() {
  const response: { data: SelectionBack } = yield call(
    APISelections.getDiameters,
  )

  log.debug('getDiametersSaga.response', response)
  const { data } = response

  const diameters = MS.marshalDiametersFrom(data)

  return diameters
}

export function* getAccessoriesSaga(id: string, machine_id: number) {
  log.debug('getAccessoriesSaga.values', { id, machine_id })

  const response: { data: SelectionBack } = yield call(
    APISelections.getAccessories,
    id,
    machine_id,
  )

  log.debug('getAccessoriesSaga.response', response)
  const { data } = response

  const accessories = MS.marshalAccessoriesFrom(data)

  return accessories
}

export function* editCustomDataSaga(id: string, values: any) {
  log.debug('editCustomDataSaga.values', { id, values })

  const customData = MS.marshalCustomDataTo(values)

  const response: { data: any } = yield call(
    APISelections.editCustomData,
    id,
    customData,
  )

  log.debug('editCustomDataSaga.response', response)
  const { data } = response

  const marshaledData = MS.marshalCustomDataFrom(values, data)

  return marshaledData
}

export function* generatePdfSaga(
  id: string,
  template: string,
  selections: any,
  session_id: string,
) {
  log.debug('generatePdfSaga.values', { id, template, selections, session_id })

  const marshaledValues = MS.marshalValuesTo(selections)

  const response: { data: string } = yield call(
    APISelections.generatePdf,
    id,
    template,
    marshaledValues,
    session_id,
  )

  return response
}
