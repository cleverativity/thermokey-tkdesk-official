import { makeApiRequest } from 'Configs/api'

const path = 'fan_models'

// SEARCH
export const searchFanModels = async (parameters: SearchParameters = {}) => {
  const {
    query = '',
    filters = [],
    orders = [],
    pagination = { pageSize: 10, current: 1 },
    ranges = [],
  } = parameters
  const { pageSize = 10, current = 1 } = pagination

  const options = {
    queryParams: { per_page: pageSize, page: current },
    body: { query, filters, orders, ranges },
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/search`,
    'POST',
    options,
  )

  return { data, headers }
}

// CREATE
export const createFanModels = async (fan_model: FanModels) => {
  const options = {
    body: fan_model,
  }

  const { data, headers } = await makeApiRequest(`${path}`, 'POST', options)
  return { data, headers }
}

// IMPORT
export const importFanModels = async (storage_url: string) => {
  const options = {
    body: { storage_url },
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/import`,
    'POST',
    options,
  )
  return { data, headers }
}

// GET
export const getFanModels = async (id: string) => {
  const { data, headers } = await makeApiRequest(`/${path}/${id}`, 'GET')
  return { data, headers }
}

// EDIT
export const editFanModels = async (fan_model: any) => {
  const { id } = fan_model
  const options = {
    body: fan_model,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}`,
    'PUT',
    options,
  )
  return { data, headers }
}

// DELETE
export const deleteFanModels = async (id: string) => {
  const options = {
    body: {},
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}`,
    'DELETE',
    options,
  )
  return { data, headers }
}

// INTERPOLATION
export const interpolateFanModels = async (id: string, values: any) => {
  const options = {
    body: values,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/interpolation`,
    'POST',
    options,
  )
  return { data, headers }
}

// SEARCH
export const searchPolynomials = async (
  parameters: SearchParameters = {},
  fan_model_id: string,
) => {
  const {
    query = '',
    filters = [],
    orders = [],
    pagination = { pageSize: 10, current: 1 },
  } = parameters
  const { pageSize = 10, current = 1 } = pagination

  const options = {
    queryParams: { per_page: pageSize, page: current },
    body: { query, filters, orders },
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${fan_model_id}/fan_polynomials/search`,
    'POST',
    options,
  )

  return { data, headers }
}

// CREATE
export const createPolynomials = async (
  fan_model_id: string,
  polynomial: Polynomials,
) => {
  const options = {
    body: polynomial,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${fan_model_id}/fan_polynomials`,
    'POST',
    options,
  )
  return { data, headers }
}

// GET
export const getPolynomials = async (id: string) => {
  const { data, headers } = await makeApiRequest(
    `/fan_polynomials/${id}`,
    'GET',
  )
  return { data, headers }
}

// EDIT
export const editPolynomials = async (polynomial: any, id: any) => {
  const options = {
    body: polynomial,
  }

  const { data, headers } = await makeApiRequest(
    `/fan_polynomials/${id}`,
    'PUT',
    options,
  )
  return { data, headers }
}

// DELETE
export const deletePolynomials = async (id: string) => {
  const options = {
    body: {},
  }

  const { data, headers } = await makeApiRequest(
    `/fan_polynomials/${id}`,
    'DELETE',
    options,
  )
  return { data, headers }
}
