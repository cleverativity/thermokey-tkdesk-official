import { StoryObj, Meta } from '@storybook/react'
import { Intl, Formik } from 'cypress.decorators'
import { FieldCheckbox } from 'Components/Field'

export default {
  title: 'Field/FieldCheckbox',
  component: FieldCheckbox,
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
} as Meta<typeof FieldCheckbox>

type Story = StoryObj<typeof FieldCheckbox>

export const Null: Story = {
  args: {
    name: 'field',
    label: 'label',
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          field: null,
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}

export const True: Story = {
  args: {
    name: 'field',
    label: 'label',
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          field: true,
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}

export const False: Story = {
  args: {
    name: 'field',
    label: 'label',
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          field: false,
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}
