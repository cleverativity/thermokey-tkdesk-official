import _ from 'lodash'
import * as F from 'Model/functions'

/**
 * This function filters all the development values in the
 * formik back, those that starts with `__formik_state`.
 *
 * Those values are tipically used by development or to handle
 * some andvance functionality that the formik dosent support yet
 */
export const filterFormValues = F.filterWithKeys(
  (key: any) => !_.defaultTo(key, '').startsWith('__formik_state'),
)()
