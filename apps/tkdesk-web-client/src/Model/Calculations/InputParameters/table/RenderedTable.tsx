import _ from 'lodash'
import { useFormikContext } from 'formik'

import { FieldDecimalNumber } from 'Components/Field'

import * as F from 'Modules/Calculations/Manage/steps/InputParameter/OperatingCondition/functions'

const RenderedTable = ({ values }: any) => {
  const { prefix } = values

  const formik = useFormikContext()
  const { values: formikValues } = formik

  const useCase = _.get(formikValues, 'use_case')
  const batteryActiveLength = _.get(
    formikValues,
    'input_data.battery_active_length.value',
    0,
  )
  const inletVelocityAir = _.get(
    formikValues,
    'input_data.inlet_velocity_air.value',
    0,
  )

  const circuit: any = _.get(formikValues, `circuit.${prefix}`)

  let geomTypes = []

  if (useCase === 'free_cooling_condenser') {
    const prefix = _.chain(values).get('prefix').split('_').last().value()

    geomTypes = [
      _.get(formikValues, `input_data.${prefix}.geom_type.value`, []),
    ]
  } else {
    geomTypes = _.get(formikValues, 'input_data.geom_types.value', [])
  }

  return (
    <FieldDecimalNumber
      scale={0}
      overrideOnChange={(
        value: any,
        { field, form }: { field: any; form: any },
      ) => {
        const { setFieldValue } = form

        setFieldValue(field.name, value, false)

        const nOfTubes: number =
          _.sumBy(
            circuit,
            (el: any) =>
              _.get(el, 'entry.key') === _.get(values, 'key')
                ? 0
                : _.get(el, 'entry.port'), // this because setFieldValue has a delay
          ) + value

        F.calculateCoreHeight(
          {
            geom_types: geomTypes,
            n_of_tubes: nOfTubes,
            prefix,
          },
          setFieldValue,
        )

        // UF.calculateFlowRateAir(
        //   {
        //     battery_active_length,
        //     geom_types: filtered_geom_types,
        //     inlet_velocity_air,
        //     n_of_tubes,
        //   },
        //   setFieldValue,
        // )
      }}
      span={10}
      required
      hideRequired
      hideLabel
      name={`circuit.${prefix}[${values.pass - 1}].entry.port`}
    />
  )
}

export default RenderedTable
