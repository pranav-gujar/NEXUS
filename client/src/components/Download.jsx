import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTimes, FaDownload } from 'react-icons/fa';
import InteractiveCube from './InteractiveCube';
import JupiterModel from './JupiterModel';
import './Download.css';

gsap.registerPlugin(ScrollTrigger);

const Download = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePlanetClick = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Show the popup after animation completes
    setShowPopup(true);
    
    // Show popup content after 1 second
    timeoutRef.current = setTimeout(() => {
      if (popupRef.current) {
        gsap.fromTo(popupRef.current,
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, 
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.4)'
          }
        );
      }
    }, 500);
  };
  
  const jupiterModelRef = useRef();
  
  const closePopup = (e) => {
    e.stopPropagation();
    
    // Clear any pending timeouts first
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Reset the Jupiter model
    if (jupiterModelRef.current) {
      jupiterModelRef.current.reset();
    }
    
    // Hide popup with animation
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        onComplete: () => {
          setShowPopup(false);
          setIsAnimating(false);
        }
      });
    } else {
      // Fallback in case popupRef is not available
      setShowPopup(false);
      setIsAnimating(false);
    }
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      // Store the current scroll position
      const scrollY = window.scrollY;
      
      // Lock the body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Cleanup function to restore scroll
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showPopup]);

  // Advanced scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hide elements
      gsap.set('.planet-container, .interactive-cube', {
        opacity: 0,
        y: 100,
        scale: 0.9
      });

      // Main timeline for scroll animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom-=100',
          end: 'bottom center',
          scrub: 1,
          toggleActions: 'play none none none',
          onEnter: () => {
            // Animate Jupiter model on first scroll into view
            gsap.to('.planet-container', {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.5,
              ease: 'power3.out',
              onComplete: () => {
                // Subtle pulse effect on Jupiter
                gsap.to('.planet-container', {
                  scale: 1.03,
                  duration: 3,
                  yoyo: true,
                  repeat: -1,
                  ease: 'sine.inOut'
                });
              }
            });

            // Animate cubes with stagger
            gsap.to('.interactive-cube', {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              stagger: 0.2,
              ease: 'back.out(1.7)'
            });
          }
        }
      });

      // Parallax effect for the background
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 0%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      // Interactive elements animation on hover
      const cubes = gsap.utils.toArray('.interactive-cube');
      cubes.forEach((cube, i) => {
        // Hover effect
        cube.addEventListener('mouseenter', () => {
          gsap.to(cube, {
            scale: 1.2,
            duration: 0.3,
            y: -10,
            z: 20,
            ease: 'power2.out'
          });
        });

        cube.addEventListener('mouseleave', () => {
          gsap.to(cube, {
            scale: 1,
            duration: 0.5,
            y: 0,
            z: 0,
            ease: 'elastic.out(1, 0.5)'
          });
        });

        // Subtle floating animation
        gsap.to(cube, {
          y: i % 2 === 0 ? '+=10' : '-=10',
          duration: 3 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          delay: i * 0.2
        });
      });

      // Rotation animation for the planet container
      gsap.to('.planet-container', {
        rotationY: 5,
        duration: 15,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });

      // Glow effect on scroll
      gsap.to('.planet-container', {
        boxShadow: '0 0 50px rgba(100, 200, 255, 0.5)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        }
      });

      // Particles effect on scroll
      const particles = [];
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: ${2 + Math.random() * 4}px;
          height: ${2 + Math.random() * 4}px;
          background: rgba(100, 200, 255, ${0.3 + Math.random() * 0.7});
          border-radius: 50%;
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          z-index: 1;
        `;
        sectionRef.current.appendChild(particle);
        particles.push(particle);

        // Animate particles
        gsap.to(particle, {
          x: '+=100',
          y: '+=100',
          rotation: 360,
          duration: 5 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 5
        });
      }

      // Cleanup function
      return () => {
        // Remove all particles
        particles.forEach(particle => {
          if (particle && particle.parentNode) {
            particle.parentNode.removeChild(particle);
          }
        });
        
        // Kill all GSAP animations
        gsap.killTweensOf('*');
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = () => {
    // Replace with your actual PDF URL
    const pdfUrl = '/path/to/your/brochure.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Global-Mandate-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="download-section" ref={sectionRef}>
      <div className="spline-container" onClick={handlePlanetClick}>
        <div style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <div className="planet-container" onClick={handlePlanetClick}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              
              {/* Jupiter Model */}
              <JupiterModel 
                ref={jupiterModelRef}
                onClick={handlePlanetClick} 
                isAnimating={isAnimating} 
              />
              
              {/* Interactive Cubes */}
              {!showPopup && !isAnimating && (
                <>
                  {/* Bottom Right Cube */}
                  <group position={[5, -2, 0]} rotation={[0, 0, 0]}>
                    <InteractiveCube 
                      onClick={handlePlanetClick}
                      onPointerOver={() => document.body.style.cursor = 'pointer'}
                      onPointerOut={() => document.body.style.cursor = 'auto'}
                    />
                  </group>
                  
                  {/* Top Left Cube */}
                  <group position={[-5, 2, 0]} rotation={[0, 0, 0]}>
                    <InteractiveCube 
                      onClick={handlePlanetClick}
                      onPointerOver={() => document.body.style.cursor = 'pointer'}
                      onPointerOut={() => document.body.style.cursor = 'auto'}
                    />
                  </group>
                  
                  {/* Top Right Cube */}
                  <group position={[5, 2, 0]} rotation={[0, 0, 0]}>
                    <InteractiveCube 
                      onClick={handlePlanetClick}
                      onPointerOver={() => document.body.style.cursor = 'pointer'}
                      onPointerOut={() => document.body.style.cursor = 'auto'}
                    />
                  </group>
                  
                  {/* Bottom Left Cube */}
                  <group position={[-5, -2, 0]} rotation={[0, 0, 0]}>
                    <InteractiveCube 
                      onClick={handlePlanetClick}
                      onPointerOver={() => document.body.style.cursor = 'pointer'}
                      onPointerOut={() => document.body.style.cursor = 'auto'}
                    />
                  </group>
                </>
              )}
            </Canvas>
          </div>
        </div>
      </div>
      
      {/* Full-screen Popup */}
      {showPopup && (
        <div 
          className="popup-overlay"
          onClick={closePopup}
        >
          <div 
            ref={popupRef}
            className="popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="close-button"
              onClick={closePopup}
              aria-label="Close popup"
            >
              <FaTimes />
            </button>
            <div className="popup-inner">
              <div className="popup-icon">
                <FaDownload size={48} />
              </div>
              <h3>Download Brochure</h3>
              <p>Get all the details about our event in one convenient PDF.</p>
              <button 
                className="download-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                  closePopup(e);
                }}
              >
                Download Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Download;
