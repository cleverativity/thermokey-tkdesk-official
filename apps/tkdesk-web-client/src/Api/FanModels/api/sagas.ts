import * as T from 'Model/table'
import { call } from 'redux-saga/effects'
import { ConsoleLogger } from 'aws-amplify/utils'

import * as APIFanModels from './endpoints'
import * as MFM from 'Model/FanModels/marshal'

const log = new ConsoleLogger('Api/FanModels/api/saga')

// SEARCH
export function* searchSaga(params: SearchParameters) {
  log.debug('searchSaga.params', params)

  const paramsTo = T.marshalParamsTo(params)
  const response: { data: FanModels[] } = yield call(
    APIFanModels.searchFanModels,
    paramsTo,
  )

  log.debug('searchSaga.response', response)

  return {
    datas: response.data,
    pagination: T.marshalPaginationFrom(response),
  }
}

// CREATE
export function* createSaga(fan_model: FanModels) {
  log.debug('createSaga.fan_model', fan_model)

  const response: { data: FanModels } = yield call(
    APIFanModels.createFanModels,
    fan_model,
  )
  log.debug('createSaga.response', response)
  const { data } = response
  return data
}

// IMPORT
export function* importSaga(storage_url: string) {
  log.debug('importSaga.storage_url', storage_url)

  const response: { data: FanModels } = yield call(
    APIFanModels.importFanModels,
    storage_url,
  )
  log.debug('importSaga.response', response)
  const { data } = response
  return data
}

// GET
export function* getSaga(id: string) {
  const response: { data: FanModels } = yield call(
    APIFanModels.getFanModels,
    id,
  )

  log.debug('getSaga.response', response)
  const { data } = response
  return data
}

// EDIT
export function* editSaga(fan_model: FanModels) {
  log.debug('editSaga.fan_model', fan_model)

  const marshaledFanModel: any = MFM.marshalFanModelTo(fan_model)
  log.debug('editSaga.marshaledFanModel', marshaledFanModel)

  const response: { data: FanModels } = yield call(
    APIFanModels.editFanModels,
    marshaledFanModel,
  )
  log.debug('editSaga.response', response)
  const { data } = response
  return data
}

// DELETE
export function* deleteSaga(id: string) {
  log.debug('deleteSaga.values', { id })
  const response: { data: FanModels } = yield call(
    APIFanModels.deleteFanModels,
    id,
  )
  log.debug('deleteSaga.response', response)
  const { data } = response
  return data
}

// SEARCH POLYNOMIAL
export function* searchPolynomialsSaga(
  params: SearchParameters,
  fan_model_id: string,
) {
  log.debug('searchPolynomialsSaga.params', params, fan_model_id)

  const paramsTo = T.marshalParamsTo(params)
  const response: { data: Polynomials } = yield call(
    APIFanModels.searchPolynomials,
    paramsTo,
    fan_model_id,
  )

  log.debug('searchPolynomialsSaga.response', response)

  return {
    datas: response.data,
    pagination: T.marshalPaginationFrom(response),
  }
}

// CREATE POLYNOMIAL
export function* createPolynomialsSaga(
  fan_model_id: string,
  polynomial: Polynomials,
) {
  log.debug('createPolynomialsSaga.polynomial', polynomial)

  const { polynomial_type, poly_config } = polynomial

  const response: { data: Polynomials } = yield call(
    APIFanModels.createPolynomials,
    fan_model_id,
    { polynomial_type, poly_config },
  )
  log.debug('createPolynomialsSaga.response', response)
  const { data } = response
  return data
}

// GET POLYNOMIAL
export function* getPolynomialsSaga(id: string) {
  const response: { data: Polynomials } = yield call(
    APIFanModels.getPolynomials,
    id,
  )

  log.debug('getPolynomialsSaga.response', response)
  const { data } = response

  return data
}

// EDIT
export function* editPolynomialSaga(payload: any) {
  log.debug('editPolynomialSaga.polynomial', payload)
  const { id, polynomial_type, poly_config } = payload

  const response: { data: FanModels } = yield call(
    APIFanModels.editPolynomials,
    { polynomial_type, poly_config },
    id,
  )
  log.debug('editPolynomialSaga.response', response)
  const { data } = response
  return data
}

// DELETE POLYNOMIAL
export function* deletePolynomialsSaga(id: string) {
  log.debug('deletePolynomialsSaga.values', { id })
  const response: { data: FanModels } = yield call(
    APIFanModels.deletePolynomials,
    id,
  )
  log.debug('deletePolynomialsSaga.response', response)
  const { data } = response
  return data
}
