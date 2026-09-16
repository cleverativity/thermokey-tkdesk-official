import { Col, Row } from 'antd'
import _ from 'lodash'
import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { useFormikContext } from 'formik'

import { DetailText, DetailNumber } from 'Components/Detail'
import { FieldDecimalNumber, FieldRangeSelect } from 'Components/Field'
import { SpanIntl } from 'Components/Span'
import {
  StyledCollapse,
  StyledCollapsePanel,
  StyledRow,
} from 'Components/Styled'

import * as F from '../functions'

const UnitData = ({ fields = {} }: any) => {
  const { diameters = [] } = fields

  const intl = useIntl()
  const { values, setFieldValue }: any = useFormikContext()

  const id = _.get(values, 'id')
  const general_info = _.get(values, 'detail_data.general_info', {})
  const accessories = _.get(values, 'detail_data.accessories', [])
  const {
    inlet_connection_number,
    inlet_connection_diameter,
    outlet_connection_number,
    outlet_connection_diameter,
  } = general_info

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    F.calculateConnectionSpeed({ id, general_info, accessories }, setFieldValue)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inlet_connection_number,
    inlet_connection_diameter,
    outlet_connection_number,
    outlet_connection_diameter,
  ])

  return (
    <StyledCollapse defaultActiveKey={['4']} style={{ marginBottom: '30px' }}>
      <StyledCollapsePanel
        key='4'
        header='ui.selections.steps.model_detail.unit_data'
      >
        <StyledRow>
          <DetailText
            span={{ sm: 24, lg: 12, xl: 4 }}
            hideLabel={false}
            name='detail_data.general_info.type'
            label='data.selections.model_detail.type'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='detail_data.general_info.length'
            label='data.selections.model_detail.length'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='detail_data.general_info.width'
            label='data.selections.model_detail.width'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            name='detail_data.general_info.height'
            label='data.selections.model_detail.height'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={0}
            name='detail_data.general_info.weight'
            label='data.selections.model_detail.weight'
          />
        </StyledRow>

        <StyledRow>
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 4 }}
            scale={1}
            name='detail_data.general_info.inner_volume'
            label='data.selections.model_detail.inner_volume'
          />
          <FieldDecimalNumber
            span={{ sm: 24, lg: 12, xl: 5 }}
            scale={1}
            name='detail_data.general_info.exchange_area'
            label='data.selections.model_detail.exchange_area'
          />
          <Col sm={24} lg={12} xl={5}>
            <SpanIntl
              style={{ fontFamily: 'Avenir Medium, sans serif' }}
              value='data.selections.model_detail.inlet_connection'
              tooltip={intl.formatMessage({
                id: 'data.selections.model_detail.tooltip',
              })}
            />
            <Row style={{ marginTop: 8, gap: '8px' }}>
              <FieldDecimalNumber
                span={{ flex: '1 1 0', minWidth: 0 }}
                hideLabel
                scale={0}
                name='detail_data.general_info.inlet_connection_number'
              />
              {'x'}
              <FieldRangeSelect
                span={{ flex: '1 1 0', minWidth: 0 }}
                hideLabel
                name='detail_data.general_info.inlet_connection_diameter'
                options={diameters}
              />
              {'-'}
              <DetailNumber
                span={{ flex: '1 1 0', minWidth: 0 }}
                name='detail_data.general_info.inlet_connection_velocity'
              />
            </Row>
          </Col>

          <Col sm={24} lg={12} xl={5}>
            <SpanIntl
              style={{ fontFamily: 'Avenir Medium, sans serif' }}
              value='data.selections.model_detail.outlet_connection'
              tooltip={intl.formatMessage({
                id: 'data.selections.model_detail.tooltip',
              })}
            />
            <Row style={{ marginTop: 8, gap: '8px' }}>
              <FieldDecimalNumber
                span={{ flex: '1 1 0', minWidth: 0 }}
                hideLabel
                scale={0}
                name='detail_data.general_info.outlet_connection_number'
              />
              {'x'}
              <FieldRangeSelect
                span={{ flex: '1 1 0', minWidth: 0 }}
                hideLabel
                name='detail_data.general_info.outlet_connection_diameter'
                options={diameters}
              />
              {'-'}
              <DetailNumber
                span={{ flex: '1 1 0', minWidth: 0 }}
                name='detail_data.general_info.outlet_connection_velocity'
              />
            </Row>
          </Col>
        </StyledRow>
      </StyledCollapsePanel>
    </StyledCollapse>
  )
}

export default UnitData
