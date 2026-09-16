import React from 'react'
import VentilationFilter from './VentilationFilter'
import CoilFilter from './CoilFilter'
import UnitFilter from './UnitFilter'
import _ from 'lodash'

interface RatingFilterProps {
  preferences: any
}

function RatingFilterParameter(props: RatingFilterProps) {
  const { preferences } = props
  const unitsType = _.get(preferences, 'um_system', 'si')
  return (
    <>
      <UnitFilter unitTypes={unitsType} />
      <VentilationFilter />
      <CoilFilter />
    </>
  )
}

export default RatingFilterParameter
