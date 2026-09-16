import { StoryObj } from '@storybook/react'
import { Intl, Formik } from 'cypress.decorators'
import { getIn } from 'formik'
import { Col } from 'antd'
import { FormikDependent } from 'Components/Formik'
import { FieldRangeSelect, FieldInput } from 'Components/Field'
import { StyledRow } from 'Components/Styled'

export default {
  title: 'Formik/FormikDependent',
  component: FormikDependent,
  decorators: [
    (Story: any) => (
      <Intl
        commonMessages={{
          label: 'Etichetta',
        }}
      >
        <Formik
          initialValues={{
            field: null,
            field2: null,
            field3: null,
          }}
        >
          <Story />
        </Formik>
      </Intl>
    ),
  ],
}

type Story = StoryObj<typeof FormikDependent>

export const First: Story = {
  args: {
    propsFunction: ({ formik }: any) => {
      const paymentMode = getIn(formik.values, 'field')
      return { paymentMode }
    },
    render: ({ paymentMode }: { paymentMode: any }) => {
      if (paymentMode === 'Basso') {
        return (
          <>
            <StyledRow>
              <FieldInput span={12} name='field2' label='label' />
            </StyledRow>
          </>
        )
      }

      if (paymentMode === 'Medio' || paymentMode === 'Alto') {
        return (
          <>
            <StyledRow>
              <FieldInput span={12} name='field2' label='label' />
              <FieldInput
                span={12}
                name='field3'
                disabled={paymentMode === 'Medio'}
                label='label'
              />
            </StyledRow>
          </>
        )
      }

      return null
    },
  },
  render: (args: any) => (
    <StyledRow>
      <Col span={6}>
        <FieldRangeSelect
          name='field'
          label='label'
          options={['Basso', 'Medio', 'Alto']}
          optionKeyPath={[]}
          optionMessagePath={[]}
          overrideOnChange={(
            value: any,
            { field, form }: { field: any; form: any },
          ) => {
            const { setFieldValue } = form
            const { name } = field
            setFieldValue(name, value)
            // onChange reset all the options values
          }}
        />
      </Col>
      <Col span={18}>
        <FormikDependent {...args} />
      </Col>
    </StyledRow>
  ),
}
