import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import './Events.css';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const eventsData = [
  {
    id: 1,
    title: 'Cubers Arena',
    description: 'A Rubik’s Cube speedcubing challenge testing problem-solving, hand-eye coordination, and speed under pressure across three elimination rounds.',
    rules: [
      'Only standard 3x3 cubes allowed (magnetic permitted)',
      '15 seconds inspection time before each solve',
      'Official CS Timers will be used',
      'Top solvers advance based on averages (Ao5 / Ao7)'
    ]
  },
  {
    id: 2,
    title: 'Action Architects',
    description: 'Teams step into the shoes of NGOs, making smart budget choices, pitching impactful ideas, and convincing sponsors to fund their vision.',
    rules: [
      'Allocate budget among activities aligned with NGO vision',
      'Clear written justification required for allocations',
      'Pitch for ₹50,000 funding to sponsors in Round 2',
      'Final surprise round revealed on event day'
    ]
  },
  {
    id: 3,
    title: 'Mind Your Business',
    description: 'A business competition with rounds on quizzing, creative product pitching, and one-slide business/tender presentations to test entrepreneurial skills.',
    rules: [
      'Individual participation only',
      'Business Quiz with 40 offline questions in Round 1',
      'Creative sales pitch of redesigned product in Round 2',
      'One-slide tender/business pitch in Round 3'
    ]
  },
  {
    id: 4,
    title: 'NitiTalks',
    description: 'An engaging event themed “From Knowledge to Power, through Policy” with rounds on quiz, treasure hunt, and political party creation.',
    rules: [
      'Round 1: GK & current affairs quiz',
      'Round 2: Treasure Hunt “Save the Chair”',
      'Round 3: Form and pitch your own political party',
      'Respect time limits and fair play throughout'
    ]
  },
  {
    id: 5,
    title: 'Equinox',
    description: 'A multi-round intellectual challenge testing geopolitics, current affairs, and analytical thinking through quizzes, group discussions, and a surprise round.',
    rules: [
      'Round 1: MCQs and written questions (100 marks)',
      'Round 2: Group discussion on problem statement',
      'Round 3: Surprise round revealed on the day',
      'Judged on content, communication, leadership, and analysis'
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
  <div className="back-content">
    <h3 className="back-title">{event.title}</h3>
    <p className="event-description">{event.description}</p>
    <div className="event-rules">
      <h4>Key Points:</h4>
      <ul>
        {event.rules.map((rule, index) => (
          <li key={index}>
            <span className="rule-bullet">•</span> &nbsp;
            <span className="rule-text">{rule}</span>
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
