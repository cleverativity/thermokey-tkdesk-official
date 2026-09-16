import { StoryObj, Meta } from '@storybook/react'
import { Intl, Formik } from 'cypress.decorators'
import * as R from 'ramda'
import { FieldInput } from 'Components/Field'

export default {
  title: 'Field/FieldInput',
  component: FieldInput,
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
} as Meta<typeof FieldInput>

type Story = StoryObj<typeof FieldInput>

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

export const NotNull: Story = {
  args: {
    name: 'field',
    label: 'label',
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          field: 'ciaodkna',
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}

export const NotNullTrasform: Story = {
  args: {
    name: 'field',
    label: 'label',
    transformTo: R.toUpper,
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
