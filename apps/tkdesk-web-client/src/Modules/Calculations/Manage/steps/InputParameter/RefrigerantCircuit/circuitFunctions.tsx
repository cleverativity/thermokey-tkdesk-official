import _ from 'lodash'

const getValueOfInput = (input: string, length: number, idx: number) => {
  if (input === 'down') {
    return length === idx + 1 ? 1 : 0
  } else {
    return idx === 0 ? 1 : 0
  }
}

// direction = 1 -> left
// direction = -1 -> right
const getValueOfDirection = (direction: string, idx: number) => {
  if (direction === 'left') {
    return idx === 0 ? 1 : idx % 2 === 0 ? 1 : -1
  } else {
    return idx === 0 ? -1 : idx % 2 === 0 ? -1 : 1
  }
}

export const getDirection = (idx: number, direction: number) => {
  if (idx === 0) {
    return direction === 1 ? 'left' : 'right'
  }
}

export const getPorts = (ports: number[], prefix: string) => {
  return { [prefix]: ports }
}

export const getNumberOfSteps = (numberOfSteps: number, prefix: string) => {
  return { [prefix]: Number(numberOfSteps) }
}

export const createEmptyCircuit = (numberOfSteps: number, prefix: string) => {
  const circuit = []

  for (let idx = 0; idx < numberOfSteps; idx++) {
    const pass = idx + 1
    const port = null
    const input = idx === 0 ? 1 : 0
    const direction = idx % 2 === 0 ? 1 : -1

    circuit.push({
      entry: { pass, port, input, direction, prefix },
      key: `entry_${idx}`,
    })
  }

  return circuit
}

/**
 *
 * @param numberOfSteps {prefix: number}
 * @param ports: { prefix: number[] }
 * @param prefixes: geometry prefixes, for double_flow rapresent steps
 */
export const setCircuit = (
  numberOfStepsPrefix: any,
  ports: any,
  prefixes: string[],
  fluid_c2_input_direction?: any,
) => {
  const circuit: any = {}

  _.forEach(prefixes, (prefix: string) => {
    const result = []
    const numberOfSteps = numberOfStepsPrefix[prefix]

    for (let idx = 0; idx < numberOfSteps; idx++) {
      let input
      let direction

      if (prefix === 'steps_c1' && fluid_c2_input_direction) {
        input = idx === 0 ? 1 : 0
        direction = idx === 0 ? -1 : idx % 2 === 0 ? -1 : 1
      } else if (prefix === 'steps_c2' && fluid_c2_input_direction) {
        const { fluid_input_c2, fluid_direction_c2 } = fluid_c2_input_direction

        input = getValueOfInput(fluid_input_c2, numberOfSteps, idx)
        direction = getValueOfDirection(fluid_direction_c2, idx)
      } else {
        input = idx === 0 ? 1 : 0
        direction = idx % 2 === 0 ? 1 : -1
      }

      result.push(
        calculateCircuit(idx, ports[prefix][idx], input, direction, prefix),
      )
    }
    _.set(circuit, prefix, result)
  })

  return circuit
}

function calculateCircuit(
  idx: number,
  port: number | null,
  input: number,
  direction: number,
  prefix: string,
) {
  return {
    key: `entry_${idx}`,
    entry: {
      pass: idx + 1,
      port,
      input,
      direction,
      key: `el_${port}`,
      prefix,
    },
  }
}

export function calculateSelectedConfig(
  stepsConfig: any,
  useCase: any,
  nOfTubes: number,
) {
  const selectedUseCase = _.find(stepsConfig, (el) => {
    return _.has(el, useCase)
  })

  const selectedConfig = selectedUseCase
    ? selectedUseCase[useCase]
    : _.find(stepsConfig, (el) => {
        return _.keys(el).some((key) => parseInt(key) === nOfTubes)
      })

  return selectedConfig
}

