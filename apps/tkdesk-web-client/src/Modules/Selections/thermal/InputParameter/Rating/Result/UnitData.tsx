import { EditOutlined } from '@ant-design/icons'
import { FieldsetCard } from 'Components/Styled'
import { ResultDataProps } from './types'

function UnitData(props: ResultDataProps) {
  const { selectedMachine } = props

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_unit_data'
      icon={<EditOutlined />}
      items={[
        {
          labelId: 'data.thermal.rating.unit_data.type',
          value: selectedMachine ? 'Modular' : null,
        },
        {
          labelId: 'data.thermal.rating.unit_data.length',
          value: selectedMachine ? 1.412 : null,
          unit: 'm',
          scale: 3,
        },
        {
          labelId: 'data.thermal.rating.unit_data.width',
          value: selectedMachine ? 2.244 : null,
          unit: 'm',
          scale: 3,
        },
        {
          labelId: 'data.thermal.rating.unit_data.height',
          value: selectedMachine ? 2.407 : null,
          unit: 'm',
          scale: 3,
        },
        {
          labelId: 'data.thermal.rating.unit_data.weight',
          value: selectedMachine ? 571 : null,
          unit: 'kg',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.unit_data.inner_volume',
          value: selectedMachine ? 53.4 : null,
          unit: 'dm³',
        },
        {
          labelId: 'data.thermal.rating.unit_data.exchange_area',
          value: selectedMachine ? 339.2 : null,
          unit: 'm²',
        },
        {
          labelId: 'data.thermal.rating.unit_data.inlet_conn',
          value: selectedMachine ? '2 x 2" - 1.34' : null,
          unit: 'm/s',
        },
        {
          labelId: 'data.thermal.rating.unit_data.outlet_conn',
          value: selectedMachine ? '2 x 2" - 1.34' : null,
          unit: 'm/s',
        },
      ]}
    />
  )
}

export default UnitData
