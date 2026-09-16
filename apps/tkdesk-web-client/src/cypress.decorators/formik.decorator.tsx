import { FormikForm } from 'Components/Formik'

const formikDecorator = ({
  children,
  initialValues = {},
  initialErrors = null,
  initialTouched = null,
}: {
  children: any
  initialValues?: { [key: string]: any }
  initialErrors?: { [key: string]: any } | null
  initialTouched?: { [key: string]: any } | null
}) => {
  return (
    <FormikForm
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      initialValues={initialValues}
      displayState
    >
      {children}
    </FormikForm>
  )
}

export default formikDecorator
