import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'

import * as APISettings from 'Api/Settings/api/endpoints'
import * as APIFanModels from 'Api/FanModels/api/endpoints'

import * as MS from 'Model/Settings/marshal'
import { TYPE } from 'Model/Calculations/InputParameters/constants'

import * as IPF from '../functions'

const log = new ConsoleLogger('Calculations/InputParameter/functions')

let delayTimer: any

const filteredGeometries = (geometries: any[], type: string): any[] => {
  return _.filter(geometries, (geometry) => {
    if (IPF.startsWithNumber(geometry)) {
      return _.endsWith(geometry, type)
    } else {
      return _.startsWith(geometry, type)
    }
  })
}

export const getCoreHeight = (
  filteredTubes: any,
  nOfTubesSelected: any,
  useCase: string,
) => {
  const core_height = _.mapValues(filteredTubes, (el) => {
    const targetArray = _.startsWith(useCase, 'double_flow') ? el.c1 : el

    const obj = _.find(
      targetArray,
      (elem) => _.get(elem, 'n_of_tubes.value') === Number(nOfTubesSelected),
    )

    return _.omit(obj, 'n_of_tubes')
  })

  return MS.marshalCalculatedData('core_height', core_height)
}

export const getEnabledRefrigerants = (
  refrigerants: any,
  user_type: string,
) => {
  const filtered = _.filter(refrigerants, (refrigerant) =>
    _.includes(_.get(refrigerant, 'visibility'), user_type),
  )

  return _.orderBy(filtered, ['name'], ['asc'])
}

/**
 *
 * @param data Object { 2M: {…}, 3M: {…} } 2M: Object { type: "number", value: 20229.696, unit_of_measurement: "m^3/h" }
 */
export const getFirstValue = (data: any, roundPrecision: number) => {
  const keys = Object.keys(data)
  const priorities = ['M', 'N', 'df']

  const firstGeom = _.chain(priorities)
    .map((prefix) => filteredGeometries(keys, prefix))
    .find((list) => !_.isEmpty(list))
    .head()
    .value()

  return _.round(_.get(data, `${firstGeom}.value`), roundPrecision)
}

/**
 *
 * @param values geom_types contains only geometry with the same prefix
 * @param setFieldValue
 */
export const calculateCoreHeight = (
  values: {
    geom_types: string[] | null
    n_of_tubes: number | string | null
    prefix: string
  },
  setFieldValue: any,
) => {
  clearTimeout(delayTimer)
  delayTimer = setTimeout(async () => {
    const { geom_types, n_of_tubes, prefix } = values

    if (geom_types && !_.isNil(n_of_tubes)) {
      const { data: core_height } = await APISettings.calcCoreHeight({
        geom_types,
        n_of_tubes,
      })

      const marshaledCoreHeight = IPF.filteredObjectByPrefix(
        MS.marshalCalculatedData('core_height', core_height),
        prefix,
      )

      setFieldValue(
        `calculated_data.core_height.${prefix}`,
        _.get(marshaledCoreHeight, prefix),
        false,
      )
    }
  }, 500)
}

export const calculateFlowRateAir = async (
  values: {
    battery_active_length: number | string | null
    geom_types: string[] | null
    n_of_tubes: any[]
    inlet_velocity_air: number | string | null
  },
  setFieldValue: any,
) => {
  const { battery_active_length, geom_types, n_of_tubes, inlet_velocity_air } =
    values

  if (
    !_.isEmpty(geom_types) &&
    !_.isEmpty(n_of_tubes) &&
    !_.isNil(inlet_velocity_air) &&
    !_.isNil(battery_active_length)
  ) {
    clearTimeout(delayTimer)
    delayTimer = setTimeout(async () => {
      const { data: flow_rate_air } = await APISettings.calcFlowRateAir({
        battery_active_length,
        geom_types,
        n_of_tubes,
        inlet_velocity_air,
      })

      setFieldValue(
        'calculated_data.flow_rate_air',
        MS.marshalCalculatedData('flow_rate_air', flow_rate_air),
        false,
      )
    }, 500)
  }
}

export const calculateVelocityAir = async (
  values: {
    battery_active_length: number | string | null
    geom_types: string[] | null
    n_of_tubes: number[] | string[] | null
    flow_rate_air: number | string | null
  },
  setFieldValue: any,
) => {
  const { battery_active_length, geom_types, n_of_tubes, flow_rate_air } =
    values

  if (
    !_.isEmpty(geom_types) &&
    !_.isNil(n_of_tubes) &&
    !_.isNil(flow_rate_air) &&
    !_.isNil(battery_active_length)
  ) {
    clearTimeout(delayTimer)
    delayTimer = setTimeout(async () => {
      const { data: inlet_velocity_air } = await APISettings.calcVelocityAir({
        battery_active_length,
        geom_types,
        n_of_tubes,
        flow_rate_air,
      })

      setFieldValue(
        'calculated_data.inlet_velocity_air',
        MS.marshalCalculatedData('inlet_velocity_air', inlet_velocity_air),
        false,
      )
    }, 500)
  }
}

