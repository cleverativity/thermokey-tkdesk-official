import _ from 'lodash'

import envDevelopment from './envDevelopment'
import envStaging from './envStaging'
import envProduction from './envProduction'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Configs/env')

/**
 * This is the only file where raw Vite env values are consumed.
 * In every other file use the Config/env object.
 * @param {Object} env - the environment
 * @param {String} env.NODE_ENV
 * @param {String} env.VITE_ENV
 * @param {String} env.VITE_AWS_LOGGER_LEVEL
 * @param {Boolean} env.isProduction - a production environment: `staging`, `production`
 * @param {Boolean} env.isDevelopment - a develop environment: `local`, `localfront`, `test`, `development`
 * @param {Boolean} env.isLocal - a developer instance of the application
 *
 * @param {String} env.VITE_FORCE_ACTIVE_SENTRY
 * @param {String} env.VITE_ENABLE_DEVELOPMENT_FEATURES
 * @param {String} env.VITE_ENABLE_FORMIK_STATE_INSPECTOR
 * @param {Boolean} env.forceActiveSentry
 * @param {Boolean} env.enableDevelopmentFeatures
 * @param {Boolean} env.enableFormikStateInspector

 */
let envConfig = {}

const envBooleanKeys = [
  'VITE_FORCE_ACTIVE_SENTRY',
  'VITE_ENABLE_DEVELOPMENT_FEATURES',
  'VITE_ENABLE_FORMIK_STATE_INSPECTOR',
  'VITE_FAKE_RBAC_PERMISSIONS',

  'VITE_CUSTOMER_REGISTRATION_DISABLE_TABS_LOCKING',
  'VITE_INTERNAL_REGISTRATION_DISABLE_TABS_LOCKING',
  'VITE_COLLABORATOR_REGISTRATION_DISABLE_TABS_LOCKING',
]
const envGlobal = {
  ...import.meta.env,
  NODE_ENV: import.meta.env.MODE,
} as Record<string, any>

const envVariable = envGlobal.VITE_ENV ?? 'development'

switch (envVariable) {
  case 'staging':
    envConfig = envStaging
    break
  case 'local':
  case 'localfront':
  case 'development':
    envConfig = envDevelopment
    break
  case 'production':
    envConfig = envProduction
    break
  default:
    envConfig = envDevelopment
    break
}

/**
 * Sanitize a boolean value, accept a String for error login and a (Boolean|String{'true'|'false'})
 * and convert in to a Bolean value, in the String value is not in {'true'|'false'} it logs an error.
 * @param {Boolean|String} key
 * @returns {Boolean}
 */
const cleanBoolean = (key: string, value: any) => {
  const checkTrue = _.partialRight(_.isEqual, 'true')
  const checkFalse = _.partialRight(_.isEqual, 'false')

  return _.isBoolean(value)
    ? value
    : _.cond([
        [
          (value: any) => _.isString(value),
          () =>
            checkTrue(value)
              ? true
              : checkFalse(value)
                ? false
                : (() => {
                    log.error(`invalid v:'${value}' for key:'${key}'`)
                    return false
                  })(),
        ],
        [_.stubTrue, _.constant(false)],
      ])(value)
}

const mergedEnv = _.flow(
  // override local config with the global environment
  (envConfig: any) => _.merge({}, envConfig, envGlobal),

  // transform every key that is in `envBooleanKeys` from String{'true'|'false'} in Boolean
  (configs: any) =>
    _.reduce(
      envBooleanKeys,
      (env: any, booleanKey: any) => {
        const val = _.get(configs, booleanKey)

        const cleanedVal = cleanBoolean(booleanKey, val)
        const cleandeBooleanKey = _.camelCase(
          _.replace(booleanKey, 'VITE_', ''),
        )

        return _.set(configs, cleandeBooleanKey, cleanedVal)
      },
      _,
    ),

  (configs: any) =>
    _.set(configs, 'VITE_ENV', _.get(configs, 'VITE_ENV', 'development')),
  // set default value if not set
  // _.partialRight(_.set, 'VITE_ENV', _.defaultTo('development')),

  (env: any) =>
    _.set(
      env,
      'isDevelopment',
      ['development', 'test', 'local', 'qatest', 'localfront'].includes(
        env.VITE_ENV,
      ),
    ),
  (env: any) =>
    _.set(
      env,
      'isProduction',
      ['staging', 'production'].includes(env.VITE_ENV),
    ),
  (env: any) => _.set(env, 'isStaging', ['staging'].includes(env.VITE_ENV)),
  (env: any) =>
    _.set(
      env,
      'isLocal',
      ['development', 'test', 'local', 'qatest', 'localfront'].includes(
        env.VITE_ENV,
      ),
    ),
)(envConfig)

ConsoleLogger.LOG_LEVEL = mergedEnv.VITE_AWS_LOGGER_LEVEL

if (mergedEnv.VITE_ENV !== 'production') {
  console.debug('VITE_ENV', {
    mergedEnv,
    VITE_ENV: mergedEnv.VITE_ENV,
    NODE_ENV: mergedEnv.NODE_ENV,
    envGlobal,
    envConfig,
  })
}

export default mergedEnv
