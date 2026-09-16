import * as R from 'ramda'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Model/Settings/Marshal')

export function marshalSettingsTo(
  values: any,
  isForUser: boolean,
  creationSchema: any,
): any {
  log.debug('marshalSettingsTo.before', { values, isForUser })

  const removedUselessKeys = R.dissoc('external', values)
  const settingToManage = R.mergeDeepLeft(removedUselessKeys, creationSchema)
  log.debug('marshalSettingsTo.settingToManage', {
    settingToManage,
  })

  const extractValues = (settingToManage: any): any => {
    const { values, enabled = false } = settingToManage

    if (_.isArray(values)) {
      const result = _.reduce(
        values,
        (acc: any, val: any) => {
          const keyName: any = _.last(_.split(val.key, '.'))
          acc[keyName] = _.get(val, 'value')
          return acc
        },
        {},
      )

      if (isForUser) {
        _.set(result, 'enabled', enabled)
      }

      return result
    } else {
      return _.mapValues(settingToManage, extractValues)
    }
  }

  const newCorrectiveFactors = extractValues(settingToManage)

  const extractKeys = (values: any) => {
    return _.reduce(
      values,
      (acc: any, item: any) => {
        const keyName: any = _.last(_.split(item.key, '.'))
        acc[keyName] = null

        return acc
      },
      {},
    )
  }

  const mapDeep = (settingToManage: any) => {
    const traverse = (node: any) => {
      if (_.isPlainObject(node)) {
        const hasEnabled = _.has(node, 'enabled')
        const hasValues = _.has(node, 'values')
        const values = _.get(node, 'values', [])

        if (hasValues && _.isArray(values)) {
          const keys = extractKeys(values)

          if (hasEnabled) {
            return {
              enabled: _.get(node, 'enabled', false),
              ...keys,
            }
          }

          return keys
        }

        return _.mapValues(node, traverse)
      }

      return node
    }

    return traverse(settingToManage)
  }

  const newUserPermissions = _.mapValues(settingToManage, mapDeep)

  log.debug('marshalSettingsTo.after', {
    newCorrectiveFactors,
    newUserPermissions,
  })

  return {
    newCorrectiveFactors,
    newUserPermissions,
  }
}

export function marshalSettingsFrom(
  values: (SettingBack | null) | null,
  creationSchema: any,
): any {
  log.debug('marshalSettingsFrom.before', { values, creationSchema })

  if (_.isNil(values)) {
    return {
      settings: {},
      keys: creationSchema,
    }
  }

  const setting: any = _.get(values, 'value', {})
  const settingToManage = R.mergeDeepLeft(setting, creationSchema)

  const newSettings = _.mapValues(settingToManage, (top_val, top_key) => {
    if (top_key === 'microchannel') {
      return _.mapValues(top_val, (use_case_val, use_case_key) =>
        _.mapValues(use_case_val, (geom_type_value, geom_type_key) => {
          if (use_case_key === 'free_cooling_condenser') {
            return _.mapValues(geom_type_value, (params_obj, param_key) => ({
              enabled: _.get(params_obj, 'enabled', false),
              values: _.chain(params_obj)
                .map((value, key: string) =>
                  key === 'enabled'
                    ? null
                    : {
                        value,
                        key: `${use_case_key}.${geom_type_key}.${param_key}.${key}`,
                      },
                )
                .reject(_.isNil)
                .value(),
            }))
          }
          return {
            enabled: _.get(geom_type_value, 'enabled', false),
            values: _.chain(geom_type_value)
              .map((value, key: string) =>
                key === 'enabled'
                  ? null
                  : {
                      value,
                      key: `${use_case_key}.${geom_type_key}.${key}`,
                    },
              )
              .reject(_.isNil)
              .value(),
          }
        }),
      )
    } else {
      return _.mapValues(top_val, (use_case_val, use_case_key) => ({
        values: _.chain(use_case_val)
          .map((value, key: string) =>
            key === 'enabled'
              ? null
              : {
                  value,
                  key: `${use_case_key}.${key}`,
                },
          )
          .reject(_.isNil)
          .sortBy('key')
          .value(),
      }))
    }
  })

  log.debug('marshalSettingsFrom.after', {
    newSettings,
  })

  return newSettings
}

export function marshalGeometricConstantFrom(
  geometric_constants: GeometricConstants,
) {
  log.debug('marshalGeometricConstantFrom.before', { geometric_constants })

  const new_geometric_constants = _.map(
    geometric_constants,
    (val: { [key: string]: any }, key: string) => ({
      ...val,
      type: {
        type: 'string',
        value: key,
      },
    }),
  )

  log.debug('marshalGeometricConstantFrom.after', { new_geometric_constants })
  return new_geometric_constants
}

export function marshalCalculatedData(key: string, values: any) {
  log.debug('marshalCalculatedData.before', { key, values })

  const new_calculated_data = _.mapValues(
    values,
    (val: { [key: string]: any }) => {
      log.debug('marshalCalculatedData.val', { val, key })
      return val[key]
    },
  )

  log.debug('marshalCalculatedData.after', { new_calculated_data })
  return new_calculated_data
}

export const marshalRefrigerantsFrom = (refrigerants: any) => {
  log.debug('marshalRefrigerantsFrom.before', { refrigerants })

  const newRefrigerants = _.reduce(
    refrigerants,
    (acc, refrigerant) => {
      return {
        ...acc,
        [_.get(refrigerant, 'name')]: {
          visibility: _.get(refrigerant, 'visibility'),
        },
      }
    },
    {},
  )

  log.debug('marshalRefrigerantsFrom.after', { newRefrigerants })
  return newRefrigerants
}

export const marshalRefrigerantsTo = (refrigerantsNew: any) => {
  const { refrigerants } = refrigerantsNew

  log.debug('marshalRefrigerantsTo.before', { refrigerants })

  const keysRefrigerants = _.keys(refrigerants)
  return {
    value: {
      refrigerants: _.map(keysRefrigerants, (key) => {
        return {
          name: key,
          visibility: _.get(refrigerants[key], 'visibility'),
        }
      }),
    },
  }
}
