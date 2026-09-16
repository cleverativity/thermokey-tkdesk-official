import { Button } from 'antd'
import { connect } from 'formik'

import { makeSpannable } from 'Components/Layout/SpannableCol'

const FormikResett = ({
  formik,
  children,
  loading = false,
  ...otherProps
}: any) => {
  const { isSubmitting, isValidating, dirty, resetForm } = formik

  return (
    <Button
      {...otherProps}
      disabled={isSubmitting || isValidating || loading || !dirty}
      onClick={resetForm}
    >
      {children}
    </Button>
  )
}

const FormikReset = makeSpannable(connect(FormikResett))

export default FormikReset
