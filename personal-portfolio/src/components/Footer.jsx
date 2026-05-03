import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.name}>Alicia Huang</span>
      <span className={styles.copy}>© {new Date().getFullYear()}</span>
    </footer>
  );
}