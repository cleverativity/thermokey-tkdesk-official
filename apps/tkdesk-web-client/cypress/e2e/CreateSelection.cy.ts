import _ from 'lodash'
import {
  SUPERADMIN_USERNAME_DEV,
  SUPERADMIN_PSW_DEV,
} from '../support/constants'
import { data } from '../fixtures/selectionsInputData'

describe('Create Selection', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false
    })
    cy.visit('/')
    cy.login(SUPERADMIN_USERNAME_DEV, SUPERADMIN_PSW_DEV)

    cy.intercept('GET', `**/who_am_i`).as('login')
    cy.intercept('POST', `**/solve`).as('solve')
  })

  data.forEach(({ name, inputData }: any) => {
    it(`Dry cooler - ${name}`, () => {
      cy.selectMenuItem('selections', '[data-cy="selections-link"]', {
        timeout: 8000,
      })
      cy.get('[data-cy="selections/edit-link"]').click()

      cy.get('[data-cy="cy.macro_serie"]').click()
      cy.get(`.rc-virtual-list-holder-inner > :nth-child(1)`).click()

      cy.get('[data-cy="cy.ui.generic.next"]').click()

      // performance
      cy.fillInput(
        '[data-cy="cy.input_data.performance.capacity"]',
        inputData.capacity,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.performance.tolerance.min"]',
        inputData.tolerance.min,
      )
      cy.fillInput(
        '[data-cy="cy.input_data.performance.tolerance.max"]',
        inputData.tolerance.max,
      )

      cy.get('[data-cy="cy.input_data.performance.mode"]').click()
      cy.get(`[data-cy="cy.${inputData.mode}"]`).click({
        multiple: true,
        force: true,
      })

      cy.get('[data-cy="cy.input_data.performance.adiabatic_system"]').click()
      cy.get(`[data-cy="cy.${inputData.adiabatic_system}"]`).click({
        multiple: true,
        force: true,
      })

      cy.get('[data-cy="cy.input_data.performance.min_energy_class"]').click()
      cy.get(`[data-cy="cy.${inputData.min_energy_class}"]`).click({
        multiple: true,
        force: true,
      })

      // air
      cy.fillInput(
        '[data-cy="cy.input_data.air.inlet_temperature"]',
        inputData.air_inlet_temperature,
      )

      cy.fillInput('[data-cy="cy.input_data.air.humidity"]', inputData.humidity)

      cy.fillInput('[data-cy="cy.input_data.air.altitude"]', inputData.altitude)

      // fluid
      cy.get('[data-cy="cy.input_data.liquid.type"]').click()
      cy.get(`[data-cy="cy.${inputData.liquid_type}"]`).click({
        multiple: true,
        force: true,
      })

      cy.fillInput(
        '[data-cy="cy.input_data.liquid.inlet_temperature"]',
        inputData.inlet_temperature,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.liquid.outlet_temperature"]',
        inputData.outlet_temperature,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.liquid.max_pressure_drop"]',
        inputData.max_pressure_drop,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.liquid.volume_fraction"]',
        inputData.volume_fraction,
      )

      // dimensions
      cy.selectCheckbox(
        '[data-cy="cy.input_data.dimensions.series_ids"]',
        inputData.series_ids,
        true,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.dimensions.max_length"]',
        inputData.max_length,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.dimensions.max_height"]',
        inputData.max_height,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.dimensions.max_width"]',
        inputData.max_width,
      )

      // cy.selectCheckbox(
      //   '[data-cy="cy.input_data.dimensions.is_container_width"]',
      //   inputData.is_container_width,
      // )

      // fans
      cy.get('[data-cy="cy.input_data.ventilation.type"]').click()
      cy.get(`[data-cy="cy.${inputData.ventilation_type}"]`).click({
        multiple: true,
        force: true,
      })

      cy.get('[data-cy="cy.input_data.ventilation.frequency"]').click()
      cy.get(`[data-cy="cy.${inputData.frequency}"]`).click({
        multiple: true,
        force: true,
      })

      cy.get('[data-cy="cy.input_data.ventilation.supply"]').click()
      cy.get(`[data-cy="cy.${inputData.supply}"]`).click({
        multiple: true,
        force: true,
      })

      cy.selectCheckbox(
        '[data-cy="cy.input_data.ventilation.filters"]',
        inputData.filters,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.max_power_consumption"]',
        inputData.max_power_consumption,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.max_current_consumption"]',
        inputData.max_current_consumption,
      )

      cy.fillInput('[data-cy="cy.input_data.ventilation.esp"]', inputData.esp)

      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.velocity.min"]',
        inputData.velocity.min,
      )
      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.velocity.max"]',
        inputData.velocity.max,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.diameter.min"]',
        inputData.diameter.min,
      )
      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.diameter.max"]',
        inputData.diameter.max,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.fan_numbers.min"]',
        inputData.fan_numbers.min,
      )
      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.fan_numbers.max"]',
        inputData.fan_numbers.max,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.ventilation.fan_rows"]',
        inputData.fan_rows,
      )

      // noise
      cy.fillInput(
        '[data-cy="cy.input_data.noise.max_sound_power"]',
        inputData.max_sound_power,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.noise.max_sound_pressure"]',
        inputData.max_sound_pressure,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.noise.distance"]',
        inputData.distance,
      )

      cy.fillInput(
        '[data-cy="cy.input_data.noise.tolerance"]',
        inputData.noise_tolerance,
      )

      // coil
      cy.selectCheckbox(
        '[data-cy="cy.input_data.coil.fluid_steps"]',
        inputData.fluid_steps,
      )

      cy.get('[data-cy="cy.input_data.coil.tube_material"]').click()
      cy.get(`[data-cy="cy.${inputData.tube_material}"]`).click({
        multiple: true,
        force: true,
      })

      cy.fillTagsSelect(
        '[data-cy="cy.input_data.coil.geometries_ids"]',
        inputData.geometries_ids,
      )

      cy.get('[data-cy="cy.input_data.coil.fin_material"]').click()
      cy.get(`[data-cy="cy.${inputData.fin_material}"]`).click({
        multiple: true,
        force: true,
      })

      cy.fillTagsSelect('[data-cy="cy.input_data.coil.fpi"]', inputData.fpi)

      cy.get('form').click({ multiple: true, force: true })

      cy.get('[data-cy="cy.ui.generic.next"]').click()

      cy.wait('@solve').its('response.statusCode').should('eq', 200)

      cy.get(
        ':nth-child(2) > .ant-table-selection-column > .ant-checkbox-wrapper',
      ).click()

      cy.get('.ant-radio-button-wrapper').click()

      cy.get('[data-cy="cy.ui.generic.next"]').click()
    })
  })

  // it('Air cooler condenser', () => {
  //   cy.get('[id="button.dashboard.go_ventilations"]').click()

  //   cy.get('[data-cy="cy.macro_serie"]').click()

  //   cy.get(`.rc-virtual-list-holder-inner > :nth-child(2)`).click()

  //   cy.get('[data-cy="cy.ui.generic.next"]').click()

  //   cy.get('[data-cy="cy.ui.generic.next"]').click()
  // })
})
