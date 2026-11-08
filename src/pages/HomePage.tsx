import { useTranslation } from 'react-i18next'
import styles from '../app/AppShell.module.css'
export function HomePage() { const { t } = useTranslation(); return <><p className={styles.pageEyebrow}>{t('home.eyebrow')}</p><h1>{t('home.heading')}</h1><p className={styles.description}>{t('home.description')}</p><p className={styles.statusBadge} role="status">{t('home.ready')}</p><section className={styles.homeCard} aria-labelledby="next-heading"><h2 id="next-heading">{t('home.nextHeading')}</h2><p>{t('home.nextText')}</p></section></> }
