import { SpanIntl, SpanNumber } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledSpinner,
} from 'Components/Styled'
import type { ReactNode } from 'react'
import { unitDetailItem } from './DetailUnitValue'

interface GroupedDetailsProps {
  data?: any
  model?: any
  loading?: boolean
  direction?: string
  unitTypes: string
}

interface DetailPanelProps {
  panelKey: string
  header: string
  items: any[]
  loading: boolean
  column?: number
}

const PERFORMANCE = 'Performance'
const FANS = 'Fans'
const GEOMETRIC = 'Geometric Parameters'

const CAPACITY_UNITS = { si: 6, ip: 8 }
const TEMP_C_UNITS = { si: 32, ip: 33 }
const TEMP_K_UNITS = { si: 35, ip: 33 }
const ALTITUDE_UNITS = { si: 1, ip: 3 }
const FLOW_UNITS = { si: 23, ip: 26 }
const SOUND_UNITS = { si: 168, ip: 168 }
const PRESSURE_KPA_UNITS = { si: 42, ip: 47 }
const PRESSURE_PA_UNITS = { si: 41, ip: 51 }
const SURFACE_UNITS = { si: 120, ip: 143 }
const WEIGHT_UNITS = { si: 139, ip: 167 }
const VOLUME_UNITS = { si: 138, ip: 147 }
const DISTANCE_UNITS = { si: 1, ip: 3 }
const CONNECTION_UNITS = { si: 2, ip: 4 }
const RPM_UNITS = { si: 169, ip: 169 }
const POWER_UNITS = { si: 5, ip: 5 }
const CURRENT_UNITS = { si: 166, ip: 166 }
const VOLTAGE_UNITS = { si: 170, ip: 170 }
const FREQUENCY_UNITS = { si: 171, ip: 171 }
const GEOMETRIC_UNITS = { si: 2, ip: 4 }

const VERTICAL_FIELDS: ReadonlyArray<readonly [string, string]> = [
  ['lv1', 'lvl1'],
  ['lv2', 'lvl2'],
  ['lv3', 'lvl3'],
  ['lv4', 'lvl4'],
  ['lv5', 'lvl5'],
  ['wv1', 'wv1'],
  ['wv2', 'wv2'],
  ['hv1', 'hv1'],
  ['hv2', 'hv2'],
  ['hv3', 'hv3'],
  ['hv4', 'hv4'],
  ['p1', 'p1'],
  ['dv1', 'dv1'],
]

const HORIZONTAL_FIELDS: ReadonlyArray<readonly [string, string]> = [
  ['lh1', 'lh1'],
  ['lh2', 'lh2'],
  ['lh3', 'lh3'],
  ['lh4', 'lh4'],
  ['lh5', 'lh5'],
  ['wh1', 'wh1'],
  ['wh2', 'wh2'],
  ['wh3', 'wh3'],
  ['wh4', 'wh4'],
  ['hh1', 'hh1'],
  ['hh2', 'hh2'],
  ['hh3', 'hh3'],
  ['hh4', 'hh4'],
  ['p2', 'p2'],
  ['dh1', 'dh1'],
]

function DetailPanel({
  panelKey,
  header,
  items,
  loading,
  column,
}: DetailPanelProps) {
  return (
    <StyledCollapse
      defaultActiveKey={[panelKey]}
      style={{ marginBottom: '30px' }}
    >
      <StyledCollapsePanel key={panelKey} header={header}>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
            <StyledSpinner />
          </div>
        ) : (
          <StyledDescriptions column={column} items={items} />
        )}
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

const textItem = (label: string, children: ReactNode) => ({
  label: <SpanIntl value={label} />,
  children,
})

