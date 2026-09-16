import { getIn } from 'formik'
import dayjs from 'dayjs'

import { StyledCard, StyledRow } from 'Components/Styled'
import { FormikDependent } from 'Components/Formik'
import {
  FieldDatePicker,
  FieldInput,
  FieldPhoneNumber,
  FieldSelectUserType,
} from 'Components/Field'
import { Detail, DetailDate } from 'Components/Detail'

import * as F from 'Utils/functions'

const CreationForm = ({ mode }: { mode: string }) => {
  return (
    <>
      <StyledCard>
        <StyledRow>
          <FieldSelectUserType
            span={{ sm: 24, lg: 12, xl: 8 }}
            name='user_type'
            label='data.users.user_type'
            required
          />
        </StyledRow>
        <StyledRow>
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 8 }}
            label='data.users.firstname'
            name='registry.name'
            required
          />
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 8 }}
            required
            label='data.users.lastname'
            name='registry.surname'
          />
        </StyledRow>
        <StyledRow>
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 8 }}
            required
            label='data.users.email'
            name='registry.company_email'
            validate={F.validateEmail}
          />
          <FieldPhoneNumber
            span={{ sm: 24, lg: 12, xl: 8 }}
            label='data.users.phone_number'
            name='registry.company_telephone'
            required
          />
        </StyledRow>
        <StyledRow>
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 8 }}
            label='data.users.jde_code'
            name='registry.jde_id'
          />
          <FieldInput
            span={{ sm: 24, lg: 12, xl: 8 }}
            label='data.users.company_name'
            name='registry.company_name'
          />
        </StyledRow>
        <StyledRow>
          {mode == 'edit' ? (
            <>
              <DetailDate
                hideLabel={false}
                span={{ sm: 24, lg: 12, xl: 8 }}
                name='activation_date'
                label='data.users.activation_date'
              />
              <DetailDate
                hideLabel={false}
                span={{ sm: 24, lg: 12, xl: 8 }}
                label='data.users.expiration_date'
                name='expiration_date'
              />
            </>
          ) : (
            <FieldDatePicker
              disabledDate={(date: any) => date.isBefore(dayjs())}
              span={{ sm: 24, lg: 12, xl: 8 }}
              required
              label='data.users.expiration_date'
              name='expiration_date'
            />
          )}

          <FormikDependent
            propsFunction={({ formik }) => {
              const expiration_date = getIn(formik.values, 'expiration_date')
              return { expiration_date }
            }}
            render={({ expiration_date }) => {
              const days = dayjs(expiration_date)
                .startOf('day')
                .diff(dayjs(Date.now()).startOf('day'), 'days')

              return (
                <Detail
                  hideLabel={false}
                  span={{ sm: 24, lg: 12, xl: 8 }}
                  label='data.users.validation_days'
                >
                  {days}
                </Detail>
              )
            }}
          />
        </StyledRow>
      </StyledCard>
    </>
  )
}

export default CreationForm
