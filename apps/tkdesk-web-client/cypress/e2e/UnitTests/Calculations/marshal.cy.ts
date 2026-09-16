import * as M from '../../../../src/Model/Calculations/marshal'

const beforeMarshalTo = {
  id: 398,
  code: 'CLC_HM1KXAUVQCWDBZ11K3YYFJ71',
  date: '2022-08-03T09:17:59.221Z',
  status: 'solved',
  use_case: 'air_cooled_condenser',
  input_data: {
    geom_types: {
      type: 'array',
      value: ['hp_32'],
    },
    battery_active_length: { type: 'number', value: 2000 },
    channel_discretization_count: { type: 'number', value: 100 },
    fluid_c1: { type: 'string', value: 'r1234zez' },
    inlet_temperature_c1: { type: 'number', value: 80 },
    saturation_temperature_c1: { type: 'number', value: 50 },
    flow_rate_kgh_c1: { type: 'number', value: 23 },
    inlet_temperature_air: { type: 'number', value: 23 },
    altitude: { type: 'number', value: 0 },
    inlet_velocity_air: { type: 'number', value: 2 },
    n_of_tubes: { type: 'number', value: 68 },
    override_steps: { type: 'boolean', value: false },
    mode: { type: 'string', value: 'design' },
    outlet_temperature_c1: { type: 'number', value: 68 },
    version: { type: 'number', value: 2 },
  },
  output_data: null,
  detail_data: {
    model_code: { type: 'string', value: null },
  },
  user: {
    id: 366,
    code: 'USER_0003',
  },
  circuit: {
    pass_1: {
      port: 52,
    },
    pass_2: {
      port: 16,
    },
  },
  steps_number: 2,
}

const afterMarshalTo = {
  geom_types: {
    type: 'array',
    value: ['hp_32'],
  },
  battery_active_length: { type: 'number', value: 2000 },
  channel_discretization_count: { type: 'number', value: 100 },
  fluid_c1: { type: 'string', value: 'r1234zez' },
  inlet_temperature_c1: { type: 'number', value: 80 },
  saturation_temperature_c1: { type: 'number', value: 50 },
  flow_rate_kgh_c1: { type: 'number', value: null },
  inlet_temperature_air: { type: 'number', value: 23 },
  altitude: { type: 'number', value: 0 },
  inlet_velocity_air: { type: 'number', value: 2 },
  n_of_tubes: { type: 'number', value: 68 },
  override_steps: { type: 'boolean', value: false },
  mode: { type: 'string', value: 'design' },
  outlet_temperature_c1: { type: 'number', value: 68 },
  version: { type: 'number', value: 2 },
}

const beforeMarshalFrom = {
  id: 398,
  code: 'CLC_HM1KXAUVQCWDBZ11K3YYFJ71',
  date: '2022-08-03T09:17:59.221Z',
  status: 'solved',
  use_case: 'air_cooled_condenser',
  input_data: {
    geom_types: {
      type: 'array',
      value: ['hp_32'],
    },
    battery_active_length: { type: 'number', value: 2000 },
    channel_discretization_count: { type: 'number', value: 100 },
    fluid_c1: { type: 'string', value: 'r1234zez' },
    inlet_temperature_c1: { type: 'number', value: 80 },
    saturation_temperature_c1: { type: 'number', value: 50 },
    flow_rate: { type: 'number', value: 23 },
    inlet_temperature_air: { type: 'number', value: 23 },
    altitude: { type: 'number', value: 0 },
    inlet_velocity_air: { type: 'number', value: 2 },
    n_of_tubes: { type: 'number', value: 68 },
    override_steps: { type: 'boolean', value: false },
    steps_c1: { type: 'array', value: [52, 16] },
    version: { type: 'number', value: 2 },
  },
  output_data: [
    {
      global_heat_flux_air: { type: 'number', value: 0.18939825915410213 },
      global_heat_flux_c1: { type: 'number', value: -0.18939825915410213 },
      inlet_temperature_air: { type: 'number', value: 23 },
      inlet_temperature_c1: { type: 'number', value: 80 },
      inlet_vapor_quality_c1: { type: 'number', value: 1 },
      outlet_temperature_air: { type: 'number', value: 23.05037937621979 },
      outlet_temperature_c1: { type: 'number', value: 50.18920435145851 },
      outlet_vapor_quality_c1: { type: 'number', value: 1 },
      ad_pressure_drops_air: { type: 'number', value: 0 },
      pressure_drops_c1: { type: 'number', value: 0.32169179543882676 },
      geom_type: { type: 'string', value: 'hp_32' },
      model_code: { type: 'string', value: '2MC6680102000010201ST' },
    },
  ],
  detail_data: {
    model_code: { type: 'string', value: null },
  },
  user: {
    id: 366,
    code: 'USER_0003',
  },
}

const afterMarshalFrom = {
  id: 398,
  code: 'CLC_HM1KXAUVQCWDBZ11K3YYFJ71',
  date: '2022-08-03T09:17:59.221Z',
  status: 'solved',
  use_case: 'air_cooled_condenser',
  input_data: {
    altitude: { type: 'number', value: 0 },
    fluid_c1: { type: 'string', value: 'r1234zez' },
    flow_rate: { type: 'number', value: 23 },
    geom_types: { type: 'array', value: ['hp_32'] },
    n_of_tubes: { type: 'number', value: 68 },
    inlet_velocity_air: { type: 'number', value: 2 },
    inlet_temperature_c1: { type: 'number', value: 80 },
    battery_active_length: { type: 'number', value: 2000 },
    inlet_temperature_air: { type: 'number', value: 23 },
    saturation_temperature_c1: { type: 'number', value: 50 },
    channel_discretization_count: { type: 'number', value: 100 },
    override_steps: { type: 'boolean', value: false },
    version: { type: 'number', value: 2 },
  },
  output_data: [
    {
      geom_type: { type: 'string', value: 'hp_32' },
      model_code: { type: 'string', value: '2MC6680102000010201ST' },
      pressure_drops_c1: { type: 'number', value: 0.32169179543882676 },
      ad_pressure_drops_air: { type: 'number', value: 0 },
      global_heat_flux_c1: { type: 'number', value: -0.18939825915410213 },
      global_heat_flux_air: { type: 'number', value: 0.18939825915410213 },
      inlet_temperature_c1: { type: 'number', value: 80 },
      inlet_temperature_air: { type: 'number', value: 23 },
      outlet_temperature_c1: { type: 'number', value: 50.18920435145851 },
      inlet_vapor_quality_c1: { type: 'number', value: 1 },
      outlet_temperature_air: { type: 'number', value: 23.05037937621979 },
      outlet_vapor_quality_c1: { type: 'number', value: 1 },
    },
  ],
  detail_data: {
    model_code: { type: 'string', value: null },
  },
  user: {
    id: 366,
    code: 'USER_0003',
  },
  circuit: {
    pass_1: {
      port: 52,
      input: 1,
      direction: 1,
      key: 'el_52',
    },
    pass_2: {
      port: 16,
      input: 0,
      direction: -1,
      key: 'el_16',
    },
  },
  steps_number: 2,
}

describe('marshalInputParametersTo', () => {
  it('empty', () => {
    expect(M.marshalCalculationTo(beforeMarshalTo)).to.deep.equal(
      afterMarshalTo,
    )
  })
})

describe('marshalInputParametersFrom', () => {
  it('empty', () => {
    expect(M.marshalCalculationFrom(beforeMarshalFrom)).to.eql(afterMarshalFrom)
  })
})
