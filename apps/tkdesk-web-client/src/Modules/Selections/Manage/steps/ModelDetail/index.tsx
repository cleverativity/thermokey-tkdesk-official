import { ConsoleLogger } from 'aws-amplify/utils'

import { useAuthorization } from 'Modules/App/Authorization'

import GeneralInfo from './GeneralInfo'
import Performance from './Performance'

import Detail from './Detail'
import DetailAdmin from './DetailAdmin'
import Accessories from './Accessories'

const log = new ConsoleLogger('Modules/Selections/ModelDetail')

const ModelDetail = (props: {
  fields: any
  detail_data: any
  onEditCustomData?: ({ id, values }: { id: string; values: any }) => void
}) => {
  log.info('render.props', props)
  const { fields, detail_data, onEditCustomData } = props

  const autho = useAuthorization()

  return (
    <>
      <GeneralInfo />
      <Performance />

      {autho.iAmAdmin ? (
        <DetailAdmin fields={fields} detail_data={detail_data} />
      ) : (
        <Detail detail_data={detail_data} />
      )}

      <Accessories onEditCustomData={onEditCustomData} />
    </>
  )
}

export default ModelDetail
