import { ConsoleLogger } from 'aws-amplify/utils'
import { FormikForm } from 'Components/Formik'
import { StyledButton, StyledPageHeader, StyledTable } from 'Components/Styled'
import { Card, Row } from 'antd'
import _ from 'lodash'
import { staticColumnsDetail } from 'Model/Settings/table/refrigerantsTable'
import { useAuthorization } from 'Modules/App/Authorization'
import Blank from 'Modules/General/404/Blank'

const log = new ConsoleLogger('Modules/RefrigerantsDetail')

const RefrigerantsDetail = (props: any) => {
  const { data: refrigerants, onEdit } = props
  log.info('render.props', props)

  const autho = useAuthorization()

  const isOemOrInternal = autho.iAmOem || autho.iAmInternal

  const orderedRefrigerants = _.orderBy(refrigerants, 'name', 'asc')

  return isOemOrInternal ? (
    <Blank />
  ) : (
    <FormikForm initialValues={orderedRefrigerants}>
      <StyledPageHeader title='data.settings.refrigerants.header' />
      <Row justify='end' style={{ marginBottom: '16px' }}>
        <StyledButton
          label='ui.settings.corrective_factors.edit'
          onClick={onEdit}
          type='primary'
          id='button.detail.corrective_factors'
        />
      </Row>

      <Card>
        <StyledTable
          rowKey='id'
          dataSource={orderedRefrigerants}
          loading={false}
          pagination={false}
          columns={staticColumnsDetail}
        />
      </Card>
    </FormikForm>
  )
}

RefrigerantsDetail.prefix = 'refrigerants'

export default RefrigerantsDetail
