import _ from 'lodash'
import { expect } from 'chai'

import deepValues from '../../../../src/Utils/RH/deepValues'

describe('deepValues', () => {
  it('empty object', () => {
    expect(deepValues({})).to.eql([])
  })
  it('object with some keys', () => {
    const obj = { a: 'A', b: 'B', c: 'C' }
    expect(deepValues(obj)).to.eql(_.values(obj))
  })

  it('object with object... with keys', () => {
    const obj = { a: 'A', h: { b: 'B', i: { c: 'C' } } }
    expect(deepValues(obj)).to.eql(['A', 'B', 'C'])
  })
})
