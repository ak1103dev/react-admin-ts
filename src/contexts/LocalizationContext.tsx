import React, { useState, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import i18n from 'i18n-js'
import en from '../translations/en.json'
import th from '../translations/th.json'

i18n.fallbacks = true
i18n.translations = { th, en }

interface Context {
  t: (scope: i18n.Scope, options?: i18n.TranslateOptions) => string
  locale: string
  setLocale: React.Dispatch<React.SetStateAction<string>>
}
interface Props {
  children: JSX.Element
}

const LocalizationContext = React.createContext<Context | null>(null)

export function LocalizationProvider({ children }: Props): JSX.Element {
  const [locale, setLocale] = useState<string>('th')
  const localizationContext = useMemo(
    () => ({
      t: (scope: i18n.Scope, options?: i18n.TranslateOptions) =>
        i18n.t(scope, { locale, ...options }),
      locale,
      setLocale,
    }),
    [locale]
  )

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {children}
    </LocalizationContext.Provider>
  )
}

export const useLocalization = (): Context => {
  const context = useContext(LocalizationContext)
  if (!context) {
    throw new Error('useLocalization should be use in side auth context')
  }
  return context
}

LocalizationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}
