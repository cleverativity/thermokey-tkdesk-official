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

interface FanTechnicalDataProps {
  data?: any
  loading?: boolean
  unitTypes: string
}

const FANS = 'Fans'
const RPM_UNITS = { si: 169, ip: 169 }
const POWER_UNITS = { si: 5, ip: 5 }
const CURRENT_UNITS = { si: 166, ip: 166 }
const SOUND_UNITS = { si: 168, ip: 168 }
const VOLTAGE_UNITS = { si: 170, ip: 170 }
const FREQUENCY_UNITS = { si: 171, ip: 171 }

function FanTechnicalData(props: FanTechnicalDataProps) {
  const { data, loading, unitTypes } = props

  const log = new ConsoleLogger('Modules/Selections/FanTechnicalData')
  log.info('FanTechnicalData.props', data)

  const items = [
    {
      label: <SpanIntl value='data.thermal.details.no_fans' />,
      children: <SpanNumber value={data.no_fans} scale={0} />,
    },
    {
      label: <SpanIntl value='data.thermal.details.link' />,
      children: <SpanIntl value={data.link} />,
    },
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

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <StyledCollapsePanel
          key='1'
          header='ui.thermal.panelHeader.fan_technical_data'
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
            <StyledDescriptions column={3} items={items} />
          )}
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default FanTechnicalData
