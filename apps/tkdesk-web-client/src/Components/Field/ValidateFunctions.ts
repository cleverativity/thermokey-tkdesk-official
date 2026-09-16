import _ from 'lodash'

export const validateNumberBetween =
  (
    min: number | string,
    max: number | string,
    dependOn: string | null,
    incompatibilityError: boolean,
  ) =>
  (objOrValue: { value: string | number; [key: string]: any }) => {
    const number = !_.isPlainObject(objOrValue)
      ? objOrValue
      : _.get(objOrValue, 'value')

    if (_.isNil(number) || (_.isString(number) && _.isEmpty(number))) {
      // allow for empty number to validate correctly
      return undefined
    }

    const n = Number(number)

    if (incompatibilityError) {
      return 'data.generic.form.message.validation.number.incompatibilityError'
    }

    if (!_.isNil(min) && !_.isNil(max)) {
      if (n < Number(min) || n > Number(max)) {
        if (_.isNil(dependOn)) {
          if (min === max) {
            return 'data.generic.form.message.validation.number.betweenEqual'
          } else {
            return 'data.generic.form.message.validation.number.between'
          }
        } else {
          if (min === max) {
            return 'data.generic.form.message.validation.number.betweenDependEqual'
          } else {
            return 'data.generic.form.message.validation.number.betweenDepend'
          }
        }
      }
    }

    return undefined
  }

const composeValidate =
  (
    f1: (value: any) => string | undefined,
    f2: (value: any) => string | undefined,
  ) =>
  (value: any) => {
    // return (value: any) => {
    const ef1 = f1 ? f1(value) : undefined
    return ef1 || (f2 ? f2(value) : undefined)
    // }
  }

const requiredValidate = (objOrValue: {
  value: string | number | boolean
  [key: string]: any
}): string | undefined => {
  const value = !_.isPlainObject(objOrValue)
    ? objOrValue
    : _.get(objOrValue, 'value')

  if (
    _.isNil(value) ||
    (_.isString(value) && _.isEmpty(value)) ||
    (_.isBoolean(value) && !value)
  ) {
    return 'data.generic.form.message.required_field'
  }
  return undefined
}

export { composeValidate, requiredValidate }
