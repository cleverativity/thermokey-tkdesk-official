import _ from 'lodash'

import rawGeometryTypes from 'Localization/Constants/geometry_types.json'

import { SpanIntl } from 'Components/Span'

import * as CF from './RefrigerantCircuit/circuitFunctions'

export const getGeometryTypesStringForUseCase = (use_case: string) => {
  switch (true) {
    case use_case === 'air_cooled_condenser':
    case use_case === 'water_cooler':
    case use_case === 'water_heater':
    case use_case === 'free_cooling_condenser':
      return ['2M', '3M', '3N', '3P', '3Q']

    case _.startsWith(use_case, 'double_flow'):
      return ['df_wr', 'df_rw']

    default:
      return ['2M', '3M', '3N', '3P', '3Q']
  }
}

export const getGeometryTypesForUseCase = (use_case: string | null) => {
  return _.chain(rawGeometryTypes)
    .filter((geom) => {
      return use_case
        ? getGeometryTypesStringForUseCase(use_case).includes(geom.key)
        : getGeometryTypesStringForUseCase('default').includes(geom.key)
    })
    .map((opt: any, idx: number) => {
      const key: string = _.get(opt, 'key', '')

      return {
        label: (
          <SpanIntl prefix='select.coils.microchannel.geom_type.' value={key} />
        ),
        value: key,
        key: key,
      }
    })
    .value()
}

export function setNewCircuit(
  stepsConfig: any,
  useCase: any,
  nOfTubes: number,
  batteryActiveLength: any,
  prefix: string,
  setFieldValue: any,
) {
  const isFreeCooling = useCase === 'free_cooling_condenser'

  const selectedConfig = CF.calculateSelectedConfig(
    stepsConfig,
    useCase,
    nOfTubes,
  )

  if (selectedConfig) {
    const newPrefix =
      useCase === 'free_cooling_condenser' ? `steps_${prefix}` : prefix

    const selectedArray =
      batteryActiveLength < 1800
        ? selectedConfig[nOfTubes].l_1800
        : batteryActiveLength > 2200
          ? selectedConfig[nOfTubes].g_2200
          : selectedConfig[nOfTubes].b_1800_2200

    const ports = CF.getPorts(selectedArray, newPrefix)
    const numberOfSteps = CF.getNumberOfSteps(selectedArray.length, newPrefix)
    const circuit = CF.setCircuit(numberOfSteps, ports, [newPrefix])

    setFieldValue(
      isFreeCooling
        ? `input_data.${prefix}.n_of_steps.value`
        : 'input_data.n_of_steps.value',
      selectedArray.length,
      false,
    )
    setFieldValue(
      isFreeCooling ? `circuit.steps_${prefix}` : `circuit.${prefix}`,
      _.get(circuit, newPrefix),
      false,
    )
  }
}

export function setNewCircuitByNSteps(
  stepsConfig: any,
  useCase: any,
  nOfTubes: number,
  prefix: string,
  nOfSteps: number,
  setFieldValue: any,
) {
  const isFreeCooling = useCase === 'free_cooling_condenser'

  const selectedConfig = CF.calculateSelectedConfig(
    stepsConfig,
    useCase,
    nOfTubes,
  )

  if (selectedConfig) {
    const newPrefix =
      useCase === 'free_cooling_condenser' ? `steps_${prefix}` : prefix

    const keys = _.keys(selectedConfig[nOfTubes])
    const res: any = _.find(
      keys,
      (key) =>
        _.size(_.get(selectedConfig[nOfTubes], key)) === Number(nOfSteps),
    )

    const selectedArray = selectedConfig[nOfTubes][res]

    const ports = CF.getPorts(selectedArray, newPrefix)
    const numberOfSteps = CF.getNumberOfSteps(nOfSteps, newPrefix)
    const circuit = CF.setCircuit(numberOfSteps, ports, [newPrefix])

    setFieldValue(
      isFreeCooling
        ? `input_data.${prefix}.n_of_steps.value`
        : 'input_data.n_of_steps.value',
      Number(nOfSteps),
      false,
    )
    setFieldValue(
      isFreeCooling ? `circuit.steps_${prefix}` : `circuit.${prefix}`,
      _.get(circuit, newPrefix),
      false,
    )
  }
}

export const setNewPassToCircuit = (
  circuit: any[],
  prefix: string,
  setFieldValue: any,
) => {
  const lastElement = _.last(circuit)
  const newPass = createNewPass(lastElement)
  const newCircuit = [...circuit, newPass]

  setFieldValue(`circuit.${prefix}`, newCircuit)
}

const createNewPass = (lastEntry: {
  entry: {
    pass: number
    port: number | null
    input: number
    direction: number
    key: string
    prefix: string
  }
  key: string
}) => {
  const { entry, key: keyLastEntry } = lastEntry
  const { pass, direction, prefix } = entry
  const [entryString, number] = _.split(keyLastEntry, '_')
  return {
    entry: {
      pass: pass + 1,
      port: null,
      input: 0,
      direction: direction * -1,
      prefix,
    },
    key: `${entryString}_${Number(number) + 1}`,
  }
}

const getMappingForGeometryPrefix = (prefix: string) => {
  const prefixNormalized = _.toUpper(prefix)
  switch (prefixNormalized) {
    case 'M':
    case 'P':
    case 'Q':
      return 'M'
    case 'N':
      return 'N'
    default:
      return prefix
  }
}

export const startsWithNumber = (geometry: string) => /^\d/.test(geometry)

export const getPrefix = (geometry: string) => {
  let intermediateResult = ''
  if (startsWithNumber(geometry)) {
    intermediateResult = geometry.substring(1, 2)
  } else {
    intermediateResult = geometry.substring(0, 2)
  }
  return getMappingForGeometryPrefix(intermediateResult)
}

/**
 *
 * @param geometries ['2M', '3M', '3N']
 * @param n_of_tubes {M: {type: 'number', value: 101, validations: {…}}}
 * @returns
 */
export const getNOfTubesUnified = (geometries: string[], n_of_tubes: any) => {
  return _.reduce(
    geometries,
    (acc: any, geometry: string) => {
      const prefix = getPrefix(geometry)
      acc.push(_.get(n_of_tubes, `${prefix}.value`, 0))
      return acc
    },
    [],
  )
}

/**
 *
 * @param geometries ['2M', '3M', '3N']
 * @returns ['M', 'N']
 */
export const getAllUniquePrefixOfGeometryTypes = (geometries: string[]) => {
  return _.uniq(_.map(geometries, (geom) => getPrefix(geom)))
}

export const filteredObjectByPrefix = (
  objectWithGeometriesAsKeys: any,
  prefixInput: string,
) => {
  const keys = _.keys(objectWithGeometriesAsKeys)
  const keyWithPrefix = _.find(keys, (key) => getPrefix(key) === prefixInput)

  if (!keyWithPrefix) return {}

  return {
    [prefixInput]: objectWithGeometriesAsKeys[keyWithPrefix],
  }
}
