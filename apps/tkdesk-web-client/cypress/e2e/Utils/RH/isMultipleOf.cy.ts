import * as R from 'ramda'

import isMultipleOf from '../../../../src/Utils/RH/isMultipleOf'
import { expect } from 'chai'

describe('isMultipleOf', () => {
  describe('integers', () => {
    it('correct ones', () => {
      expect(isMultipleOf(1, 1)).to.equal(true)
      expect(isMultipleOf(526544, 1)).to.equal(true)

      expect(isMultipleOf(26, 13)).to.equal(true)
      expect(isMultipleOf(20, 10)).to.equal(true)
      expect(isMultipleOf(20, 10)).to.equal(true)
    })

    it('wrong ones', () => {
      expect(isMultipleOf(0, 1)).to.equal(false)
      expect(isMultipleOf(10, 20)).to.equal(false)
    })
  })

  describe('floats', () => {
    it('correct ones', () => {
      expect(isMultipleOf(0.1, 0.1, 1)).to.equal(true)
      expect(isMultipleOf(1.3, 1.1, 0)).to.equal(true)
      expect(isMultipleOf(2.2, 1.11, 1)).to.equal(true)
    })

    it('wrong ones', () => {
      expect(isMultipleOf(0.1, 0.1)).to.equal(false)
      expect(isMultipleOf(2.2, 1.11, 2)).to.equal(false)
    })
  })
})
