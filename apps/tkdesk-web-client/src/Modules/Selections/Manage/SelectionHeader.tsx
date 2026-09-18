import _ from 'lodash'
import { Row } from 'antd'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'
import { ConsoleLogger } from 'aws-amplify/utils'

import { StyledButton, StyledPageHeader, StyledSteps } from 'Components/Styled'
import { FormikForm, FormikSubmit } from 'Components/Formik'

import MacroSeries from './steps/MacroSeries'
import InputParameter from './steps/InputParameter'
import ModelsList from './steps/ModelsList'
import ModelDetail from './steps/ModelDetail'

import DetailedButtons from './DetailButtons'
import useCondenserPayload from '../units/shared/condenserPayload'

import confirmCleanedRouteIt from 'Model/BackModals/confirmCleanedRouteIt'
import confirmCleanedRouteEn from 'Model/BackModals/confirmCleanedRouteEn'
import { usePrompt } from 'Model/functions'

//Remote condenserss
import ThermalInputParameter from '../thermal/InputParameter'
import ThermalModelDetailList from '../thermal/ModelList'
import ThermalModelDetail, {
  type ThermalModelDetailHandle,
} from '../thermal/ModelDetail'
import EnergyAnalysisButtons from './EnergyAnalysisButtons'

const log = new ConsoleLogger('Modules/Selections/SelectionHeader')

