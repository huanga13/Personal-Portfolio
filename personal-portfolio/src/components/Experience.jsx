import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Experience.module.css';

const ROLES = [
  { id: '01', role: 'Security Engineer',      company: 'Amazon' },
  { id: '02', role: 'Cybersecurity Researcher', company: 'Montclair University' },
  { id: '03', role: 'Tech Consultant',         company: 'Bear Studios' },
];

export default function Experience() {
  const titleRef  = useScrollReveal(0.1);
  const listRef   = useScrollReveal(0.08);

  return (
    <section className={styles.section} id="experience">
      <h2 className={`${styles.title} reveal`} ref={titleRef}>
        Experience
      </h2>

      <ul className={`${styles.list} reveal`} ref={listRef}>
        {ROLES.map(({ id, role, company }) => (
          <li key={id} className={styles.item}>
            <span className={styles.num}>{id}</span>
            <div className={styles.content}>
              <span className={styles.role}>{role}</span>
              <span className={styles.at}>@</span>
              <span className={styles.company}>{company}</span>
            </div>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </li>
        ))}
      </ul>
    </section>
  );
}