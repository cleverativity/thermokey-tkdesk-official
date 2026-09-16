import { SpanIntl } from 'Components/Span'
import { FieldSelectMacroSeries } from 'Components/Field'
import { StyledCard, StyledRow } from 'Components/Styled'

const MacroSeries = () => {
  return (
    <StyledCard>
      <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
        <SpanIntl
          style={{ fontWeight: 'bold' }}
          value='ui.selections.steps.macro_series.description'
        />
      </StyledRow>

      <StyledRow style={{ display: 'flex', justifyContent: 'center' }}>
        <FieldSelectMacroSeries
          required
          hideRequired
          name='macro_serie'
          span={12}
        />
      </StyledRow>
    </StyledCard>
  )
}

export default MacroSeries
