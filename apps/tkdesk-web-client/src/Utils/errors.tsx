import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import * as RH from 'Utils/RH'
import { rawPermissions } from 'Model/App/Authorization/constant'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Utils/errors')

/**
 * ErrorCode -> ((ErrorCode, Intl, Values) -> Values)
 *
 */
const functionsToValues = {}

/**
 * Prettify determinated keys, such that can be used in the localizations
 *
 * - every key `key_data` that has the word `data` in it, generate
 *   a key `key_data_moment`, with the corresponding dayjs value in it
 * @param {String} code
 * @param {Object} values
 * @param {Intl} intl
 * @param {Values}
 * @return {Values}
 */
export function prettyServerErrorValues(code: any, values: object, intl: any) {
  const valuesMapFunction: any = R.prop(code, functionsToValues)
  const flattenedValues = RH.flattenObjectKeys(values, { keysSeparator: '_' })

  return R.pipe(
    R.unless<any, any>(R.always(R.isNil(valuesMapFunction)), (v) => {
      valuesMapFunction(code, intl, v)
    }),
    R.mergeDeepRight<any>(flattenedValues),
  )(values)
}

/**
 * A server error
 * @typedef {Object} Error
 * @property {string} error - The error code, has the format of a '.' separated string
 * in the format of "<service>.<collection>.<error_class>.<error_subclass>(...)"
 * example : "haddock_products.product.invalid_data.invalid_field"
 * @property {string} message - The en version of the message
 * @property {Object} values - The values that appears in the message
 * @property {[String|Error]} details - A list of sub errors, in the form of a string code
 * or a whole Error object, with eventually some oder errors, and so on...
 */

/**
 *
 * @param {String|Error} error
 * @param {Intl} intl
 * @return {JSX}
 */
function prettyServerError(autho: any, error: any, intl: any): any {
  return R.cond([
    [
      R.is(String),
      (str) => {
        log.info('String rendering: ', str)
        return intl.formatMessage({
          id: str,
          defaultMessage: str,
        })
      },
    ],
    [
      R.is(Array),
      (details: any) => {
        log.info('Array rendering: ', details)
        return autho.iAmOem ? null : (
          <ul>
            {RA.mapIndexed((err: any, idx: number) => {
              const key = R.defaultTo(err, err.error)
              return (
                <li key={idx} data-code={key}>
                  {prettyServerError(autho, err, intl)}
                </li>
              )
            }, details)}
          </ul>
        )
      },
    ],
    [
      R.is(Object),
      (obj: any) => {
        log.info('Object rendering: ', obj)
        // rendering a whole error object, wiht possile suberrors
        const { error: code, message, values, details, exception } = obj
        let description: any
        if (R.includes('engine_internal_server_error', code)) {
          if (autho.check(rawPermissions.Calculation.manage)) {
            description = (
              <>
                {intl.formatMessage(
                  {
                    id: code,
                    defaultMessage: message || code,
                  },
                  prettyServerErrorValues(code, values, intl),
                )}

                <p>{message}</p>
              </>
            )
          } else {
            description = (
              <>
                {intl.formatMessage({
                  id: 'tkcc.engine_internal_server_error_oem',
                })}
              </>
            )
          }
        } else {
          description = intl.formatMessage(
            {
              id: code,
              defaultMessage: message || code,
            },
            prettyServerErrorValues(code, values, intl),
          )
        }
        // let description = intl.formatMessage(
        //   {
        //     id: code,
        //     defaultMessage: message || code,
        //   },
        //   prettyServerErrorValues(code, values, intl)
        // )

        if (!R.isNil(exception)) {
          description = (
            <>
              {description}

              <q>{exception}</q>
            </>
          )
        }

        if (!R.isNil(details) && R.is(Array, details) && !R.isEmpty(details)) {
          return (
            <>
              {description}
              {prettyServerError(autho, details, intl)}
            </>
          )
        }
        return description
      },
    ],
    [R.T, R.always(null)],
  ])(error)
}

export const unknwnErrorMessageIt = {
  message: 'Errore',
  description: 'Errore Sconosciuto.',
}
export const unknwnErrorMessageEn = {
  message: 'Error',
  description: 'Unknown error.',
}

