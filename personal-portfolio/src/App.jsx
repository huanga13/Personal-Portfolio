import { useState } from 'react'
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Artwork from './components/Artwork';
import Fun from './components/Footer';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden="true" />

      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Artwork />
        <Fun />
      </main>
      <Footer />
    </>
  );
}