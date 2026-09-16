import _ from 'lodash'
import * as R from 'ramda'
import { useIntl } from 'react-intl'
import { Upload, Form, message } from 'antd'
import { Field, useFormikContext } from 'formik'
import styled from 'styled-components'

import { makeSpannable } from 'Components/Layout/SpannableCol'

import { SpanIntl } from 'Components/Span'

import colors from 'styles/colors.module.scss'

const AntdFormItem = Form.Item

export const requiredValidate =
  (numbers: any) =>
  (value = {}) => {
    const min: number = R.pathOr(0, ['min'], numbers)
    const max = R.pathOr(null, ['max'], numbers)

    const files = R.pathOr([], ['files'], value)
    const values = R.pathOr([], ['values'], value)

    const attachmentsNumber = files.length + values.length

    if (!R.isNil(max)) {
      if (min >= 0) {
        if (attachmentsNumber < min || attachmentsNumber > max) {
          if (min === max) {
            if (min === 1) {
              return 'comp.field.dropZone.errors.attachments_number_exact_one'
            } else {
              return 'comp.field.dropZone.errors.attachments_number_exact'
            }
          } else {
            return 'comp.field.dropZone.errors.attachments_number_between'
          }
        }
      }
    } else if (attachmentsNumber < min) {
      return 'comp.field.dropZone.errors.attachments_number_greater'
    }

    return undefined
  }

/**
 * If min = 0 is not required
 */
const FieldDropZone = (props: any) => {
  const {
    id,
    name,
    label,
    numbers,
    unlocalizedLabel = false,
    unlocalizedError = false,
    onDownload = R.identity,
    onChange = null,
    noMaxLimit = false,
    acceptedTypes = 'CSV, XLS, XLSX',
    accept = '.csv,.xls,.xlsx',
    ...otherProps
  } = props

  const intl = useIntl()

  // If min = 0
  const min = R.pathOr(0, ['min'], numbers)
  const max = R.pathOr(null, ['max'], numbers)

  const required = R.pathOr(0, ['min'], numbers) > 0
  const single = (min === 0 || min === 1) && max === 1

  const formik = useFormikContext()

  return (
    <Field name={name} validate={requiredValidate({ max, min })}>
      {({ field, form }: any) => {
        const { value } = field
        const { errors, touched, submitCount, setFieldValue, setFieldTouched } =
          form

        const isTouched = _.get(touched, name, false)
        const hasError = _.has(errors, name)
        const showError = hasError && (isTouched || submitCount > 0)

        const errorMessage = showError
          ? unlocalizedError
            ? _.get(errors, name)
            : intl.formatMessage(
                {
                  id: _.get(errors, name),
                },
                { min, max },
              )
          : ''

        const labelMessage = label
          ? unlocalizedLabel
            ? label
            : intl.formatMessage({ id: label })
          : undefined

        const files = R.pathOr([], ['files'], value)
        const values = R.pathOr([], ['values'], value)

        const addFile = (file: any) => {
          file.isFile = true
          if (single) {
            setFieldValue(name, { values: [], files: [file] })
          } else {
            setFieldValue(name, {
              values,
              files: [...files, file],
            })
          }
        }

        const removeFile = (file: any) => {
          setFieldTouched(name)

          const filFiles = R.reject((f: any) => f.uid === file.uid, files)
          const filValues = R.reject(
            (v: any) => v.storage_url === file.storage_url,
            values,
          )

          setFieldValue(name, {
            values: filValues,
            files: filFiles,
          })
        }

        const uploadEvents = {
          beforeUpload: (file: any, fileList: any) => {
            const allowedExtensions = ['.csv', '.xls', '.xlsx']

            const extension = file.name
              .substring(file.name.lastIndexOf('.'))
              .toLowerCase()

            if (!allowedExtensions.includes(extension)) {
              message.error(
                intl.formatMessage({
                  id: 'comp.field.dropZone.errors.invalidFileType',
                }),
              )
              return Upload.LIST_IGNORE
            } else {
              addFile(file)
            }
            return false
          },
          onRemove: (file: any) => {
            removeFile(file)
          },
        }

        const fileList = R.concat(
          R.map<any, any>(
            (val) => ({
              name: val.name,
              uid: val.name,
              status: 'done',
              isFile: false,
              storage_url: val.storage_url,
            }),
            values,
          ),
          files,
        )
        return (
          <div id={id}>
            <StyledAntdFormItem
              required={required}
              colon={false}
              help={errorMessage}
              label={labelMessage}
              validateStatus={showError ? 'error' : hasError ? '' : 'success'}
            >
              <Upload.Dragger
                name={`file-upload-${name}`}
                showUploadList={{
                  showPreviewIcon: true,
                  showRemoveIcon: true,
                  showDownloadIcon: false,
                }}
                multiple={!single}
                fileList={fileList}
                onChange={(e: any) => {
                  if (!R.isNil(onChange)) {
                    onChange(e, formik)
                  }
                }}
                {...uploadEvents}
                {...otherProps}
              >
                <p className='ant-upload-text'>
                  <SpanIntl value='comp.field.dropZone.upload_description' />
                  <br />
                  {acceptedTypes}
                </p>
              </Upload.Dragger>
            </StyledAntdFormItem>
          </div>
        )
      }}
    </Field>
  )
}

const StyledAntdFormItem = styled(AntdFormItem)`
  .ant-upload-text {
    color: ${colors.description} !important;
    font-size: 14px !important;
  }
`

export default makeSpannable(FieldDropZone)
