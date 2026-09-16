import _ from 'lodash'
import { Col } from 'antd'

import { FieldRadio } from 'Components/Field'
import { SpanIntl } from 'Components/Span'

import * as F from 'Modules/Calculations/Manage/steps/InputParameter/OperatingCondition/functions'

import colors from 'styles/colors.module.scss'

const FanModelsColumn = ({
  fan_models,
  setFieldValue,
  setIsLoadingDetail,
}: any) => {
  const handleOnChange = (code: any, setFieldValue: any) => {
    setFieldValue('fan_models_list', code, false)

    F.getDetail(code, setFieldValue, setIsLoadingDetail)
  }

  return (
    <Col span={7} style={{ maxHeight: '600px', overflowY: 'auto' }}>
      {_.isEmpty(fan_models) ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <SpanIntl
            style={{ fontSize: '15px', fontFamily: 'Avenir Medium' }}
            value='data.fan_models.modal.model'
          />
          <SpanIntl
            style={{ color: colors.warning }}
            value='data.fan_models.modal.warning'
          />
        </div>
      ) : (
        <FieldRadio
          name='fan_models_list'
          label='data.fan_models.modal.model'
          vertical
          noIntl
          options={fan_models}
          onChange={(e: any) => {
            handleOnChange(e.target.value, setFieldValue)
          }}
        />
      )}
    </Col>
  )
}

export default FanModelsColumn
