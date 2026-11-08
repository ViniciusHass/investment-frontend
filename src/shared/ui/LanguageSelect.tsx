import { useTranslation } from 'react-i18next'
import { changeDisplayLanguage, type DisplayLanguage } from '../i18n/i18n'
import styles from '../../app/AppShell.module.css'
export function LanguageSelect() {
 const { t, i18n } = useTranslation()
 return <label className={styles.languageControl}><span>{t('language.label')}</span><select value={i18n.language} onChange={(event) => changeDisplayLanguage(event.target.value as DisplayLanguage)}><option value="pt-BR">{t('language.portuguese')}</option><option value="en">{t('language.english')}</option></select></label>
}
