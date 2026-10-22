import { useState } from 'react';
import { Loader, Cursor, Nav, Marquee, Footer } from './components/Chrome.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Work from './components/Work.jsx';
import Process from './components/Process.jsx';
import Skills from './components/Skills.jsx';
import Timeline from './components/Timeline.jsx';
import Contact from './components/Contact.jsx';
import { useTheme, useReveal, useSmoothScroll } from './hooks.js';

export default function App() {
  const [theme, toggle] = useTheme();
  const [ready, setReady] = useState(false);
  useReveal(ready);
  useSmoothScroll();
  return (
    <>
      <Loader onDone={() => setReady(true)} />
      <Cursor />
      <Nav theme={theme} onToggle={toggle} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About theme={theme} />
        <Work />
        <Process />
        <Skills theme={theme} />
        <Timeline />
        <Contact theme={theme} />
      </main>
      <Footer />
    </>
  );
}
