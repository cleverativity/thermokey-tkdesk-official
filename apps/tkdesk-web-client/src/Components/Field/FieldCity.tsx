import { useState } from 'react'
import _ from 'lodash'
import debounce from 'debounce'
import { AutoComplete } from 'antd'
import { Index } from 'flexsearch'
import * as F from 'Model/functions'

import rawCity from 'Localization/Constants/city.json'

import { FormikField } from '../Formik'

interface City {
  key: string
  ITA: string
  state_code: string
  cab: string
  cap: string
}

const citiesIndex = new Index({
  // encode: 'advanced',
  tokenize: 'reverse',
})

for (let i = 0; i < rawCity.length; i++) {
  citiesIndex.add(i, rawCity[i].ITA)
}

const FieldCity = (props: any) => {
  const [state, setState] = useState<any>({ data: [] })

  const handleSearch = (value: string) => {
    if (_.isNil(value) || _.isEmpty(value) || value.length < 3) {
      setState({ data: [] })
    } else {
      const keys = citiesIndex.search(value, 20, {
        suggest: true,
      })
      const cityes: any = _.chain(keys)
        .map((key: any) => {
          const city: City = rawCity[key]
          const itaProp: string = _.property<City, string>('ITA')(city)
          return itaProp.startsWith(_.toUpper(value)) ? rawCity[key].ITA : null
        })
        .value()

      setState({ data: cityes })
    }
  }

  const { data } = state

  return (
    <FormikField
      {...props}
      component={AutoComplete}
      dataSource={data}
      validate={F.validateCharacters}
      transformTo={F.charactersReplacement}
      onSearch={debounce(handleSearch, 500)}
    />
  )
}

export default FieldCity
