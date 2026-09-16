import { Fan } from 'Components/Icons'
import { FieldsetCard } from 'Components/Styled'
import { ResultDataProps } from './types'

function VentilationData(props: ResultDataProps) {
  const { selectedMachine } = props

  return (
    <FieldsetCard
      title='ui.thermal.panelHeader.rating_ventilation_data'
      icon={<Fan width='14px' height='14px' />}
      warningId={
        selectedMachine
          ? 'data.thermal.rating.ventilation_data.long_delivery_warning'
          : undefined
      }
      items={[
        {
          labelId: 'data.thermal.rating.ventilation_data.fan_name',
          value: selectedMachine ? 'FN080-SDS.6N,V7 ART 138756' : null,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.fan_type',
          value: selectedMachine ? 'AC' : null,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.speed_wp_max',
          value: selectedMachine ? '900 / 900' : null,
          unit: 'rpm',
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.esp',
          value: selectedMachine ? 0 : null,
          unit: 'Pa',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.diameter',
          value: selectedMachine ? 800 : null,
          unit: 'mm',
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.fan_rows',
          value: selectedMachine ? 2 : null,
          scale: 0,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.fan_per_row',
          value: selectedMachine ? 1 : null,
          scale: 0,
        },
      ]}
      rightItems={[
        {
          labelId: 'data.thermal.rating.ventilation_data.link',
          value: selectedMachine ? 'AC' : null,
        },
        {
          labelId:
            'data.thermal.rating.ventilation_data.phases_voltage_frequency',
          value: selectedMachine ? '3ph / 400V / 50Hz' : null,
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.single_power',
          value: selectedMachine ? '1,800 / 1,800' : null,
          unit: 'W',
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.total_power',
          value: selectedMachine ? '3,600 / 3,600' : null,
          unit: 'W',
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.single_current',
          value: selectedMachine ? '3.90 / 3.90' : null,
          unit: 'A',
        },
        {
          labelId: 'data.thermal.rating.ventilation_data.total_current',
          value: selectedMachine ? '7.80 / 7.80' : null,
          unit: 'A',
        },
      ]}
    />
  )
}

export default VentilationData