const SelectionHeader = (props: any) => {
  log.info('render.props', props)
  const {
    data: selection,
    preferences,
    onPrevStep,
    onStep,
    onSetUseCase,
    onSolve,
    onSetDetail,
    onGeneratePdf,
    onEditCustomData,
    onLoadAccessories,
    onLoadAccessoriesPrice,
    onPDFDownload,
    user_id,
  } = props
  const {
    id,
    status = null,
    input_data = {},
    output_data = [],
    detail_data = {},
    fields = {},
    thermal_id,
    seriesCompatibility = [],
  } = selection

  const intl = useIntl()
  const [machineId, setMachineId] = useState(null)
  const thermalModelDetailRef = useRef<ThermalModelDetailHandle>(null)
  const buildCondenserPayload = useCondenserPayload()

  const language: string = _.get(preferences, 'language', 'it')
  const um_system = _.get(preferences, 'um_system', 'si')

  const max_sound_power = _.get(input_data, 'noise.max_sound_power', null)
  const liquid_mode = _.get(input_data, 'liquid.liquid_mode.value', null)
  const air_mode = _.get(input_data, 'air.air_mode.value', null)

  const isFirstStep = status === 'created'
  const isSecondStep = status === 'use_case_selected'
  const isThirdStep = status === 'solved'
  const isFourthStep = status === 'detailed'

  const currentStep = (() => {
    switch (status) {
      case 'created':
        return 0
      case 'use_case_selected':
        return 1
      case 'solved':
        return 2
      case 'detailed':
        return 3
      default:
        return 0
    }
  })()
  log.info('SelectionHeader.steps', {
    currentStep,
    status,
    selection,
    props,
    um_system,
  })

  const steps = [
    {
      title: intl.formatMessage({ id: 'ui.selections.steps.macro_series' }),
      description:
        currentStep === 0 ? null : _.get(selection, 'macro_serie', null),
      status: 'created',
      disabled: currentStep <= 0,
      content: <MacroSeries />,
    },
    {
      title: intl.formatMessage({ id: 'ui.selections.steps.input_parameters' }),
      status: 'use_case_selected',
      disabled: currentStep <= 1,
      content:
        props.data.macro_serie === 'Remote condensers' ? (
          <ThermalInputParameter data={selection} preferences={preferences} />
        ) : (
          <InputParameter seriesCompatibility={seriesCompatibility} />
        ),
    },
    {
      title: intl.formatMessage({ id: 'ui.selections.steps.model_choice' }),
      status: 'solved',
      disabled: currentStep <= 2,
      content:
        props.data.macro_serie === 'Remote condensers' ? (
          <ThermalModelDetailList
            saveMachineId={setMachineId}
            data={selection}
            loadAccessories={onLoadAccessories}
            loadAccessoriesPrice={onLoadAccessoriesPrice}
            preferences={preferences}
          />
        ) : (
          <ModelsList
            output_data={output_data}
            saveMachineId={setMachineId}
            hasSoundPower={_.get(max_sound_power, 'value', null) !== null}
            hasOutletTemp={liquid_mode === 'outlet_temperature'}
            hasHumidity={air_mode === 'humidity'}
          />
        ),
    },
    {
      title: intl.formatMessage({ id: 'ui.selections.steps.model_detail' }),
      status: 'detailed',
      disabled: currentStep <= 3,
      content:
        props.data.macro_serie === 'Remote condensers' ? (
          <ThermalModelDetail
            ref={thermalModelDetailRef}
            data={selection}
            download={onPDFDownload}
            isRegenerating={_.get(props.params, 'isRegenerating', false)}
            preferences={preferences}
          />
        ) : (
          <ModelDetail
            fields={fields}
            detail_data={detail_data}
            onEditCustomData={onEditCustomData}
          />
        ),
    },
  ]

  const items = _.map(steps, (step: any) => ({
    key: step.title,
    title: intl.formatMessage({ id: step.title }),
    description: step.description,
    disabled: step.disabled,
  }))

  const handleBackToStep = (step: number) => {
    if (onStep) onStep(id, step, language, selection)
  }

  const handleOnPrevStep = () => {
    switch (status as any) {
      case 'use_case_selected':
        if (language === 'it') {
          confirmCleanedRouteIt(() =>
            onPrevStep({ id, status: 'created', selection }),
          )()
        } else {
          confirmCleanedRouteEn(() =>
            onPrevStep({ id, status: 'created', selection }),
          )()
        }
        break
      case 'solved':
        onPrevStep({ id, status: 'use_case_selected', selection })
        break
      case 'detailed':
        onPrevStep({ id, status: 'solved', selection })
        break
      default:
        break
    }

    log.info('SelectionHeader.handleOnPrevStep', { thermal_id, props })
  }

  const handleSubmit = (values: any, frk: any) => {
    const { id } = values

    const macro_serie = _.get(values, 'macro_serie')

    switch (status as any) {
      case 'created':
        // onSetUseCase({
        //   id,
        //   macro_serie,
        //   selection: values,
        //   user_id,
        // })
        onSetUseCase({ id, macro_serie, selection: values, user_id: user_id })
        break
      case 'use_case_selected':
        onSolve({
          id,
          selection:
            macro_serie === 'Remote condensers'
              ? {
                  ...buildCondenserPayload(values),
                  thermal_id: values.thermal_id,
                }
              : values,
          macro_serie,
          user_id,
        })
        break
      case 'solved':
        const detail = {
          id,
          machine_id: machineId,
          macro_serie: macro_serie,
          ...(macro_serie === 'Remote condensers' && {
            thermal: {
              // selectedCondenser: {
              //   model: values.selectedCondenser,
              //   // ...values.selectedCondenser,
              //   //unitsType: condenser.unitsType,
              // },
              condenser: values.condenser,
              modelId: values.condenser?.modelId,
              id: values.condenser?.id,
              user_id: user_id,
              macro_serie: macro_serie,
            },
          }),
        }
        onSetDetail(detail)
        break
      case 'detailed':
        break
      default:
        break
    }
    log.info('handleSubmit', macro_serie)
    frk.setSubmitting(false)
  }

  usePrompt('Leave screen?', currentStep === 1)

  return (
    <FormikForm initialValues={{ ...selection }} onSubmit={handleSubmit}>
      <StyledPageHeader title='data.selections.header' />

      <StyledSteps
        labelPlacement='vertical'
        items={items}
        current={currentStep}
        onChange={(current: any) => handleBackToStep(current)}
      />

      <div>
        {_.isEqual(currentStep, -1) ? null : steps[currentStep].content}
      </div>

      <Row justify='end' align='middle' style={{ marginTop: '16px' }}>
        {!isFirstStep ? (
          <StyledButton
            label='ui.generic.back'
            id='button.selection.creation.prev'
            onClick={handleOnPrevStep}
            style={{ marginRight: '20px', marginBottom: 0 }}
          />
        ) : null}

        {isThirdStep && _.isNil(machineId) ? (
          <StyledButton
            type='primary'
            disabled
            disabledPopover={'data.calculations.model_detail.mandatory_select'}
            onClick={() => {}}
            id='fake_button'
            label='ui.generic.next'
          />
        ) : isFourthStep ? (
          props.data.macro_serie !== 'Remote condensers' && (
            <DetailedButtons onGeneratePdf={onGeneratePdf} />
          )
        ) : (
          <FormikSubmit type='primary' label='ui.generic.next' />
        )}
        <EnergyAnalysisButtons
          visible={
            props.data.macro_serie === 'Remote condensers' && isFourthStep
          }
          onCalculateEnergy={(payload) =>
            thermalModelDetailRef.current?.calculateEnergyAnalysis(payload)
          }
          onCalculateWorkingPoint={() =>
            thermalModelDetailRef.current?.calculateWorkingPoint()
          }
          onDownload={onPDFDownload}
          onDownloadCondenserPdf={() =>
            thermalModelDetailRef.current?.downloadCondenserPdf()
          }
          condenserPdfLoading={_.get(props.params, 'isRegenerating', false)}
          energyAnalysisPdfLoading={_.get(
            props.params,
            'isEnergyAnalysisPdfLoading',
            false,
          )}
        />
      </Row>
    </FormikForm>
  )
}

export default SelectionHeader
