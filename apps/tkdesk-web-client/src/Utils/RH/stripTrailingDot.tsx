import * as R from 'ramda'

/**
 * This function remove the `.` char at the end of a string
 * if present.
 *
 * It's used to transform prifixes in the corresponding object.
 * @param {String} str string with a trailing dot
 * @returns {String} a string without a dot at the end
 */
export default R.replace(/\.$/, '')
