import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import Accessories from './Accessories'
import GroupedDetails from './GroupedDetails'
import ModelImage from './ModelImage'
import { ConsoleLogger } from 'aws-amplify/utils'
import _ from 'lodash'

import { useIntl } from 'react-intl'
import { StyledSpinner } from 'Components/Styled'
import Tabs from 'Components/Styled/Tabs'
import { useDetail } from '../hooks/useDetail'

import AdjustModule from './AdjustModule'
import * as APISettings from 'Api/Thermal/api/endpoints'
import { useCompute } from '../hooks/useCompute'
import { useFormikContext } from 'formik'
import useTable from '../hooks/useTable'
import { staticColumn as staticColumnEnergyAnalysisResults } from 'Model/Selections/thermal/ModelDetail/energyAnalysisTable'
import { useAccessories } from '../hooks/useAccessories'

import EnergyAnalysis from './EnergyAnalysis'
import WorkingPoint from './WorkingPoint'
import { useWorkingPoint } from '../hooks/useWorkingPoint'
import { useAuthorization } from 'Modules/App/Authorization'

interface ThermalModelDetailProps {
  data?: any
  download?: any
  isRegenerating?: boolean
  language?: string
  params?: SearchParameters
  onUpdateParams?: any
  preferences: any
}

export type ThermalModelDetailHandle = {
  downloadCondenserPdf: () => void
  calculateEnergyAnalysis: (payload: Record<string, unknown>) => void
  calculateWorkingPoint: () => void
}

const ThermalModelDetail = forwardRef<
  ThermalModelDetailHandle,
  ThermalModelDetailProps
