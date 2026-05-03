import { useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Artwork.module.css';

// ── Swap these imports for your actual artwork images ──────
// import img1 from '../../assets/artwork/01.jpg';
// ...
// Then replace the placeholder array below with [img1, img2, ...]
const ARTWORK_IMAGES = Array(9).fill(null);

function ArtworkCell({ src, index }) {
  const cellRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cellRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    cellRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    cellRef.current.style.transform = '';
  };

  return (
    <div
      ref={cellRef}
      className={styles.cell}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {src ? (
        <img src={src} alt={`Artwork ${index + 1}`} className={styles.cellImg} />
      ) : (
        <div className={styles.cellEmpty} />
      )}
    </div>
  );
}

export default function Artwork() {
  const headerRef = useScrollReveal(0.1);
  const gridRef   = useScrollReveal(0.05);

  return (
    <section className={styles.section} id="artwork">
      <div className={`${styles.header} reveal`} ref={headerRef}>
        <h2 className={styles.title}>Artwork</h2>
        <div className={styles.desc}>
          <p>
            I am a Software Engineer with over 4 years of experience. Currently
            completing a Bachelor's in Computer Science and Design.
          </p>
          <p>Always curious and learning.</p>
        </div>
      </div>

      <div className={`${styles.grid} reveal`} ref={gridRef}>
        {ARTWORK_IMAGES.map((src, i) => (
          <ArtworkCell key={i} src={src} index={i} />
        ))}
      </div>
    </section>
  );
}