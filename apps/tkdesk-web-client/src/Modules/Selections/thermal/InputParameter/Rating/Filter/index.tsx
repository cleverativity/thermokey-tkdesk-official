import React from 'react'
import VentilationFilter from './VentilationFilter'
import CoilFilter from './CoilFilter'
import UnitFilter from './UnitFilter'
import _ from 'lodash'

interface RatingFilterProps {
  preferences: any
  data?: any
}

function RatingFilterParameter(props: RatingFilterProps) {
  const { data, preferences } = props
  const unitsType = _.get(preferences, 'um_system', 'si')
  return (
    <>
      <UnitFilter unitTypes={unitsType} />
      <VentilationFilter data={data} />
      <CoilFilter />
    </>
  )
}

export default RatingFilterParameter
