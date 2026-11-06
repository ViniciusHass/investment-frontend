import styles from './App.module.css'

export default function App() {
  return (
    <main className={styles.shell}>
      <header className={styles.topbar}><span className={styles.brandMark} aria-hidden="true">IF</span><span>Investment Planner</span></header>
      <section className={styles.welcome} aria-labelledby="welcome-title">
        <p className={styles.eyebrow}>Portfolio planning workspace</p>
        <h1 id="welcome-title">A clearer view of your investment plan starts here.</h1>
        <p className={styles.description}>This workspace is being prepared. Portfolio planning tools will appear here as they are built.</p>
        <div className={styles.status} role="status"><span className={styles.statusDot} />Foundation ready</div>
      </section>
      <footer>Investment decisions remain yours. This workspace does not provide financial advice.</footer>
    </main>
  )
}
