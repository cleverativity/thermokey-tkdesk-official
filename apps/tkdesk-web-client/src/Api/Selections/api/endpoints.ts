import { makeApiRequest } from 'Configs/api'

const path = 'selections'

// SEARCH
export const searchSelections = async (parameters: SearchParameters = {}) => {
  const {
    query = '',
    filters = [],
    orders = [],
    pagination = { pageSize: 10, current: 1 },
  } = parameters
  const { pageSize = 10, current = 1 } = pagination

  const options = {
    queryParams: { per_page: pageSize, page: current } as any,
    body: { query, filters, orders },
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/search`,
    'POST',
    options,
  )

  return { data, headers }
}

// MANAGE
export const getOrCreate = async () => {
  const options = {
    body: {},
  }
  const { data, headers } = await makeApiRequest(
    `/${path}/get_or_create`,
    'POST',
    options,
  )
  return { data, headers }
}

export const getSelection = async (id: string) => {
  const { data, headers } = await makeApiRequest(`/${path}/${id}`, 'GET')
  return { data, headers }
}

export const resetStatus = async (id: string, status: string) => {
  const options = {
    body: { status },
  }
  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/reset_status`,
    'POST',
    options,
  )
  return { data, headers }
}

// STEPS
export const setUseCase = async (id: string, macro_serie: string) => {
  const options = {
    body: {
      macro_serie,
    },
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/set_use_case`,
    'POST',
    options,
  )
  return { data, headers }
}

export const solve = async (id: string, selection: any) => {
  const options = {
    body: selection,
  }
  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/solve`,
    'POST',
    options,
  )
  return { data, headers }
}

export const setDetail = async (id: string, machine_id: number) => {
  const options = {
    body: { machine_id },
  }
  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/set_detail`,
    'PATCH',
    options,
  )
  return { data, headers }
}

// SERIES AND SUBSERIES RELATIONS
export const getSeriesAndSubseriesRelations = async () => {
  const { data, headers } = await makeApiRequest(
    `/${path}/series_subseries_relations`,
    'GET',
  )
  return { data, headers }
}

// DIAMETERS
export const getDiameters = async () => {
  const { data, headers } = await makeApiRequest(
    `/machine_connections/nominal_diameters`,
    'GET',
  )
  return { data, headers }
}

// VELOCITY
export const updateConnectionSpeed = async (id: string, general_info: any) => {
  const options = {
    body: { general_info },
  }

  const { data, headers } = await makeApiRequest(
    `/machine_connections/${id}/update_connection_speed`,
    'POST',
    options,
  )
  return { data, headers }
}

// ACCESSORIES
export const getAccessories = async (id: string, machine_id: number) => {
  const options = { queryParams: { machine_id } }

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/accessories_relations`,
    'GET',
    options,
  )
  return { data, headers }
}

export const editCustomData = async (id: string, values: any) => {
  const options = {
    body: values,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/custom_data`,
    'PUT',
    options,
  )
  return { data, headers }
}

// PDF GENERATION
export const generatePdf = async (
  id: string,
  template: string,
  selections: any,
  session_id: string,
) => {
  const options = {
    body: { template, data: selections, session_id },
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/generate_pdf`,
    'POST',
    options,
  )

  return { data, headers }
}
