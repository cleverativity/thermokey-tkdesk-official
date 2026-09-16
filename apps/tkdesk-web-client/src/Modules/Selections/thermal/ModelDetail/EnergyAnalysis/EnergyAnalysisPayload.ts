import _ from 'lodash'

export type EnergyAnalysisData = {
  condenser: any
  performance?: any
}

export function EnergyAnalysisPayload(
  values: any,
  data: EnergyAnalysisData,
  selectedItem: string,
): Record<string, unknown> {
  const ea: any = _.get(values, 'ea', '')
  const condenser: any = _.get(data, 'condenser', '')
  const performance: any = _.get(data, 'performance', '')

  let branch: Record<string, unknown> = {}

  if (selectedItem === 'chooseA') {
    branch = {
      intEACurrentFixCapacity: performance?.capacity,
      intEAStartingAir: ea?.startingAirTemp,
      intEAFinalAir: ea?.capacity_calc_finalAirTemp,
      intEAStep: ea?.step,
      intEADistance: ea?.distance,
      intEACondensingTemp: ea?.condensingTemp,
      intEAInletAirTemp: 0,
      IntEANewFixCapacity: 0,
    }
  } else if (selectedItem === 'chooseB') {
    branch = {
      intEACurrentFixCapacity: ea?.currentFixCapacity,
      intEAStartingAir: ea?.startingAirTemp,
      intEAFinalAir: ea?.calc_air_flow_finalAirTemp,
      intEAStep: ea?.step,
      intEADistance: ea?.distance,
      intEACondensingTemp: ea?.condensingTemp,
      intEAInletAirTemp: 0,
      IntEANewFixCapacity: 0,
    }
  } else {
    branch = {
      intEACurrentFixCapacity: performance?.capacity,
      intEAStartingAir: 0,
      intEAFinalAir: 0,
      intEAStep: 0,
      intEADistance: ea?.distance,
      intEACondensingTemp: ea?.condensingTemp,
      intEAInletAirTemp: ea?.inletAirTemp,
      IntEANewFixCapacity: ea?.currentFixCapacity,
    }
  }

  return {
    condenserId: condenser?.modelId,
    condenserModel: condenser?.remoteModel,
    isCalculateCapacity: selectedItem === 'chooseA' || false,
    isCalculateAirFlow: selectedItem === 'chooseB' || false,
    isSingleCaculation: selectedItem === 'chooseC' || false,
    ...branch,
    distance: condenser?.distance,
    flowDirection: condenser?.airFlowDirection,
    refRigerantType: condenser?.refrigerantType,
    airflowRate: performance?.airFlow,
    rpm: performance?.rpm_wp,
    noOfFans: performance?.no_fans,
    power: performance?.power_wp,
    currentFan: condenser?.current_a,
    tubeVolume: performance?.internal_vol,
    weight: performance?.weights,
    diameterInlet: performance?.inlet_connection,
    diameterOutlet: performance?.outlet_connection,
    price: condenser?.price,
    subCooling: condenser?.subCooling,
    compressor: condenser?.compressor,
    atmPressureInMetric: condenser?.atmosphericPress,
    condensing: condenser?.condensing,
    dryBulb: condenser?.dryBulb,
  }
}
