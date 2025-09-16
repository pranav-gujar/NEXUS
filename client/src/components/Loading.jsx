import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Loading.css';

const Loading = () => {
  const loadingRef = useRef();
  const progressRef = useRef();
  const counterRef = useRef();

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    let animationFrame;
    const startTime = Date.now();
    const duration = 2000; 

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setProgress(progress * 100);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        // Fade out the loading screen
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (loadingRef.current) {
              loadingRef.current.style.display = 'none';
              // Enable scrolling after loading is complete
              document.body.style.overflow = 'auto';
            }
          }
        });
      }
    };

    // Start the animation
    animationFrame = requestAnimationFrame(updateProgress);

    // Cleanup
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };

    // Disable scrolling while loading
    document.body.style.overflow = 'hidden';

    return () => {
      // Cleanup
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="loading-screen" ref={loadingRef}>
      <div className="loading-content">
        <div className="loading-logo">
          <div className="rotating-circle"></div>
          <div className="loading-text">NEXUS 2k25 <br /> By Rotaract WCE</div>
        </div>
        <div className="loading-progress">
          <div 
          className="progress-bar" 
          ref={progressRef}
          style={{ width: `${progress}%` }}
        ></div>
        </div>
        <div className="loading-counter">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};

export default Loading;
