# VERSIONI RILASCIATE

## 1.18.0

### Added

- import of fan models by csv or xls file
- PR Cleverativity

### Fixed

- missing show error in creation of a polynomial

## 1.17.2

### Fixed

- hidden selections for oem

## 1.17.1

### Fixed

- sorting in 3 step table of selections
- changed some labels inn detail of selections

## 1.17.0

### Added

- corrective factors for selections global and for user
- choice between flow rate/outlet temp in liquid and humidity/wet bulb in air
- db regulations regarding distance, including for input
- total number of fans in the selection details
- some fields to display in the detail tables for step 3 of the selections
- entry coditions for the third stage of the selection process
- possibility to add custom accessories
- PR Cleverativity

### Changed

- names of the correction factor tabs
- italian translation for pressure drops
- italian translation for fan rows

## 1.16.0

### Added

- search bar for acccessories in selections
- list of selected accessories inn selections
- PR Cleverativity

### Fixed

- rounding for fields in input data and detail of a selection

### Changed

- name for some fields in selections
- manual link in footer

## 1.15.0

### Added

- new fields for new version of API for selections

### Fixed

- hidden print code for OEM users in selections accessories
- deselection of an accessory, now if an accessory is deselected it reverts to disabling/deselecting dependent accessories

### Changed

- showed order instead of id for accessories (selections)
- ordered accessories by order (selections)
- rounding for fields in detail of a selection

## 1.14.3

### Fixed

- validations, now cross-validations also respect the min and max set by the backend
- mantained data after solve fail

## 1.14.2

### Fixed

- deselection of accessories, now data send to back are only selected accessories (for selections)

### Added

- PR Cleverativity

## 1.14.1

### Fixed

- rounded imperial tube pitch

### Added

- validations in detail list for inlet velocity air (calculations)

## 1.14.0

### Fixed

- positin of three models selected in 3 step of selections
- downolad pdf inn selections

### Added

- cardano selections

## 1.13.2

### Fixed

- refrigerant name showed in 3 step of calculations

## 1.13.1

### Fixed

- corrective factors

## 1.13.0

### Added

- oem+ user
- possibility to change accessories prices
- managed prices for selections with discounts
- accessories dependencies

### Changed

- hidden section "selections" for non admin users

### Fixed

- colors and field inputs in accessories table

## 1.12.0

### Added

- table for accessories in selections 4 step

### Changed

- values for `adiabatic_system` in selections
- default value of direction in DF refrigerant circuit
- data showed in models list of calculations. Now the parameters have been corrected with the tuning parameters:
  - `heat_transfer_rate` → `global_heat_flux_c1`
  - `ad_pressure_drops_air` → `pressure_drops_air`
- icon in sidebar for selections

## 1.11.0

### Changed

- data showed in 3 step of FC
- inlet air velocity showed in detail of FC second core

### Added

- test E2E for selections
- overwrite number of tubes in FC

### Fixed

- directions for DF in refrigerant circuit
- images showed in detail of a calculation based on use case
- name of use case showed in steps component

## 1.10.0

### Changed

- data in second step of selections
- order of data showed in fourth step of selections
- unified field checkbox and field checkboxGroup

### Added

- test E2E for selections

### Fixed

- alignment of the port input fields in the refrigerant circuit section
- data selected in third step of selections, now is used `id` instead of `model_code`
- air input in DF circuit
- corrective factors in user creation

## 1.9.0

### Changed

- **Breaking**: refactor of second step
- third step for FC
- fourth step for FC
- removed expiration date for OEM users
- field for filter diamiter and voltage in fan models and fan management modal
- corrective factors for FC, now is possible enable/disable geometries based on core key

### Added

- tracking of solve
- ul filter on fan models
- heat transfer rate in third step of DF

### Fixed

- graph of interpolation in fan management modal

## 1.8.3

### Changed

- removed expiration date for OEM users

## 1.8.2

### Fixed

- validation for glycol percentage for oem
- inlet diamiter showed in fourth step

## 1.8.1

### Changed

- air flow visualization
- validations for battery length

### Added

- description for liquid heater in first step

## 1.8.0

### Changed

- validations in second step
- removed user type in user info card
- **Breaking**: refrigerant circuit section. Now geometries are group by the tube pitch

### Added

- coil_volume_c2 in detail of double flow
- the possibility to change n of steps for admin/superadmin

## 1.7.1

### Fixed

- removed opposite values for some mode in solve call
- label of saturation pressure in the 4 step of calculations
- edit of corrective factors in user detail

### Changed

- added labels in polinomials graph
- validations for delta temp in liquid heater
- **Breaking**: updated some dependencies

### Added

- enpoints for 1st and 2nd step in selections
- page with configured selections

## 1.7.0

### Added

- error boundary to avoid white page due to an error
- new component for validate phone numbers
- warning message for inlet velocity
- print_code in detail of fans

### Changed

- removed engine version
- ui for the table of refrigerants
- managed responsive
- **Breaking**: geometry names

### Fixed

- filters in fan management modal
- selected voice on sidebar
- limits of delta temperature

## 1.6.1

### Changed

- hidden selections section
- validations for desuperheating
- endpoints and structure of polynomials

## 1.6.0

### Changed

- details using antd description component

## 1.5.0

### Added

- warning message for interpolation not found
- warning banner in 4 step if PdC is too low
- notification for pending users
- graph for interpolation

### Fixed

- removed desuperheating/subcoolign from free cooling condenser
- filters in fan management modal
- enabled button for open fan management modal only if there is a single geometry selected

## 1.4.1

### Fixed

- selection of inlet temp/desuperheating and delta temp/outlet temp
- responsive version of polynomial graph
- some ui elements

## 1.4.0

### Added

- regeneration pdf
- solve with fan model
- detail page with fan models data
- management of humid air
- added the ability to choose between inlet temp/desuperheating and delta temp/outlet temp

## 1.3.0

### Changed

- **Breaking**: update dependencies
- **Breaking**: separated gestion of geometry hp and lp
- **Breaking**: refactor section calculations

### Added

- section for fan models
- section for polynomials
- fan management modal in the second step of calculations
- section for manage refrigerants visibility
- global default values for use cases and geometries
- validations in form request credentials

## 1.2.0

- **Breaking**: update amplify
- removed new relic

### Fixed

- bug on onChange tubes number
- error where the language showed in the download message was incongruent

### Added

- graphql for download of PDF

### Changed

- behaviour of the override steps
- limit of delta temp c1 for admin users

## 1.1.0

### Changed

- **Breaking**: refactor input_data to be an array

### Added

- managed input_data if solve fail
- front version in the footer

## 0.7.0

- added double Core in models list

## 0.6.0

- added multiple corrective factors
- added double flow calculation
- various fixes

## 0.5.0

- added double flow ui and logic

## 0.4.0

- download PDF
- interfacce doppio flusso

## 0.3.0

- Ordini e refactor calcoli.

## 0.2.0

- Calcoli.

## 0.1.0

- Setup inziale.
