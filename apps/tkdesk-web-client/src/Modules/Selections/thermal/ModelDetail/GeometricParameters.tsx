import { ConsoleLogger } from 'aws-amplify/utils'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledDescriptions,
  StyledSpinner,
} from 'Components/Styled'
import { unitDetailItem } from './DetailUnitValue'

interface GeometricParametersProps {
  data?: any
  loading?: boolean
  direction?: string
  unitTypes: string
}

const GEOMETRIC = 'Geometric Parameters'
const MM_UNITS = { si: 2, ip: 4 }

const VERTICAL_FIELDS = [
  { variable: 'lv1', valueKey: 'lvl1' },
  { variable: 'lv2', valueKey: 'lvl2' },
  { variable: 'lv3', valueKey: 'lvl3' },
  { variable: 'lv4', valueKey: 'lvl4' },
  { variable: 'lv5', valueKey: 'lvl5' },
  { variable: 'wv1', valueKey: 'wv1' },
  { variable: 'wv2', valueKey: 'wv2' },
  { variable: 'hv1', valueKey: 'hv1' },
  { variable: 'hv2', valueKey: 'hv2' },
  { variable: 'hv3', valueKey: 'hv3' },
  { variable: 'hv4', valueKey: 'hv4' },
  { variable: 'p1', valueKey: 'p1' },
  { variable: 'dv1', valueKey: 'dv1' },
]

const HORIZONTAL_FIELDS = [
  { variable: 'lh1', valueKey: 'lh1' },
  { variable: 'lh2', valueKey: 'lh2' },
  { variable: 'lh3', valueKey: 'lh3' },
  { variable: 'lh4', valueKey: 'lh4' },
  { variable: 'lh5', valueKey: 'lh5' },
  { variable: 'wh1', valueKey: 'wh1' },
  { variable: 'wh2', valueKey: 'wh2' },
  { variable: 'wh3', valueKey: 'wh3' },
  { variable: 'wh4', valueKey: 'wh4' },
  { variable: 'hh1', valueKey: 'hh1' },
  { variable: 'hh2', valueKey: 'hh2' },
  { variable: 'hh3', valueKey: 'hh3' },
  { variable: 'hh4', valueKey: 'hh4' },
  { variable: 'p2', valueKey: 'p2' },
  { variable: 'dh1', valueKey: 'dh1' },
]

function GeometricParameters(props: GeometricParametersProps) {
  const { data, loading, direction, unitTypes } = props
  const log = new ConsoleLogger('Modules/Selections/GeometricParameters')
  log.info('GeometricParameters.props', data, direction)

  const toItems = (fields: { variable: string; valueKey: string }[]) =>
    fields.map(({ variable, valueKey }) =>
      unitDetailItem({
        variable,
        value: data?.[valueKey],
        unitTypes,
        section: GEOMETRIC,
        defaultUnitIds: MM_UNITS,
      }),
    )

  const verticalItems = toItems(VERTICAL_FIELDS)
  const horizontalItems = toItems(HORIZONTAL_FIELDS)

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <StyledCollapsePanel
          key='1'
          header='ui.thermal.panelHeader.geometric_params'
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
            <>
              <StyledDescriptions
                column={2}
                items={
                  direction === 'Vertical' ? verticalItems : horizontalItems
                }
              />
            </>
          )}
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
}

export default GeometricParameters
