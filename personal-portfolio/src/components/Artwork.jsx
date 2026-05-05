import { useRef, useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Artwork.module.css';

const ARTWORK_IMAGES = [
  '../../public/assets/painting1.jpg',
  '../../public/assets/painting2.jpg',
  '../../public/assets/painting3.jpg',
  '../../public/assets/painting4.jpg',
  '../../public/assets/painting5.jpg',
  '../../public/assets/painting6.jpg'
];

function ArtworkCell({ src, index, onOpen }) {
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

  const handleClick = () => {
    if (src) onOpen(src);
  };

  return (
    <div
      ref={cellRef}
      className={styles.cell}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
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

  const [lightbox, setLightbox] = useState(null);
  const [open, setOpen]         = useState(false);

  const openLightbox = (src) => {
    setLightbox(src);
    requestAnimationFrame(() => setOpen(true));
  };

  const closeLightbox = () => {
    setOpen(false);
    setTimeout(() => setLightbox(null), 350);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className={styles.section} id="artwork">
      <div className={styles.header}>
        <h2 className={styles.title}>Artwork</h2>
        <div className={styles.desc}>
          <p>I love to oil paint. I am always creating.</p>
          <p>Always curious and learning.</p>
        </div>
      </div>

      <div className={`${styles.grid} reveal`} ref={gridRef}>
        {ARTWORK_IMAGES.map((src, i) => (
          <ArtworkCell key={i} src={src} index={i} onOpen={openLightbox} />
        ))}
      </div>

      {lightbox && (
        <div
          className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
          onClick={closeLightbox}
        >
          <button className={styles.closeBtn} onClick={closeLightbox}>×</button>
          <img
            src={lightbox}
            alt="Artwork enlarged"
            className={`${styles.lightboxImg} ${open ? styles.lightboxImgOpen : ''}`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}