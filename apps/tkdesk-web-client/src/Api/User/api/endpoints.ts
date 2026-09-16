import { makeApiRequest } from 'Configs/api'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Api/User/api/endpoint')
const IS_REQUEST_CREDENTIAL_API_ENABLED = true

// REQUEST CREDENTIALS
export const requestCredentials = async (values: { [key: string]: string }) => {
  const options = {
    body: values,
  }

  const { data, headers } = await makeApiRequest(
    `request_credentials`,
    'POST',
    options,
    IS_REQUEST_CREDENTIAL_API_ENABLED,
  )

  return { data, headers }
}

// WHO AM I
export const whoAmI = async () => {
  const { data, headers } = await makeApiRequest(`/who_am_i`, 'GET')
  return { data, headers }
}

// ACCEPT EULA
export const acceptEula = async () => {
  const options = {
    body: {},
  }

  const { data, headers } = await makeApiRequest(
    `/accept_eula`,
    'POST',
    options,
  )

  return { data, headers }
}

// RESET EULA
export const resetEula = async () => {
  const options = {
    body: {},
  }

  const { data, headers } = await makeApiRequest(
    `/decline_eula`,
    'POST',
    options,
  )

  return { data, headers }
}

// GET USER
export const getUser = async (id: string) => {
  const { data, headers } = await makeApiRequest(`/users/${id}`, 'GET')
  return { data, headers }
}

// GET USERS
export const getAllUsers = async () => {
  const { data, headers } = await makeApiRequest(`/users`, 'GET')
  return { data, headers }
}

// SEARCH USERS
export const searchUsers = async (parameters: SearchParameters = {}) => {
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
    `/users/search`,
    'POST',
    options,
  )

  return { data, headers }
}

// EXPORT
export const exportUsers = async () => {
  const options = {
    body: {},
  }

  const { data, headers } = await makeApiRequest(
    `/users/report`,
    'POST',
    options,
  )

  return { data, headers }
}

// CREATE USER
export const createUser = async (user: User) => {
  const options = {
    body: user,
  }

  const { data, headers } = await makeApiRequest(`/users`, 'POST', options)

  return { data, headers }
}

// EDIT USER
export const editUser = async (user: User) => {
  const { id: user_id } = user
  const options = {
    body: user,
  }

  const { data, headers } = await makeApiRequest(
    `/users/${user_id}`,
    'PUT',
    options,
  )
  return { data, headers }
}

// ACTIVATE USER
export const activateUser = async (id: string, expiration_date: string) => {
  const options = {
    body: { expiration_date },
  }

  const { data, headers } = await makeApiRequest(
    `/activate_user/${id}`,
    'POST',
    options,
  )

  return { data, headers }
}

export const deleteUser = async (id: string) => {
  const options = {
    body: {},
  }

  const { data, headers } = await makeApiRequest(
    `/users/${id}`,
    'DELETE',
    options,
  )
  return { data, headers }
}

export const setUMSystem = async (id: string, um_system: 'si' | 'imp') => {
  const options = {
    body: { um_system },
  }

  const { data, headers } = await makeApiRequest(
    `/users/${id}/set_um_system`,
    'POST',
    options,
  )

  return { data, headers }
}

export const setLanguage = async (id: string, language: 'it' | 'en') => {
  const options = {
    body: { language },
  }

  const { data, headers } = await makeApiRequest(
    `/users/${id}/set_language`,
    'POST',
    options,
  )

  return { data, headers }
}

export const resendSignUp = async (username: string) => {
  const options = {
    body: { username },
  }

  const { data, headers } = await makeApiRequest(
    `/users/resend_credentials`,
    'POST',
    options,
  )

  return { data, headers }
}
