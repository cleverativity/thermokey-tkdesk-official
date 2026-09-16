import { Tabs } from 'antd'
import React, { useState } from 'react'
import { ConsoleLogger } from 'aws-amplify/utils'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'

import DesignInputParameter from './Design'
import RatingPerfParameter from './Rating/Performance'

interface InputParameterProps {
  data?: any
  params?: SearchParameters
  preferences: any
}

function InputParameter(props: InputParameterProps) {
  const intl = useIntl()
  const { data, preferences } = props

  const formik = useFormikContext()
  const { setFieldValue } = formik
  const log = new ConsoleLogger('Modules/Selections/ThermalInputParameter')

  const tabsPanels = [
    {
      label: intl.formatMessage({
        id: 'ui.selections.tabs.design',
      }),
      key: 'design',
    },
    {
      label: intl.formatMessage({ id: 'ui.selections.tabs.rating' }),
      key: 'rating',
    },
  ]

  const [activeTab, setActiveTab] = useState(tabsPanels[0].key)

  const onTabChange = (key: string) => {
    setActiveTab(key)
    setFieldValue('ea.activeThermalTab', key)
    log.info('ThermalModelDetail.tabChanged', { activeTab: key })
  }

  return (
    <>
      <Tabs items={tabsPanels} activeKey={activeTab} onChange={onTabChange} />
      {activeTab === 'design' ? (
        <>
          <DesignInputParameter data={data} preferences={preferences} />
        </>
      ) : (
        <>
          <RatingPerfParameter data={data} preferences={preferences} />
        </>
      )}
    </>
  )
}

export default InputParameter
