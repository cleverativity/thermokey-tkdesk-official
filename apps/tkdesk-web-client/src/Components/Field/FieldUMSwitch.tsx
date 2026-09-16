import { connect } from 'react-redux'

import actions from 'Modules/App/actions'
import FieldRangeSelect from './FieldRangeSelect'
import { FormikForm } from 'Components/Formik'
import styled from 'styled-components'
import _ from 'lodash'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Comp/Field/FieldUMSwitch')

const FieldUMSwitch = (props: any) => {
  const { onUMSwitch, style = {}, data: profile } = props

  const um_system = _.get(profile, 'preferences.um_system', 'si')
  const language = _.get(profile, 'preferences.language', null)

  const profile_id = _.get(profile, 'id', null)
  const fieldRangeProps = {
    hideLabel: true,
    allowClear: false,
    options: [
      { key: 'si', ITA: 'Metrico', ENG: 'Metric' },
      { key: 'imp', ITA: 'Imperiale', ENG: 'Imperial' },
    ],
    optionKeyPath: ['key'],
    optionMessagePath: ['key'],
    prefix: 'select.generic.um_system.',
    name: 'um_system',
    overrideOnChange: (value: string) => {
      onUMSwitch({ profile_id, um_system: value, language })
    },
  }

  return (
    <FormikForm
      initialValues={{
        um_system,
      }}
      hideFormikState
    >
      <StyledFieldRange style={style} {...fieldRangeProps} />
    </FormikForm>
  )
}

const StyledFieldRange = styled(FieldRangeSelect)`
  .ant-form-item-explain {
    display: none;
  }
`

export default connect(
  (state: any, props: any) => ({ ...state.general.profile }),
  (dispatch) => ({
    onUMSwitch: ({
      profile_id,
      um_system,
      language,
    }: {
      profile_id: string
      um_system: 'si' | 'imp'
      language: string
    }) =>
      dispatch(
        actions.profile.setUMSwitch({ id: profile_id, um_system, language }),
      ),
  }),
)(FieldUMSwitch)
