import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Download from './components/Download';
import EventPoster from './components/EventPoster';
import Events from './components/Events';
import Timeline from './components/Timeline';
import Registration from './components/Registration';
import Sponsors from './components/Sponsors';
import Gallery from './components/Gallery';
import ScrollToTop from './components/ScrollToTop';
import Loading from './components/Loading';
import './App.css';
import './components/Loading.css';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demonstration
    // In a real app, you might want to wait for all assets to load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app">
      <Hero />
      <Download />
      <EventPoster />
      <Events />
      {/* <Timeline /> */}
      <Registration />
      <Sponsors />
      <Gallery />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
