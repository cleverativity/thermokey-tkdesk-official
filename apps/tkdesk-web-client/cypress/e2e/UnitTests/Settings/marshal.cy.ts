import * as M from '../../../../src/Model/Settings/marshal'

const beforeMarshalFrom = {
  id: 18,
  description: 'corrective factors',
  code: 'corrective_factors',
  value: {
    microchannel: {
      double_flow: {
        df_rw: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
        df_wr: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
      },
      water_cooler: {
        lp_32: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
      },
      water_heater: {
        lp_32: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
      },
      air_cooled_condenser: {
        hp_25: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
        hp_32: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
        lp_32: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
      },
      free_cooling_condenser: {
        hp_25: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
        hp_32: {
          ad_pressure_drops_air: 1,
          global_heat_flux_c1: 1,
        },
      },
    },
  },
}

const afterMarshalFrom = {
  microchannel: {
    double_flow: {
      df_rw: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'double_flow.df_rw.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'double_flow.df_rw.global_heat_flux_c1',
          },
        ],
      },
      df_wr: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'double_flow.df_wr.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'double_flow.df_wr.global_heat_flux_c1',
          },
        ],
      },
    },
    water_cooler: {
      lp_32: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'water_cooler.lp_32.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'water_cooler.lp_32.global_heat_flux_c1',
          },
        ],
      },
    },
    water_heater: {
      lp_32: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'water_heater.lp_32.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'water_heater.lp_32.global_heat_flux_c1',
          },
        ],
      },
    },
    air_cooled_condenser: {
      hp_25: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'air_cooled_condenser.hp_25.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'air_cooled_condenser.hp_25.global_heat_flux_c1',
          },
        ],
      },
      hp_32: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'air_cooled_condenser.hp_32.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'air_cooled_condenser.hp_32.global_heat_flux_c1',
          },
        ],
      },
      lp_32: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'air_cooled_condenser.lp_32.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'air_cooled_condenser.lp_32.global_heat_flux_c1',
          },
        ],
      },
    },
    free_cooling_condenser: {
      hp_25: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'free_cooling_condenser.hp_25.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'free_cooling_condenser.hp_25.global_heat_flux_c1',
          },
        ],
      },
      hp_32: {
        enabled: false,
        values: [
          {
            value: 1,
            key: 'free_cooling_condenser.hp_32.ad_pressure_drops_air',
          },
          {
            value: 1,
            key: 'free_cooling_condenser.hp_32.global_heat_flux_c1',
          },
        ],
      },
    },
  },
}

describe('marshalSettingsFrom', () => {
  it('full body', () => {
    expect(M.marshalSettingsFrom(beforeMarshalFrom, false, {})).to.eql(
      afterMarshalFrom,
    )
  })
})
