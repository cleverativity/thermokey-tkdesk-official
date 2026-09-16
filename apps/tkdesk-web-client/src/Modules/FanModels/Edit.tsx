import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import { StyledButton, StyledPageHeader } from 'Components/Styled'
import { FormikForm, FormikSubmit } from 'Components/Formik'
import confirmEditFanModelsIt from 'Model/FanModels/modal/confirmEditFanModel/confirmEditFanModelIt'
import confirmEditFanModelsEn from 'Model/FanModels/modal/confirmEditFanModel/confirmEditFanModelEn'
import { Col, Row } from 'antd'
import FanModelsCreationForm from './forms/FanModelsCreationForm'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/FanModels/Edit')

interface FanModelEditProps {
  data: any
  onEdit?: (data: FanModels) => void
  profile: any
}

const FanModelEdit = (props: FanModelEditProps) => {
  log.info('render.props', props)
  const { data, onEdit, profile } = props

  const navigate = useNavigate()
  const language = _.get(profile, 'preferences.language', 'it')

  const handleSubmit = (values: FanModels, frk: any) => {
    log.info('handleSubmit.values', values)
    if (onEdit) {
      if (language === 'it') {
        confirmEditFanModelsIt(() => onEdit(values))()
      } else {
        confirmEditFanModelsEn(() => onEdit(values))()
      }
    }
    frk.setSubmitting(false)
  }

  return (
    <>
      <StyledPageHeader title={'data.fan_models.edit_header'} />
      <FormikForm initialValues={data} onSubmit={handleSubmit}>
        <Row
          justify='space-between'
          align='middle'
          style={{ margin: '0 0 16px 0' }}
        >
          <Col>
            <StyledButton
              label='ui.generic.go_back'
              onClick={() => navigate(-1)}
              id='button.create.goback'
            />
          </Col>
          <Col>
            <FormikSubmit
              label='data.generic.edit'
              type='primary'
              id='button.create.edit_user'
            />
          </Col>
        </Row>

        <FanModelsCreationForm mode='edit' />
      </FormikForm>
    </>
  )
}

export default FanModelEdit
