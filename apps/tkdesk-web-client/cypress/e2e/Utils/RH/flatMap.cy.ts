import _ from 'lodash'
import flatMap from '../../../../src/Utils/RH/flatMap'
import { expect } from 'chai'

describe('flatMap', () => {
  it('identity', () => {
    const list = [1]
    expect(flatMap((x) => [x], list)).to.eql(list)
  })
  it('flatten only one level', () => {
    const list = [[[1], [2]], [4]]
    expect(flatMap((x) => [x], list)).to.eql(list)
  })
  it('(1..3 times +1)', () => {
    expect(flatMap((x) => [x, x + 1, x + 2], [1, 2, 3])).to.eql([
      1, 2, 3, 2, 3, 4, 3, 4, 5,
    ])
  })

  it('combinations', () => {
    const letters = ['a', 'b', 'c']
    const numbers = [1, 2, 3]

    const lettersXnumbers = flatMap(
      (letter) => _.map(numbers, (number) => [number, letter]),
      letters
    )

    expect(lettersXnumbers).to.eql([
      [1, 'a'],
      [2, 'a'],
      [3, 'a'],
      [1, 'b'],
      [2, 'b'],
      [3, 'b'],
      [1, 'c'],
      [2, 'c'],
      [3, 'c'],
    ])
  })
})