>(function ThermalModelDetail(props, ref) {
  const {
    data,
    download,
    isRegenerating,
    language,
    onUpdateParams,
    preferences,
  } = props
  const log = new ConsoleLogger('Modules/Selections/Thermal/ModelDetail')
  log.info('ThermalModelDetail.render', {
    data,
    isRegenerating,
    language,
    preferences,
  })
  const condenser: any = _.get(data, 'condenser', null)
  const unitsType = _.get(preferences, 'um_system', 'si')

  //const unitsType = um_system == 'imp' ? 'I-P (English)' : 'SI (Metric)'
  const [computeValue, setComputeValue] = React.useState<any>(null)
  const [hideEnergyAnalysisButton, setHideEnergyAnalysisButton] =
    React.useState(false)

  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<number[]>([])

  const intl = useIntl()
  const autho = useAuthorization()

  const formik = useFormikContext()
  const { values, setFieldValue } = formik
  const valuesRef = useRef(values)
  valuesRef.current = values

  useEffect(() => {
    if (!condenser) {
      setHideEnergyAnalysisButton(false)
      return
    }

    const newCompute = {
      ...condenser,
      percentAdjustment: 0,
    }
    setComputeValue(newCompute)
    log.info('ThermalModelDetail.initComputeValue', {})

    const remoteModel = String(_.get(condenser, 'remoteModel', '') || '')
    const suffix = remoteModel.slice(-2)
    if (suffix === 'B1' || suffix === 'B2') {
      setHideEnergyAnalysisButton(true)
      log.info('ThermalModelDetail.remoteModel', remoteModel)
    } else {
      setHideEnergyAnalysisButton(false)
      log.info('ThermalModelDetail.remoteModel not B1 or B2', remoteModel)
    }
  }, [JSON.stringify(condenser)])

  const adjustmentType: string = _.get(
    values,
    'condenser.adjustmentModuleType',
    'ac',
  )

  const { adjustResult: adjustCapacityResult, calculate: computeCapacity } =
    useCompute({
      compute: computeValue,
      unitsType,
      apiFn: APISettings.getAdjustCapacity,
      enabled: adjustmentType === 'ac',
    })
  const { adjustResult: adjustFanFlowsResult, calculate: computeFanFlows } =
    useCompute({
      compute: computeValue,
      unitsType,
      apiFn: APISettings.getAdjustFanCapacity,
      enabled: adjustmentType === 'aff',
    })

  const { performance, isLoading } = useDetail({
    condenser,
    unitsType,
    adjustValue:
      adjustmentType === 'ac' ? adjustCapacityResult : adjustFanFlowsResult,
    adjustType: adjustmentType,
  })

  useEffect(() => {
    if (performance == null) return
    const draft = _.get(
      valuesRef.current,
      '_energyAnalysisDraft',
      {},
    ) as Record<string, unknown>
    setFieldValue('_energyAnalysisDraft', {
      ...draft,
      performance,
    })
  }, [performance, setFieldValue])

  const { accessoriesList, accessoriesPrice, setDiscount, discount } =
    useAccessories({
      condenser,
      selectedAccessoryIds,
    })

  const {
    handleQueryChange,
    handleTableChange,
    setDataTable,
    tableResults,
    tableLoading,
    tablePagination,
  } = useTable({
    params: props.params,
    onUpdateParams: onUpdateParams,
    getComputationResult: APISettings.getEnergyAnalysis,
  })

  const tabsPanels = [
    {
      label: intl.formatMessage({
        id: 'ui.selections.tabs.detail',
      }),
      key: 'perf',
    },
    {
      label: intl.formatMessage({
        id: 'ui.selections.tabs.wp',
      }),
      key: 'wp',
    },
    {
      label: intl.formatMessage({ id: 'ui.selections.tabs.ea' }),
      key: 'EA',
    },
  ]

  const [activeTab, setActiveTab] = useState(tabsPanels[0].key)

  useEffect(() => {
    setFieldValue('ea.activeThermalTab', activeTab, false)
  }, [activeTab, setFieldValue])

  const onTabChange = (key: string) => {
    setActiveTab(key)
    log.info('ThermalModelDetail.tabChanged', { activeTab: key })
  }

  const {
    rows: workingPointRows,
    isCalculating: workingPointLoading,
    calculate: calculateWorkingPoint,
  } = useWorkingPoint(condenser)

  const onCalculateEnergyAnalysis = useCallback(
    (data: any) => {
      log.info('ThermalModelDetail.onCalculateEnergyAnalysis', data)
      setDataTable(data)
      const draft = _.get(
        valuesRef.current,
        '_energyAnalysisDraft',
        {},
      ) as Record<string, unknown>
      setFieldValue('_energyAnalysisDraft', {
        ...draft,
        eaReports: data,
      })
    },
    [setDataTable, setFieldValue],
  )

  const onCompute = () => {
    log.info('useEffect.EnergyAnalysis', data)

    const acAdjustment: string = _.get(
      values,
      'acData.perCapacityAdjustment',
      '',
    )

    const affAdjustment: string = _.get(values, 'affData.fanFlowAdjustment', '')

    const newCompute = {
      ...condenser,
      percentAdjustment: adjustmentType === 'ac' ? acAdjustment : affAdjustment,
    }

    if (adjustmentType === 'ac') {
      computeCapacity(newCompute)
    } else {
      computeFanFlows(newCompute)
    }

    log.info('ThermalModelDetail.onCompute', {
      values,
      acAdjustment,
      affAdjustment,
      adjustCapacityResult,
      adjustFanFlowsResult,
      newCompute,
      adjustmentType,
      unitsType,
    })
  }

  const onDownloadPDF = useCallback(() => {
    if (!download) return

    const newCondenser = {
      ...condenser,
      unitsType: unitsType,
      ...(adjustmentType === 'ac' && {
        capacityAdjustment: adjustCapacityResult.newCapacity,
        newAirflow: 0,
      }),
      ...(adjustmentType === 'aff' && {
        capacityAdjustment: adjustFanFlowsResult.newCapacity,
        newAirflow: adjustFanFlowsResult.newAirFlow,
      }),
    }

    const newPriceRequest = {
      ...newCondenser,
      selectedItems: selectedAccessoryIds,
      accessoriesDiscount: accessoriesPrice?.discount,
      unitDiscount: accessoriesPrice?.unitDiscount,
    }

    download({
      perfRequest: newCondenser,
      accessPriceRequest: newPriceRequest,
      Language: intl.locale,
      report: 'condenser_report',
    })

    log.info('onDownloadPDF.clicked', {
      newCondenser,
      condenser,
      accessoriesPrice,
      adjustCapacityResult,
      adjustFanFlowsResult,
    })
  }, [
    download,
    condenser,
    unitsType,
    adjustmentType,
    adjustCapacityResult,
    adjustFanFlowsResult,
    selectedAccessoryIds,
    accessoriesPrice,
    intl.locale,
  ])

  useImperativeHandle(
    ref,
    () => ({
      downloadCondenserPdf: onDownloadPDF,
      calculateEnergyAnalysis: onCalculateEnergyAnalysis,
      calculateWorkingPoint,
    }),
    [onDownloadPDF, onCalculateEnergyAnalysis, calculateWorkingPoint],
  )

  log.info('ThermalModelDetail.render', {
    activeTab,
    tableResults,
    unitsType,
    accessoriesPrice,
  })

  if (!condenser) {
    return <StyledSpinner />
  }

  return (
    <>
      <Tabs items={tabsPanels} activeKey={activeTab} onChange={onTabChange} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '10px',
        }}
      >
        <div
          style={{
            padding: '5px',
            display: 'flex',
            gap: '5px',
          }}
        ></div>
      </div>

      {activeTab === 'perf' ? (
        <>
          {autho.iAmAdmin && (
            <AdjustModule
              capacityData={adjustCapacityResult}
              fanFlowsData={adjustFanFlowsResult}
              model={condenser}
              compute={onCompute}
              preferences={preferences}
            />
          )}
          <GroupedDetails
            data={performance}
            model={condenser}
            loading={isLoading}
            direction={_.get(condenser, 'airFlowDirection')}
            unitTypes={unitsType}
          />
          <Accessories
            data={{
              accessories: accessoriesList,
              accessoriesPrice: accessoriesPrice,
              condensers: condenser,
            }}
            loading={isLoading}
            setSelectedAccessoryIds={setSelectedAccessoryIds}
            selectedAccessoryIds={selectedAccessoryIds}
            setDiscount={setDiscount}
            discount={discount}
            unitTypes={unitsType}
          />
          <ModelImage
            data={{
              imageBase64: _.get(
                performance,
                'imageBase64',
                _.get(condenser, 'imageBase64'),
              ),
              imageContentType: _.get(
                performance,
                'imageContentType',
                _.get(condenser, 'imageContentType', 'image/jpeg'),
              ),
              imageObjectKey: _.get(
                performance,
                'imageObjectKey',
                _.get(condenser, 'imageObjectKey'),
              ),
            }}
            loading={isLoading}
          />
        </>
      ) : activeTab === 'wp' ? (
        <WorkingPoint
          preferences={preferences}
          rows={workingPointRows}
          loading={workingPointLoading}
        />
      ) : (
        <>
          <EnergyAnalysis
            language={language}
            unitsType={unitsType}
            isRegenerating={isRegenerating}
            table={{
              tableResults,
              tableLoading,
              tablePagination,
              handleTableChange,
              columns: staticColumnEnergyAnalysisResults,
            }}
            data={{
              condenser: condenser,
              performance: performance,
            }}
          />
        </>
      )}
    </>
  )
})

export default ThermalModelDetail
