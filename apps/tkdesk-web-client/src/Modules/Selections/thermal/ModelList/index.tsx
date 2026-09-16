import React, { useState } from 'react'
import _ from 'lodash'

import { ConsoleLogger } from 'aws-amplify/utils'
import CondenserResults from './CondenserResults'
import { useFormikContext } from 'formik'
import { useIntl } from 'react-intl'

interface ThermalModelDetailParameterProps {
  data?: any
  params?: SearchParameters
  onUpdateParams?: any
  loadAccessories?: (payload: any) => void
  loadAccessoriesPrice?: (payload: any) => void
  onLoad?: () => void

  saveMachineId?: any
  loading?: boolean
  preferences: any
}
function ThermalModelDetailList(props: ThermalModelDetailParameterProps) {
  const log = new ConsoleLogger('Modules/Selections/ThermalModelDetailList')
  const {
    data,
    onUpdateParams,
    params,
    loadAccessories,
    saveMachineId,
    preferences,
  } = props
  const formik = useFormikContext()
  const { values, setFieldValue } = formik
  const intl = useIntl()

  // const [selectedCondenser, setSelectedCondenser] = useState({
  //   accessories: {},
  //   accessoriesPrice: {},
  // })
  const [condenserId, setCondenserId] = useState<number | null>(null)

  const condenser: any = _.get(values, 'condenser', [])
  const accessoriesPrice: any = _.get(data, 'accessoriesPrice', [])

  log.info('ThermalModelDetailList', {
    //selectedCondenser,
    props,
    accessoriesPrice,
    condenser,
    values,
  })
  return (
    <>
      <CondenserResults
        condenser={condenser}
        data={data}
        loading={props?.loading}
        params={params}
        onUpdateParams={onUpdateParams}
        onLoadAccessories={loadAccessories}
        preferences={preferences}
        // selectedCondenser={(accessories, accessoriesPrice) => {
        //   if (
        //     !_.isEqual(selectedCondenser.accessories, accessories) ||
        //     !_.isEqual(selectedCondenser.accessoriesPrice, accessoriesPrice)
        //   ) {
        //     setSelectedCondenser({ accessories, accessoriesPrice })
        //   }
        // }}
        saveMachineId={saveMachineId}
        saveCondenserId={setCondenserId}
      />
      {/* <Accessories selectedCondenser={selectedCondenser} /> */}
    </>
  )
}

export default ThermalModelDetailList
