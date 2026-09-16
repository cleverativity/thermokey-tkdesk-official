import EnLang from './Lang/en-US'
import ItLang from './Lang/it-IT'
import { ConsoleLogger } from 'aws-amplify/utils'

const log = new ConsoleLogger('Localization/index')

const AppLocale = {
  en: EnLang,
  it: ItLang,
}

log.info('Localisations', AppLocale)

export default AppLocale
