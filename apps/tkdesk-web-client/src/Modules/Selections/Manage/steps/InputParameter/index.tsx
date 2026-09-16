import { ConsoleLogger } from 'aws-amplify/utils'

import Performance from './Performance'
import Air from './Air'
import Dimensions from './Dimensions'
import Ventilation from './Ventilation'
import Noise from './Noise'
import Coil from './Coil'
import Liquid from './Liquid'

const log = new ConsoleLogger('Modules/Selections/InputParameter')

const InputParameter = ({ seriesCompatibility }: any) => {
  return (
    <>
      <Performance />
      <Liquid />
      <Air />
      <Ventilation />
      <Dimensions seriesCompatibility={seriesCompatibility} />
      <Noise />
      <Coil />
    </>
  )
}

export default InputParameter
