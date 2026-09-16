import _ from 'lodash'

import FieldRangeSelect from './FieldRangeSelect'
import { SpanIntl } from 'Components/Span'

import rawUseCases from 'Localization/Constants/use_cases.json'

const FieldSelectUseCase = (props: {
  name: string
  mode?: string
  required?: boolean
  hideRequired?: boolean
  enabledOptions: string[]
}) => {
  const {
    name,
    mode,
    required = false,
    hideRequired = false,
    enabledOptions = _.map(rawUseCases, (el) => el.key),
  } = props

  const newOptions = _.filter(rawUseCases, (el) =>
    _.includes(enabledOptions, el.key),
  )

  return (
    <FieldRangeSelect
      optionKeyPath={['key']}
      optionMessagePath={['key']}
      prefix='select.coils.microchannel.use_case.'
      placeholder='ui.coils.microchannel.use_case.placeholder'
      options={newOptions}
      optionRender={(opt: any) => {
        return (
          <SpanIntl
            prefix='select.coils.microchannel.use_case.'
            value={opt.key}
          />
        )
      }}
      required={required}
      hideRequired={hideRequired}
      name={name}
      mode={mode}
    />
  )
}

export default FieldSelectUseCase