export const getDataFirstAvailable = (input_data: any) => {
  const selected_geometry = _.get(input_data, 'geom_types.value', [])
  const hasGeometry = selected_geometry.length > 0
  const prefix = IPF.getAllUniquePrefixOfGeometryTypes(selected_geometry)

  return {
    geometry: hasGeometry ? _.head(selected_geometry) : null,
    battery_active_length: _.get(input_data, 'battery_active_length.value', 0),
    n_of_tubes: _.get(input_data, `n_of_tubes.${prefix}.value`, null),
  }
}

export const getFanModels = async (
  currentCalculations: any,
  onUpdateParams: (params: any, currentCalculations: any) => void,
  outdated_params: any,
  type: string,
  option?: { name: string; value: string },
) => {
  let filters: { field: any[] } = _.get(outdated_params, 'filters', {})
  let ranges: any = _.get(outdated_params, 'ranges', {})

  if (type === TYPE.FILTER) {
    const name = _.get(option, 'name', '')
    const value = _.get(option, 'value', '')

    filters = { ...filters, [name]: value ? [value] : undefined }
  } else if (type === TYPE.RANGE) {
    ranges = option
  }

  const params = {
    ...outdated_params,
    filters,
    ranges,
  }

  onUpdateParams(params, currentCalculations)
}

export const getDetail = (
  id: any,
  setFieldValue: any,
  setIsLoadingDetail: any,
) => {
  clearTimeout(delayTimer)
  delayTimer = setTimeout(async () => {
    setIsLoadingDetail?.((loading: boolean) => !loading)

    try {
      const { data } = await APIFanModels.getFanModels(id)
      setFieldValue('fan_model_detail', data, false)

      const { id: fan_model_id } = data
      getPolynomials(fan_model_id, setFieldValue)
    } catch (error) {
      log.error(error)
    }

    setIsLoadingDetail?.((loading: boolean) => !loading)
  }, 500)
}

const params: any = {
  filters: [{ field: 'polynomial_type', values: ['pressure'] }],
}

const getPolynomials = async (id: any, setFieldValue: any) => {
  try {
    const { data } = await APIFanModels.searchPolynomials(params, id)

    setFieldValue('polynomials', data, false)
  } catch (error) {
    log.error(error)
  }
}

export const getInterpolation = async (
  id: any,
  values: any,
  use_case: string,
  setFieldValue: any,
  setIsLoadingInterpolation?: any,
) => {
  if (!_.startsWith(use_case, 'double_flow')) {
    setIsLoadingInterpolation((loading: boolean) => !loading)

    try {
      const { data } = await APIFanModels.interpolateFanModels(id, values)
      setFieldValue('interpolation', data, false)
    } catch (error) {
      log.error(error)
      setFieldValue('interpolation', {}, false)
    }

    setIsLoadingInterpolation((loading: boolean) => !loading)
  }
}

export function setFanDiameter({
  values,
  geometries,
  params,
  onUpdateParams,
}: any) {
  const geometryPrefix = IPF.getAllUniquePrefixOfGeometryTypes(geometries)

  const coreHeight: number | null =
    geometries.length == 1
      ? _.get(
          values,
          `calculated_data.core_height.${geometryPrefix}.value`,
          null,
        )
      : null
  const batteryActiveLength: number | null = _.get(
    values,
    'input_data.battery_active_length.value',
    null,
  )

  let minimumOfTheTwo: any = _.min([coreHeight, batteryActiveLength])
  minimumOfTheTwo = Math.floor(minimumOfTheTwo / 10) * 10

  const newParams = {
    ...params,
    ranges: {
      ...params?.ranges,
      fan_diameter: {
        from: params?.ranges?.fan_diameter?.from,
        to: minimumOfTheTwo,
      },
    },
  }
  onUpdateParams(newParams, values)
}

export const getValidationBound = (
  value: number,
  fallback: number | undefined,
  validationMin: number | undefined,
  validationMax: number | undefined,
) => {
  if (_.isNil(fallback)) {
    return value
  }

  const min = _.isNil(validationMin) ? null : Number(validationMin)
  const max = _.isNil(validationMax) ? null : Number(validationMax)

  if (min > max || max < min) {
    return Number(fallback)
  }

  if (value >= min && value <= max) {
    return value
  }

  return Number(fallback)
}
