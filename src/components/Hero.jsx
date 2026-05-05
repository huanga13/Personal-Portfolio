import styles from './Hero.module.css';

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { ColladaLoader } from 'three/addons/loaders/ColladaLoader.js';
import { useEffect, useRef } from "react";

function ThreeModel() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 4.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(5, 5, 5);
    scene.add(topLight);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.autoRotate = true;  // Maybe change
    controls.autoRotateSpeed = 1;
    controls.target.set(0, -0.2, 0); // Adjust orbit target to focus on dog

    const loader = new GLTFLoader();
    let mixer;
    loader.load("/assets/labrador/scene.gltf", (gltf) => {
      const object = gltf.scene;
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      object.position.sub(center);
      
      object.scale.setScalar(5 / Math.max(size.x, size.y, size.z));
      
      object.position.set(0.3, -1.2, 0);
      
      scene.add(object);
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    (error) => {
      console.error("GLTF error:", error);
    });

    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.threemodel} />;
}


export default function Hero() {
  return (
    <section className={styles.hero} id="home">

      <div className={styles.container3d} aria-hidden="true">
        <ThreeModel />
      </div>

      <h1 className={styles.title}>
        <span className={`${styles.line} ${styles.delay1}`}>Software</span>
        <span className={`${styles.line} ${styles.delay2}`}>Engineer</span>
        <span className={`${styles.line} ${styles.amp} ${styles.delay3}`}>            &amp;</span>
        <span className={`${styles.line} ${styles.delay4}`}>Cybersecurity</span>
        <span className={`${styles.line} ${styles.delay5}`}>Enthusiast</span>
      </h1>

      <span className={`${styles.scroll} ${styles.delay6}`} aria-hidden="true">
        <a href="#about">Scroll</a>
        <img
          src="/assets/arrow.svg"
          alt=""
          className={styles.scrollArrow}
        />
      </span>
    </section>
  );
}
