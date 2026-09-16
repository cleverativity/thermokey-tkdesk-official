import { FieldCheckBoxGroup } from 'Components/Field'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
  StyledTable,
} from 'Components/Styled'

import { connect, useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import CalculateAirFlow from './CalculateAirFlow'
import CapacityCalculation from './CapacityCalculation'
import SingleCalculation from './SingleCalculation'
import { useColumnUM } from './ColumnUM'
import { ConsoleLogger } from 'aws-amplify/utils'

interface EnergyAnalysisProps {
  language?: string
  unitsType?: string

  table?: {
    tableResults?: any[]
    tableLoading?: boolean
    tablePagination?: any
    columns?: any[]
    handleTableChange?: (pagination: any, filters: any, sorter: any) => void
  }
  data?: {
    condenser: any
    performance?: any
  }
  calculate?: (values: any, frk: any) => void
  isRegenerating?: boolean
}

const EnergyAnalysis = connect((props: EnergyAnalysisProps) => {
  const { table, data } = props
  const [selectedItem, setSelectedItem] = React.useState<string>('chooseA')
  const log = new ConsoleLogger('Modules/Selections/Modal/EnergyAnalysis')
  log.info('EnergyAnalysis', data)

  const {
    tableResults,
    tableLoading,
    tablePagination,
    handleTableChange,
    columns,
  } = table || {}

  const { values, setFieldValue } = useFormikContext<any>()
  const intl = useIntl()
  const { columns: tableColumns } = useColumnUM({
    columns: columns || [],
    values,
    setFieldValue,
    unitTypes: props.unitsType,
  })

  const handleOnChange = (target: any) => {
    const val = target[0]
    log.info('handleOnChange.EAModal:', { val, data })
    setSelectedItem(val)
    setFieldValue('ea.choicesEnergyAnalysis', val)
  }

  const energyAnalysis = [
    {
      value: 'chooseA',
      label: intl.formatMessage({
        id: 'data.thermal.performance.energy_analysis_field.capacity_calculation_diff_air_temp',
      }),
    },
    {
      value: 'chooseB',
      label: intl.formatMessage({
        id: 'data.thermal.performance.energy_analysis_field.calculate_air_flow_w_fixed_capacity',
      }),
    },
    {
      value: 'chooseC',
      label: intl.formatMessage({
        id: 'data.thermal.performance.energy_analysis_field.single_calculation',
      }),
    },
  ]

  useEffect(() => {
    setFieldValue('ea.choicesEnergyAnalysis', selectedItem)
  }, [selectedItem])

  return (
    <>
      <StyledCollapse defaultActiveKey={['1']} style={{ marginBottom: '30px' }}>
        <StyledCollapsePanel
          key='1'
          header='ui.thermal.panelHeader.energy_analysis'
        >
          <StyledRow
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              paddingLeft: '40px',
            }}
          >
            <StyledRow
              gutter={[16, 16]}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FieldCheckBoxGroup
                span={{ sm: 24, lg: 24, xl: 24 }}
                name='ea.choicesEnergyAnalysis'
                // label='data.thermal.field.electrical_accessories'
                options={energyAnalysis || []}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingTop: '10px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
                className='red-label'
                onChange={handleOnChange}
                requiredSingle={true}
                defaultValue={selectedItem}
              />
            </StyledRow>
            <div
              style={{
                width: '100%',
                borderBottom: '1px solid #d9d9d9',
              }}
            />
            {/* Input Field */}
            {selectedItem == 'chooseA' && (
              <CapacityCalculation
                data={data}
                selectedItem={selectedItem}
                unitTypes={props.unitsType}
              />
            )}
            {selectedItem == 'chooseB' && (
              <CalculateAirFlow
                data={data}
                selectedItem={selectedItem}
                unitTypes={props.unitsType}
              />
            )}
            {selectedItem == 'chooseC' && (
              <SingleCalculation
                data={data}
                selectedItem={selectedItem}
                unitTypes={props.unitsType}
              />
            )}
          </StyledRow>

          {/* Table */}
          <ColumnUMTable>
            <StyledTable
              rowKey='id'
              dataSource={tableResults || []}
              loading={tableLoading}
              pagination={tablePagination}
              onChange={handleTableChange}
              columns={tableColumns}
              scroll={{ x: 'max-content' }}
            />
          </ColumnUMTable>
          {/* </CalculateThermalModal> */}
        </StyledCollapsePanel>
      </StyledCollapse>
    </>
  )
})

const ColumnUMTable = styled.div`
  .ant-table-thead > tr > th {
    vertical-align: top;
  }

  .ant-table-thead .ant-table-column-title {
    width: 100%;
    display: block;
  }
`

export default EnergyAnalysis
