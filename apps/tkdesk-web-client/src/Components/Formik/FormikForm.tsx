import { Form as AntdForm } from 'antd'
import { Formik } from 'formik'
import * as FUtils from 'Utils/formik'

import FormikState from './FormikState'

interface FormikFormProps {
  hideFormikState?: boolean
  [key: string]: any
}

const FormikForm = (props: FormikFormProps) => {
  const {
    initialValues,
    children = null,
    layout = 'vertical',
    displayState = false,
    stateRender = undefined,
    onSubmit = null,
    hideFormikState = false,
    ...otherProps
  } = props

  const handleFilteredSubmit = (data: any, ...args: any[]) => {
    if (onSubmit) onSubmit(FUtils.filterFormValues(data), ...args)
  }

  return (
    <Formik
      {...otherProps}
      initialValues={initialValues}
      onSubmit={handleFilteredSubmit}
      validateOnChange={true}
      validateOnBlur={true}
      enableReinitialize
    >
      {({ handleSubmit }) => (
        <AntdForm
          layout={layout}
          onFinish={handleSubmit}
          onKeyPress={(e) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
        >
          {children}
          {hideFormikState ? null : (
            <FormikState
              displayState={displayState}
              stateRender={stateRender}
            />
          )}
        </AntdForm>
      )}
    </Formik>
  )
}

export default FormikForm
