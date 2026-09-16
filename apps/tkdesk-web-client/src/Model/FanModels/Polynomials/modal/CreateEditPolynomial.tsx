import SubmitModal from 'Components/Modal/SubmitModal'
import { FieldSelectPolynomialType, FieldShowObjects } from 'Components/Field'
import { ConsoleLogger } from 'aws-amplify/utils'
import { StyledRow } from 'Components/Styled'

const log = new ConsoleLogger('Model/Polynomials/modal/createEdit')

const CreateEditPolynomial = (props: any) => {
  const { onCancel, modal, onCreate, onEdit, usedOptions, isNew } = props
  log.info('render.props', props)

  const onSubmit = (values: any, frk: any) => {
    log.info('createPolynomial.onSubmit', { values, frk, props })

    if (isNew) {
      const { fan_model_id } = values

      onCreate(fan_model_id, values)
    } else {
      const { polynomial } = values

      onEdit(polynomial)
    }

    onCancel()
  }

  return (
    <SubmitModal
      modal={modal}
      onSubmit={onSubmit}
      onCancel={onCancel}
      title={
        isNew
          ? 'ui.fan_models.polynomial.create'
          : 'ui.fan_models.polynomial.edit'
      }
    >
      <StyledRow>
        <FieldSelectPolynomialType
          span={12}
          required
          name='polynomial_type'
          usedOptions={usedOptions}
        />
      </StyledRow>

      <FieldShowObjects name='poly_config' hideLabel />
    </SubmitModal>
  )
}

export default CreateEditPolynomial
