import { StoryObj } from '@storybook/react'
import { Formik } from 'formik'
import { Intl } from 'cypress.decorators'

import { FormikState } from 'Components/Formik'

export default {
  title: 'Formik/FormikState',
  component: FormikState,
  decorators: [
    (Story: any) => (
      <Intl
        commonMessages={{
          label1: 'Etichetta1 - field1',
          label2: 'Etichetta2 - field2',
        }}
      >
        <Story />
      </Intl>
    ),
  ],
}

type Story = StoryObj<typeof FormikState>

export const Default: Story = {
  render: (args: any) => (
    <>
      <div>
        <p>
          Il componente FormikState serve a mostrare lo stato interno del
          componente Formik
        </p>
        <p>
          Viene gia' utilizzato nel componente FormikForm per rendere visibile
          in development lo stato di tutte le form dell'applicazione.
        </p>
      </div>
      <Formik
        onSubmit={() => console.log('Test FormikState')}
        initialValues={{
          state: {
            some_complex_state: true,
            such_data: {
              more: 1,
              much_more: 2,
              very_heavy: 1000000000000,
            },
          },
        }}
      >
        <FormikState
          title='Custom Title for FormikState'
          stateRender={
            <div>
              <p>
                Un componente custom, che viene renderizzato all'interno del
                formik
              </p>
              <p>
                Questo compnente viene usato per visualizzare per renderizzare
                dei compnenti che vanno ad agganciarsi allo stato del formik per
                mostrare o mofificare al volo i dati.
              </p>
              <p>Viene usato principalmente per ragioni di sviluppo.</p>
            </div>
          }
          collapsed={1}
        />
      </Formik>
    </>
  ),
}
