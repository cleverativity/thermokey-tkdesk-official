import stripTrailingDot from '../../../../src/Utils/RH/stripTrailingDot'
import { expect } from 'chai'

describe('stripTrailingDor', () => {
  it('should strip the dot', () => {
    expect(stripTrailingDot('.')).to.equal('')
    expect(stripTrailingDot('hello.')).to.equal('hello')
    expect(stripTrailingDot('hello.friend.')).to.equal('hello.friend')
  })

  it('should not strip the dot', () => {
    expect(stripTrailingDot('')).to.equal('')
    expect(stripTrailingDot('hello')).to.equal('hello')
    expect(stripTrailingDot('hello.friend')).to.equal('hello.friend')
  })
})
