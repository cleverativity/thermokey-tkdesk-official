import { StoryObj } from '@storybook/react'
import { Intl } from 'cypress.decorators'
import { FormikReset, FormikDependent, FormikForm } from 'Components/Formik'
import { FieldInput } from 'Components/Field'
import { StyledRow } from 'Components/Styled'
import * as R from 'ramda'

export default {
  title: 'Formik/FormikReset',
  component: FormikReset,
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

type Story = StoryObj<typeof FormikReset>

export const PlayWithInitialValues: Story = {
  args: {
    initialValues: {
      field1: null,
      field2: null,
    },
  },
  render: (args: any) => (
    <FormikForm {...args}>
      <StyledRow>
        <FieldInput span={12} name='field1' label='label1' />
        <FieldInput span={12} name='field2' label='label2' />
      </StyledRow>

      {!R.isNil(args.initialValues.field1) &&
      !R.isNil(args.initialValues.field2) ? (
        <FormikDependent
          propsFunction={({ formik }) => {
            const { dirty } = formik
            return { dirty }
          }}
          render={({ dirty }) => {
            if (!dirty) {
              return (
                <div>
                  Gli initialValues sono UGUALI dai values: non vi è nulla da
                  resettare
                </div>
              )
            }
            return (
              <div>
                Gli initialValues sono DIVERSI dai values: vi è qualcosa da
                resettare
              </div>
            )
          }}
        />
      ) : null}
      <StyledRow style={{ marginLeft: 0, marginTop: 16 }}>
        <FormikReset type='primary' id='button.registry.reset'>
          Resetta
        </FormikReset>
      </StyledRow>
    </FormikForm>
  ),
}
