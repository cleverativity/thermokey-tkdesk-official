interface ThermalData {
  condenser: InputData
  calculation: CalculateData
  accessoriesPrice: AccessoriesPrice

}

interface InputData {
  condenserType: CommonValue
  condenserModel: CommonValue
  fansConnection: CommonValue
  airFlowDirection: CommonValue
  maxSoundPower: CommonValue
  maxSoundPressure: CommonValue
  noiseTolerance: CommonValue
  distance: CommonValue
  thermalCapacity: CommonValue
  tolerance: CommonValue
  altitude: CommonValue
  atmosphericPress: CommonValue
  dryBulb: CommonValue
  relHumidity: CommonValue
  refrigerantType: CommonValue
  compressor: CommonValue
  condensing: CommonValue
  subCooling: CommonValue
  unitsType: CommonValue
}

interface AccessoriesPrice {
  accessoriesDiscount: CommonValue
  accessoriesItems: []
  accessoriesPrice: CommonValue
  condenserModel: CommonValue
  discount: CommonValue
  totalNetPrice: CommonValue
  unitDiscount: CommonValue
  unitPrice: CommonValue
}
interface CalculateData {
  id: CommonValue
  modelName: CommonValue
  capacity: CommonValue
  airflow: CommonValue
  spl: CommonValue
  no_fans: CommonValue
  rpm: CommonValue
  power: CommonValue
  current_a: CommonValue
  internal_volume: CommonValue
  weights: CommonValue
  inlet_connection: CommonValue
  outlet_connection: CommonValue
  price: CommonValue
}

interface CommonValue {
  type?: string | undefined
  value?: boolean | string | number | string[] | number[] | null
  validations?: any
}