export const genericErrorMessageIt = {
  message: 'Errore',
  description: 'Si è verificato un errore.',
}
export const genericErrorMessageEn = {
  message: 'Error',
  description: 'An error has occurred.',
}

export function prettyGenericServerError(language: string) {
  if (R.includes('it', language)) {
    return 'Errore durante la chiamata al server.'
  } else {
    return 'Error calling server.'
  }
}
/**
 *
 * @param {Object} error
 * @param {Error} error.response.data
 * @param {Intl} intl
 * @return {{message: JSX, description: JSX}}
 */
export function prettyError(autho: any, error: any, intl: any) {
  // the default pretty error that is returned
  const language = intl.locale
  let pretty: any
  if (R.includes('it', language)) {
    pretty = { ...unknwnErrorMessageIt }
  } else {
    pretty = { ...unknwnErrorMessageEn }
  }

  if (R.isNil(error)) {
    return pretty
  }
  // we collect alle the known messages to display it in the eventualitiy on an
  // unknown error
  const hMessages = [] // human messages
  const dMessages = [] // develop messages

  const code: any = R.prop('code', error)
  const message: any = R.prop('message', error)

  log.debug('prettyError:error.code', code)
  dMessages.push(code)
  log.debug('prettyError:error.message', message)
  hMessages.push(message)

  if (R.has('response', error) && !R.isNil(error.response)) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    log.debug('prettyError:error.response', error.response)

    const data = R.path(['response', 'data'], error)

    const dataError = R.pathOr(null, ['response', 'data', 'error'], error)
    const dataMessage = R.pathOr(null, ['response', 'data', 'message'], error)

    if (R.isNil(dataError)) {
      pretty.description = prettyGenericServerError(language)
    } else {
      hMessages.push(dataMessage)
      dMessages.push(dataError)

      // these find the last not null message to display
      const hMessage = R.reduce<any, any>(R.flip(R.defaultTo), null, hMessages)

      pretty.description = prettyServerError(autho, data, intl)
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    log.debug('prettyError:error.request', error.request)
    pretty.description = prettyGenericServerError(language)
  } else {
    // Something happened in setting up the request that triggered an Error
    log.debug('prettyError:error', error)

    if (R.includes('it', language)) {
      return genericErrorMessageIt
    } else {
      return genericErrorMessageEn
    }
  }

  return pretty
}

/**
 * Given a generic error, this function returns a smaller object with only
 * the relevant keys
 * @param {Error} error_
 */
export function refineError(error: any) {
  log.info('refineError.Pre', error)
  const filteredError = R.cond([
    // Objects if are the result of a axions call
    [
      R.both<any>(R.is(Object), R.propEq<any, any>('isAxiosError', true)),
      R.pipe(
        R.pickAll(['response', 'config', 'isAxiosError']),
        R.over(
          R.lensProp<any>('response'),
          R.when(
            R.is(Object),
            R.pickAll([
              'data',
              'status',
              'statusText',
              'timeout',
              'responseType',
            ]),
          ),
        ),
        R.over(
          R.lensProp('config'),
          R.when(
            R.is(Object),
            R.pickAll(['url', 'method', 'data', 'timeout', 'responseType']),
          ),
        ),
      ),
    ],
    [R.always(true), R.identity],
  ])(error)
  log.info('refineError.Post', filteredError)
  return filteredError
}

/**
 * Recursively traverse a generic Object, and filter out only the errors
 * sub-objects that are in an object with the `error` or `errorModal` key and are not `false`
 * @param {State} state
 * @returns {State|false} state
 */
export function filterError(state: any): any {
  if (!R.is(Object, state)) {
    return false
  }

  const errors = R.pipe(
    R.toPairs,
    R.map<any, any>(([key, value]) =>
      R.either(R.equals('error'), R.equals('errorModal'))(key) &&
      value !== false
        ? [key, refineError(value)]
        : [key, filterError(value)],
    ),
    R.filter(([, value]) => value !== false),
    R.fromPairs,
  )(state)

  return !R.isEmpty(errors) ? errors : false
}
