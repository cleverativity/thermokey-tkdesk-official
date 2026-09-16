import { CloseOutlined } from '@ant-design/icons'
import _ from 'lodash'
import { Checkbox, List } from 'antd'
import { FormattedNumber } from 'react-intl'

import { Span } from 'Components/Span'
import { StyledButton } from 'Components/Styled'

const renderItem = (
  item,
  { autho, disabled = false, onToggle, onDeleteCustomAccessory },
) => {
  const { code, description, printCode, price, id, isCustomAccessory } = item

  const buttonId = _.kebabCase(String(id || 'custom-accessory'))

  return (
    <List.Item>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {isCustomAccessory ? (
            autho.iAmAdmin ? (
              <StyledButton
                id={`button.custom_created_accessories.delete.list.${buttonId}`}
                type='link'
                icon={<CloseOutlined />}
                onClick={() => onDeleteCustomAccessory?.(id)}
                style={{ padding: 0, minWidth: 'auto' }}
              />
            ) : null
          ) : (
            <Checkbox
              checked
              disabled={disabled}
              onChange={() => onToggle(id)}
            />
          )}
          <Span value={code} />
          <Span value={description} />
          <Span value={printCode} />
        </div>
        {!autho.iAmOem && (
          <FormattedNumber value={price} style='currency' currency='EUR' />
        )}
      </div>
    </List.Item>
  )
}

export { renderItem }
