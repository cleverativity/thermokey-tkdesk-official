import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useFormikContext } from 'formik'
import { ConsoleLogger } from 'aws-amplify/utils'

import { FormikForm, FormikSubmit } from 'Components/Formik'
import ErrorModal from 'Components/Layout/Error/ErrorModal'
import { StyledButton, StyledRow } from 'Components/Styled'

import UseCase from 'Modules/Calculations/Manage/steps/UseCase'
import InputParameter from 'Modules/Calculations/Manage/steps/InputParameter'
import ModelsList from 'Modules/Calculations/Manage/steps/ModelsList'
import ModelDetail from 'Modules/Calculations/Manage/steps/ModelDetail'

import confirmCleanedRouteIt from 'Model/BackModals/confirmCleanedRouteIt'
import confirmCleanedRouteEn from 'Model/BackModals/confirmCleanedRouteEn'
import { usePrompt } from 'Model/functions'
import { useAuthorization } from 'Modules/App/Authorization'

const log = new ConsoleLogger('Modules/Calculations/Manage')

interface CalculationManageProps {
  data: CalculationData
  params: any
  onSetUseCase: any
  onSolve: any
  onSetDetail: any
  onPrevStep: any
  onComplete: any
  onGoToSecondStep: any
  onUpdateParams: any
  error: any
  update_field: boolean
  user_permissions: {
    microchannel: { [key: string]: any }
  }
  preferences: any
  user_type: any
}
const CheckTouched = ({ isSecondStep }: { isSecondStep: boolean }) => {
  const formik = useFormikContext()

  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }
    if (isSecondStep && !_.isEmpty(formik.touched))
      window.addEventListener('beforeunload', unloadCallback)

    return () => {
      if (isSecondStep && !_.isEmpty(formik.touched))
        window.removeEventListener('beforeunload', unloadCallback)
    }
  }, [formik.touched, isSecondStep])
  return null
}

