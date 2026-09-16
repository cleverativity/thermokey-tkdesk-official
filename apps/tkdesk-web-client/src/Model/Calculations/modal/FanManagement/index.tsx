import { useEffect, useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'
import { connect } from 'formik'

import { useAirflow } from 'Generic/hooks'

import SubmitModal from 'Components/Modal/SubmitModal'
import { StyledRow } from 'Components/Styled'

import * as F from 'Modules/Calculations/Manage/steps/InputParameter/OperatingCondition/functions'

import FanFiltersColumn from './FanFiltersColumn'
import FanModelsColumn from './FanModelsColumn'
import FanDetailColumn from './FanDetailColumn'
import LineChart from './LineChart'

const log = new ConsoleLogger('Model/InputParameters/modal/FanManagement')

const FanManagement = connect((props: any) => {
  log.info('render.props', props)

  const { onCancel, modal, formik, onUpdateParams } = props
  const { data, params } = modal
  const { input_data = {}, use_case = '', fan_models = [] } = data
  const { setFieldValue, values } = formik

  const {
    fan_model_detail,
    interpolation,
    polynomials,
    n_coils = 2,
    esp = 0,
    n_fans = 1,
    rpm_percentage = 100,
  } = values

  const { battery_active_length, geom_types, n_of_tubes } = useAirflow()
  const [isLoadingDetail, setIsLoadingDetail] = useState(false)
  const [isLoadingInterpolation, setIsLoadingInterpolation] = useState(false)

  const fan_type = _.get(fan_model_detail, 'fan_type', null)
  const fan_diameter = _.get(fan_model_detail, 'fan_diameter', 0)
  const id = _.get(fan_model_detail, 'id', '')

  useEffect(() => {
    setFieldValue('n_coils', 2)
    setFieldValue('esp', 0)
    setFieldValue('rpm_percentage', fan_type === 'ec' ? 100 : null)
  }, [fan_type])

  useEffect(() => {
    let computed_n_fans = Math.ceil(
      battery_active_length / (fan_diameter * 1.2),
    )

    if (!_.isFinite(computed_n_fans) || computed_n_fans <= 1) {
      computed_n_fans = 1
    }

    setFieldValue('n_fans', computed_n_fans, false)
  }, [fan_model_detail])

  useEffect(() => {
    if (!_.isNil(fan_model_detail) && !_.isNil(n_coils) && !_.isNil(esp)) {
      const fan_coil_ratio = Math.floor(n_fans / n_coils)

      if (fan_coil_ratio) {
        const body = F.getDataFirstAvailable(input_data)

        const payload = {
          ...body,
          fan_coil_ratio,
          esp,
          ...(fan_type === 'ec' && rpm_percentage ? { rpm_percentage } : {}),
        }

        F.getInterpolation(
          id,
          payload,
          use_case,
          setFieldValue,
          setIsLoadingInterpolation,
        )
      }
    }
  }, [fan_model_detail, n_fans, n_coils, esp, rpm_percentage])

  const airflow_rate = _.get(interpolation, 'volume', {})
  const pressure_drops = _.get(interpolation, 'pressure_drop', {})
  const rpm = _.get(interpolation, 'rpm', null)
  const pressure_fin = _.get(interpolation, 'pressure_fin.value', [])

  const isFanModelsIncompatibleWithGeometry =
    _.isNil(_.get(airflow_rate, 'value')) ||
    _.isNil(_.get(pressure_drops, 'value'))

  const handleOnCancel = () => {
    const fieldsToReset = [
      'fan_model_detail',
      'interpolation',
      'n_fans',
      'fan_models_list',
    ]

    _.forEach(fieldsToReset, (field) => setFieldValue(field, null))
    onCancel()
  }

  const onSubmit = (values: any) => {
    const volume = _.get(interpolation, 'volume.value')
    const fan_model_code = _.get(values, 'fan_models_list')

    setFieldValue('fan_model_code', fan_model_code)

    if (volume) {
      setFieldValue('input_data.air_mode.value', 'flow')
      setFieldValue('input_data.flow_rate_air.value', volume)

      F.calculateVelocityAir(
        {
          battery_active_length,
          geom_types,
          n_of_tubes,
          flow_rate_air: volume,
        },
        setFieldValue,
      )
    }

    handleOnCancel()
  }

  return (
    <SubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={handleOnCancel}
      title='ui.fan_models.modal.title'
      width={1100}
      bodyStyle={{
        maxHeight: '500px',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
      okButtonDisabled={
        isFanModelsIncompatibleWithGeometry || isLoadingInterpolation
      }
    >
      <StyledRow style={{ width: '100%' }}>
        <FanFiltersColumn
          values={values}
          params={params}
          onUpdateParams={onUpdateParams}
        />

        <FanModelsColumn
          fan_models={fan_models}
          setFieldValue={setFieldValue}
          setIsLoadingDetail={setIsLoadingDetail}
        />

        <FanDetailColumn
          fan_type={fan_type}
          fan_model_detail={fan_model_detail}
          interpolation={interpolation}
          isLoadingDetail={isLoadingDetail}
          isLoadingInterpolation={isLoadingInterpolation}
          isFanModelsIncompatibleWithGeometry={
            isFanModelsIncompatibleWithGeometry
          }
          setFieldValue={setFieldValue}
        />
      </StyledRow>

      {_.isEmpty(pressure_fin) || isFanModelsIncompatibleWithGeometry ? null : (
        <StyledRow style={{ width: '100%' }}>
          <LineChart
            pressure_fin={pressure_fin}
            polynomials={polynomials}
            rpm={_.get(rpm, 'value', undefined)}
          />
        </StyledRow>
      )}
    </SubmitModal>
  )
})

export default FanManagement
