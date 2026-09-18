import { ConsoleLogger } from 'aws-amplify/utils'
import { SpanIntl, SpanNumber } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledSpinner,
} from 'Components/Styled'
import React from 'react'
import { unitDetailItem } from './DetailUnitValue'

interface RemoteCondensersProps {
  data?: any
  loading?: boolean
  model?: any
  unitTypes: string
}

const PERFORMANCE = 'Performance'
const CAPACITY_UNITS = { si: 6, ip: 8 }
const REQ_CAPACITY_UNITS = { si: 6, ip: 8 }
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
const AT_DISTANCE_UNITS = { si: 1, ip: 3 }

function RemoteCondensers(props: RemoteCondensersProps) {
  const log = new ConsoleLogger('Modules/Selections/RemoteCondensers')
  const { data, loading, model, unitTypes } = props

  const items = data
    ? [
        {
          label: <SpanIntl value='data.thermal.details.remoteModel' />,
          children: <SpanIntl value={model.remoteModel} />,
        },
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
          defaultUnitIds: REQ_CAPACITY_UNITS,
        }),
        {
          label: <SpanIntl value='data.thermal.details.ratio' />,
          children: <SpanNumber value={data.ratio} scale={0} />,
        },
        {
          label: <SpanIntl value='data.thermal.details.refrigerant' />,
          children: <SpanNumber value={data.refrigerantType} scale={0} />,
        },
        unitDetailItem({
          variable: 'inlet_air_temp',
          value: data.interAirTemp,
          unitTypes,
          section: PERFORMANCE,
          defaultUnitIds: TEMP_C_UNITS,
        }),
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
        {
          label: <SpanIntl value='data.thermal.details.air_humidity' />,
          children: <SpanNumber value={data.airHumidity} scale={0} />,
        },
        {
          label: <SpanIntl value='data.thermal.details.fin_material' />,
          children: <SpanIntl value={data.fin_Material} />,
        },
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
          variable: 'outlet_air_temp',
          value: data.outletAir_Temp,
          unitTypes,
          section: PERFORMANCE,
          defaultUnitIds: TEMP_C_UNITS,
        }),
        unitDetailItem({
          variable: 'ref_side_press_drop',
          value: data.refrigerantTSidePressureDrop,
          unitTypes,
          section: PERFORMANCE,
          defaultUnitIds: PRESSURE_KPA_UNITS,
        }),
        unitDetailItem({
          variable: 'air_side_press_drop',
          value: data.airSidePressureDrop,
          unitTypes,
          section: PERFORMANCE,
          defaultUnitIds: PRESSURE_PA_UNITS,
        }),
        unitDetailItem({
          variable: 'at_distance',
          value: data.atDistance,
          unitTypes,
          section: PERFORMANCE,
          defaultUnitIds: AT_DISTANCE_UNITS,
        }),
        {
          label: <SpanIntl value='data.thermal.details.material_of_casing' />,
          children: <SpanIntl value={data.materialCasing} />,
        },
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
      ]
    : {}
  log.info('RemoteCondensers.props', { data, items, model })
  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <StyledCollapsePanel
          key='1'
          header='ui.thermal.panelHeader.performance'
        >
          {Object.keys(data).length === 0 || loading ? (
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
            <StyledDescriptions items={items} />
          )}
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default RemoteCondensers
