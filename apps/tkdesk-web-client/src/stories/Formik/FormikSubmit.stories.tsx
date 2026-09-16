import { Intl } from 'cypress.decorators'
import { StoryObj } from '@storybook/react'

import { StyledRow } from 'Components/Styled'
import { FieldInput } from 'Components/Field'
import { FormikSubmit, FormikForm } from 'Components/Formik'

export default {
  title: 'Formik/FormikSubmit',
  component: FormikSubmit,
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

type Story = StoryObj<typeof FormikSubmit>

export const PlayWithInitialValues: Story = {
  args: {
    initialValues: {
      field1: null,
      field2: null,
    },
    onSubmit: (values: any) => console.log('Test FormikSubmit', { values }),
  },
  render: (args: any) => (
    <>
      <FormikForm {...args}>
        <StyledRow>
          <FieldInput span={12} name='field1' label='label1' />
          <FieldInput span={12} name='field2' label='label2' />
        </StyledRow>
        <StyledRow style={{ marginLeft: 0, marginTop: 16 }}>
          <FormikSubmit id='submit_button' type='primary'>
            Submit
          </FormikSubmit>

          <div style={{ marginLeft: 16 }}>
            Aprire la console per vedere cosa accade al Submit
          </div>
        </StyledRow>
      </FormikForm>
    </>
  ),
}
