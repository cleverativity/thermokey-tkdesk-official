/// <reference types="cypress" />

describe('UserCreation', () => {
  // utenti admin --> user1046: staging, user1464: dev
  const user =
    Cypress.env('VITE_ENV') === 'development' ? 'user1464' : 'user1046'

  const endpoint =
    Cypress.env('VITE_ENV') === 'development'
      ? 'https://ip3vgyv00f.execute-api.eu-west-1.amazonaws.com/dev/api/v1'
      : Cypress.env('VITE_ENV') === 'staging'
        ? 'https://ip3vgyv00f.execute-api.eu-west-1.amazonaws.com/stag/api/v1'
        : 'https://ip3vgyv00f.execute-api.eu-west-1.amazonaws.com/prod/api/v1'

  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })

    cy.visit('/')
  })

  // it.only('request credentials', () => {
  //   cy.get('[data-cy="button.login.requestCredentials"]').click()

  //   cy.get('[data-cy="cy.registry.name"]').type('Cypress')
  //   cy.get('[data-cy="cy.registry.surname"]').type(
  //     `Test-${(Math.random() + 1).toString(36).substring(7)}`
  //   )

  //   cy.get('[data-cy="cy.registry.company_email"]').type(
  //     `simonetissi@archeido.com`
  //   )
  //   cy.get('[data-cy="cy.registry.company_telephone"]').type(`3333333333`)
  //   cy.get('[data-cy="cy.registry.company_name"]').type(`Cypress SRL`)

  //   cy.get('[data-cy="cy.ui.login.signin.confirm"]').click()

  //   cy.wait(2000)

  //   cy.get('.ant-modal-confirm-btns > .ant-btn').click()
  // })

  it('creation', () => {
    cy.login(user, 'Password1!')
    cy.intercept('GET', `${endpoint}/who_am_i`).as('login')

    cy.wait('@login').then(() => {
      cy.wait(1000)
      cy.get('ul.ant-menu li:nth-child(2)').click()

      cy.get('[data-cy="button.search.userNew"]').click()

      cy.inputSelect('cy.user_type', 'cy.oem', '.ant-card-body')

      cy.get('[data-cy="cy.registry.name"]').type('Cypress')
      cy.get('[data-cy="cy.registry.surname"]').type(
        `Test-${(Math.random() + 1).toString(36).substring(7)}`,
      )
      cy.get('[data-cy="cy.registry.company_email"]').type(
        `simonetissi@archeido.com`,
      )
      cy.get('[data-cy="cy.registry.company_telephone"]').type(`3333333333`)

      cy.get('.ant-picker-input > .ant-picker-clear').click()
      cy.get('[data-cy="cy.expiration_date"]').type(`30/11/2023`, {
        force: true,
      })

      cy.get('.ant-card-body').click({ multiple: true, force: true })

      cy.get(
        '[data-cy="cy.user_permissions.external.microchannel.double_flow"]',
      ).click()

      cy.get(
        '[data-cy="cy.user_permissions.microchannel.double_flow.df_rw.values[0].value"]',
      ).type('0.5')
      cy.get('[data-cy="cy.ui.users.confirm_creation"]').click()

      cy.intercept('POST', `${endpoint}/users`).as('userCreation')

      cy.wait('@userCreation').its('response.statusCode').should('eq', 201)
    })
  })
})
