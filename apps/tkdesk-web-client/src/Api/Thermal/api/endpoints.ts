import { ConsoleLogger } from 'aws-amplify/utils'
// import { makeApiRequest } from "./config"
import { makeApiRequest } from 'Configs/api'

const log = new ConsoleLogger('Comp/Field/FieldUMSwitch')

export const getCondenserModels = async () => {
  const endpoint = 'CondenserModels'
  const { data } = await makeApiRequest(
    endpoint,
    'GET',
    {}, // options (no body/query for GET)
    false, // isRequestCredentialsApi
    true, // isThermalApi
  )
  return { data }
}

export const getCondenserTypes = async () => {
  const endpoint = 'CondenserTypes'
  const { data } = await makeApiRequest(`${endpoint}`, 'GET', {}, false, true)
  return { data }
}

export const getFanConnection = async () => {
  const endpoint = 'FanConnections'
  const { data } = await makeApiRequest(`${endpoint}`, 'GET', {}, false, true)
  return { data }
}

export const getRefType = async () => {
  const endpoint = 'RefTypes'
  const { data } = await makeApiRequest(`${endpoint}`, 'GET', {}, false, true)
  return { data }
}

export const getComputationResult = async (
  payload: any,
  parameters: SearchParameters = {},
) => {
  const {
    query = '',
    filters = [],
    orders = [],
    pagination = { pageSize: 10, current: 1 },
  } = parameters

  const { pageSize = 10, current = 1 } = pagination

  const options = {
    queryParams: { per_page: pageSize, page: current, query: query } as any,
    body: { filters, orders },
  }
  log.info('getComputationResult ', { options, payload })
  const endpoint = 'Computation'
  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    options,
    false,
    true,
    payload,
  )

  log.info('getComputationResult data', { data, options })

  // Return consistent structure with other API functions
  return {
    data,
    pagination: marshalPaginationFrom(data?.pageSize, data?.totalCount),
  }
}

export function marshalPaginationFrom(pageSize: number, totalCount: number) {
  return { total: Number(totalCount), pageSize: Number(pageSize) }
}

export const getAccessories = async (payload: any) => {
  const endpoint = 'Accessories'
  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )

  // let newData = {
  //   EA: data.filter(item => item?.type === 'EA').map(item => ({
  //     value: item?.id || null,
  //     label: item?.items || 'N/A',
  //     disabled: item?.isDisabled || false,
  //   })),
  //   MA: data.filter(item => item?.type === 'MA').map(item => ({
  //     value: item?.id || null,
  //     label: item?.items || 'N/A',
  //     disabled: item?.isDisabled || false,
  //   })),
  // }

  log.info('getAccessories.response', {
    data,
    payload,
  })

  return { data }
}

export const getAccessoriesPrice = async (payload: any) => {
  const endpoint = 'AccessoriesPrices'
  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )
  log.info('getAccessoriesPrice.response', { data, payload })
  return { data }
}

//Temporary endpoint
export const createSolve = async (payload: any) => {
  const endpoint = 'CondenserSteps'
  // log.info('createSolve.solve', payload)
  //use_case_selected
  let newValue = {}
  if (payload?.status === 'solved') {
    newValue = {
      data: payload,
      status: payload?.status,
      user_id: payload?.user_id,
      selection_id: payload?.selection_id,
      macro_serie: payload?.macro_serie,
    }
  } else {
    newValue = {
      data: {
        ...payload,
      },
      status: payload?.status,
      user_id: payload?.user_id,
      selection_id: payload?.selection_id,
      macro_serie: payload?.macro_serie,
    }
  }

  // const jsonData = JSON.stringify(newData);

  log.info('createSolve.solve', { newValue: newValue, payload })
  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    newValue,
  )

  log.info('createSolve.response', { newValue, data })
  return { data }
}
export const getCurrentStep = async (id: number) => {
  const endpoint = 'CurrentSteps' //"GetCondenserSteps"
  let data
  try {
    const response = await makeApiRequest(
      `${endpoint}?selection_id=${id}`,
      'GET',
      {},
      false,
      true,
    )
    data = response.data
    log.info('getCurrentStep.response', { data, id })
  } catch (err) {
    data = null
  }

  log.info('getCurrentStep.response', { data, id })
  return { data }
}

export const getCondenserAndAccessories = async (
  id: number,
  status: string,
) => {
  const endpoint = 'CondenserAccessories'

  const { data } = await makeApiRequest(
    `${endpoint}?selection_id=${id}&status=${status}`,
    'GET',
    {},
    false,
    true,
  )
  log.info('getCondenserAndAccessories.response', { data, id, status })
  return { data }
}

