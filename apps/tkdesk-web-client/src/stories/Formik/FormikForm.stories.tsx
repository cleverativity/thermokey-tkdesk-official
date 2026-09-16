import { StoryObj } from '@storybook/react'
import { Intl } from 'cypress.decorators'

import { StyledRow } from 'Components/Styled'
import { FieldInput } from 'Components/Field'
import { FormikForm } from 'Components/Formik'

export default {
  title: 'Formik/FormikForm',
  component: FormikForm,
  decorators: [
    (Story: any) => (
      <Intl
        commonMessages={{
          label1: 'Etichetta - field1',
          label2: 'Etichetta - field2',
        }}
      >
        <Story />
      </Intl>
    ),
  ],
}

type Story = StoryObj<typeof FormikForm>

export const PlayWithInitialValues: Story = {
  args: {
    initialValues: {
      field1: null,
      field2: null,
    },
    onSubmit: () => console.log('Test FormikForm'),
  },
  render: (args: any) => (
    <FormikForm {...args}>
      <StyledRow>
        <FieldInput span={12} name='field1' label='label1' />
        <FieldInput span={12} name='field2' label='label2' />
      </StyledRow>
    </FormikForm>
  ),
}
