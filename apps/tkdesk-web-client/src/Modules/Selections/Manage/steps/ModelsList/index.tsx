import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useFormikContext } from 'formik'

import { StyledCard, StyledRow, StyledTable } from 'Components/Styled'
import { SpanIntl } from 'Components/Span'
import { FieldRadio } from 'Components/Field'

import { removeColumns } from 'Model/table'
import {
  DetailDataTable,
  staticColumns,
} from 'Model/Selections/steps/ModelList/table'

import EntryConditions from './EntryConditions'

import { styled } from 'styled-components'

const log = new ConsoleLogger('Modules/Selections/ModelsList')

const ModelsList = (props: any) => {
  log.info('render.props', props)
  const {
    output_data,
    saveMachineId,
    hasSoundPower,
    hasOutletTemp,
    hasHumidity,
  } = props

  const formikContext = useFormikContext()
  const [selectedModel, setSelectedModel] = useState([])
  const [selectedModelDetail, setSelectedModelDetail] = useState([])
  const tablesContainerRef = useRef(null)
  const isSyncingScrollRef = useRef(false)

  useEffect(() => {
    const tableBodies = _.map(
      tablesContainerRef.current?.querySelectorAll(
        '.synced-detail-table .ant-table-body',
      ) ?? [],
      (tableBody) => tableBody,
    )

    if (_.size(tableBodies) < 2) {
      return
    }

    const syncScroll = (event) => {
      if (isSyncingScrollRef.current) {
        return
      }

      const source = event.currentTarget

      isSyncingScrollRef.current = true

      _.forEach(tableBodies, (tableBody) => {
        if (tableBody !== source) {
          tableBody.scrollTop = source.scrollTop
        }
      })

      isSyncingScrollRef.current = false
    }

    _.forEach(tableBodies, (tableBody) => {
      tableBody.addEventListener('scroll', syncScroll)
    })

    return () => {
      _.forEach(tableBodies, (tableBody) => {
        tableBody.removeEventListener('scroll', syncScroll)
      })
    }
  }, [selectedModelDetail])

  const tableColumns = hasSoundPower
    ? removeColumns(['sound_pressure'], staticColumns)
    : removeColumns(['sound_power'], staticColumns)

  return (
    <>
      <EntryConditions
        hasOutletTemp={hasOutletTemp}
        hasHumidity={hasHumidity}
      />

      <StyledCard>
        <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
          <SpanIntl
            style={{ fontWeight: 'bold', margin: '10px 0 34px' }}
            value='ui.selections.steps.model_list'
          />
        </StyledRow>

        <StyledTable
          rowKey={(record: any) => _.get(record, 'id.value', '')}
          dataSource={output_data}
          pagination={false}
          loading={false}
          bordered
          columns={tableColumns}
          scroll={{ y: 55 * 5 }}
          tableLayout='auto'
          rowSelection={{
            hideSelectAll: true,
            selectedRowKeys: selectedModel,
            onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
              if (selectedRowKeys.length > 3) {
                return
              } else {
                setSelectedModel(selectedRowKeys)
                setSelectedModelDetail(selectedRows)
                formikContext.setFieldValue('selected_model', selectedRowKeys)
              }
            },
          }}
        />
      </StyledCard>

      {_.isEmpty(selectedModelDetail) ? null : (
        <div ref={tablesContainerRef}>
          <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
            <SpanIntl
              style={{ fontWeight: 'bold', margin: '24px 0' }}
              value='ui.coils.microchannel.model_list'
            />
          </StyledRow>
          <StyledFieldRadio
            name='machineId'
            optionType='button'
            noIntl
            hideLabel
            options={_.map(selectedModelDetail, (model: any, idx: number) => ({
              label: (
                <div style={{ width: '100%' }}>
                  <StyledRow
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <SpanIntl
                      style={{ fontWeight: 'bold', marginBottom: '20px' }}
                      value={_.get(model, 'model_code', '')}
                    />
                  </StyledRow>

                  <DetailDataTable
                    className='synced-detail-table'
                    data={model}
                    scroll={{ y: 320 }}
                    hasOutletTemp={hasOutletTemp}
                  />
                </div>
              ),
              value: _.get(model, 'id.value', ''),
            }))}
            onChange={(e: any) => {
              const value = e.target.value
              saveMachineId(value)
            }}
          />
        </div>
      )}
    </>
  )
}

const StyledFieldRadio = styled(FieldRadio)`
  .ant-radio-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .ant-radio-button-wrapper {
    padding: 24px;

    .ant-radio-button-label {
      width: 100%;
    }
  }
`

export default ModelsList
