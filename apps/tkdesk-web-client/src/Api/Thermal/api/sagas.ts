import { ConsoleLogger } from 'aws-amplify/utils'
import { call } from 'redux-saga/effects'
import _ from 'lodash'

import * as APISettings from './endpoints'

const log = new ConsoleLogger('Comp/Field/FieldUMSwitch')

export function* getCondenserModelSaga() {
  const response: { data: any } = yield call(APISettings.getCondenserModels)

  const condensersModel = _.get(response, 'data')
  log.info('getCardanoSaga.response', condensersModel)
  return condensersModel
}

export function* getCondenserTypeSaga() {
  const response: { data: any } = yield call(APISettings.getCondenserTypes)
  const condensersType = _.get(response, 'data')
  log.info('getCondenserTypeSaga.response', condensersType)
  return condensersType
}

export function* getFanConSaga() {
  const response: { data: any } = yield call(APISettings.getFanConnection)

  const fanConnection = _.get(response, 'data')
  log.info('getFanconnectionSaga.response', fanConnection)
  return fanConnection
}

export function* getRefTypeSaga() {
  const response: { data: any } = yield call(APISettings.getRefType)
  const refType = _.get(response, 'data')
  log.info('getRefTypeSaga.response', refType)
  return refType
}

export function* getAccessoriesSaga(payload: any) {
  const response: { data: any } = yield call(
    APISettings.getAccessories,
    payload,
  )
  const accessories = _.get(response, 'data')
  log.info('getAccessoriesSaga.response', { accessories, payload })
  return accessories
}

export function* getAccessoriesPriceSaga(payload: any) {
  const response: { data: any } = yield call(
    APISettings.getAccessoriesPrice,
    payload,
  )
  let accessoriesPrice = _.get(response, 'data', {})
  if (Array.isArray(accessoriesPrice)) {
    accessoriesPrice = accessoriesPrice.length > 0 ? accessoriesPrice[0] : {}
  }
  log.info('getAccessoriesPriceSaga.response', { accessoriesPrice, payload })
  return accessoriesPrice
}

//Temporary endpoint

export function* createSetUseCaseSaga(id: number, payload: any) {
  const { selection, user_id } = payload
  let user = _.get(selection, 'user_id', {})
  const newData = {
    ...selection,
    user_id: user_id,
    status: selection.status,
    selection_id: id,
    macro_serie: payload.macro_serie,
  }

  log.info('createSetUseCase.data', { newData, payload })
  const response: { data: SelectionBack } = yield call(
    APISettings.createSolve,
    newData,
  )
  let use_case_res = _.get(response, 'response.data', {})
  if (Array.isArray(use_case_res)) {
    use_case_res = use_case_res.length > 0 ? use_case_res[0] : {}
  }
  log.info('createSetUseCaseSaga.response', { use_case_res })
  return use_case_res
}

export function* createSolveSaga(id: number, payload: any) {
  const { condenser, user_id, macro_serie } = payload
  let user = _.get(condenser, 'user', {})
  const newData = {
    ...payload,
    status: 'solved',
    selection_id: id,
    macro_serie: macro_serie,
  }

  log.info('createSolveSaga.data', { newData, payload })
  const response: { data: SelectionBack } = yield call(
    APISettings.createSolve,
    newData,
  )

  log.info('createSolveSaga.response', { response })
  return newData
}

export function* createDetailedSaga(id: number, payload: any) {
  log.info('createDetailedSaga.payload', { payload })
  const { condenser, selectedCondenser, macro_serie, user_id } = payload

  // let accessoriesData = {
  //   ...accessories,
  //   unitDiscount: accessories.accessoriesUnitDiscount,
  //   refRigerantType: condenser?.refrigerantType,
  //   flowDirection: condenser?.airFlowDirection,
  //   selectedItems: [...accessories.electrical_accessories, ...accessories.mechanical_accessories],
  //   fansConnection: condenser?.fansConnection,
  //   condenserModel: accessories.selectedCondenser,
  //   newCondenserModel: accessories.condenserModel,
  //   current_a: condenser?.current_a,
  //   price: condenser?.price,
  // }

  let newData = {
    // ...selectedCondenser.model,
    condenser: condenser,
    user_id: user_id,
    status: 'detailed',
    id: condenser?.modelId,
    selection_id: id,
    macro_serie: macro_serie,
  }

  // const jsonData = JSON.stringify(newData);
  // delete accessoriesData.electrical_accessories
  // delete accessoriesData.mechanical_accessories

  // delete accessoriesData.accessoriesPrice
  // delete accessoriesData.accessoriesTotal
  // delete accessoriesData.accessoriesUnitDiscount
  // delete accessoriesData.accessoriesUnitPrice

  log.info('createDetailed.data', { newData, payload })
  const response: { data: SelectionBack } = yield call(
    APISettings.createSolve,
    newData,
  )

  return payload
}

