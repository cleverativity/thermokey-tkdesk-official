import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledSpinner,
} from 'Components/Styled'
import React from 'react'
import { unitDetailItem } from './DetailUnitValue'

interface InletsAndOutletsProps {
  data?: any
  loading?: boolean
  unitTypes: string
}

const PERFORMANCE = 'Performance'
const CONNECTION_UNITS = { si: 2, ip: 4 }

function InletsAndOutlets(props: InletsAndOutletsProps) {
  const { data, loading, unitTypes } = props

  const items = [
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
    {
      label: <SpanIntl value='data.thermal.details.position_of_the_conn' />,
      children: <SpanIntl value={data.position_connection} />,
    },
  ]
  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <StyledCollapsePanel
          key='1'
          header='ui.thermal.panelHeader.inlet_outlet'
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

export default InletsAndOutlets
