import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'
import * as R from 'ramda'
import { getStore } from '../redux/store'

const log = new ConsoleLogger('Utils/functions')

export const validateEmail = (maill: string | null) => {
  if (R.isNil(maill) || R.isEmpty(maill)) {
    // allow for empty email to validate correctly
    return undefined
  }

  const mail = R.defaultTo('', maill)
  const cfReg = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,4}$/

  if (!cfReg.test(mail)) {
    return 'ui.generic.email_invalid_format'
  }
}

export const getFormattedPhone = (phone: any) => {
  if (R.isNil(phone) || R.isEmpty(phone)) {
    // allow for empty phone to validate correctly
    return undefined
  }

  const _phone = R.defaultTo('', phone)

  // return R.toUpper(_phone).replace(/[^+\-0-9]/g, '')
  return R.toUpper(_phone).replace(/[^0-9]/g, '')
}

export const validatePhone = (phone: any) => {
  if (R.isNil(phone) || R.isEmpty(phone)) {
    // allow for empty email to validate correctly
    return undefined
  }

  const phoneNumber = R.defaultTo('', phone)
  const cfReg = /^\d{5,15}$/

  if (!cfReg.test(phoneNumber)) {
    return 'comp.field.phoneNumber.errors.invalid_size'
  }
}

export const isNotNullOrEmpty = (obj: unknown): boolean => {
  if (_.isUndefined(obj) || _.isNull(obj)) {
    return false
  }

  if (_.isString(obj)) {
    return _.trim(obj).length > 0
  }

  if (_.isArray(obj)) {
    const arr = obj as unknown[]
    return _.some(arr, isNotNullOrEmpty)
  }

  if (_.isObject(obj)) {
    const o = obj as Record<string, unknown>
    const keys = _.keys(o)

    if (_.isEmpty(keys)) {
      return false
    }
    return _.every(keys, (key) => isNotNullOrEmpty(o[key]))
  }

  return !!obj
}

export const composeValidate =
  (
    f1: (value: any) => string | undefined,
    f2: (value: any) => string | undefined,
  ) =>
  (value: any) => {
    const ef1 = f1 ? f1(value) : undefined
    return ef1 || (f2 ? f2(value) : undefined)
  }

export const requiredValidate = (value: any): string | undefined => {
  if (
    R.isNil(value) ||
    (R.is(String, value) && R.isEmpty(value)) ||
    (R.is(Array, value) && R.isEmpty(value))
  ) {
    return 'ui.generic.form.message.required_field'
  }
  return undefined
}

export const dispatchAction = (action) => {
  const store = getStore()
  store.dispatch(action)
}

const hasSign = (value: any) => _.isString(value) && /^[+-]/.test(_.trim(value))

export const normalizeRoundedSignedZero = (value: any, scale: number) => {
  if (_.isNil(value) || value === '') {
    return value
  }

  const numericValue = Number(value)

  if (!Number.isFinite(numericValue)) {
    return value
  }

  const roundedValue = Number(numericValue.toFixed(scale))

  if (
    roundedValue === 0 &&
    (numericValue < 0 || Object.is(numericValue, -0) || hasSign(value))
  ) {
    return 0
  }

  return value
}
