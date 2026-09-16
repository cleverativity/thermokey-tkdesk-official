import * as Auth from 'aws-amplify/auth'
import axios from 'axios'
import aws4 from 'aws4'
import * as R from 'ramda'
import env from 'Configs/env'
import { ConsoleLogger } from 'aws-amplify/utils'
import config from './config'

const log = new ConsoleLogger('Configs/api')

export const makeApiRequest = async (
  endpoint: string,
  method: string,
  options?: {
    body?: any
    queryParams?: any
    apiName?: string
  },
  isRequestCredentialsApi?: boolean,
  isThermalApi?: boolean,
  thermalPayload?: any,
  thermalblob?: any,
) => {
  let credentials, tokens

  log.debug('makeApiRequest', { endpoint, method, options })
  const { credentials: authCred, tokens: authTokens } =
    await Auth.fetchAuthSession()
  credentials = authCred
  tokens = authTokens
  log.debug('makeApiRequest.fetchAuth', { credentials, tokens })

  const envVariable = env.VITE_ENV

  let basePath = ''
  switch (envVariable) {
    case 'staging':
      basePath = '/stag/'
      break
    case 'local':
      basePath = '/dev/'
      break
    case 'production':
      basePath = '/prod/'
      break
    case 'development':
      basePath = '/dev/'
      break

    default:
      log.error('Invalid environment value: ', envVariable)
      basePath = '/dev/'
      break
  }
  if (!isRequestCredentialsApi) {
    basePath += 'api/v1'
  }

  const securityToken = credentials?.sessionToken
  const accessKeyId = credentials?.accessKeyId
  const secretAccessKey = credentials?.secretAccessKey

  // Set your AWS credentials and region
  const newCredentials = {
    accessKeyId: accessKeyId as string,
    secretAccessKey: secretAccessKey as string,
    sessionToken: securityToken, // If you have a session token
  }
  const service = 'execute-api' // Adjust based on your service type
  const region = 'eu-west-1'
  let stringParams = ''
  if (!R.isNil(options?.queryParams)) {
    stringParams = '?'
    R.forEachObjIndexed((value: any, key: any) => {
      stringParams += `${key}=${value}&`
    })(options?.queryParams)
    stringParams = R.dropLast(1, stringParams)
  }

  const stringifiedBody = await JSON.stringify(options?.body)
  log.debug('newCredentials', newCredentials)
  log.debug('makeApiRequest.JSON', {
    body: stringifiedBody ?? null,
    options,
    cose:
      options?.body &&
      options?.body?.attachments &&
      options?.body?.attachments[0]
        ? options?.body?.attachments[0]
        : null,
    optionsBody:
      options?.body &&
      options?.body?.attachments &&
      options?.body?.attachments[0]
        ? JSON.stringify(options?.body?.attachments[0])
        : {},
  })

  const opts = {
    service: service,
    region: region,
    host: config.host,
    path: basePath + endpoint + stringParams,
    method: R.toUpper(method),
    params: options?.queryParams,
    headers: {
      ...(R.toUpper(method) !== 'GET'
        ? { 'Content-Type': 'application/json', Accept: 'application/json' }
        : { Accept: 'application/json' }),
    },
    ...(R.toUpper(method) !== 'GET'
      ? { body: stringifiedBody ?? null, data: options?.body }
      : {}),
  } as any

  log.debug('makeApiRequest.opts', {
    opts,
  })

  let signedRequest = aws4.sign(opts, newCredentials)
  log.debug('makeApiRequest.signedRequest', {
    signedRequest,
    config,
    isThermalApi,
    basePath,
    jwt: tokens?.idToken?.toString(),
  })
  log.info(
    'makeApiRequest.test',
    `https://${config.thermalHost}${basePath}/${endpoint}`,
  )

  delete (signedRequest.headers ?? {})['Host']
  delete (signedRequest.headers ?? {})['Content-Length']

  return await axios({
    url: isThermalApi
      ? `https://${config.thermalHost}${basePath}/${endpoint}`
      : `https://${config.host}${basePath}${endpoint}`,
    ...(signedRequest as any),

    // add payload only for thermalHost
    ...(isThermalApi && { data: thermalPayload }),
    ...(isThermalApi && thermalblob ? thermalblob : {}),

    headers: {
      ...signedRequest.headers,
      ...(!isRequestCredentialsApi && {
        Authorization: tokens?.idToken?.toString() ?? undefined,
      }),
    },
  })
}
