import _ from 'lodash'
import { connect } from 'formik'

import SubmitModal from 'Components/Modal/SubmitModal'
import { FieldDropZone } from 'Components/Field'

const ImportFanModels = connect((props: any) => {
  const { modal, onImportFans, onCancel } = props

  const onSubmit = (values: any, frk: any) => {
    const documents = _.get(values, 'documents', {})

    onImportFans(documents)
    onCancel()
  }

  return (
    <SubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title='ui.fan_models.create.import'
    >
      <FieldDropZone
        span={24}
        id='dropzone.importFanModels'
        name='documents'
        numbers={{ min: 1, max: 1 }}
      />
    </SubmitModal>
  )
})

export default ImportFanModels
