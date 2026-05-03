import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './About.module.css';

export default function About() {
  const ref = useScrollReveal();

  return (
    <section className={`${styles.about} reveal`} ref={ref} id="about">

      <div className={styles.imageWrapper}>
        <img
          src="/assets/me.jpg"
          alt="Profile"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <p>
          I am a Software Engineer with over 4 years of experience. Currently
          completing a Bachelor's in Computer Science and Design at the Washington University in St. Louis.
        </p>
        <p>NYC-based, and I love to oil paint.</p>
      </div>
    </section>
  );
}