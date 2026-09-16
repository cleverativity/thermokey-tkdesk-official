/// <reference types="cypress" />

describe('Create SuperAdmin', () => {
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
    cy.login('superadmin', 'Password1!')
    cy.intercept('GET', `${endpoint}/who_am_i`).as('login')

    cy.wait('@login').then((response) => {
      const JWT = response.request.headers.authorization
      cy.request({
        method: 'POST',
        url: `${endpoint}/calculations/get_or_create`,
        body: {},
        headers: {
          'Content-Type': 'application/json',
          Authorization: JWT,
          Accept: 'application/json',
        },
      }).then((response) => {
        cy.log('getCalcResponse.response', { response }).then(() => {
          const CALC_ID_TO_RESET = response.body.id
          cy.request({
            method: 'POST',
            url: `${endpoint}/calculations/${CALC_ID_TO_RESET}/reset_status`,
            body: {
              status: 'created',
            },
            headers: {
              'Content-Type': 'application/json',
              Authorization: JWT,
              Accept: 'application/json',
            },
          })
          // return response
        })
      })
    })
    cy.intercept('GET', `${endpoint}/calculations/*`).as('resetStatus')
  })

  it('air_cooled_condenser mode:verify', () => {
    cy.wait('@resetStatus').then(() => {
      cy.inputSelect('cy.use_case', 'cy.air_cooled_condenser', '.ant-card-body')

      cy.get('[data-cy="cy.ui.coils.microchannel.steps.next"]').click()

      cy.get('[data-cy="cy.input_data.battery_active_length"')
        .clear()
        .type('2000')

      cy.get('[data-cy="cy.input_data.channel_discretization_count"')
        .clear()
        .type('100')

      cy.get(
        '[data-cy="cy.input_data.geom_types"] :nth-child(1) > .ant-checkbox > .ant-checkbox-input',
      ).check()

      cy.inputSelect('cy.input_data.n_of_tubes', 'cy.86', '.ant-collapse')

      cy.inputSelect('cy.input_data.fluid_c1', 'cy.r507a', '.ant-collapse')

      cy.get('[data-cy="cy.input_data.inlet_temperature_c1"').type('75')
      cy.get('[data-cy="cy.input_data.saturation_temperature_c1"').type('50')
      cy.get('[data-cy="cy.input_data.flow_rate_kgh_c1"').type('960')
      cy.get('[data-cy="cy.input_data.inlet_temperature_air"').type('35')
      cy.get('[data-cy="cy.input_data.altitude"').type('35')
      cy.get('[data-cy="cy.input_data.inlet_velocity_air"').type('2,3').blur()

      cy.get('[data-cy="cy.ui.coils.microchannel.steps.next"').click()

      // cy.intercept('POST', `${endpoint}/calculations/*`).as('createCalculation')

      cy.get('.ant-table-row-level-0 .ant-radio-input').check()

      cy.get('[data-cy="cy.ui.coils.microchannel.steps.next"]').click()
    })
  })

  it('air_cooled_condenser mode:design', () => {
    cy.wait('@resetStatus').then(() => {
      cy.inputSelect('cy.use_case', 'cy.air_cooled_condenser', '.ant-card-body')

      cy.get('[data-cy="cy.ui.coils.microchannel.steps.next"]').click()

      cy.get('[data-cy="cy.input_data.battery_active_length"')
        .clear()
        .type('2000')

      cy.get('[data-cy="cy.input_data.channel_discretization_count"')
        .clear()
        .type('100')

      cy.get(
        '[data-cy="cy.input_data.geom_types"] :nth-child(1) > .ant-checkbox > .ant-checkbox-input',
      ).check()

      cy.inputSelect('cy.input_data.n_of_tubes', 'cy.86', '.ant-collapse')

      cy.get('[data-cy="cy.input_data.mode"] > :nth-child(2)').click()
      cy.inputSelect('cy.input_data.fluid_c1', 'cy.r507a', '.ant-collapse')
      cy.get('[data-cy="cy.input_data.saturation_temperature_c1"').type('50')
      cy.get('[data-cy="cy.input_data.inlet_temperature_c1"').type('60')
      cy.get('[data-cy="cy.input_data.delta_temperature_c1"]').type('3')
      cy.get('[data-cy="cy.input_data.inlet_temperature_air"').type('30')
      cy.get('[data-cy="cy.input_data.altitude"').type('0')
      cy.get('[data-cy="cy.input_data.inlet_velocity_air"').type('2').blur()

      cy.get('[data-cy="cy.ui.coils.microchannel.steps.next"').click()

      cy.intercept('POST', `${endpoint}/calculations/*`).as('createCalculation')

      cy.wait(3000)
      cy.get('.ant-table-row-level-0 .ant-radio-input').check()

      //  cy.get(
      //     '.ant-table-row-selected > .ant-table-selection-column > .ant-radio-wrapper > .ant-radio > .ant-radio-input'
      //   ).check()

      cy.get('[data-cy="cy.ui.coils.microchannel.steps.next"]').click()
    })
  })
})