function GroupedDetails({
  data = {},
  model = {},
  loading = false,
  direction,
  unitTypes,
}: GroupedDetailsProps) {
  const showLoading = loading || Object.keys(data).length === 0

  const performanceItems = [
    textItem(
      'data.thermal.details.remoteModel',
      <SpanIntl value={model?.remoteModel} />,
    ),
    unitDetailItem({
      variable: 'real_capacity',
      value: data.capacity,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: CAPACITY_UNITS,
    }),
    unitDetailItem({
      variable: 'req_capacity',
      value: data.thermal_capacity,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: CAPACITY_UNITS,
    }),
    textItem(
      'data.thermal.details.ratio',
      <SpanNumber value={data.ratio} scale={0} />,
    ),
  ]

  const fluidItems = [
    textItem(
      'data.thermal.details.refrigerant',
      <SpanNumber value={data.refrigerantType} scale={0} />,
    ),
    unitDetailItem({
      variable: 'at_requested_condensing_temp',
      value: data.at_Requested_Condensing_Temp,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: TEMP_C_UNITS,
    }),
    unitDetailItem({
      variable: 'at_real_condensing_temp',
      value: data.at_Real_Condensing_Temp,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: TEMP_C_UNITS,
    }),
    unitDetailItem({
      variable: 'desuper_heat_temp',
      value: data.desuperHeatTemp,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: TEMP_K_UNITS,
      asDelta: true,
    }),
    unitDetailItem({
      variable: 'subCooling_temp',
      value: data.subCooling_Temp,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: TEMP_K_UNITS,
      asDelta: true,
    }),
    unitDetailItem({
      variable: 'ref_side_press_drop',
      value: data.refrigerantTSidePressureDrop,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: PRESSURE_KPA_UNITS,
    }),
  ]

  const airItems = [
    unitDetailItem({
      variable: 'inlet_air_temp',
      value: data.interAirTemp,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: TEMP_C_UNITS,
    }),
    unitDetailItem({
      variable: 'outlet_air_temp',
      value: data.outletAir_Temp,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: TEMP_C_UNITS,
    }),
    textItem(
      'data.thermal.details.air_humidity',
      <SpanNumber value={data.airHumidity} scale={0} />,
    ),
    unitDetailItem({
      variable: 'altitude',
      value: data.altitude,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: ALTITUDE_UNITS,
    }),
    unitDetailItem({
      variable: 'air_flow',
      value: data.airFlow,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: FLOW_UNITS,
    }),
    unitDetailItem({
      variable: 'air_side_press_drop',
      value: data.airSidePressureDrop,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: PRESSURE_PA_UNITS,
    }),
  ]

  const fanItems = [
    textItem(
      'data.thermal.details.no_fans',
      <SpanNumber value={data.no_fans} scale={0} />,
    ),
    textItem('data.thermal.details.link', <SpanIntl value={data.link} />),
    unitDetailItem({
      variable: 'rpm',
      value: data.rpm_max,
      unitTypes,
      section: FANS,
      defaultUnitIds: RPM_UNITS,
    }),
    unitDetailItem({
      variable: 'power_wp',
      value: data.power_max,
      unitTypes,
      section: FANS,
      defaultUnitIds: POWER_UNITS,
    }),
    unitDetailItem({
      variable: 'current_max',
      value: data.current_a_max,
      unitTypes,
      section: FANS,
      defaultUnitIds: CURRENT_UNITS,
    }),
    unitDetailItem({
      variable: 'voltage',
      value: data.voltage,
      unitTypes,
      section: FANS,
      defaultUnitIds: VOLTAGE_UNITS,
    }),
    unitDetailItem({
      variable: 'frequency',
      value: data.frequency,
      unitTypes,
      section: FANS,
      defaultUnitIds: FREQUENCY_UNITS,
    }),
  ]

  const geometricFields =
    direction === 'Vertical' ? VERTICAL_FIELDS : HORIZONTAL_FIELDS
  const geometricItems = geometricFields.map(([variable, valueKey]) =>
    unitDetailItem({
      variable,
      value: data[valueKey],
      unitTypes,
      section: GEOMETRIC,
      defaultUnitIds: GEOMETRIC_UNITS,
    }),
  )
  const unitDataItems = [
    textItem(
      'data.thermal.details.fin_material',
      <SpanIntl value={data.fin_Material} />,
    ),
    textItem(
      'data.thermal.details.material_of_casing',
      <SpanIntl value={data.materialCasing} />,
    ),
    unitDetailItem({
      variable: 'surface',
      value: data.surface,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: SURFACE_UNITS,
    }),
    unitDetailItem({
      variable: 'weight',
      value: data.weights,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: WEIGHT_UNITS,
    }),
    unitDetailItem({
      variable: 'internal_vol',
      value: data.internal_vol,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: VOLUME_UNITS,
    }),
    unitDetailItem({
      variable: 'inlet_connection',
      labelId: 'data.thermal.details.inlet_conn',
      value: data.inlet_connection,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: CONNECTION_UNITS,
    }),
    unitDetailItem({
      variable: 'outlet_connection',
      labelId: 'data.thermal.details.outlet_conn',
      value: data.outlet_connection,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: CONNECTION_UNITS,
    }),
    textItem(
      'data.thermal.details.position_of_the_conn',
      <SpanIntl value={data.position_connection} />,
    ),
    ...geometricItems,
  ]

  const noiseItems = [
    unitDetailItem({
      variable: 'spl_in_acc',
      value: data.spLinAccountEN1387,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: SOUND_UNITS,
    }),
    unitDetailItem({
      variable: 'acc_power_level',
      value: data.accousticPowerLevel,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: SOUND_UNITS,
    }),
    unitDetailItem({
      variable: 'spl',
      labelId: 'data.thermal.details.spl_db',
      value: data.spl,
      unitTypes,
      section: FANS,
      defaultUnitIds: SOUND_UNITS,
    }),
    unitDetailItem({
      variable: 'power_level',
      value: data.power_level,
      unitTypes,
      section: FANS,
      defaultUnitIds: SOUND_UNITS,
    }),
    unitDetailItem({
      variable: 'at_distance',
      value: data.atDistance,
      unitTypes,
      section: PERFORMANCE,
      defaultUnitIds: DISTANCE_UNITS,
    }),
  ]

  return (
    <>
      <DetailPanel
        panelKey='performance'
        header='ui.thermal.panelHeader.performance'
        items={performanceItems}
        loading={showLoading}
      />
      <DetailPanel
        panelKey='fluid'
        header='ui.thermal.panelHeader.fluid'
        items={fluidItems}
        loading={showLoading}
      />
      <DetailPanel
        panelKey='air'
        header='ui.thermal.panelHeader.air'
        items={airItems}
        loading={showLoading}
      />
      <DetailPanel
        panelKey='fans'
        header='ui.thermal.panelHeader.fans'
        items={fanItems}
        loading={showLoading}
        column={3}
      />
      <DetailPanel
        panelKey='unit-data'
        header='ui.selections.steps.model_detail.unit_data'
        items={unitDataItems}
        loading={showLoading}
        column={2}
      />
      <DetailPanel
        panelKey='noise'
        header='ui.thermal.panelHeader.noise'
        items={noiseItems}
        loading={showLoading}
      />
    </>
  )
}

export default GroupedDetails