export const deleteSolve = async (id: number) => {
  const endpoint = 'CondenserSteps'
  const { data } = await makeApiRequest(
    `${endpoint}?thermal_id=${id}`,
    'DELETE',
    {},
    false,
    true,
  )
  return { data }
}

export const getPerformance = async (payload: any) => {
  const endpoint = 'Performance'

  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )
  log.info('getPerformance.response', { data, payload })
  return { data }
}

export const pdfCondenserDownload = async (payload: any) => {
  const { data, headers } = await makeApiRequest(
    'RemoteCondenserReport',
    'POST',
    {},
    false,
    true,
    payload,
    {
      responseType: 'blob',
    },
  )

  if (!data) {
    throw new Error('Failed to download PDF')
  }

  const blob = data instanceof Blob ? data : new Blob([data])

  if (blob.size === 0) {
    throw new Error('PDF download failed: received empty response from server')
  }

  if (!blob.type.includes('pdf') && blob.type !== 'application/octet-stream') {
    console.warn(`Unexpected content type: ${blob.type}. Expected PDF.`)
  }

  log.info('pdfDownload.blob', { blobSize: blob.size, blobType: blob.type })

  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `RemoteCondenserReport_${Date.now()}.pdf`

  try {
    document.body.appendChild(link)
    link.click()
    log.info('pdfDownload.response', {
      blobSize: blob.size,
      blobType: blob.type,
      payload,
      headers,
    })
    return { data }
  } finally {
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

export const pdfEAnalysisDownload = async (payload: any) => {
  const { data, headers } = await makeApiRequest(
    'EnergyAnalysisReport',
    'POST',
    {},
    false,
    true,
    payload,
    {
      responseType: 'blob',
    },
  )
  log.info('pdfEAnalysisDownload.payload', payload, data, headers)
  if (!data) {
    throw new Error('Failed to download PDF')
  }

  const blob = data instanceof Blob ? data : new Blob([data])

  if (blob.size === 0) {
    throw new Error('PDF download failed: received empty response from server')
  }

  if (!blob.type.includes('pdf') && blob.type !== 'application/octet-stream') {
    console.warn(`Unexpected content type: ${blob.type}. Expected PDF.`)
  }

  log.info('pdfDownload.blob', { blobSize: blob.size, blobType: blob.type })

  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `EnergyAnalysisReport_${Date.now()}.pdf`

  try {
    document.body.appendChild(link)
    link.click()
    log.info('pdfDownload.response', {
      blobSize: blob.size,
      blobType: blob.type,
      payload,
      headers,
    })
    return { data }
  } finally {
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

export const getAdjustCapacity = async (payload: any) => {
  const endpoint = 'CapacityAdjustments'

  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )
  log.info('getAdjustCapacity.response', { data, payload })
  return { data }
}

export const getAdjustFanCapacity = async (payload: any) => {
  const endpoint = 'FanAdjustments'

  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )
  log.info('getAdjustFanCapacity.response', { data, payload })
  return { data }
}

export const getEnergyAnalysis = async (payload: any) => {
  const endpoint = 'EnergyAnalysis'

  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )

  log.info('getEnergyAnalysis.response', { data, payload })
  return { data }
}

export const getUnitTypeFields = async (payload: any) => {
  const endpoint = 'ConvertUnitType'

  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )

  log.info('getEnergyAnalysis.response', { data, payload })
  return { data }
}

export const getRatingCalculation = async (payload: any) => {
  const endpoint = 'Rating/Calculation'
  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )

  log.info('getRatingCalculation.response', { data, payload })
  return { data }
}

export const getRatingResult = async (
  payload: any,
  pagination: { page?: number; pageSize?: number } = {},
) => {
  const { page = 1, pageSize = 500 } = pagination
  const endpoint = 'Rating'

  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    { queryParams: { page, pageSize } },
    false,
    true,
    payload,
  )

  log.info('getRatingResult.response', { data, payload, page, pageSize })
  return { data }
}

export const getRatingWorkingPoint = async (payload: any) => {
  const endpoint = 'WorkingPoint'

  const { data } = await makeApiRequest(
    `${endpoint}`,
    'POST',
    {},
    false,
    true,
    payload,
  )

  log.info('getRatingWorkingPoint.response', { data, payload })
  return { data }
}
