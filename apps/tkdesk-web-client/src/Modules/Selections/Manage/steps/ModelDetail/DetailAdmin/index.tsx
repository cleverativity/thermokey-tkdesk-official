import Liquid from './Liquid'
import Air from './Air'
import Ventilation from './Ventilation'
import UnitData from './UnitData'
import Noise from './Noise'
import Coil from './Coil'

const DetailAdmin = ({ fields, detail_data }: any) => {
  const { liquid, ventilation } = detail_data

  return (
    <>
      <Liquid liquid={liquid} />
      <Air />
      <Ventilation ventilation={ventilation} />
      <UnitData fields={fields} />
      <Noise />
      <Coil />
    </>
  )
}

export default DetailAdmin
