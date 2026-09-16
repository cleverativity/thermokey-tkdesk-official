import { StoryObj, Meta } from '@storybook/react'
import { Intl, Formik } from 'cypress.decorators'
import { FieldDecimalNumber } from 'Components/Field'

export default {
  title: 'Field/FieldDecimalNumber',
  component: FieldDecimalNumber,
  decorators: [
    (Story: any) => (
      <Intl
        commonMessages={{
          label: 'Etichetta',
        }}
      >
        <Story />
      </Intl>
    ),
  ],
} as Meta<typeof FieldDecimalNumber>

type Story = StoryObj<typeof FieldDecimalNumber>

export const Null: Story = {
  args: {
    name: 'field',
    label: 'label',
    overrideOnChange: (value: any, formik: any) => {
      const { form } = formik
      const { setFieldValue } = form
      setFieldValue('field', value, false)
    },
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          field: {
            type: 'number',
            value: 0,
            unit_of_measurement: 'm',
            validations: {
              minimum: -5,
              maximum: 10,
            },
          },
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}

export const NotNullString: Story = {
  args: {
    name: 'field',
    label: 'label',
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          field: 45,
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}
export const NotNullInt: Story = {
  args: {
    name: 'field',
    label: 'label',
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          field: '45',
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}

export const NotNullWithScaleAndPrefix: Story = {
  args: {
    name: 'field',
    label: 'label',
    prefix: '$',
    scale: 3,
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          field: '45',
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}
