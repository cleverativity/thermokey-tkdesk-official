import { StoryObj } from '@storybook/react'
import { Intl, Formik } from 'cypress.decorators'
import { FormikErrorAlert } from 'Components/Formik'
import { FieldInput } from 'Components/Field'

export default {
  title: 'Formik/FormikErrorAlert',
  component: FormikErrorAlert,
  decorators: [
    (Story: any) => (
      <Intl>
        <Formik
          initialValues={{
            field: null,
          }}
          initialErrors={{ field: 'errore' }}
          initialTouched={{ field: true }}
        >
          <FieldInput name='field' />
          <Story />
        </Formik>
      </Intl>
    ),
  ],
}

type Story = StoryObj<typeof FormikErrorAlert>

export const Null: Story = {
  args: {
    validate: (value: any) => {
      console.log('hello:', value)
      return `Errore nel valore ${value}`
    },
    name: 'field',
  },
}
