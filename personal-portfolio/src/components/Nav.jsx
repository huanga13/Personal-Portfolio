import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.name}>
        <a href="#hero">Alicia<br />Huang</a>
      </div>
      <ul className={styles.links}>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#artwork">Artwork</a></li>
        <li><a href="#fun">Fun</a></li>
      </ul>
    </nav>
  );
}