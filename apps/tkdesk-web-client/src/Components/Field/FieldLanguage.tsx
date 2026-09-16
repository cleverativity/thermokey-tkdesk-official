import { connect } from 'react-redux'

import actions from 'Modules/App/actions'
import FieldRangeSelect from './FieldRangeSelect'
import { FormikForm } from 'Components/Formik'
import styled from 'styled-components'
import _ from 'lodash'
import { useCookies } from 'react-cookie'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Comp/Field/FieldLanguage')

const FieldLanguage = (props: any) => {
  const { data: profile, onLangSwitch, isLogin, style = {} } = props
  const [cookies, setCookie] = useCookies(['language'])

  const language = _.get(profile, 'preferences.language', null)
  const profile_id = _.get(profile, 'id', null)
  const fieldRangeProps = {
    hideLabel: true,
    allowClear: false,
    options: [
      { key: 'it', ITA: 'IT', ENG: 'IT' },
      { key: 'en', ITA: 'EN', ENG: 'EN' },
    ],
    optionKeyPath: ['key'],
    optionMessagePath: ['key'],
    prefix: 'select.generic.lang.',
    name: 'language',
    overrideOnChange: (value: string) => {
      onLangSwitch({ isLogin, profile_id, language: value })
      setCookie('language', value)
    },
  }

  return (
    <FormikForm
      initialValues={{
        language: _.isNil(language)
          ? _.isNil(cookies.language)
            ? 'it'
            : cookies.language
          : language,
      }}
      hideFormikState
    >
      {isLogin ? (
        <StyledFieldRange {...fieldRangeProps} />
      ) : (
        <InnerFieldRange style={style} {...fieldRangeProps} />
      )}
    </FormikForm>
  )
}

const InnerFieldRange = styled(FieldRangeSelect)`
  .ant-form-item-explain {
    display: none;
  }
`

const StyledFieldRange = styled(FieldRangeSelect)`
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color: unset;
    outline: none;
    border: unset;
    min-width: 60px;
    span {
      font-family: 'Avenir Heavy', sans-serif;
      font-size: 16px;
      color: #ffffff;
    }
  }
  .ant-select-arrow {
    color: #ffffff;
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(
      .ant-select-customize-input
    )
    .ant-select-selector {
    border-color: unset;
    box-shadow: unset;
    border-right-width: 0;
    outline: 0;
  }
`

export default connect(
  (state: any, props: any) => ({ ...state.general.profile }),
  (dispatch) => ({
    onLangSwitch: ({
      isLogin,
      language,
      profile_id,
    }: {
      isLogin: boolean
      profile_id: string | number
      language: 'it' | 'en'
    }) =>
      dispatch(
        actions.profile.setLanguage({ isLogin, id: profile_id, language }),
      ),
  }),
)(FieldLanguage)
