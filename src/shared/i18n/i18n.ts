import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en'
import ptBR from './locales/pt-BR'

export const supportedLanguages = ['pt-BR', 'en'] as const
export type DisplayLanguage = (typeof supportedLanguages)[number]
export const preferenceKey = 'investment-planner.display-language'

export function readInitialLanguage(): DisplayLanguage {
  try {
    const saved = window.localStorage.getItem(preferenceKey)
    return supportedLanguages.includes(saved as DisplayLanguage) ? saved as DisplayLanguage : 'pt-BR'
  } catch {
    return 'pt-BR'
  }
}

void i18n.use(initReactI18next).init({
  resources: { 'pt-BR': { translation: ptBR }, en: { translation: en } },
  lng: readInitialLanguage(), fallbackLng: 'pt-BR', supportedLngs: [...supportedLanguages],
  interpolation: { escapeValue: false },
})

export function changeDisplayLanguage(language: DisplayLanguage): void {
  void i18n.changeLanguage(language)
  try { window.localStorage.setItem(preferenceKey, language) } catch { /* The in-session language change still succeeds. */ }
}

export default i18n

