import _ from 'lodash'
import { useFormikContext } from 'formik'
import { ConsoleLogger } from 'aws-amplify/utils'
import { StyledButton } from 'Components/Styled'
import { EnergyAnalysisPayload } from '../thermal/ModelDetail/EnergyAnalysis/EnergyAnalysisPayload'
import { useIntl } from 'react-intl'

const log = new ConsoleLogger('Modules/Selections/SelectionHeader')
type EnergyAnalysisButtonsProps = {
  visible: boolean
  onCalculateEnergy?: (payload: Record<string, unknown>) => void
  onCalculateWorkingPoint?: () => void
  onDownload?: (data: any) => void
  onDownloadCondenserPdf?: () => void
  condenserPdfLoading?: boolean
  energyAnalysisPdfLoading?: boolean
}

function EnergyAnalysisButtons(props: EnergyAnalysisButtonsProps) {
  const {
    visible,
    onCalculateEnergy,
    onCalculateWorkingPoint,
    onDownload,
    onDownloadCondenserPdf,
    condenserPdfLoading,
    energyAnalysisPdfLoading,
  } = props
  const { values } = useFormikContext<any>()

  if (!visible) return null

  const performance = _.get(values, '_energyAnalysisDraft.performance')
  const condenser = _.get(values, 'condenser')
  const selectedItem = _.get(values, 'ea.choicesEnergyAnalysis', 'chooseA')
  const eaReports = _.get(values, '_energyAnalysisDraft.eaReports')

  const intl = useIntl()

  const activeThermalTab = _.get(
    values,
    'ea.activeThermalTab',
    'perf',
  ) as string

  const handleCalculate = () => {
    if (activeThermalTab === 'wp') {
      if (!onCalculateWorkingPoint) {
        log.warn('EnergyAnalysisButtons.workingPoint skipped', {
          hasHandler: false,
        })
        return
      }
      onCalculateWorkingPoint()
      return
    }

    const payload = EnergyAnalysisPayload(
      values,
      { condenser, performance },
      selectedItem,
    )
    if (!onCalculateEnergy) {
      log.warn('EnergyAnalysisButtons.calculate skipped', {
        hasHandler: false,
      })
      return
    }
    onCalculateEnergy(payload)
  }

  const handleDownloadAnalysisReport = () => {
    if (!onDownload || !eaReports) {
      log.warn('EnergyAnalysisButtons.download skipped', {
        hasOnDownload: !!onDownload,
        hasEaReports: !!eaReports,
      })
      return
    }
    onDownload({
      eAnalysisRequest: eaReports,
      Language: intl.locale,
      report: 'analysis_report',
    })
  }

  const canDownload = Boolean(onDownload && eaReports)

  const handleDownloadCondenserPdf = () => {
    if (!onDownloadCondenserPdf) {
      log.warn('EnergyAnalysisButtons.condenserPdf skipped', {
        hasHandler: !!onDownloadCondenserPdf,
      })
      return
    }
    onDownloadCondenserPdf()
  }

  return (
    <>
      {activeThermalTab === 'perf' ? (
        <StyledButton
          type='primary'
          onClick={(e) => {
            void e
            handleDownloadCondenserPdf()
          }}
          id='selection_header_performance_download_pdf'
          label='ui.thermal.button.generate_pdf'
          loading={condenserPdfLoading || false}
          disabled={!onDownloadCondenserPdf}
          style={{ marginRight: 20 }}
        />
      ) : (
        <>
          <StyledButton
            success
            onClick={(e) => {
              void e
              handleCalculate()
            }}
            id='selection_header_energy_calculate'
            label='ui.generic.calculate'
            style={{ marginRight: 20 }}
          />
          <StyledButton
            type='primary'
            onClick={(e) => {
              void e
              handleDownloadAnalysisReport()
            }}
            id='selection_header_energy_analysis_download_pdf'
            label='ui.thermal.button.generate_pdf'
            loading={energyAnalysisPdfLoading || false}
            disabled={!canDownload || (energyAnalysisPdfLoading ?? false)}
          />
        </>
      )}
    </>
  )
}

export default EnergyAnalysisButtons
