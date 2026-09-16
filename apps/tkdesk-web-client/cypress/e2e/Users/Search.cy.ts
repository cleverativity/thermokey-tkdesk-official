/// <reference types="cypress" />

describe('UserSearch', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
  })

  // it('go to list', () => {
  //   cy.visit('/')
  //   cy.login('test', 'Archeido123')
  //   cy.intercept('POST', 'https://cognito-*').as('login')
  //   cy.wait('@login').then(() => {
  //     cy.get('ul.ant-menu li:nth-child(2)').click()
  //   })
  //   cy.wait(1000)
  // })

  // it('go to creation', () => {
  //   cy.visit('/')
  //   cy.login('test', 'Archeido123')
  //   cy.intercept('POST', 'https://cognito-*').as('login')
  //   cy.wait('@login').then(() => cy.get('ul.ant-menu li:nth-child(2)').click())
  //   cy.get('button[id="button.search.userNew"]').click()
  // })

  // it('go to edit', () => {
  //   cy.visit('/')
  //   cy.login('test', 'Password1!')
  //   cy.intercept('POST', 'https://cognito-*').as('login')
  //   cy.wait('@login').then(() => cy.get('ul.ant-menu li:nth-child(2)').click())
  //   cy.get('button[id="actios-id"]').first().click()
  // })
})
