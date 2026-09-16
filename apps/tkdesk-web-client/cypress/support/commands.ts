// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const login = (username: string, password: string) => {
  cy.get('input[name="username"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.get('button[type="submit"]').click()
}
Cypress.Commands.add('login', login)

const inputSelect = (
  fieldDataCy: string,
  optionDataCy: string,
  blurClick: string,
) => {
  cy.get(`[data-cy="${fieldDataCy}"]`).click()
  cy.get(`[data-cy="${optionDataCy}"]`).click()
  cy.wait(1000)
  cy.get(`${blurClick}`).click({ multiple: true, force: true })
  cy.wait(1000)
}
Cypress.Commands.add('inputSelect', inputSelect)

const selectMenuItem = (item: string, icon?: string) => {
  if (icon) {
    cy.get(icon).click({ force: true })
  }
  cy.get(`[data-cy="${item}-link"]`).click({ multiple: true })
}
Cypress.Commands.add('selectMenuItem', selectMenuItem)

const selectCheckbox = (
  fieldDataCy: string,
  values: any,
  isNumber?: boolean,
) => {
  cy.get(fieldDataCy)
    .find('input[type="checkbox"]')
    .each(($checkbox: any) => {
      const value = isNumber ? Number($checkbox.val()) : $checkbox.val()
      const shouldBeChecked = values.includes(value)
      const isChecked = $checkbox.is(':checked')

      if (shouldBeChecked && !isChecked) {
        cy.wrap($checkbox).check()
      } else if (!shouldBeChecked && isChecked) {
        cy.wrap($checkbox).uncheck()
      }
    })
}
Cypress.Commands.add('selectCheckbox', selectCheckbox)

const fillInput = (fieldDataCy: string, value: any) => {
  cy.get(fieldDataCy)
    .clear()
    .then(() => {
      if (value !== null && value !== undefined) {
        cy.get(fieldDataCy).type(value)
      }
    })
}
Cypress.Commands.add('fillInput', fillInput)

const fillTagsSelect = (fieldDataCy: string, values: any) => {
  cy.get(fieldDataCy)
    .click({ force: true })
    .find('.ant-select-selection-item-remove')
    .then(($removes: any) => {
      ;[...$removes].forEach((removeEl) => {
        cy.wrap(removeEl).click({ force: true })
      })
    })

  // Step 2: se ci sono nuovi valori, li aggiungi
  if (values && values.length) {
    values.forEach((val: any) => {
      cy.get(fieldDataCy)
        .click({ force: true })
        .find('input')
        .type(`${val}{enter}`, { force: true })
    })
  }
}

Cypress.Commands.add('fillTagsSelect', fillTagsSelect)
