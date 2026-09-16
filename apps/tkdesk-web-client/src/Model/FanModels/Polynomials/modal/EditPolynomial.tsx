import { ConsoleLogger } from 'aws-amplify/utils'

import SubmitModal from 'Components/Modal/SubmitModal'
import { FieldSelectPolynomialType, FieldShowObjects } from 'Components/Field'
import { StyledRow } from 'Components/Styled'

const log = new ConsoleLogger('Model/Polynomials/modal/edit')

const EditPolynomial = (props: any) => {
  const { onCancel, modal, onEdit } = props
  log.info('render.props', props)

  const onSubmit = (values: any, frk: any) => {
    log.info('EditPolynomial.onSubmit', { values, frk, props })
    const { polynomial } = values

    onEdit(polynomial)
    onCancel()
  }

  return (
    <SubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title='ui.fan_models.polynomial.edit'
    >
      <StyledRow>
        <FieldSelectPolynomialType
          span={12}
          name='polynomial.polynomial_type'
          disabled
        />
      </StyledRow>

      <FieldShowObjects name='polynomial.poly_config' hideLabel />
    </SubmitModal>
  )
}

export default EditPolynomial
