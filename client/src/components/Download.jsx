import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaTimes, FaDownload } from "react-icons/fa";
import InteractiveCube from "./InteractiveCube";
import JupiterModel from "./JupiterModel";
import "./Download.css";

gsap.registerPlugin(ScrollTrigger);

const Download = () => {
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const sectionRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const jupiterModelRef = useRef();

  const handlePlanetClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShowPopup(true);

    timeoutRef.current = setTimeout(() => {
      if (popupRef.current) {
        gsap.fromTo(
          popupRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
          }
        );
      }
    }, 500);
  };

  const closePopup = (e) => {
    e.stopPropagation();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (jupiterModelRef.current) {
      jupiterModelRef.current.reset();
    }
    if (popupRef.current) {
      gsap.to(popupRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        onComplete: () => {
          setShowPopup(false);
          setIsAnimating(false);
        },
      });
    } else {
      setShowPopup(false);
      setIsAnimating(false);
    }
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (showPopup) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [showPopup]);

  // Scroll-triggered animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".planet-container, .interactive-cube", {
        opacity: 0,
        y: 100,
        scale: 0.9,
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
          end: "bottom center",
          scrub: 1,
          toggleActions: "play none none none",
          onEnter: () => {
            gsap.to(".planet-container", {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              onComplete: () => {
                gsap.to(".planet-container", {
                  scale: 1.03,
                  duration: 3,
                  yoyo: true,
                  repeat: -1,
                  ease: "sine.inOut",
                });
              },
            });

            gsap.to(".interactive-cube", {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              stagger: 0.2,
              ease: "back.out(1.7)",
            });
          },
        },
      });

      gsap.to(sectionRef.current, {
        backgroundPosition: "50% 0%",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const cubes = gsap.utils.toArray(".interactive-cube");
      cubes.forEach((cube, i) => {
        cube.addEventListener("mouseenter", () => {
          gsap.to(cube, {
            scale: 1.2,
            duration: 0.3,
            y: -10,
            z: 20,
            ease: "power2.out",
          });
        });

        cube.addEventListener("mouseleave", () => {
          gsap.to(cube, {
            scale: 1,
            duration: 0.5,
            y: 0,
            z: 0,
            ease: "elastic.out(1, 0.5)",
          });
        });

        gsap.to(cube, {
          y: i % 2 === 0 ? "+=10" : "-=10",
          duration: 3 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      gsap.to(".planet-container", {
        rotationY: 5,
        duration: 15,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(".planet-container", {
        boxShadow: "0 0 50px rgba(100, 200, 255, 0.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ✅ Updated to point to public folder
  const handleDownload = () => {
    const pdfUrl = "/brochure.pdf"; // <-- your file inside /public
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "NEXUS_Brochure.pdf"; // filename when saved
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="download-section" ref={sectionRef}>
      <div className="spline-container" onClick={handlePlanetClick}>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div className="planet-container" onClick={handlePlanetClick}>
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <JupiterModel
                ref={jupiterModelRef}
                onClick={handlePlanetClick}
                isAnimating={isAnimating}
              />
              {!showPopup && !isAnimating && (
                <>
                  <group position={[5, -2, 0]} rotation={[0, 0, 0]}>
                    <InteractiveCube
                      onClick={handlePlanetClick}
                      onPointerOver={() =>
                        (document.body.style.cursor = "pointer")
                      }
                      onPointerOut={() =>
                        (document.body.style.cursor = "auto")
                      }
                    />
                  </group>
                  <group position={[-5, 2, 0]} rotation={[0, 0, 0]}>
                    <InteractiveCube
                      onClick={handlePlanetClick}
                      onPointerOver={() =>
                        (document.body.style.cursor = "pointer")
                      }
                      onPointerOut={() =>
                        (document.body.style.cursor = "auto")
                      }
                    />
                  </group>
                  <group position={[5, 2, 0]} rotation={[0, 0, 0]}>
                    <InteractiveCube
                      onClick={handlePlanetClick}
                      onPointerOver={() =>
                        (document.body.style.cursor = "pointer")
                      }
                      onPointerOut={() =>
                        (document.body.style.cursor = "auto")
                      }
                    />
                  </group>
                  <group position={[-5, -2, 0]} rotation={[0, 0, 0]}>
                    <InteractiveCube
                      onClick={handlePlanetClick}
                      onPointerOver={() =>
                        (document.body.style.cursor = "pointer")
                      }
                      onPointerOut={() =>
                        (document.body.style.cursor = "auto")
                      }
                    />
                  </group>
                </>
              )}
            </Canvas>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
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
              <p>One-click access to all event details.</p>
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
