import { makeApiRequest } from 'Configs/api'
import { ConsoleLogger } from 'aws-amplify/utils'

const path = 'orders'

const log = new ConsoleLogger('Api/Orders/api/endpoint')

// SEARCH
export const searchOrders = async (parameters: SearchParameters = {}) => {
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
    `/${path}/search`,
    'POST',
    options
  )

  return { data, headers }
}

// CREATE
export const createOrder = async (id: string) => {
  const options = {
    body: {
      calculation_id: id,
    },
  }

  const { data, headers } = await makeApiRequest(`/${path}`, 'POST', options)
  return { data, headers }
}

// GET
export const getOrder = async (id: string | number) => {
  log.info('getOrder.id', id)

  const { data, headers } = await makeApiRequest(`/${path}/${id}`, 'GET')
  return { data, headers }
}

// EDIT
export const editOrder = async (
  id: string | number,
  status: 'created' | 'open' | 'closed'
) => {
  const options = {
    body: { status },
  }
  log.info('editOrder.id', id)

  const { data, headers } = await makeApiRequest(
    `/${path}/${id}`,
    'POST',
    options
  )
  return { data, headers }
}
