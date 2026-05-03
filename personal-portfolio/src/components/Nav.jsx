import styles from './Nav.module.css';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.name}>
        <a href="#home">Alicia<br />Huang</a>
      </div>
      <ul className={styles.links}>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#artwork">Artwork</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}