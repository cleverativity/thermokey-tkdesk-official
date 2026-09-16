import * as RH from 'Utils/RH'
import comp from './it-IT.comp'
import ui from './it-IT.ui'
import data from './it-IT.data'
import selectt from './it-IT.select'
import tkcc from './it-IT.errors'

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
      value: data.ITA,
    }),
  },
  {
    source: rawPhaseType,
    mapping: (data: any) => ({
      key: `select.fan_models.phase_type.${data.key}`,
      value: data.ITA,
    }),
  },
  {
    source: rawVisibilityType,
    mapping: (data: any) => ({
      key: `select.fan_models.visibility.${data.key}`,
      value: data.ITA,
    }),
  },
  {
    source: rawFanType,
    mapping: (data: any) => ({
      key: `select.fan_models.fan_type.${data.key}`,
      value: data.ITA,
    }),
  },
  {
    source: rawLink,
    mapping: (data: any) => ({
      key: `select.fan_models.link.${data.key}`,
      value: data.ITA,
    }),
  },
  {
    source: rawPolynomialType,
    mapping: (data: any) => ({
      key: `select.polynomialType.${data.key}`,
      value: data.ITA,
    }),
  },
  {
    source: rawSupply,
    mapping: (data: any) => ({
      key: `select.ventilation.supply.${data.key}`,
      value: data.ITA,
    }),
  },
  {
    source: rawEnergyClass,
    mapping: (data: any) => ({
      key: `select.performance.min_energy_class.${data.key}`,
      value: data.ITA,
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
  it: {
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
