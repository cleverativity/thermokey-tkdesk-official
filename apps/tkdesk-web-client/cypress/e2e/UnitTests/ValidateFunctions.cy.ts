import * as V from '../../../src/Components/Field/ValidateFunctions'
import { expect } from 'chai'

describe('validateNumberMinMax', () => {
  it('No Error', () => {
    expect(V.validateNumberMinMax(20, 30)(25)).to.eql(undefined)
  })

  it('Greater than', () => {
    expect(V.validateNumberMinMax(20, 30)(10)).to.eql(
      'data.generic.form.message.validation.number.greaterThan',
    )
  })

  it('Lesser than', () => {
    expect(V.validateNumberMinMax(20, 30)(40)).to.eql(
      'data.generic.form.message.validation.number.lesserThan',
    )
  })

  it('Null max no error', () => {
    expect(V.validateNumberMinMax(20, null)(40)).to.eql(undefined)
  })

  it('Null min no error', () => {
    expect(V.validateNumberMinMax(null, 30)(20)).to.eql(undefined)
  })

  it('Null max error', () => {
    expect(V.validateNumberMinMax(20, null)(10)).to.eql(
      'data.generic.form.message.validation.number.greaterThan',
    )
  })

  it('Null min error', () => {
    expect(V.validateNumberMinMax(null, 30)(40)).to.eql(
      'data.generic.form.message.validation.number.lesserThan',
    )
  })
})

describe('validateNumberBetween', () => {
  it('No Error', () => {
    expect(V.validateNumberBetween(20, 30)(25)).to.eql(undefined)
  })

  it('Error', () => {
    expect(V.validateNumberBetween(20, 30)(40)).to.eql(
      'data.generic.form.message.validation.number.between',
    )
  })

  it('Null', () => {
    expect(V.validateNumberBetween(null, 30)(40)).to.eql(undefined)
  })

  it('Null', () => {
    expect(V.validateNumberBetween(20, 30)(null)).to.eql(undefined)
  })
})
