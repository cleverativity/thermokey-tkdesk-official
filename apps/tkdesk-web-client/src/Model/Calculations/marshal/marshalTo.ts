import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'

import * as IPF from 'Modules/Calculations/Manage/steps/InputParameter/functions'
import * as CF from 'Modules/Calculations/Manage/steps/InputParameter/RefrigerantCircuit/circuitFunctions'

const log = new ConsoleLogger('Model/Calculations/Marshal')

export function marshalCalculationTo(calculation: CalculationFront) {
  const { use_case }: any = calculation
  log.debug(`marshalCalculationTo.${use_case}.before`, { calculation })

  switch (true) {
    case use_case === 'air_cooled_condenser':
      return marshalAirCooledCondenserTo(calculation)

    case use_case === 'water_cooler':
      return marshalWaterCoolerTo(calculation)
    case use_case === 'water_heater':
      return marshalWaterHeaterTo(calculation)

    case _.startsWith(use_case, 'double_flow'):
      return marshalDoubleFlowTo(calculation)

    case use_case === 'free_cooling_condenser':
      return marshalFreeCoolingTo(calculation)
  }
}

const marshalAirCooledCondenserTo = (calculation: CalculationFront) => {
  return marshalTo(calculation, {
    handleMode: true,
    handleFluidInletMode: true,
    handleFluidOutletMode: true,
    flowRateKey: 'flow_rate_kgh_c1',
  })
}

const marshalWaterCoolerTo = (calculation: CalculationFront) => {
  return marshalTo(calculation, {
    handleFluid: true,
    handleMode: true,
    handleFluidOutletMode: true,
    flowRateKey: 'flow_rate_m3h_c1',
  })
}

const marshalWaterHeaterTo = (calculation: CalculationFront) => {
  return marshalTo(calculation, {
    handleFluid: true,
    handleMode: true,
    handleFluidOutletMode: true,
    flowRateKey: 'flow_rate_m3h_c1',
  })
}

const marshalDoubleFlowTo = (calculation: CalculationFront) => {
  return marshalTo(calculation, { handleDoubleFlow: true })
}

const marshalFreeCoolingTo = (calculation: CalculationFront) => {
  let input_data: any = _.get(calculation, 'input_data', {})
  const circuit = _.get(calculation, 'circuit', {})

  const air_mode: any = _.get(input_data, 'air_mode.value')

  input_data = updateInputDataBasedOnAirMode(input_data, air_mode)

  const newSteps = transformCircuitToSteps(circuit)

  const keysToExtract = [
    'battery_active_length',
    'channel_discretization_count',
    'air_mode',
    'altitude',
    'humidity',
    'inlet_temperature_air',
    'inlet_velocity_air',
    'flow_rate_air',
  ]

  _.forEach(keysToExtract, (key) => {
    if (input_data[key]) {
      const value = _.cloneDeep(input_data[key])

      input_data.c1[key] = value
      input_data.c2[key] = value
    }
  })

  input_data = _.chain(input_data)
    .omit(keysToExtract)
    .set('c1.steps.value', newSteps.steps_c1)
    .set('c2.steps.value', newSteps.steps_c2)
    .value()

  log.debug('marshalCalculationTo.marshalFreeCoolingTo.after', input_data)
  return input_data
}

