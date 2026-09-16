import { Col, Row, Card } from 'antd'
import { Field } from 'formik'

import ReactJson from 'react-json-view'
import _ from 'lodash'

import env from 'Configs/env'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Comp/Formik/State')

const FormikState = (props: any) => {
  const {
    displayState = false,
    stateRender = null,
    title = null,
    collapsed = 0,
  } = props

  return displayState || env.enableFormikStateInspector ? (
    <Card title={title || 'Formik Development Utils'} style={{ marginTop: 16 }}>
      {stateRender}
      <Field name='__formik_state_utils'>
        {({ field, form }: any) => {
          const handleChange = (payload: any) => {
            log.info('handleChange.payload', payload)
            const { namespace, new_value, name } = payload

            const [firstNamespace, ...otherNamespace] = namespace

            if (firstNamespace === 'values') {
              // we could update this part of the diplayed formik state
              const { setFieldValue } = form
              const path = _.join([...otherNamespace, name], '.')
              log.debug('handleChange.path', path)
              setFieldValue(path, new_value)
            } else {
              return false
            }
          }

          return (
            <Row>
              <Col span={20}>
                <ReactJson
                  indentWidth={4}
                  collapsed={collapsed}
                  src={form}
                  onEdit={handleChange}
                  onAdd={handleChange}
                />
              </Col>
              {/* <Col span={4}>
                <FieldCheckbox
                  label='show functions'
                  unlocalizedLabel
                  name='__formik_state_utils.show_functions'
                />
              </Col> */}
            </Row>
          )
        }}
      </Field>
    </Card>
  ) : null
}

export default FormikState
