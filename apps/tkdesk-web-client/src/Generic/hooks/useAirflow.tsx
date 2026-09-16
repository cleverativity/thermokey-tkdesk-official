import { useFormikContext } from 'formik'
import _ from 'lodash'

import * as F from 'Modules/Calculations/Manage/steps/InputParameter/functions'

const useAirflow = () => {
  const formik = useFormikContext()
  const { values, setFieldValue } = formik

  const useCase = _.get(values, 'use_case')

  let geometries: any
  let n_of_tubes

  const battery_active_length = _.get(
    values,
    'input_data.battery_active_length.value',
    0,
  )

  if (useCase === 'free_cooling_condenser') {
    geometries = [
      _.get(values, 'input_data.c1.geom_type.value'),
      _.get(values, 'input_data.c2.geom_type.value'),
    ]

    n_of_tubes = [
      _.get(values, 'input_data.c1.n_of_tubes.value'),
      _.get(values, 'input_data.c2.n_of_tubes.value'),
    ]
  } else {
    geometries = _.get(values, 'input_data.geom_types.value', [])

    n_of_tubes = _.get(values, 'input_data.n_of_tubes')
    n_of_tubes = F.getNOfTubesUnified(geometries, n_of_tubes)
  }

  const inlet_velocity_air: any = _.get(
    values,
    'input_data.inlet_velocity_air.value',
  )

  return {
    battery_active_length,
    geom_types: geometries,
    inlet_velocity_air,
    n_of_tubes,
    setFieldValue,
  }
}

export default useAirflow
