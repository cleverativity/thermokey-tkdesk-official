import _ from 'lodash'
import { useEffect, useCallback, useRef } from 'react'
import {
  useBeforeUnload,
  useBlocker as useRouterBlocker,
} from 'react-router-dom'

/**
 * Filter the top level object keys with a function
 * @param {Function} filter
 * @param {Object} obj
 * @sign (String -> Bool) -> Object -> Object
 */
export const filterWithKeys = _.curry((filter: any, obj: any) =>
  _.flow([
    _.toPairs,
    (array) => _.filter(array, (el) => filter.apply(_, el)),
    // _.partial(_.filter, filter),
    _.fromPairs,
  ])(obj),
)

/**
 * Return the right if not nil, otherwise the left
 * @param {Any} left
 * @param {Any} right
 * @sign A -> B -> A | B
 */
export const mergeLeftNil = (left: any, right: any) => {
  if (_.isNil(left)) {
    return right
  }
  return left
}

/**
 * Return the right if not nil, otherwise the left
 * @param {Any} left
 * @param {Any} right
 * @sign A -> B -> A | B
 */
export const mergeRightNil = (left: any, right: any) => {
  if (_.isNil(right)) {
    return left
  }
  return right
}

/**
 * @param {String} - A string to modify
 * Limit the set of characters
 */
export const charactersReplacement = _.flow(
  _.partialRight(_.defaultTo, ''),
  _.toUpper,
  _.partialRight(_.replace, /\s{2,}/g, ''),
  _.partialRight(_.replace, /'{2,}/g, "'"),
  _.partialRight(_.replace, " '", "'"),
  _.partialRight(_.replace, /[^A-Z0-9-.&\s/°']/g, ''),
)

/**
 * @param {String} - A string to evaluate
 * Validate a string based on the regex
 */
export const validateCharacters = (value: string) => {
  if (_.isNil(value) || _.isEmpty(value)) {
    return undefined
  }

  if (
    /[^A-Z0-9-.&\s/°']/g.test(value) ||
    _.includes(value, '  ') ||
    _.includes(value, "''") ||
    _.includes(value, " '")
  ) {
    return 'comp.field.generic.errors.invalid_characters'
  }
  return undefined
}

export const unitMapping = (
  unit: string | null | undefined,
): string | null | undefined => {
  switch (unit) {
    // Speed

    // Length

    // Temperature
    case 'tempC':
      return '°C'
    case 'tempK':
      return 'K'
    case 'tempF':
      return '°F'

    // Power

    // Pressure

    // Area
    case 'm^2':
      return 'm\u00B2' // '\u33A1'
    case 'ft^2':
      return 'ft\u00B2'
    case 'mm^2':
      return 'mm\u00B2'

    // Volume
    case 'dm^3':
      return 'dm\u00B3' // 'd\u33A5'
    case 'm^3/h':
      return 'm\u00B3/h' // '\u33A5/h'
    case 'ft^3/h':
      return 'ft\u00B3/h'
    case 'in^3':
      return 'in\u00B3'

    // Density
    case 'kg/m^3':
      return 'kg/m\u00B3'

    default:
      break
  }
  return unit
}

/**
 * Blocks all navigation attempts. This is useful for preventing the page from
 * changing until some condition is met, like saving form data.
 *
 * @param  blocker
 * @param  when
 * @see https://reactrouter.com/api/useBlocker
 */
export function useBlocker(blocker: any, when = true) {
  const routerBlocker = useRouterBlocker(when)
  const lastBlockedLocationId = useRef<string | null>(null)

  useEffect(() => {
    if (routerBlocker.state !== 'blocked' || !routerBlocker.location) {
      lastBlockedLocationId.current = null
      return
    }

    const blockedLocationId =
      routerBlocker.location.key ||
      `${routerBlocker.location.pathname}${routerBlocker.location.search}${routerBlocker.location.hash}`

    if (lastBlockedLocationId.current === blockedLocationId) {
      return
    }

    lastBlockedLocationId.current = blockedLocationId

    blocker({
      location: routerBlocker.location,
      reset() {
        lastBlockedLocationId.current = null
        routerBlocker.reset()
      },
      retry() {
        lastBlockedLocationId.current = null
        routerBlocker.proceed()
      },
    })

    return () => {
      lastBlockedLocationId.current = null
    }
  }, [blocker, routerBlocker])
}

/**
 * Prompts the user with an Alert before they leave the current screen.
 *
 * @param  message
 * @param  when
 */
export function usePrompt(message: any, when = true) {
  useBeforeUnload(
    useCallback(
      (event) => {
        if (!when) {
          return
        }

        event.preventDefault()
        event.returnValue = message
      },
      [message, when],
    ),
    { capture: true },
  )

  const blocker = useCallback(
    (tx: any) => {
      if (window.confirm(message)) {
        setTimeout(() => tx.retry(), 0)
        return
      }

      tx.reset()
    },
    [message],
  )

  useBlocker(blocker, when)
}
