import * as R from 'ramda'
import * as RH from 'Utils/RH'
import { IntlProvider } from 'react-intl'

import localizations from 'Localization'

const createIntlProxy = ({
  children,
  commonMessages = {},
  messages: messagesProps = {},
}: {
  children: any
  commonMessages?: { [key: string]: any }
  messages?: { [key: string]: any }
}) => {
  const localeKey: any = 'it' as any

  const localeConfig = R.pipe(
    R.prop(localeKey),

    R.over<any, any>(
      R.lensProp('messages'),
      R.mergeDeepLeft(RH.flattenObjectKeys(commonMessages)),
    ),
    R.mergeDeepLeft(R.map<any, any>((m) => ({ messages: m }), messagesProps)),
  )(localizations)
  const { messages: messagesMerged, locale } = localeConfig

  return (
    <IntlProvider locale={locale} messages={messagesMerged}>
      {children}
    </IntlProvider>
  )
}

export default createIntlProxy
