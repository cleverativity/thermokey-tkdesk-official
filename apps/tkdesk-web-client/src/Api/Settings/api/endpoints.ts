import { makeApiRequest } from 'Configs/api'
import { ConsoleLogger } from 'aws-amplify/utils'

const path = 'settings'

const log = new ConsoleLogger('Api/Settings/api/endpoint')

// GET CORRECTIVE FACTORS
export const getCorrectiveFactors = async () => {
  const { data, headers } = await makeApiRequest(
    `/${path}/corrective_factors`,
    'GET',
  )
  return { data, headers }
}

// EDIT CORRECTIVE FACTORS
export const editCorrectiveFactors = async (
  corrective_factors: SettingBack,
) => {
  const options = {
    body: corrective_factors,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/corrective_factors`,
    'PUT',
    options,
  )
  return { data, headers }
}

// GET REFRIGERANTS
export const getRefrigerants = async () => {
  const { data, headers } = await makeApiRequest(`/${path}/refrigerants`, 'GET')
  return { data, headers }
}

// EDIT REFRIGERANTS
export const editRefrigerants = async (refrigerants: any) => {
  const options = {
    body: refrigerants,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/refrigerants`,
    'PUT',
    options,
  )
  return { data, headers }
}

// GET USER PERMISSIONS
export const getUserPermissions = async () => {
  const { data, headers } = await makeApiRequest(
    `/${path}/user_permissions`,
    'GET',
  )
  return { data, headers }
}

// EDIT USER PERMISSIONS
export const editUserPermissions = async (refrigerants: any) => {
  const options = {
    body: refrigerants,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/user_permissions`,
    'PUT',
    options,
  )
  return { data, headers }
}

export const getAvailableNTubesValues = async (values: {
  use_case: string
  geom_types: string[]
}) => {
  const options = {
    body: values,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/available_n_of_tubes_values`,
    'POST',
    options,
  )
  return { data, headers }
}

export const getStepsConfig = async () => {
  const { data, headers } = await makeApiRequest(`/${path}/steps_config`, 'GET')
  return { data, headers }
}

export const getGeometricConstants = async () => {
  const { data, headers } = await makeApiRequest(
    `/${path}/geometric_constants`,
    'GET',
  )
  return { data, headers }
}

export const getUserPermissionSchema = async () => {
  const { data, headers } = await makeApiRequest(
    `/${path}/user_permissions_schema`,
    'GET',
  )
  return { data, headers }
}

export const calcCoreHeight = async (values: {
  geom_types: string[] | null
  n_of_tubes: string | number | null
}) => {
  const options = {
    body: values,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/core_height`,
    'POST',
    options,
  )
  return { data, headers }
}

export const calcFlowRateAir = async (values: {
  geom_types: string[] | null
  n_of_tubes: any
  battery_active_length: string | number | null
  inlet_velocity_air: string | number | null
}) => {
  const options = {
    body: values,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/flow_rate_air`,
    'POST',
    options,
  )
  return { data, headers }
}

export const calcVelocityAir = async (values: {
  geom_types: string[] | null
  n_of_tubes: string[] | number[] | null
  battery_active_length: string | number | null
  flow_rate_air: string | number | null
}) => {
  const options = {
    body: values,
  }

  const { data, headers } = await makeApiRequest(
    `/${path}/inlet_velocity_air`,
    'POST',
    options,
  )
  return { data, headers }
}
