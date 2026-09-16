import { StyledButton, StyledPageHeader } from 'Components/Styled'
import { FormikForm, FormikSubmit } from 'Components/Formik'
import { Col, Row } from 'antd'
import FanModelsCreationForm from './forms/FanModelsCreationForm'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Modules/FanModels/Creation')

interface FanModelsCreationProps {
  intl: any
  data: any
  onBack?: () => void
  onCreate?: (data: FanModels) => void
}

const FanModelsCreation = (props: FanModelsCreationProps) => {
  const { onCreate, onBack } = props
  log.info('render.props', props)

  const handleSubmit = (values: any, frk: any) => {
    if (onCreate) onCreate(values)
  }

  return (
    <>
      <StyledPageHeader title='data.fan_models.create_header' />
      <FormikForm initialValues={{}} onSubmit={handleSubmit}>
        <Row
          justify='space-between'
          align='middle'
          style={{ margin: '0 0 16px 0' }}
        >
          <Col>
            <StyledButton
              label='ui.generic.go_back'
              onClick={onBack}
              id='button.create.goback'
            />
          </Col>
          <Col>
            <FormikSubmit
              label='ui.users.confirm_creation'
              id='button.create.confirm_creation'
            />
          </Col>
        </Row>

        <FanModelsCreationForm mode='creation' />
      </FormikForm>
    </>
  )
}

export default FanModelsCreation
