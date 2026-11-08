import { useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import styles from './AppShell.module.css'
import { LanguageSelect } from '../shared/ui/LanguageSelect'

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  useEffect(() => { document.documentElement.lang = i18n.language; document.title = t('app.title') }, [i18n.language, t])
  return <div className={styles.shell}>
    <a className={styles.skipLink} href="#main">{t('navigation.skipToContent')}</a>
    <header className={styles.header}><Link className={styles.brand} to="/"><span className={styles.brandMark} aria-hidden="true">IF</span><span>{t('app.title')}</span></Link><LanguageSelect /></header>
    <div className={styles.layout}>
      <nav className={styles.navigation} aria-label={t('navigation.primary')}><ul>
        <li><Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined}>{t('navigation.home')}</Link></li>
        <li><span className={styles.disabled} aria-disabled="true">{t('navigation.portfolio')} <span>{t('navigation.comingSoon')}</span></span></li>
        <li><span className={styles.disabled} aria-disabled="true">{t('navigation.strategy')} <span>{t('navigation.comingSoon')}</span></span></li>
      </ul></nav>
      <main className={styles.main} id="main" tabIndex={-1}>{children}</main>
    </div>
    <footer className={styles.footer}>{t('app.disclaimer')}</footer>
  </div>
}
