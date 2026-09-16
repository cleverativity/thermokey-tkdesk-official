import { useEffect, useState } from 'react'
import _ from 'lodash'

import { useFormikContext } from 'formik'
import { useAirflow } from 'Generic/hooks'

import FormCircuit from './FormCircuit'

import * as F from './functions'
import * as IPF from '../functions'

const Circuit = ({
  use_case,
  steps_config,
  available_n_of_tubes_values,
  geometric_constants,
  um_system,
}: any) => {
  const formikContext = useFormikContext()
  const { geom_types, n_of_tubes } = useAirflow()
  const [isFirstTimeRendering, setIsFirstTimeRendering] = useState(true)
  const [isModifiedNOfSteps, setIsModifiedNOfSteps] = useState({
    isModified: false,
  })

  const { values, setFieldValue }: any = formikContext

  const circuit = _.get(values, 'circuit')
  const n_of_tubes_with_prefix = _.get(values, 'input_data.n_of_tubes')

  const geometriesNotSelected = F.getGeometriesNotSelected(
    available_n_of_tubes_values,
    geom_types,
  )

  const all_geometries = _.concat(geom_types, geometriesNotSelected)

  const geometriesForPitch = F.getUniquePitches(
    geometric_constants,
    geom_types,
    n_of_tubes_with_prefix,
  )

  const allGeometriesForPitch = F.getUniquePitches(
    geometric_constants,
    all_geometries,
    n_of_tubes_with_prefix,
  )

  const uniqueGeometriesPrefix =
    IPF.getAllUniquePrefixOfGeometryTypes(geom_types)

  useEffect(() => {
    if (isFirstTimeRendering && !_.isEmpty(geometriesNotSelected)) {
      _.forEach(uniqueGeometriesPrefix, (geometryPrefix) => {
        const currentValue = _.get(
          n_of_tubes_with_prefix,
          `${geometryPrefix}.value`,
        )

        const nextNOfTubes = _.cloneDeep(n_of_tubes_with_prefix)
        const oppositeUpdate = F.setOppositeNOfTubes(
          geometryPrefix,
          currentValue,
          nextNOfTubes,
          { preserveExistingValue: true },
        )

        if (!oppositeUpdate) {
          return
        }

        setFieldValue(
          `input_data.n_of_tubes.${oppositeUpdate.oppositePrefix}`,
          oppositeUpdate.oppositeValue,
          false,
        )
      })

      setIsFirstTimeRendering(false)
    }
  }, [geometriesNotSelected])

  const getIntersectionConfigAndFilteredTubes = (geometryPrefix: any) => {
    const { intersectionConfig, filteredTubes } =
      F.getIntersectionConfigByGeomType(
        steps_config,
        available_n_of_tubes_values,
        use_case,
        geometryPrefix,
      )
    return { intersectionConfig, filteredTubes }
  }

  const handleChangeNOfTubes = (
    geometryPrefix: string,
    n_of_tubes_selected: any,
  ) => {
    F.onChangeTubesNumber(
      n_of_tubes_selected,
      geometryPrefix,
      geom_types,
      formikContext,
    )
  }

  const onChangeNOfTubes = (value: any, pitch: string) => {
    const allGeometriesForPitchSelected = F.getUniquePrefixesForPitch(
      allGeometriesForPitch,
      pitch,
    )

    _.forEach(allGeometriesForPitchSelected, (geom) => {
      handleChangeNOfTubes(geom, parseInt(value))
    })
  }

  return _.map(geometriesForPitch, (geometryForPitch) => {
    const { pitch, geometries } = geometryForPitch

    const firstPrefix: any = _.head(
      IPF.getAllUniquePrefixOfGeometryTypes(geometries),
    )

    const circuitPerGeometry = _.get(circuit, firstPrefix)

    const n_of_tubes_selected = _.get(
      n_of_tubes_with_prefix,
      `${firstPrefix}.value`,
    )

    const stepsConfig: any = F.getStepsConfigByUseCase(
      steps_config,
      use_case,
      geometries,
    )

    const numberOfTubes = _.map(F.keysStepsConfig(stepsConfig), (el) =>
      Number(el),
    )

    const options = _.chain(numberOfTubes)
      .map((el) => Number(el))
      .map((el: any) => ({ key: el }))
      .value()

    return (
      <FormCircuit
        um_system={um_system}
        pitch={pitch}
        geometryPrefix={firstPrefix}
        circuitPerGeometry={circuitPerGeometry}
        n_of_tubes_selected={n_of_tubes_selected}
        options={options}
        stepsConfig={stepsConfig}
        onChangeNOfTubes={onChangeNOfTubes}
        getIntersectionConfigAndFilteredTubes={
          getIntersectionConfigAndFilteredTubes
        }
        modifiedSteps={{ isModifiedNOfSteps, setIsModifiedNOfSteps }}
      />
    )
  })
}

export default Circuit