export function* getCurrentStepSaga(id: number) {
  try {
    const response: { data: any } = yield call(APISettings.getCurrentStep, id)
    let currentStep = _.get(response, 'data', {})

    if (Array.isArray(currentStep)) {
      currentStep = currentStep.length > 0 ? currentStep[0] : {}
    }
    log.info('getCurrentStepSaga.response', currentStep)
    return currentStep
  } catch (error) {
    console.error('getCurrentStepSaga.error', { error, id })
    return null
  }
}

export function* getCondenserAndAccessoriesSaga(id: number, status: string) {
  const response: { data: any } = yield call(
    APISettings.getCondenserAndAccessories,
    id,
    status,
  )
  let getConAndAcc = _.get(response, 'data', {})

  if (Array.isArray(getConAndAcc)) {
    getConAndAcc = getConAndAcc.length > 0 ? getConAndAcc[0] : {}
  }

  const accessories = _.get(getConAndAcc, 'data.accessories', {})
  const condenser = _.get(getConAndAcc, 'data.condenser', {})

  log.info('getCondenserAndAccessoriesSaga.response', {
    accessories,
    condenser,
    data: getConAndAcc,
    id,
    status,
  })
  return { accessories, condenser, data: getConAndAcc }
}

export function* deleteSolveSaga(id: number) {
  if (id == null || Number.isNaN(Number(id))) {
    log.info('deleteSolveSaga.skipped', { id })
    return { data: null }
  }

  try {
    const response: { data: any } = yield call(APISettings.deleteSolve, id)
    log.info('deleteSolveSaga.response', { response, id })
    return response
  } catch (error: any) {
    if (error?.response?.status === 404) {
      log.info('deleteSolveSaga.alreadyDeleted', { id })
      return { data: null }
    }
    throw error
  }
}

export function* pdfCondenserSaga(payload: any) {
  const response: { data: any } = yield call(
    APISettings.pdfCondenserDownload,
    payload,
  )
  log.info('downloadPDFSaga.response', { response, payload })
  return response
}

export function* pdfEAnalysisSaga(payload: any) {
  const response: { data: any } = yield call(
    APISettings.pdfEAnalysisDownload,
    payload,
  )
  //let data = _.get(response, 'data')
  // if (Array.isArray(data)) {
  //   data = data.length > 0 ? data[0] : {};
  // }
  log.info('pdfEAnalysisSaga.response', { response, payload })
  return response
}

export function* getUnitTypeFieldsSaga(payload: any) {
  const response: { data: any } = yield call(
    APISettings.getUnitTypeFields,
    payload,
  )

  log.info('getUnitTypeFields.response', { response, payload })
  return response
}

export function* getRatingCalculationSaga(payload: any) {
  const response: { data: any } = yield call(
    APISettings.getRatingCalculation,
    payload,
  )
  log.info('getRatingCalculationSaga.response', { response, payload })
  return response
}

export function* getRatingResultSaga(payload: any) {
  const response: { data: any } = yield call(
    APISettings.getRatingResult,
    payload,
  )
  log.info('getRatingResultSaga.response', { response, payload })
  return response
}

export function* getRatingWorkingPointSaga(payload: any) {
  const response: { data: any } = yield call(
    APISettings.getRatingWorkingPoint,
    payload,
  )
  log.info('getRatingWorkingPointSaga.response', { response, payload })
  return response
}

// End temporary endpoint
