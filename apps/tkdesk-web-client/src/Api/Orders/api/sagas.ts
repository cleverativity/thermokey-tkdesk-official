import * as T from 'Model/table'

import { call } from 'redux-saga/effects'

import * as APIOrders from 'Api/Orders/api/endpoints'
import * as MO from 'Model/Orders/marshal'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Api/Orders/api/saga')

// SEARCH
export function* searchSaga(params: SearchParameters) {
  log.debug('searchSaga.params', params)

  const paramsTo = T.marshalParamsTo(params)
  const response: { data: OrderBack[] } = yield call(
    APIOrders.searchOrders,
    paramsTo
  )

  log.debug('searchSaga.response', response)

  const newOrders = _.map(response.data, (order: OrderBack) =>
    MO.marshalOrderFrom(order)
  )

  return {
    datas: newOrders,
    pagination: T.marshalPaginationFrom(response),
  }
}

export function* createSaga(id: string) {
  log.debug('createSaga.id', id)

  const response: { data: OrderBack } = yield call(APIOrders.createOrder, id)

  log.debug('createSaga.response', response)

  const { data: order } = response

  return MO.marshalOrderFrom(order)
}

export function* getSaga(id: string) {
  log.debug('getSaga.id', id)

  const response: { data: OrderBack } = yield call(APIOrders.getOrder, id)

  log.debug('getSaga.response', response)

  const { data: order } = response

  return MO.marshalOrderFrom(order)
}

export function* editSaga(id: string, status: 'created' | 'open' | 'closed') {
  log.debug('editSaga.id', id)

  const response: { data: OrderBack } = yield call(
    APIOrders.editOrder,
    id,
    status
  )

  log.debug('editSaga.response', response)

  const { data: order } = response

  return MO.marshalOrderFrom(order)
}
