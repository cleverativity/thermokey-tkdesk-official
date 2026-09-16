import _ from 'lodash'
import dayjs from 'dayjs'
import { Col, Row } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

import { StyledCard, StyledDescriptions } from 'Components/Styled'
import { Detail, DetailDate } from 'Components/Detail'
import { FormikDependent } from 'Components/Formik'
import { SpanIntl } from 'Components/Span'

import StateBadge from 'Model/Users/badge/State'
import colors from 'styles/colors.module.scss'

const GeneralInfo = () => {
  const items = [
    {
      label: <SpanIntl value='data.users.username' />,
      children: <Detail name='username' />,
    },
    {
      label: <SpanIntl value='data.users.firstname' />,
      children: <Detail name='registry.name' />,
    },
    {
      label: <SpanIntl value='data.users.lastname' />,
      span: 2,
      children: <Detail name='registry.surname' />,
    },
    {
      label: <SpanIntl value='data.users.email' />,
      children: <Detail name='registry.company_email' />,
    },
    {
      label: <SpanIntl value='data.users.phone_number' />,
      span: 3,
      children: <Detail name='registry.company_telephone' />,
    },
    {
      label: <SpanIntl value='data.users.company_name' />,
      children: <Detail name='registry.company_name' />,
    },
    {
      label: <SpanIntl value='data.users.jde_code' />,
      span: 3,
      children: <Detail name='registry.jde_id' />,
    },
    {
      label: <SpanIntl value='data.users.activation_date' />,
      children: <DetailDate name='activation_date' />,
    },
    {
      label: <SpanIntl value='data.users.expiration_date' />,
      children: <DetailDate name='expiration_date' />,
    },
    {
      label: <SpanIntl value='data.users.validation_days' />,
      children: (
        <FormikDependent
          propsFunction={({ formik }) => {
            const expiration_date = _.get(formik.values, 'expiration_date')

            const days = expiration_date
              ? dayjs(expiration_date)
                  .startOf('day')
                  .diff(dayjs().startOf('day'), 'days')
              : null

            return { days }
          }}
          render={({ days }) => (
            <Detail>
              {!_.isNil(days) && days <= 0 ? (
                <SpanIntl
                  value='data.users.expired'
                  style={{ color: colors.danger }}
                />
              ) : !_.isNil(days) && days <= 15 ? (
                <Row>
                  <WarningOutlined
                    style={{
                      marginRight: '8px',
                      color: days <= 15 ? colors.warning : colors.text,
                    }}
                  />
                  <Col
                    style={{
                      color: days <= 15 ? colors.warning : colors.text,
                    }}
                  >
                    {days}
                  </Col>
                </Row>
              ) : (
                days
              )}
            </Detail>
          )}
        />
      ),
    },
    {
      label: <SpanIntl value='data.users.status' />,
      children: (
        <Detail
          name='status'
          transform={(status: any) => <StateBadge status={status} />}
        />
      ),
    },
  ]

  return (
    <StyledCard>
      <StyledDescriptions items={items} />
    </StyledCard>
  )
}

export default GeneralInfo
