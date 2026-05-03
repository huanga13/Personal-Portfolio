import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Experience.module.css';

const ROLES = [
  { 
    id: '01', 
    role: 'Security Engineer', 
    company: 'Amazon',
    desc: 'I built an automated framework tracking system using custom Semgrep rules to detect framework usage \
    within Amazon’s code base. I created \
    scalable infrastructure with many AWS services via a TypeScript CDK, optimizing ingestion pipelines to handle daily \
    API calls to capture deployment and CI/CD metadata. I also deployed an Athena-based querying solution that enabled engineers \
    to analyze framework dependencies across applications and services, improving visibility and guiding SAST vulnerability rule \
    development.'
  },
  { 
    id: '02', 
    role: 'Cybersecurity Researcher', 
    company: 'Montclair University',
    desc: 'Researched vulnerabilities in web applications and developed mitigation strategies for modern attack vectors.'
  },
  { 
    id: '03', 
    role: 'Tech Consultant', 
    company: 'Bear Studios',
    desc: 'Helped clients design secure and scalable software systems with a focus on architecture and risk reduction.'
  },
];

export default function Experience() {
  const titleRef = useScrollReveal(0.1);
  const listRef  = useScrollReveal(0.08);

  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={styles.section} id="experience">
      <h2 className={`${styles.title} reveal`} ref={titleRef}>
        Experience
      </h2>

      <ul className={`${styles.list} reveal`} ref={listRef}>
        {ROLES.map(({ id, role, company, desc }) => (
          <li
            key={id}
            className={`${styles.item} ${openId === id ? styles.open : ''}`}
            onClick={() => toggle(id)}
          >
            <div className={styles.content}>
              <span className={styles.role}>{role}</span>
              <span className={styles.company}>{company}</span>

              <div className={styles.desc}>
                {desc}
              </div>
            </div>

            <span className={styles.arrow} aria-hidden="true">
              {openId === id ? '↓' : '→'}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}