import { Input } from 'antd'
import { useIntl } from 'react-intl'

const { Search } = Input

const StyledInputSearch = (props: any) => {
  const intl = useIntl()
  const { placeholder, query = '', name, onChangeQuery, ...other } = props
  return (
    <Search
      placeholder={intl.formatMessage({ id: placeholder })}
      defaultValue={query}
      onSearch={onChangeQuery}
      id={`input.search.${name}`}
      {...other}
    />
  )
}

export default StyledInputSearch