const marshalTo = (
  calculation: CalculationFront,
  config: {
    handleFluid?: boolean
    handleMode?: boolean
    handleFluidInletMode?: boolean
    handleFluidOutletMode?: boolean
    handleDoubleFlow?: boolean
    flowRateKey?: string
  },
) => {
  log.debug('marshalCalculationTo.marshalTo', { calculation, config })

  let input_data: any = _.get(calculation, 'input_data', {})
  const circuit = _.get(calculation, 'circuit', {})

  const override_steps = _.get(input_data, 'override_steps.value')
  const mode: any = _.get(input_data, 'mode.value')
  const air_mode: any = _.get(input_data, 'air_mode.value')
  const fluid_c1_inlet_mode = _.get(input_data, 'fluid_c1_inlet_mode.value')
  const fluid_c1_outlet_mode = _.get(input_data, 'fluid_c1_outlet_mode.value')
  const fluid_c1 = _.get(input_data, 'fluid_c1.value')
  const geom_types_value = _.get(input_data, 'geom_types.value', [])

  const newSteps = transformCircuitToSteps(circuit)

  input_data = updateInputDataBasedOnAirMode(input_data, air_mode)

  if (
    _.get(config, 'handleFluid') &&
    fluid_c1 !== 'propylene' &&
    fluid_c1 !== 'ethylene'
  ) {
    input_data = {
      ...input_data,
      glycol_percentage_c1: {
        ..._.get(input_data, 'glycol_percentage_c1', {}),
        value: null,
      },
    }
  }

  if (_.get(config, 'handleMode')) {
    const flowRateKey = _.get(config, 'flowRateKey')
    if (flowRateKey) {
      input_data = updateInputDataBasedOnMode(input_data, mode, flowRateKey)
    }
  }

  if (_.get(config, 'handleFluidInletMode')) {
    input_data = updateInputDataBasedOnFluidInletMode(
      input_data,
      fluid_c1_inlet_mode,
    )
  }

  if (_.get(config, 'handleFluidOutletMode')) {
    input_data = updateInputDataBasedOnFluidOutletMode(
      input_data,
      fluid_c1_outlet_mode,
    )
  }

  if (override_steps) {
    let newDirection

    const handleDoubleFlow = _.get(config, 'handleDoubleFlow')
    const geomTypeArray = createGeomTypeArray(geom_types_value)

    if (handleDoubleFlow) {
      newDirection = transformCircuitToDirection(circuit)
    }

    input_data = handleOverrideSteps(
      input_data,
      newSteps,
      geomTypeArray,
      newDirection,
      handleDoubleFlow,
    )
  } else {
    input_data = handleNoOverrideSteps(input_data, geom_types_value)
  }

  log.debug('marshalCalculationTo.after', input_data)
  return input_data
}

const transformCircuitToSteps = (circuit: any) => {
  return _.mapValues(circuit, (entries) =>
    _.map(entries, (entry: any) => _.get(entry, 'entry.port')),
  )
}

const transformCircuitToDirection = (circuit: any) => {
  const steps_c2 = _.get(circuit, 'steps_c2', [])

  let newDirection

  _.forEach(steps_c2, (entry: any, idx: number) => {
    const direction = _.get(entry, 'entry.direction')

    const result = CF.getDirection(idx, direction)

    if (result !== undefined) {
      return (newDirection = result)
    }
  })

  return newDirection
}

const updateInputDataBasedOnMode = (
  input_data: any,
  mode: string,
  flow_rate: string,
) => {
  if (mode === 'design') {
    input_data = {
      ...input_data,
      [flow_rate]: {
        ..._.get(input_data, flow_rate, {}),
        value: null,
      },
    }

    return input_data
  } else {
    return {
      ...input_data,
      outlet_temperature_c1: {
        ..._.get(input_data, 'outlet_temperature_c1', {}),
        value: null,
      },
    }
  }
}

const updateInputDataBasedOnAirMode = (input_data: any, air_mode: string) => {
  if (air_mode === 'velocity') {
    return {
      ...input_data,
      flow_rate_air: { ..._.get(input_data, 'flow_rate_air', {}), value: null },
    }
  } else {
    return {
      ...input_data,
      inlet_velocity_air: {
        ..._.get(input_data, 'inlet_velocity_air', {}),
        value: null,
      },
    }
  }
}

const updateInputDataBasedOnFluidInletMode = (
  input_data: any,
  fluid_c1_inlet_mode: string,
) => {
  if (fluid_c1_inlet_mode === 'temperature') {
    return {
      ...input_data,
      delta_inlet_temperature_c1: {
        ..._.get(input_data, 'delta_inlet_temperature_c1', {}),
        value: null,
      },
    }
  } else {
    return {
      ...input_data,
      inlet_temperature_c1: {
        ..._.get(input_data, 'inlet_temperature_c1', {}),
        value: null,
      },
    }
  }
}

