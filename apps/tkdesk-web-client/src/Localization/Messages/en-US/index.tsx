import * as RH from 'Utils/RH'
import comp from './en-US.comp'
import ui from './en-US.ui'
import data from './en-US.data'
import selectt from './en-US.select'
import tkcc from './en-US.errors'

import * as R from 'ramda'

import rawTrueFalse from 'Localization/Constants/true_false.json'
import rawPhaseType from 'Localization/Constants/phase_types.json'
import rawVisibilityType from 'Localization/Constants/visibility_types.json'
import rawFanType from 'Localization/Constants/fan_types.json'
import rawLink from 'Localization/Constants/link.json'
import rawPolynomialType from 'Localization/Constants/polynomial_type.json'
import rawSupply from 'Localization/Constants/supply.json'
import rawEnergyClass from 'Localization/Constants/energy_class.json'

const config = [
  {
    source: rawTrueFalse,
    mapping: (data: any) => ({
      key: `select.generic.trueFalse.${data.key}`,
      value: data.ENG,
    }),
  },
  {
    source: rawPhaseType,
    mapping: (data: any) => ({
      key: `select.fan_models.phase_type.${data.key}`,
      value: data.ENG,
    }),
  },
  {
    source: rawVisibilityType,
    mapping: (data: any) => ({
      key: `select.fan_models.visibility.${data.key}`,
      value: data.ENG,
    }),
  },
  {
    source: rawFanType,
    mapping: (data: any) => ({
      key: `select.fan_models.fan_type.${data.key}`,
      value: data.ENG,
    }),
  },
  {
    source: rawLink,
    mapping: (data: any) => ({
      key: `select.fan_models.link.${data.key}`,
      value: data.ENG,
    }),
  },
  {
    source: rawPolynomialType,
    mapping: (data: any) => ({
      key: `select.polynomialType.${data.key}`,
      value: data.ENG,
    }),
  },
  {
    source: rawSupply,
    mapping: (data: any) => ({
      key: `select.ventilation.supply.${data.key}`,
      value: data.ENG,
    }),
  },
  {
    source: rawEnergyClass,
    mapping: (data: any) => ({
      key: `select.performance.min_energy_class.${data.key}`,
      value: data.ENG,
    }),
  },
]

const generated_messages = R.reduce(
  (obj: any, { source, mapping }: any) => ({
    ...obj,
    ...R.reduce(
      (acc, element) => {
        const elem = mapping(element)
        return { ...acc, [elem.key]: elem.value }
      },
      {},
      source,
    ),
  }),
  {},
  config,
)

export default {
  en: {
    empty: ' ',
    'no-value': '|-no-value-|',
    ...RH.flattenObjectKeys(comp),
    ...RH.flattenObjectKeys(ui),
    ...RH.flattenObjectKeys(data),
    ...RH.flattenObjectKeys(selectt),
    ...RH.flattenObjectKeys(tkcc),
    ...generated_messages,
  },
}