export function setNewCircuit(
  stepsConfig: any,
  useCase: any,
  nOfTubes: number,
  batteryActiveLength: any,
  setFieldValue: any,
  fluid_c2_input_direction?: any,
) {
  let circuit: any = {}
  let ports = {}
  let numberOfSteps = {}

  const selectedConfig = calculateSelectedConfig(stepsConfig, useCase, nOfTubes)

  _.forEach(selectedConfig, (value, prefix) => {
    const selectedArray =
      batteryActiveLength < 1800
        ? value[nOfTubes].l_1800
        : batteryActiveLength > 2200
          ? value[nOfTubes].g_2200
          : value[nOfTubes].b_1800_2200

    ports = { ...ports, ...getPorts(selectedArray, `steps_${prefix}`) }
    numberOfSteps = {
      ...numberOfSteps,
      ...getNumberOfSteps(selectedArray.length, `steps_${prefix}`),
    }

    circuit = setCircuit(
      numberOfSteps,
      ports,
      ['steps_c1', 'steps_c2'],
      fluid_c2_input_direction,
    )

    setFieldValue(
      `input_data.n_of_steps${prefix === 'c1' ? '' : '_c2'}.value`,
      selectedArray.length,
      false,
    )
  })
  setFieldValue('circuit', circuit, false)
}

export function setNewCircuitByNSteps(
  circuit: any,
  stepsConfig: any,
  useCase: any,
  nOfTubes: number,
  value: number,
  coolantKey: string,
  fluid_c2_input_direction: any,
  setFieldValue: any,
) {
  let ports = {}
  let numberOfSteps = {}
  let selectedConfig = calculateSelectedConfig(stepsConfig, useCase, nOfTubes)

  if (selectedConfig) {
    selectedConfig = _.get(selectedConfig, coolantKey)

    const keys = _.keys(selectedConfig[nOfTubes])
    const res: any = _.find(keys, (key) => {
      const a: any = _.size(_.get(selectedConfig[nOfTubes], key))

      return a === Number(value)
    })
    const selectedArray = selectedConfig[nOfTubes][res]

    ports = { ...ports, ...getPorts(selectedArray, `steps_${coolantKey}`) }
    numberOfSteps = {
      ...numberOfSteps,
      ...getNumberOfSteps(value, `steps_${coolantKey}`),
    }

    const newCircuit = setCircuit(
      numberOfSteps,
      ports,
      [`steps_${coolantKey}`],
      fluid_c2_input_direction,
    )

    setFieldValue(
      `input_data.n_of_steps${coolantKey === 'c1' ? '' : '_c2'}.value`,
      Number(value),
      false,
    )
    setFieldValue('circuit', { ...circuit, ...newCircuit }, false)
  }
}

export const setNewPassToCircuit = (
  circuit: any[],
  prefix: string,
  setFieldValue: any,
  fluid_input_c2?: string,
) => {
  const circuitLength = circuit.length

  const lastIndex = circuitLength - 1

  circuit[lastIndex] = {
    ...circuit[lastIndex],
    entry: {
      ...circuit[lastIndex].entry,
      input:
        fluid_input_c2 && prefix === 'steps_c2' ? 0 : lastIndex === 0 ? 1 : 0,
    },
  }

  const lastEntry = _.last(circuit)

  const { entry } = lastEntry
  const { pass, direction } = entry

  const nextKey = `entry_${circuitLength}`

  const newEntry = {
    key: nextKey,
    entry: {
      pass: pass + 1,
      port: null,
      input:
        fluid_input_c2 && prefix === 'steps_c2'
          ? getValueOfInput(fluid_input_c2, circuitLength + 1, circuitLength)
          : 0,
      direction: direction * -1,
      prefix,
    },
  }

  const newCircuit = [...circuit, newEntry]

  setFieldValue(`circuit.${prefix}`, newCircuit)
}

export const removePassToCircuit = (
  circuit: any[],
  prefix: string,
  setFieldValue: any,
  fluid_input_c2?: string,
) => {
  const updatedCircuit = _.initial(circuit)
  const circuitLength = updatedCircuit.length
  const lastIndex = circuitLength - 1

  updatedCircuit[lastIndex] = {
    ...updatedCircuit[lastIndex],
    entry: {
      ...updatedCircuit[lastIndex].entry,
      input:
        fluid_input_c2 && prefix === 'steps_c2'
          ? getValueOfInput(fluid_input_c2, circuitLength, lastIndex)
          : lastIndex === 0
            ? 1
            : 0,
    },
  }

  setFieldValue(`circuit.${prefix}`, updatedCircuit)
}
