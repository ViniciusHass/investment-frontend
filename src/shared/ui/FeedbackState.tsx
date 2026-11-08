import { useTranslation } from 'react-i18next'
import styles from './FeedbackState.module.css'
export type FeedbackKind = 'empty' | 'loading' | 'error' | 'unavailable' | 'stale'
type Props = { kind: FeedbackKind; onRetry?: () => void }
const messages: Record<FeedbackKind, [string, string]> = { empty: ['state.emptyTitle','state.emptyMessage'], loading: ['state.loadingTitle','state.loadingMessage'], error: ['state.errorTitle','state.errorMessage'], unavailable: ['state.unavailableTitle','state.unavailableMessage'], stale: ['state.staleTitle','state.staleMessage'] }
export function FeedbackState({kind,onRetry}:Props) { const {t}=useTranslation(); const [title,message]=messages[kind]; return <section className={styles.feedback} role={kind==='error'?'alert':'status'} aria-live={kind==='error'?'assertive':'polite'}><h2>{t(title)}</h2><p>{t(message)}</p>{kind==='error'&&onRetry&&<button type="button" onClick={onRetry}>{t('state.retry')}</button>}</section> }


