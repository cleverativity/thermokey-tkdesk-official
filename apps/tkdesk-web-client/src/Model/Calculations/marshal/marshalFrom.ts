import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'

import * as IPF from 'Modules/Calculations/Manage/steps/InputParameter/functions'
import * as CF from 'Modules/Calculations/Manage/steps/InputParameter/RefrigerantCircuit/circuitFunctions'

const log = new ConsoleLogger('Model/Calculations/Marshal')

const getNumberOfTubes = (geom_types_value: string[], n_of_tubes: any) => {
  return _.reduce(
    geom_types_value,
    (acc, geom_type_value, idx) => {
      return { ...acc, [IPF.getPrefix(geom_type_value)]: n_of_tubes[idx] }
    },
    {},
  )
}

export function marshalCalculationFrom(values: CalculationBack) {
  const { use_case = '' }: any = values
  log.debug(`marshalCalculationFrom.${use_case}.before`, values)

  switch (true) {
    case use_case === 'air_cooled_condenser':
    case use_case === 'water_cooler':
    case use_case === 'water_heater':
    case _.startsWith(use_case, 'double_flow'):
      return marshalFrom(values)

    case use_case === 'free_cooling_condenser':
      return marshalFreeCoolingFrom(values)

    default:
      return marshalFrom(values)
  }
}

function marshalFrom(values: CalculationBack, config?: {}) {
  const { use_case, input_data }: any = values

  let circuit: any = {}

  const geom_types_value = _.chain(input_data)
    .map('geom_type.value')
    .uniq()
    .without(undefined)
    .value()

  // remember that input_data contains multiple repeation of the same geom type
  // so if we get different steps_c1 we will save only the last element of the same
  // geom type
  const steps: any = _.reduce(
    input_data,
    (acc, data) => {
      const geom_type = _.get(data, 'geom_type.value', '')
      const prefix = IPF.getPrefix(geom_type)

      if (_.startsWith(use_case, 'double_flow')) {
        return {
          ...acc,

          steps_c1: _.get(data, 'steps_c1', { value: [] }),
          steps_c2: _.get(data, 'steps_c2', { value: [] }),
        }
      }

      return { ...acc, [prefix]: _.get(data, 'steps_c1', { value: [] }) }
    },
    {},
  )

  const first_input_data: any = _.get(values, 'input_data[0]', {})
  const fluid_direction_c2 = _.get(
    first_input_data,
    'fluid_direction_c2.value',
    null,
  )
  const fluid_input_c2 = _.get(first_input_data, 'fluid_input_c2.value', null)

  const n_of_tubes_from = _.map(input_data, (data) => _.get(data, 'n_of_tubes'))

  const geom_types = {
    type: 'string[]',
    value: geom_types_value,
  }

  const n_of_tubes = getNumberOfTubes(geom_types_value, n_of_tubes_from)

  const newInputData = { ...first_input_data, geom_types, n_of_tubes }

  _.forEach(geom_types_value, (el) => {
    const prefix: any = IPF.getPrefix(el)

    if (_.startsWith(use_case, 'double_flow')) {
      const steps_circuit = _.keys(steps)

      let ports = {}
      let numberOfSteps = {}

      _.forEach(steps_circuit, (key: any) => {
        const els = steps[key].value
        const n = els.length
        ports = { ...ports, ...CF.getPorts(els, key) }
        numberOfSteps = { ...numberOfSteps, ...CF.getNumberOfSteps(n, key) }
      })

      circuit = CF.setCircuit(numberOfSteps, ports, steps_circuit, {
        fluid_input_c2,
        fluid_direction_c2,
      })
    } else {
      const numberOfSteps = steps[prefix].value.length

      circuit = {
        ...circuit,
        ...CF.setCircuit(
          CF.getNumberOfSteps(numberOfSteps, prefix),
          CF.getPorts(steps[prefix].value, prefix),
          [prefix],
        ),
      }
    }
  })

  const valuesToBeCopied = { ...values }

  // steps are equal in number for every geom types FOR NOW,
  // TODO change accessing the first element to something else
  let newValues: any = _.chain(valuesToBeCopied)
    .set('input_data', newInputData)
    .omit(['input_data.steps_c1'])
    .omit(['input_data.steps_c2'])
    .omit(['input_data.geom_type'])
    .set('circuit', circuit)
    .value()

  log.debug(`marshalCalculationFrom.${use_case}.after`, newValues)
  return newValues
}

const marshalFreeCoolingFrom = (values: CalculationBack) => {
  const { input_data, output_data }: any = values

  let circuit: any = {}
  let ports = {}
  let numberOfSteps = {}

  const steps: any = _.reduce(
    input_data,
    (acc, data, idx) => {
      if (idx !== 'mode') {
        return {
          ...acc,
          [`steps_${idx}`]: _.get(data, 'steps', { value: [] }),
        }
      }
      return acc
    },
    {},
  )

  const steps_circuit = _.keys(steps)

  _.forEach(steps_circuit, (key) => {
    const els = steps[key].value
    const n = els.length
    ports = { ...ports, ...CF.getPorts(els, key) }
    numberOfSteps = { ...numberOfSteps, ...CF.getNumberOfSteps(n, key) }
  })

  circuit = CF.setCircuit(numberOfSteps, ports, steps_circuit)

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

  const newInputData = {
    ...input_data,
    ..._.pick(input_data.c1, keysToExtract),
  }

  let newOutputData

  if (!_.isNil(output_data)) {
    const configKeys = _.filter(_.keys(input_data), (k) => k !== 'mode')

    newOutputData = _.map(output_data, (item, index) => {
      const key = configKeys[index]
      const glycol_percentage = _.get(input_data, `${key}.glycol_percentage`)
      const fluid = _.get(input_data, `${key}.fluid`)

      return {
        ...item,
        glycol_percentage,
        fluid,
      }
    })
  }

  const c1KeysToOmit = _.map(keysToExtract, (key) => `input_data.c1.${key}`)
  const c2KeysToOmit = _.map(keysToExtract, (key) => `input_data.c2.${key}`)

  const newValues = _.chain(values)
    .set('input_data', newInputData)
    .set('output_data', newOutputData)
    .omit([...c1KeysToOmit, ...c2KeysToOmit])
    .set('circuit', circuit)
    .value()

  log.debug('marshalCalculationFrom.free_cooling_condenser.after', newValues)
  return newValues
}
