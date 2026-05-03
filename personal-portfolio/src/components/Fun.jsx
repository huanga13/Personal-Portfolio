import styles from './Fun.module.css';

export default function Fun() {
  return (
    <footer className={styles.footer}>
      <span className={styles.name}>Alicia Huang</span>
      <span className={styles.copy}>© {new Date().getFullYear()}</span>
    </footer>
  );
}