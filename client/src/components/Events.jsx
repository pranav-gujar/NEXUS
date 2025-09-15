import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './Events.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const eventsData = [
  {
    id: 1,
    title: 'Tech Symposium',
    description: 'A gathering of tech enthusiasts and professionals to discuss the latest trends and innovations in technology.',
    rules: [
      '10-minute presentation slots',
      'Open Q&A session',
      'No promotional content',
      'Must submit slides in advance'
    ]
  },
  {
    id: 2,
    title: 'Hackathon',
    description: 'A 24-hour coding competition where participants build innovative solutions to real-world problems.',
    rules: [
      'Teams of 2-4 members',
      'No pre-written code',
      'Open source projects only',
      'Judging based on innovation and execution'
    ]
  },
  {
    id: 3,
    title: 'Workshop Series',
    description: 'Hands-on sessions led by industry experts to enhance your technical skills and knowledge.',
    rules: [
      'Bring your own laptop',
      'Pre-registration required',
      'Limited seats available',
      'Beginner to advanced levels'
    ]
  },
  {
    id: 4,
    title: 'Panel Discussion',
    description: 'Interactive discussions with industry leaders sharing insights on emerging technologies.',
    rules: [
      'Audience Q&A segment',
      'Moderated discussion',
      '45-minute duration',
      'No recording allowed'
    ]
  },
  {
    id: 5,
    title: 'Networking Mixer',
    description: 'An opportunity to connect with professionals and like-minded individuals in the tech industry.',
    rules: [
      'Business casual attire',
      'Bring business cards',
      '30-second pitch prepared',
      'Respect time limits'
    ]
  }
];

const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  // Handle hover effect with GSAP
  useEffect(() => {
    if (!cardRef.current || !innerRef.current) return;
    
    const card = cardRef.current;
    const inner = innerRef.current;
    
    // Set initial styles
    gsap.set(inner, { rotationY: 0 });
    
    // Create the flip animation
    const flipTimeline = gsap.timeline({ paused: true });
    flipTimeline.to(inner, {
      rotationY: 180,
      duration: 0,
      ease: 'power2.inOut',
      transformOrigin: 'center center',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      onReverseComplete: () => {
        gsap.set(inner, { rotationY: 0 });
      }
    });
    
    // Play the animation based on hover state
    if (isHovered) {
      flipTimeline.play();
    } else {
      flipTimeline.reverse();
    }
    
    // Cleanup
    return () => {
      flipTimeline.kill();
    };
  }, [isHovered]);

  return (
    <div 
      className="event-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={cardRef}
    >
      <div className="event-card-inner" ref={innerRef}>
        {/* Front side */}
        <div className="event-card-front flex flex-col items-center justify-center p-8 text-center">
          <h3 className="text-2xl font-bold text-purple-500 mb-4">{event.title}</h3>
          <div className="text-purple-300 text-sm mt-2">Click to learn more →</div>
        </div>
        <div className="event-card-back p-6">
          <div className="back-content h-full flex flex-col">
            <h3 className="text-2xl font-bold text-purple-500 text-center mb-4">{event.title}</h3>
            <div className="divider h-px bg-sky-700 my-4 w-1/2 mx-auto"></div>
            <p className="text-sky-300 flex-grow">{event.description}</p>
            <div className="event-rules">
              <h4 className="text-purple-400 font-semibold mb-2">Key Points:</h4>
              <ul className="space-y-2">
                {event.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-sky-400 mr-2">•</span>
                    <span className="text-sky-300 text-sm">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Events = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  // Initialize animations on component mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Add gsap-animate class to the section
      sectionRef.current.classList.add('gsap-animate');
      
      // Animate title with text reveal
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        onComplete: () => {
          // Text reveal effect
          gsap.to(titleRef.current, {
            duration: 2,
            text: 'Our Events',
            ease: 'power1.inOut'
          });
        }
      });

      // Animate event cards with stagger
      gsap.utils.toArray('.event-card').forEach((card, i) => {
        // Scroll-triggered animation
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.2)',
          delay: i * 0.15
        });

        // Hover effect with GSAP
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.03,
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        });
      });

      // Parallax background effect
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        backgroundPosition: '50% 30%',
        ease: 'none'
      });

      // Add floating particles
      const particles = [];
      const particleCount = 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
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
          duration: 10 + Math.random() * 20,
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

  return (
    <section className="events-section" id="events" ref={sectionRef}>
      <div className="container" ref={containerRef}>
        <h2 className="section-title" ref={titleRef}></h2>
        <div className="events-grid">
          {eventsData.map((event, index) => (
            <div 
              key={event.id} 
              className={`event-card-container event-card-${event.id}`}
              data-index={index}
            >
              <EventCard event={event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
