import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'

const log = new ConsoleLogger('Model/FanModels/Marshal')

export function marshalFanModelTo(values: any) {
  log.debug('marshalFanModelTo', values)

  const {
    current_consumption,
    frequency,
    min_op_temp,
    max_op_temp,
    noise,
    power_consumption,
    price,
    rpm_max,
    rpm_min,
    voltage,
    weight,
  } = values

  const fan_model = {
    ...values,
    current_consumption: _.get(current_consumption, 'value', null),
    frequency: _.get(frequency, 'value', null),
    min_op_temp: _.get(min_op_temp, 'value', null),
    max_op_temp: _.get(max_op_temp, 'value', null),
    noise: _.get(noise, 'value', null),
    power_consumption: _.get(power_consumption, 'value', null),
    price: _.get(price, 'value', null),
    rpm_max: _.get(rpm_max, 'value', null),
    rpm_min: _.get(rpm_min, 'value', null),
    voltage: _.get(voltage, 'value', null),
    weight: _.get(weight, 'value', null),
  }

  return fan_model
}
