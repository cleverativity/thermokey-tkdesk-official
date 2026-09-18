export interface PefMachine {
  id: string
  modelId?: string | number | null
  modelCode: string
  fanCode: string
  coilCode?: string | null
  series?: string | null
  fanType?: string | null
  fanNumber?: string | number | null
  rows?: string | number | null
  length?: string | number | null
  width?: string | number | null
  height?: string | number | null
  quantity?: number
  fanQuantity?: number
}

export interface RatingPerformanceData {
  capacity?: number | null
  capacityUnit?: string | null
  mode?: string | null
  condition?: string | null
}

export interface RatingAirData {
  inletTemperature?: number | null
  inletTemperatureUnit?: string | null
  inletRelativeHumidity?: number | null
  inletRelativeHumidityUnit?: string | null
  altitude?: number | null
  altitudeUnit?: string | null
  outletTemperature?: number | null
  outletTemperatureUnit?: string | null
  flowrate?: number | null
  flowrateUnit?: string | null
  pressureDrop?: number | null
  pressureDropUnit?: string | null
}

export interface RatingRefrigerantData {
  refrigerantType?: string | null
  condensing?: number | null
  condensingUnit?: string | null
  subCooling?: number | null
  subCoolingUnit?: string | null
  liquidLeaving?: number | null
  liquidLeavingUnit?: string | null
  pressureDrop?: number | null
  pressureDropUnit?: string | null
}

export interface RatingUnitData {
  type?: string | null
  length?: number | null
  width?: number | null
  height?: number | null
  dimensionUnit?: string | null
  weight?: number | null
  weightUnit?: string | null
  innerVolume?: number | null
  innerVolumeUnit?: string | null
  exchangeArea?: number | null
  exchangeAreaUnit?: string | null
  inletConnection?: string | null
  outletConnection?: string | null
}

export interface RatingCoilData {
  coilCode?: string | null
  coilGeometry?: string | null
  finMaterial?: string | null
  tubeMaterial?: string | null
  passes?: number | null
  passesLabel?: string | null
  numberOfCoils?: number | null
  innerVolume?: number | null
  innerVolumeUnit?: string | null
  exchangeArea?: number | null
  exchangeAreaUnit?: string | null
  inletHeader?: string | null
  outletHeader?: string | null
}

export interface RatingNoiseData {
  soundPower?: number | null
  soundPowerUnit?: string | null
  soundPressure?: number | null
  soundPressureUnit?: string | null
  distance?: number | null
  distanceUnit?: string | null
}

export interface RatingVentilationData {
  fanName?: string | null
  fanType?: string | null
  link?: string | null
  speedPercent?: number | null
  rpmWp?: number | null
  rpmMax?: number | null
  diameter?: number | null
  fanRows?: number | null
  fansPerRow?: number | null
  numberOfFans?: number | null
  phases?: number | null
  voltage?: number | null
  frequency?: number | null
  singlePowerWp?: number | null
  singlePowerMax?: number | null
  totalPowerWp?: number | null
  totalPowerMax?: number | null
  singleCurrentWp?: number | null
  singleCurrentMax?: number | null
  totalCurrentWp?: number | null
  totalCurrentMax?: number | null
  esp?: number | null
  espUnit?: string | null
}

export interface RatingCalculation {
  id?: string | number
  modelId?: string | number
  modelCode?: string
  performanceData?: RatingPerformanceData
  airData?: RatingAirData
  refrigerantData?: RatingRefrigerantData
  unitData?: RatingUnitData
  coilData?: RatingCoilData
  noiseData?: RatingNoiseData
  ventilationData?: RatingVentilationData
}

export interface ResultDataProps {
  selectedMachine: PefMachine | null
  calculation?: RatingCalculation | null
}

export const formatRatingUnit = (unit?: string | null) => {
  if (!unit) return undefined
  return unit
    .replace(/^C$/, '°C')
    .replace(/m3\/h/i, 'm³/h')
    .replace(/dm3/i, 'dm³')
    .replace(/m2$/i, 'm²')
}

export const formatRatingPair = (
  wp?: number | string | null,
  max?: number | string | null,
) => {
  if (wp == null && max == null) return null
  return `${wp ?? '-'} / ${max ?? '-'}`
}
