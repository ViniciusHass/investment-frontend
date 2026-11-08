import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import styles from '../app/AppShell.module.css'
export function NotFoundPage() { const { t } = useTranslation(); return <><p className={styles.pageEyebrow}>{t('notFound.eyebrow')}</p><h1>{t('notFound.heading')}</h1><p className={styles.description}>{t('notFound.description')}</p><Link className={styles.recoveryLink} to="/">{t('notFound.homeLink')}</Link></> }
