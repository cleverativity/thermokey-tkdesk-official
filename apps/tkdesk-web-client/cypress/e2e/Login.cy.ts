/// <reference types="cypress" />

describe('Login', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.login('test', 'Password1!')
  })

  it('password error', () => {
    cy.visit('/')
    cy.login('test', 'Passw!')
    cy.wait(1500)
  })

  it('user error', () => {
    cy.visit('/')
    cy.login('tester', 'Password1!')
    cy.wait(1500)
  })
})
