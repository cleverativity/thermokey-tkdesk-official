import { makeApiRequest } from 'Configs/api'

const path = 'calculations'

// CALCULATION NEW
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

export const setUseCase = async (id: string, use_case: string) => {
  const options = {
    body: {
      use_case,
    },
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/set_use_case`,
    'POST',
    options,
  )
  return { data, headers }
}

export const solve = async (id: string, calculation: any) => {
  const options = {
    body: calculation,
  }
  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/solve`,
    'POST',
    options,
  )
  return { data, headers }
}

export const setDetail = async (id: string, model_code: string) => {
  const options = {
    body: { model_code },
  }
  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/set_detail`,
    'POST',
    options,
  )
  return { data, headers }
}

export const complete = async (id: string) => {
  const options = {
    body: {},
  }
  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/complete`,
    'POST',
    options,
  )
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

export const generatePdf = async (id: string) => {
  const options = {
    body: {},
  }
  const { data, headers } = await makeApiRequest(
    `/${path}/${id}/generate_pdf`,
    'POST',
    options,
  )
  return { data, headers }
}

// CALCULATION SEARCH
export const searchCalculations = async (parameters: SearchParameters = {}) => {
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

// CALCULATION GET
export const getCalculation = async (id: string) => {
  const { data, headers } = await makeApiRequest(`/${path}/${id}`, 'GET')
  return { data, headers }
}

// EXPORT
export const exportCalculations = async (values: any) => {
  const options = {
    body: {
      filters: values,
    },
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/report`,
    'POST',
    options,
  )

  return { data, headers }
}

// EXPORT SOLVE REPORT
export const exportSolveReport = async (values: any) => {
  const options = {
    body: values,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/solve_report`,
    'POST',
    options,
  )

  return { data, headers }
}
