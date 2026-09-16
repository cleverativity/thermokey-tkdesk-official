import { useId } from 'react'
import { StyledButton } from 'Components/Styled'
import { useFormikContext } from 'formik'

import { useAuthorization } from 'Modules/App/Authorization'

const DetailedButtons = ({ onGeneratePdf }) => {
  const formikContext: any = useFormikContext()
  const autho = useAuthorization()
  const session_id = useId()

  const { values } = formikContext
  const { id, detail_data } = values

  return (
    <>
      {autho.iAmOem ? null : (
        <StyledButton
          id='button.offer'
          type='primary'
          label='ui.selections.offer'
          onClick={() =>
            onGeneratePdf({
              id,
              template: 'offer',
              selections: detail_data,
              session_id,
            })
          }
          style={{ marginRight: 20 }}
        />
      )}
      <StyledButton
        id='button.datasheet'
        type='primary'
        label='ui.selections.datasheet'
        onClick={() =>
          onGeneratePdf({
            id,
            template: 'datasheet',
            selections: detail_data,
            session_id,
          })
        }
      />
    </>
  )
}

export default DetailedButtons