const updateInputDataBasedOnFluidOutletMode = (
  input_data: any,
  fluid_c1_outlet_mode: string,
) => {
  if (fluid_c1_outlet_mode === 'temperature') {
    return {
      ...input_data,
      delta_temperature_c1: {
        ..._.get(input_data, 'delta_temperature_c1', {}),
        value: null,
      },
    }
  } else {
    return {
      ...input_data,
      outlet_temperature_c1: {
        ..._.get(input_data, 'outlet_temperature_c1', {}),
        value: null,
      },
    }
  }
}

const createGeomTypeArray = (geomTypes: string[]) => {
  return _.map(geomTypes, (geomTypeValue) => ({
    type: 'string',
    value: geomTypeValue,
  }))
}

const handleOverrideSteps = (
  input_data: any,
  newSteps: any,
  geomTypeArray: any,
  newDirection?: string,
  handleDoubleFlow?: boolean,
) => {
  input_data = {
    ...input_data,
    override_steps: { type: 'boolean', value: true },
  }

  return _.map(geomTypeArray, (geomType) => {
    const geom_type = _.get(geomType, 'value', '')

    input_data = _.omit(input_data, ['n_of_tubes', 'geom_types'])

    if (handleDoubleFlow) {
      const fluid_direction_c2 = _.get(input_data, 'fluid_direction_c2')

      const prefixes = ['steps_c1', 'steps_c2']

      let steps = {}

      _.forEach(prefixes, (prefix) => {
        steps = {
          ...steps,
          [prefix]: { type: 'array', value: newSteps[prefix] },
        }
      })

      return {
        ...input_data,
        geom_type: geomType,
        fluid_direction_c2: { ...fluid_direction_c2, value: newDirection },
        ...steps,
      }
    } else {
      const prefix = IPF.getPrefix(geom_type)

      return {
        ...input_data,
        geom_type: geomType,
        steps_c1: { type: 'array', value: newSteps[prefix] },
      }
    }
  })
}

const handleNoOverrideSteps = (input_data: any, geomTypes: any) => {
  input_data = {
    ...input_data,
    override_steps: { type: 'boolean', value: false },
  }

  const geom_types = _.get(input_data, 'geom_types.value', [])
  const geometrySelected = IPF.getAllUniquePrefixOfGeometryTypes(geom_types)

  const nOfTubes = _.get(input_data, 'n_of_tubes', {})

  const filterednOfTubes = _.pick(nOfTubes, geometrySelected)

  const validations = extractValidationsFromTubes(filterednOfTubes)
  const nOfTubesPerGeom: any = updateTubesBasedOnGeomType(
    filterednOfTubes,
    validations,
  )

  input_data = _.omit(input_data, ['steps_c1', 'geom_types'])

  return _.map(createGeomTypeArray(geomTypes), (geomType) => {
    const prefix = IPF.getPrefix(geomType.value)
    const nOfTubesCorrect = nOfTubesPerGeom[prefix]

    return {
      ...input_data,
      geom_type: geomType,
      n_of_tubes: nOfTubesCorrect,
    }
  })
}

const extractValidationsFromTubes = (nOfTubes: any) => {
  const nOfTubesKeys = _.keys(nOfTubes)
  return _.reduce(
    nOfTubesKeys,
    (acc, key) => ({ ...acc, ...nOfTubes[key].validations }),
    {},
  )
}

const updateTubesBasedOnGeomType = (nOfTubes: any, validations: any) => {
  const nOfTubesKeys = Object.keys(nOfTubes)

  let res = {}
  _.forEach(nOfTubesKeys, (key) => {
    res = {
      ...res,
      [key]: {
        type: 'number',
        value: nOfTubes[key].value,
        validations,
      },
    }
  })

  return res
}
