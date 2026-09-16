import _ from 'lodash'

type MergeCorrectiveFactorsOptions = {
  resetValues?: boolean
}

export function mergeCorrectiveFactors(
  global_settings: any,
  user_permissions?: any,
  options: MergeCorrectiveFactorsOptions = {},
) {
  const { resetValues = false } = options

  function traverse(obj: any, path: string[] = []): any {
    return _.mapValues(obj, (value, key) => {
      const newPath = [...path, key]

      if (_.isPlainObject(value) && _.has(value, 'values')) {
        const localValues = _.get(value, 'values', [])
        const globalValues = _.get(global_settings, [...newPath, 'values'], [])

        const globalMap = _.keyBy(globalValues, 'key')

        const mergedValues = _.map(localValues, (local: any) => ({
          ...local,
          ...(resetValues ? { value: null } : {}),
          global_value: _.get(globalMap[local.key], 'value', null),
        }))

        const result: any = {
          values: mergedValues,
        }

        if (_.has(value, 'enabled')) {
          result.enabled = _.get(value, 'enabled', false)
        }

        return result
      }

      if (_.isPlainObject(value)) {
        return traverse(value, newPath)
      }

      return value
    })
  }

  if (user_permissions) {
    return traverse(user_permissions)
  } else {
    return traverse(global_settings)
  }
}

export function mergeCorrectiveFactorsForCreation(global_settings: any) {
  return mergeCorrectiveFactors(global_settings, undefined, {
    resetValues: true,
  })
}
