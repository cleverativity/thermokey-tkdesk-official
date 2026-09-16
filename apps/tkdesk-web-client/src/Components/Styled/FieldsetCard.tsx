import { WarningOutlined } from '@ant-design/icons'
import { Span, SpanIntl, SpanNumber } from 'Components/Span'
import React from 'react'
import styled from 'styled-components'
import colors from 'styles/colors.module.scss'

export interface FieldsetCardItem {
  labelId: string
  value?: string | number | null
  unit?: string
  scale?: number
  isPointed?: boolean
}

interface FieldsetCardProps {
  title: string
  icon?: React.ReactNode
  items: FieldsetCardItem[]
  rightItems?: FieldsetCardItem[]
  warningId?: string
  empty?: string
}

const Frame = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin-top: 10px;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 24px 20px 16px;
  background: ${colors.white};
`

const Legend = styled.div`
  position: absolute;
  top: 0;
  left: 16px;
  transform: translateY(-50%);
  background: ${colors.white};
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Avenir Heavy', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${colors.text};
  line-height: 1;
`

const Columns = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px 48px;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  font-family: 'Avenir Medium', sans-serif;
  font-size: 14px;
  color: ${colors.text};
  line-height: 1.4;
`

const Label = styled.span`
  flex: 0 1 auto;
`

const Value = styled.span`
  flex: 1 1 auto;
  text-align: right;
  font-weight: 700;
  word-break: break-word;
`

const Unit = styled.span`
  margin-left: 6px;
  font-weight: 400;
  font-style: italic;
`

const Warning = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  color: ${colors.warning};
  font-family: 'Avenir Medium', sans-serif;
  font-size: 14px;
  line-height: 1.4;
`

function renderItems(items: FieldsetCardItem[], empty: string) {
  return items.map((item) => (
    <Row key={item.labelId}>
      <Label>
        <SpanIntl value={item.labelId} />
      </Label>
      <Value>
        {typeof item.value === 'number' ? (
          <>
            <SpanNumber
              value={item.value}
              scale={item.scale ?? 1}
              isPointed={item.isPointed ?? true}
            />
            {item.unit ? <Unit>{item.unit}</Unit> : null}
          </>
        ) : (
          <>
            <Span value={item.value} empty={empty} />
            {item.unit && item.value != null ? <Unit>{item.unit}</Unit> : null}
          </>
        )}
      </Value>
    </Row>
  ))
}

function FieldsetCard(props: FieldsetCardProps) {
  const { title, icon, items, rightItems, warningId, empty = '-' } = props

  return (
    <Frame>
      <Legend>
        {icon}
        <SpanIntl value={title} />
      </Legend>
      {rightItems ? (
        <Columns>
          <Rows>{renderItems(items, empty)}</Rows>
          <Rows>{renderItems(rightItems, empty)}</Rows>
        </Columns>
      ) : (
        <Rows>{renderItems(items, empty)}</Rows>
      )}
      {warningId ? (
        <Warning>
          <WarningOutlined />
          <SpanIntl value={warningId} />
        </Warning>
      ) : null}
    </Frame>
  )
}

export default FieldsetCard