const CalculationManage = (props: CalculationManageProps) => {
  const {
    data,
    error,
    user_permissions: enabled_corrective_factors,
    preferences,
    user_type,
    params: all_params,
  } = props

  log.info('render.props', props)

  const autho = useAuthorization()

  const {
    onSetUseCase,
    onSolve,
    onSetDetail,
    onPrevStep,
    onComplete,
    onGoToSecondStep,
    onUpdateParams,
  } = props

  const {
    isFirstTimeLanguageRendered,
    isLanguageChanged,
    isRegenerating,
    ...other
  } = all_params

  const params = { ...other }

  const calculation = _.get(data, 'calculation', {})
  const calculated_data = _.get(data, 'calculated_data', {})

  const status = _.get(calculation, 'status', null)
  const use_case = _.get(calculation, 'use_case', 'air_cooled_condenser')
  const output_data = _.get(calculation, 'output_data', [])
  const input_data = _.get(calculation, 'input_data', {})
  const detail_data = _.get(calculation, 'detail_data', {})

  const mode = _.get(input_data, 'mode.value', null)
  const fluid_c1 = _.get(input_data, 'fluid_c1', null)
  const fluid_c2 = _.get(input_data, 'fluid_c2', null)
  const glycol_percentage = _.get(input_data, 'glycol_percentage_c1', null)

  const language: string = _.get(preferences, 'language', 'it')
  const um_system = _.get(preferences, 'um_system', 'si')

  const isFirstStep = status === 'created'
  const isSecondStep = status === 'use_case_selected'
  const isThirdStep = status === 'solved'
  const isFourthStep = status === 'detailed'
  const isConfirmed = status === 'completed'

  const modelGeomType = _.get(
    detail_data,
    'geometric_details.geom_type.value',
    null,
  )
  const step_mode = _.get(
    detail_data,
    'geometric_details.step_mode.value',
    null,
  )

  const n_of_steps_c2 = _.get(input_data, 'n_of_steps_c2.value', null)
  const step_mode_c2 = n_of_steps_c2 === 1 ? 'monostep' : 'multistep'

  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }

    if (isSecondStep) {
      window.addEventListener('beforeunload', unloadCallback)
    }

    return () => {
      if (isSecondStep)
        window.removeEventListener('beforeunload', unloadCallback)
    }
  }, [])

  const [modelCode, setModelCode] = useState(null)
  const [geomSelected, setGeomSelected] = useState(true)

  const handleOnPrevStep = () => {
    const id = _.get(calculation, 'id')
    switch (status as any) {
      case 'use_case_selected':
        if (language === 'it') {
          confirmCleanedRouteIt(() => onPrevStep({ id, status: 'created' }))()
        } else {
          confirmCleanedRouteEn(() => onPrevStep({ id, status: 'created' }))()
        }
        break
      case 'solved':
        onPrevStep({ id, status: 'use_case_selected' })
        break
      case 'detailed':
        onPrevStep({ id, status: 'solved' })
        break
      default:
        break
    }
  }
  const handleSubmit = (values: any, frk: any) => {
    const id = _.get(values, 'id')
    switch (status as any) {
      case 'created':
        const use_case = _.get(values, 'use_case')
        onSetUseCase({ id, use_case })
        break
      case 'use_case_selected':
        onSolve({ id, calculation: values })
        break
      case 'solved':
        onSetDetail({ id, model_code: modelCode })
        break
      case 'detailed':
        onComplete({ id, language })
        break
      default:
        break
    }
    frk.setSubmitting(false)
  }

  const allEnabledFalseDeep = (obj) => {
    if (_.isPlainObject(obj) && _.has(obj, 'enabled')) {
      return obj.enabled === false
    }

    if (_.isPlainObject(obj)) {
      return _.every(_.values(obj), allEnabledFalseDeep)
    }

    return true
  }

  const enabledUseCases = _.chain(enabled_corrective_factors.microchannel)
    .map((use_case, use_case_key) =>
      allEnabledFalseDeep(use_case) ? '' : use_case_key,
    )
    .reject(_.isEmpty)
    .value()

  usePrompt('Leave screen?', isSecondStep)

  if (isConfirmed) {
    return (
      <FormikForm
        initialValues={{ ...calculation, calculated_data }}
        onSubmit={handleSubmit}
      >
        <ModelDetail
          modelGeomType={modelGeomType}
          stepMode={step_mode}
          useCase={use_case}
          detailData={detail_data}
          onGoToSecondStep={onGoToSecondStep}
          status={status}
          stepModeC2={step_mode_c2}
        />
      </FormikForm>
    )
  }

  return (
    <>
      <FormikForm
        initialValues={{ ...calculation, calculated_data }}
        onSubmit={handleSubmit}
      >
        {isFirstStep ? <UseCase enabledUseCases={enabledUseCases} /> : null}
        {isSecondStep ? (
          <InputParameter
            params={params}
            onUpdateParams={onUpdateParams}
            data={data}
            enabledCorrectiveFactors={enabled_corrective_factors}
            user_type={user_type}
            um_system={um_system}
            selectGeomTypes={{
              geomSelected,
              setGeomSelected,
            }}
          />
        ) : null}
        {isThirdStep ? (
          <ModelsList
            mode={mode}
            saveModelCode={setModelCode}
            output_data={output_data}
            useCase={use_case}
            fluid_c1={fluid_c1}
            fluid_c2={fluid_c2}
            glycol_percentage={glycol_percentage}
          />
        ) : null}
        {isFourthStep ? (
          <ModelDetail
            modelGeomType={modelGeomType}
            stepMode={step_mode}
            useCase={use_case}
            detailData={detail_data}
            onGoToSecondStep={onGoToSecondStep}
            status={status}
            stepModeC2={step_mode_c2}
          />
        ) : null}

        <StyledRow
          justify='end'
          align='middle'
          style={{ margin: '16px 0 0 0' }}
        >
          {!isFirstStep ? (
            <StyledButton
              label='ui.generic.back'
              id='button.calculation.creation.prev'
              onClick={handleOnPrevStep}
              style={{ marginRight: '20px', marginBottom: 0 }}
            />
          ) : null}

          {(isSecondStep && !geomSelected) ||
          (isThirdStep &&
            _.isNil(modelCode) &&
            use_case !== 'free_cooling_condenser') ? (
            <StyledButton
              type='primary'
              disabled
              disabledPopover={
                isSecondStep
                  ? 'data.calculations.input_parameters.mandatory_select'
                  : 'data.calculations.model_detail.mandatory_select'
              }
              onClick={() => {}}
              id='fake_button'
              label='ui.generic.next'
            />
          ) : (
            <FormikSubmit
              type='primary'
              label={isFourthStep ? 'ui.generic.complete' : 'ui.generic.next'}
            />
          )}
        </StyledRow>
        <CheckTouched isSecondStep={isSecondStep} />
      </FormikForm>

      <ErrorModal autho={autho} error={error} />
    </>
  )
}

export default CalculationManage
