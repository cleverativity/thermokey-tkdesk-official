import { ConsoleLogger } from 'aws-amplify/utils'
import { Card, Col, Row } from 'antd'
import _ from 'lodash'

import { FormikForm, FormikSubmit } from 'Components/Formik'
import { StyledButton, StyledPageHeader } from 'Components/Styled'
import { FieldCheckbox } from 'Components/Field'

import * as MS from 'Model/Settings/marshal'
import confirmEditRefrigerantsIt from 'Model/Settings/modal/confirmEditRefrigerantsIt'
import confirmEditRefrigerantsEn from 'Model/Settings/modal/confirmEditRefrigerantsEn'

const log = new ConsoleLogger('Modules/RefrigerantsEdit')

const RefrigerantsEdit = (props: any) => {
  const { data: refrigerants, onBack, onComplete, profile } = props
  log.info('render.props', props)

  const newOptions = [
    {
      value: 'oem',
      label: 'select.users.type.oem',
    },
    {
      value: 'internal',
      label: 'select.users.type.internal',
    },
    {
      value: 'admin',
      label: 'select.users.type.admin',
    },
    {
      value: 'superadmin',
      label: 'select.users.type.superadmin',
      disabled: true,
    },
  ]

  const language = _.get(profile, 'data.preferences.language', 'it')

  const orderedRefrigerants = _.orderBy(refrigerants, 'name', 'asc')

  const handleSubmit = (values: any, frk: any) => {
    log.info('handleSubmit.values', values)
    if (language === 'it') {
      confirmEditRefrigerantsIt(() => onComplete(values))()
    } else {
      confirmEditRefrigerantsEn(() => onComplete(values))()
    }
    frk.setSubmitting(false)
  }

  return (
    <FormikForm
      initialValues={MS.marshalRefrigerantsFrom(refrigerants)}
      onSubmit={handleSubmit}
    >
      <StyledPageHeader title='data.settings.refrigerants.edit_header' />

      <Row
        justify='space-between'
        align='middle'
        style={{ margin: '0 0 16px 0' }}
      >
        <Col>
          <StyledButton
            label='ui.generic.go_back'
            onClick={onBack}
            id='button.edit.corrective_factors'
          />
        </Col>
        <Col>
          <FormikSubmit
            label='ui.settings.corrective_factors.complete'
            type='primary'
            id='button.edit.corrective_factors'
          />
        </Col>
      </Row>

      <Card>
        {_.map(orderedRefrigerants, (refrigerant, idx) => {
          const name = _.get(refrigerant, 'name')

          return (
            <FieldCheckbox
              name={`${name}.visibility`}
              label={`select.coils.microchannel.fluid_type.${name}`}
              options={newOptions}
            />
          )
        })}
      </Card>
    </FormikForm>
  )
}

export default RefrigerantsEdit
