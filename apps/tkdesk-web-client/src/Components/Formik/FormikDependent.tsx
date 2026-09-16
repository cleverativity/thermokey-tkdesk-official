import { connect } from 'formik'
import type { ComponentType, ReactElement } from 'react'

/**
 * Utility component to express accessing into the formik data
 * to conditional render
 * @example
 * import { getIn } from 'formik'
 *
 * <FormikDependent
 *   propsFunction={({formik}) => {
 *     const field1 = getIn(formik.values, 'data.field1' )
 *     const field2 = getIn(formik.values, 'data.field2' )
 *     return { field1, field2 }
 *   }}
 *   render={({ field1, field2 })=> (
 *     <Component data1={field} data2={field2}/>
 *     )
 *   }
 * />
 */

interface RenderBody {
  formik: any
  props: any
}

type FormikDependentProps = {
  render: (props: any) => ReactElement | null
  propsFunction: (formikForm: RenderBody) => any
}

const FormikDependent: ComponentType<FormikDependentProps> = connect(
  (props: any) => {
    const { formik, render, propsFunction, ...other } = props

    const newProps = propsFunction({ formik, props: other })
    return render({ ...other, ...newProps })
  },
)

export default FormikDependent
