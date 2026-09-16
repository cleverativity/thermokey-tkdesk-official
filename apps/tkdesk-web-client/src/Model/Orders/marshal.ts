import { ConsoleLogger } from 'aws-amplify/utils'
import * as MC from 'Model/Calculations/marshal'

const log = new ConsoleLogger('Model/Orders/Marshal')

export const marshalOrderTo = (values: OrderFront) => {}

export const marshalOrderFrom = (values: OrderBack) => {
  log.debug('marshalOrderFrom.before', values)
  const { calculation } = values
  const newCalculation = MC.marshalCalculationFrom(calculation)
  log.debug('marshalOrderFrom.after', {
    ...values,
    calculation: newCalculation,
  })
  return { ...values, calculation: newCalculation }
}
