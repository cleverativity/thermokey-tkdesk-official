import { FormattedMessage } from 'react-intl'
import * as Sentry from '@sentry/browser'
import type { FallbackProps } from 'react-error-boundary'

import { StyledButton } from 'Components/Styled'
import { Alert } from 'Components/Icons'

import { useAuthorization } from 'Modules/App/Authorization'

import styled from 'styled-components'
import colors from 'styles/colors.module.scss'

const StyledCard = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${colors.text};
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const autho = useAuthorization()
  const errorMessage = error instanceof Error ? error.message : 'Unexpected error'

  Sentry.captureException(error)

  return (
    <StyledCard>
      <Alert width={80} height={80} />

      <p
        style={{
          fontFamily: 'Avenir Heavy, sans-serif',
          fontSize: '30px',
          marginTop: '20px',
        }}
      >
        <FormattedMessage id='ui.generic.error' />
      </p>

      <p
        style={{
          fontFamily: 'Avenir Medium, sans-serif',
          fontSize: '20px',
          marginBottom: '10px',
        }}
      >
        <FormattedMessage id='ui.generic.error.generic' />
      </p>

      {autho.iAmAdmin ? (
        <p
          style={{
            color: colors.danger,
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {errorMessage}
        </p>
      ) : (
        <FormattedMessage id='ui.generic.error.description' />
      )}

      <StyledButton
        id='button.error'
        label='ui.generic.reload'
        onClick={resetErrorBoundary}
        style={{ marginTop: '20px' }}
      />
    </StyledCard>
  )
}

export default ErrorFallback
