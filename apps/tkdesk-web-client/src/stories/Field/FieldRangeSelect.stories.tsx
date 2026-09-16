import * as R from 'ramda'
import { StoryObj, Meta } from '@storybook/react'
import { Intl, Formik } from 'cypress.decorators'
import { FieldRangeSelect } from 'Components/Field'
import { FormikDependent } from 'Components/Formik'

const messages = {
  field: {
    label: 'Tipologia',
  },
  static: {
    element: {
      a: 'La A',
      b: 'Una B',
      c: 'Ecco C',
      d: 'Anche D',
    },
  },
}

const options = ['a', 'b', 'c', 'd']

export default {
  title: 'Field/FieldRangeSelect',
  component: FieldRangeSelect,
  decorators: [
    (Story: any) => (
      <Intl commonMessages={messages}>
        <Story />
      </Intl>
    ),
  ],
} as Meta<typeof FieldRangeSelect>

type Story = StoryObj<typeof FieldRangeSelect>

export const Dev: Story = {
  args: {
    prefix: 'select.element.',
    options: options,
    label: 'field.label',
    name: 'selected_element',
    optionMessagePath: [],
    optionKeyPath: [],
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          selected_element: null,
        }}
      >
        <Story />
      </Formik>
    ),
  ],
}

export const Enabled: Story = {
  args: {
    prefix: 'select.element.',
    options: options,
    label: 'field.label',
    name: 'selected_element',
    optionMessagePath: [],
    optionKeyPath: [],
  },
  decorators: [
    (Story: any) => (
      <Formik
        initialValues={{
          enabled_elements: undefined,
          selected_element: null,
        }}
      >
        <Story />
      </Formik>
    ),
  ],
  render: (args: any) => (
    <>
      <FieldRangeSelect
        mode='multiple'
        prefix='select.element.'
        options={options}
        label='field.label'
        name='enabled_elements'
        optionMessagePath={[]}
        optionKeyPath={[]}
      />
      <FormikDependent
        propsFunction={({ formik }) => {
          const enabled = R.prop('enabled_elements', formik.values)
          return { enabled }
        }}
        render={({ enabled }) => (
          <FieldRangeSelect enabled={enabled} {...args} />
        )}
      />
    </>
  ),
}
