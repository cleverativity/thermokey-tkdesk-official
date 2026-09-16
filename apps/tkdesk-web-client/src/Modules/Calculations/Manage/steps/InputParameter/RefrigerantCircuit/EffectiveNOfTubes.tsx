import _ from 'lodash'
import { WarningOutlined } from '@ant-design/icons'
import { Popover } from 'antd'

import { Detail } from 'Components/Detail'
import { Span, SpanIntl } from 'Components/Span'

import colors from 'styles/colors.module.scss'

const EffectiveNOfTubes = ({ circuit, ...other }: any) => {
  const { steps_c1, steps_c2 } = circuit

  const effectiveNOfTubesC1 = _.sumBy(steps_c1, (obj: any) =>
    _.get(obj, 'entry.port'),
  )
  const effectiveNOfTubesC2 = _.sumBy(steps_c2, (obj: any) =>
    _.get(obj, 'entry.port'),
  )

  const isErrorPresent = effectiveNOfTubesC1 !== effectiveNOfTubesC2

  let localData = null

  if (!_.isNil(effectiveNOfTubesC1)) {
    localData = (
      <li style={isErrorPresent ? { color: colors.warning } : {}}>
        <Span
          style={isErrorPresent ? { color: colors.warning } : {}}
          value={effectiveNOfTubesC1}
        />
        {isErrorPresent ? (
          <Popover
            trigger='hover'
            content={
              <SpanIntl
                value='data.calculations.input_parameters.refrigerant_circuit.error_n_of_tubes'
                dangerously
              />
            }
          >
            <WarningOutlined
              style={{
                marginLeft: '8px',
                color: colors.warning,
              }}
            />
          </Popover>
        ) : null}
      </li>
    )
  }

  return <Detail {...other}>{localData}</Detail>
}

export default EffectiveNOfTubes
