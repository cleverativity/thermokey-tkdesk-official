import _ from 'lodash'

import rawNOfTubes from 'Localization/Constants/n_of_tubes.json'

import * as IPF from '../functions'

const GEOMETRIES_WITH_USE_CASE = ['M', 'N']

export function getCommonStepsConfig(stepsConfig: any) {
  const c1 = _.get(stepsConfig, 'c1')
  const c2 = _.get(stepsConfig, 'c2')

  const keysC1 = _.keys(c1)
  const keysC2 = _.keys(c2)

  const commonKeys = _.intersection(keysC1, keysC2)

  const result = _.reduce(
    commonKeys,
    (acc: any, key: any) => {
      acc[key] = {
        c1: c1[key],
        c2: c2[key],
      }
      return acc
    },
    {},
  )

  return [result]
}

export const getUniquePitches = (
  geometric_constants: any,
  geometries: any,
  n_of_tubes?: any,
) => {
  const data: any[] = _.map(
    _.filter(geometric_constants, (el) => {
      return _.includes(geometries, el.type.value)
    }),
    (constant: any) => {
      return {
        pitch: _.get(constant, 'tube_step.value', 0),
        geometry: _.get(constant, 'type.value'),
      }
    },
  )

  return _.chain(data)
    .groupBy('pitch')
    .map((items, pitch) => ({
      pitch,
      geometries: _.map(items, (item) => item.geometry),
      n_of_tubes:
        n_of_tubes[
          IPF.getPrefix(_.first(_.map(items, (item) => item.geometry)))
        ],
    }))
    .value()
}

export const getUniquePrefixesForPitch = (
  allGeometriesWithPitch: any[],
  pitch: string,
) => {
  const geometriesWithMyPitch = _.filter(allGeometriesWithPitch, (o) => {
    return _.get(o, 'pitch') === pitch
  })
  if (_.size(geometriesWithMyPitch) > 0) {
    const first = geometriesWithMyPitch[0] // unique result and it's the first
    const geometries = _.get(first, 'geometries')
    return IPF.getAllUniquePrefixOfGeometryTypes(geometries)
  }
  return []
}

const getOpposite = (prefix: string) => {
  switch (prefix) {
    case 'M':
      return 'N'
    case 'N':
      return 'M'
    default:
      return ''
  }
}

const getOppositeValue = (prefix: string, value: number) => {
  return _.get(rawNOfTubes, [prefix, value])
}

export function setOppositeNOfTubes(
  prefix: string,
  value: number,
  n_of_tubes: any,
  options: { preserveExistingValue?: boolean } = {},
) {
  const { preserveExistingValue = false } = options
  const oppositePrefix = getOpposite(prefix)
  const oppositeValue = getOppositeValue(prefix, value)
  const existingOppositeValue = _.get(n_of_tubes, `${oppositePrefix}.value`)

  if (!oppositePrefix || _.isNil(oppositeValue)) {
    return null
  }

  if (preserveExistingValue && !_.isNil(existingOppositeValue)) {
    return null
  }

  n_of_tubes[oppositePrefix] = {
    ..._.get(n_of_tubes, oppositePrefix, n_of_tubes[prefix]),
    value: oppositeValue,
  }

  return {
    oppositePrefix,
    oppositeValue: n_of_tubes[oppositePrefix],
  }
}

/**
 *
 * @param value
 * @param prefix
 * @param formik
 * @param n_of_tubes parameter that will be touched and changed
 */
const onChangeSingleTubesNumber = (
  value: number,
  prefix: string,
  n_of_tubes: any,
  formik: any,
) => {
  const { setFieldTouched, setFieldValue } = formik

  _.set(
    n_of_tubes,
    prefix,
    _.assign({}, _.get(n_of_tubes, `${prefix}.value`), value),
  )
  setFieldValue(`input_data.n_of_tubes.${prefix}.value`, value)
  setTimeout(() => setFieldTouched(`input_data.n_of_tubes.${prefix}`, true))
}

export const onChangeTubesNumber = (
  value: number,
  prefix: string,
  geometriesSelected: string[],
  formik: any,
) => {
  const { values } = formik
  let n_of_tubes_updated: any = _.get(values, 'input_data.n_of_tubes')

  // modify the single tube and all its stuff
  onChangeSingleTubesNumber(value, prefix, n_of_tubes_updated, formik)

  // modify the other tube involved and all its stuff
  // if (isOppositeSelected(prefix, geometriesSelected)) {
  const oppositePrefix = getOpposite(prefix)
  const oppositeValue = getOppositeValue(prefix, value)

  onChangeSingleTubesNumber(
    oppositeValue,
    oppositePrefix,
    n_of_tubes_updated,
    formik,
  )
  // }
}

const stepsConfigForGeometry = (steps_config: any, use_case: any) => {
  return _.map(_.keys(steps_config), (key) => {
    const value = _.get(steps_config, [key, use_case])

    return { [key]: value }
  })
}

const getOptionsFromGeometries = (
  steps_config_formatted: any,
  geometries: any,
) => {
  const geometriesFiltered = _.filter(steps_config_formatted, (geom) => {
    const keys = _.keys(geom)
    return _.includes(geometries, keys[0])
  })

  return _.reduce(
    geometriesFiltered,
    (result, value) => {
      const key = _.keys(value)[0]
      return { ...result, [key]: value[key] }
    },
    {},
  )
}

export const getStepsConfigByUseCase = (
  steps_config: any,
  use_case: any,
  geometries: any,
) => {
  const stepsConfigFormatted = stepsConfigForGeometry(steps_config, use_case)
  const options = getOptionsFromGeometries(stepsConfigFormatted, geometries)

  const typeGeometries = _.keys(options)

  return _.map(typeGeometries, (typeGeometry) =>
    _.get(options, typeGeometry, null),
  )
}

/**
 *
 * @param options like this: [{…}, {…}], where  [ {50: {…}, 68: {…}, ...}, ...]
 * @returns
 */
export const keysStepsConfig = (options: any) => {
  const numberOfTubesForGeometry = _.map(options, (geometry) => {
    return _.keys(geometry)
  })

  return _.intersection(...numberOfTubesForGeometry)
}

const stepsByPrefixAndUseCase = (
  stepsCfg: any,
  prefixInput: string,
  useCaseSelected: string,
) => {
  const geomBlock = stepsCfg[prefixInput]
  if (!geomBlock) return []

  const hasNestedUseCase = _.includes(GEOMETRIES_WITH_USE_CASE, prefixInput)
  const sourceObj = hasNestedUseCase ? geomBlock?.[useCaseSelected] : geomBlock
  if (!sourceObj) return []

  return _.map(sourceObj, (val, tubeKey) => ({ [tubeKey]: val })).sort(
    (a, b) => Number(Object.keys(a)[0]) - Number(Object.keys(b)[0]),
  )
}

export const getIntersectionConfigByGeomType = (
  steps_config: any,
  available_n_of_tubes_values: any,
  use_case_selected: any,
  prefix: any,
) => {
  const filteredTubes = IPF.filteredObjectByPrefix(
    available_n_of_tubes_values,
    prefix,
  )

  const intersectionConfig = stepsByPrefixAndUseCase(
    IPF.filteredObjectByPrefix(steps_config, prefix),
    prefix,
    use_case_selected,
  )

  return { intersectionConfig, filteredTubes }
}

export const getGeometriesNotSelected = (
  available_n_of_tubes_values: any,
  geometries_selected: string[],
) => {
  const all_geometries = Object.keys(available_n_of_tubes_values)

  return _.filter(
    all_geometries,
    (geometry) => !_.includes(geometries_selected, geometry),
  )
}
