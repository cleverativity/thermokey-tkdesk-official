import { StoryObj } from '@storybook/react'
import { Intl } from 'cypress.decorators'
import { FormikField, FormikForm, FormikReset } from 'Components/Formik'
import { StyledRow } from 'Components/Styled'
import { Input } from 'antd'
import * as R from 'ramda'

export default {
  title: 'Formik/FormikField',
  component: FormikField,
  decorators: [
    (Story: any) => (
      <Intl>
        <FormikForm
          initialValues={{
            field: null,
          }}
          onSubmit={(values: any) => {
            console.log('Prova FormikForm', values)
          }}
        >
          <Story />
        </FormikForm>
      </Intl>
    ),
  ],
}

type Story = StoryObj<typeof FormikField>

export const Default: Story = {
  args: {
    name: 'field',
    label: 'label',
    transformTo: R.when(R.isEmpty, R.always(null)),
    disableCustomOnChange: true,
    component: Input,
  },
  render: (args: any) => (
    <>
      <div>
        <p>
          Il componente <code>FormikField</code> serve al legare la libreria{' '}
          <code>Formik</code> e la libreria <code>Ant</code> automatizzanto
          tutti gli aspetti comuni tra i componenti di <code>Ant</code> che
          hanno bisogno di accedere al contesto di <code>Formik</code>.
        </p>
        <p>
          La libreria <code>Formik</code> rende disponibile il componente{' '}
          <code>Field</code>, che e' incaricato di collegare un componente di
          input (come il componente
          <code>input</code> standard HTML o un componente piu' sofisticato come
          l'<code>Input</code> di Ant al Formik, o un'altro qualsiasi) al
          contesto di Formik in modo da poter gestire tutti gli eventi del
          componente di input in automatico.
        </p>
        <p>
          La Libreria <code>Antd</code> invece fornisce un suo framework grafico
          di componenti, e uno per la gestione delle form. Essendo i componenti
          pensati per l'uso con il loro framework e' necessario un layer di
          integrazione tra Formik e i componenti di input di Antd.
        </p>
        <p>
          Questo componente racchiude tutte le logiche comuni a tutti i
          possibili componenti di Antd usati dentro ad un formik, e fornisce una
          API di basso livello per personalizzare l'integrazione dei componenti
          di input di Antd con la libreria Formik.
        </p>
        <p>
          In genere viene utilizzato per definire tutti i nuovi componenti{' '}
          <code>Field*</code> che poi verranno usati nelle interfacce, e'
          sconsigliato l'uso diretto di FormikField all'interno delle
          interfacce.
        </p>
        <p>
          Qui sotto un esempio di Field construito tramite FormikField e l'Input
          di Antd.
        </p>
      </div>
      <StyledRow>
        <FormikField
          span={12}
          // name='field'
          // label='label'
          // transformTo={R.when(R.isEmpty, R.always(null))}
          // disableCustomOnChange
          // component={Input}
          {...args}
        />
      </StyledRow>
      <StyledRow>
        <FormikReset span={4}>Resetta</FormikReset>
      </StyledRow>
    </>
  ),
}
