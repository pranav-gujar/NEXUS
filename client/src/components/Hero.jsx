import React, { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import NEXUSLogo from '../assets/logos/NEXUS 2025.png';
import ClubLogo from '../assets/logos/Rotaract Logo.png';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin, ScrollToPlugin);

export default function Hero() {
  const spline = useRef();
  const heroRef = useRef();
  const headingRef = useRef();
  const subheadingRef = useRef();
  const textRef = useRef();
  const buttonRef = useRef();
  const splineWrapperRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          headingRef.current,
          subheadingRef.current,
          textRef.current,
          buttonRef.current,
          splineWrapperRef.current,
        ],
        {
          opacity: 1,
          visibility: 'visible',
        }
      );

      const tl = gsap.timeline();
      const text = 'NEXUS 2K25';

      tl.to(headingRef.current, {
        duration: 1,
        text: text,
        ease: 'power2.inOut',
      })
        .fromTo(
          headingRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
          },
          '<'
        )
        .fromTo(
          subheadingRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.8'
        )
        .fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        .fromTo(
          buttonRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        )
        .fromTo(
          splineWrapperRef.current,
          { scale: 0.9, opacity: 0, y: 30 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          },
          '-=0.8'
        );

      // Hover effect for button
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      // Scroll-triggered animations
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
          pinSpacing: false,
          onUpdate: (self) => {
            const yPos = -self.progress * 100;
            gsap.to(splineWrapperRef.current, {
              y: yPos * 0.5,
              ease: 'none',
              overwrite: 'auto',
            });

            gsap.to(
              [
                headingRef.current,
                subheadingRef.current,
                textRef.current,
                buttonRef.current,
              ],
              {
                opacity: 1 - self.progress * 1.5,
                y: -self.progress * 50,
                ease: 'none',
                overwrite: 'auto',
              }
            );
          },
        },
      });

      // Animate logos on scroll
      gsap.utils.toArray('.logo-wrapper').forEach((logo, i) => {
        gsap.fromTo(
          logo,
          { y: i % 2 === 0 ? 50 : -50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.3 + i * 0.1,
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="hero-container" ref={heroRef}>
      <div className="spline-wrapper" ref={splineWrapperRef}>
  <Spline 
    scene="https://prod.spline.design/Fu5FuKSPHfdiV7Wv/scene.splinecode"
    className="spline-model"
    preload  
    onLoad={(splineApp) => {
      spline.current = splineApp;

      // Target only the robot object inside Spline
      const robot = splineApp.findObjectByName('Robot');
      if (robot) {
        gsap.to(robot.rotation, {
          y: "+=0.2",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }}
    onError={(error) => {
      console.error('Error loading Spline:', error);
    }}
  />
</div>

      <div className="logos-container">
        <div className="logo-wrapper left-logo">
          <a
            href="https://www.rotaractwce.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={ClubLogo} alt="Rotaract WCE Logo" className="logo" />
          </a>
        </div>

        <div className="hero-content">
          <h2 ref={subheadingRef} className="subheading">
            Something powerful & engaging
          </h2>
          <h1 ref={headingRef} className="heading"></h1>
          <p ref={textRef} className="description">
            Think. Connect. Transform.
          </p>
          <a
            href="https://forms.gle/ojM9E68b2wMdosBG7"
            target="_blank"
            rel="noopener noreferrer"
            ref={buttonRef}
            className="cta-button"
          >
            Register Now
          </a>
        </div>

        <div className="logo-wrapper right-logo">
          <img src={NEXUSLogo} alt="WCE Logo" className="logo" />
        </div>
      </div>
    </div>
  );
}
