interface CalculationBack {
  id?: number | string
  input_data?: InputData
  output_data?: OutputData[]
  detail_data?: any
  user?: User
  date?: string | null
  use_case?:
    | null
    | 'air_cooled_condenser'
    | 'water_heater'
    | 'water_cooler'
    | 'double_flow_rw'
    | 'double_flow_ww'
    | 'free_cooling_condenser'
  status?: 'created' | 'use_case_selected' | 'solved' | 'detailed' | 'completed'
}

interface CalculationFront {
  id?: number
  input_data?: InputData
  output_data?: OutputData[]
  detail_data?: any
  user?: string
  date?: string | null
  use_case?:
    | null
    | 'air_cooled_condenser'
    | 'water_heater'
    | 'water_cooler'
    | 'double_flow_rw'
    | 'double_flow_ww'
    | 'free_cooling_condenser'
  status?:
    | 'created'
    | 'use_case_selected'
    | 'solved'
    | 'detailed'
    | 'completed'
    | null
  steps_number?: number
  circuit?: { [key: string]: any }
  geom_types?: string[]
}

interface StepsConfig {
  '2M': any
  '3M': any
  '3N': any
  df_wr: any
  df_rw: any
}

interface AvailableTubesConfig {
  '2M': SingleTubesConfig
  '3M': SingleTubesConfig
  '3N': SingleTubesConfig
  df_wr: SingleTubesConfig
  df_rw: SingleTubesConfig
}

interface SingleTubesConfig {
  core_height: { type: string; value: number; unit_of_measurement: string }
  n_of_tubes: { type: string; value: number }
}

interface GeometricConstants {
  '2M': SingleGeometricConstant
  '3M': SingleGeometricConstant
  '3N': SingleGeometricConstant
  df_wr: SingleGeometricConstant
  df_rw: SingleGeometricConstant
}

interface CoreHeightValues {
  '2M': { core_height: any }
  '3M': { core_height: any }
  '3N': { core_height: any }
  df_wr: { core_height: any }
  df_rw: { core_height: any }
}

interface FlowRateAirValues {
  '2M': { flow_rate_air: CommonValue }
  '3M': { flow_rate_air: CommonValue }
  '3N': { flow_rate_air: CommonValue }
  df_wr: { flow_rate_air: CommonValue }
  df_rw: { flow_rate_air: CommonValue }
}

interface SingleGeometricConstant {
  comsol_port_length: { type: string; value: number }
  tubes_depth: { type: string; value: number } //port_width:
  tube_step: { type: string; value: number } //port_pitch:
  hydraulic_diameter: { type: string; value: number }
  tube_pass_section: { type: string; value: number }
  aspect_ratio: { type: string; value: number }
  port_number: { type: string; value: number }
  pressure: { type: string; value: number }
}

interface CalculationData {
  steps_config: StepsConfig
  available_n_of_tubes_values: AvailableTubesConfig
  geometric_constants: { [key: string]: any }[]
  calculation: CalculationFront
  calculated_data: any
  refrigerants: SettingBack
  fan_models: FanModels
}

interface OutputData {
  calculation_id?: string | number
  geom_type: CommonValue
  model_code: CommonValue
  air_pressure: CommonValue
  flow_rate_m3h_c1?: CommonValue
  flow_rate_m3h_c2?: CommonValue
  flow_rate_kgh_c1?: CommonValue
  flow_rate_kgh_c2?: CommonValue
  flow_rate_air: CommonValue
  pressure_drops_c1: CommonValue
  pressure_drops_c2: CommonValue
  ad_pressure_drops_air: CommonValue
  heat_transfer_rate: CommonValue
  global_heat_flux_c1?: CommonValue
  global_heat_flux_c2?: CommonValue
  global_heat_flux_air?: CommonValue
  outlet_velocity_air: CommonValue
  inlet_temperature_c1?: CommonValue
  inlet_temperature_c2?: CommonValue
  inlet_temperature_air: CommonValue
  outlet_temperature_c1?: CommonValue
  outlet_temperature_c2?: CommonValue
  outlet_temperature_air: CommonValue
  inlet_vapor_quality_c1?: CommonValue
  outlet_vapor_quality_c1?: CommonValue
  outlet_vapor_quality_c2?: CommonValue
}

interface InputData {
  mode: CommonValue
  altitude: CommonValue
  fluid_c1: CommonValue
  fluid_c2?: CommonValue
  steps_c1: CommonValue
  geom_types: CommonValue
  n_of_tubes: CommonValue
  inlet_velocity_air: CommonValue
  override_steps: CommonValue
  flow_rate_air: CommonValue
  flow_rate_m3h_c1?: CommonValue
  flow_rate_m3h_c2?: CommonValue
  flow_rate_kgh_c1?: CommonValue
  flow_rate_kgh_c2?: CommonValue
  glycol_percentage_c1?: CommonValue
  glycol_percentage_c2?: CommonValue
  inlet_temperature_c1?: CommonValue
  inlet_temperature_c2?: CommonValue
  inlet_temperature_air: CommonValue
  battery_active_length: CommonValue
  outlet_temperature_c1?: CommonValue
  outlet_temperature_c2?: CommonValue
  saturation_temperature_c1?: CommonValue
  saturation_temperature_c2?: CommonValue
  channel_discretization_count: CommonValue
  delta_temperature_c1?: CommonValue
  version: CommonValue
}

interface CommonValue {
  type?: string | undefined
  value?: boolean | string | number | string[] | number[] | null
  unit_of_measurement?: string
  validations?: any
}
