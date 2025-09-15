import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import './Registration.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Registration = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const canvasRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (sectionRef.current) {
        setDimensions({
          width: sectionRef.current.offsetWidth,
          height: sectionRef.current.offsetHeight
        });
      }
    };

    // Initial dimensions
    updateDimensions();

    // Update on resize
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animate section on scroll
  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Button hover animation
    const button = buttonRef.current;
    if (button) {
      const handleMouseMove = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(button, {
          '--x': `${x}px`,
          '--y': `${y}px`,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      button.addEventListener('mousemove', handleMouseMove);
      
      // Cleanup
      return () => {
        button.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  // Simple particle system using canvas
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Create particles
    const particles = [];
    const particleCount = Math.floor((dimensions.width * dimensions.height) / 10000);
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Draw connections between close particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Draw connections
      drawConnections();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <section ref={sectionRef} className="registration-section">
      <div className="registration-container">
        <canvas 
          ref={canvasRef} 
          className="particles-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        />
        
        <div className="registration-content">
          <motion.h2 
            className="registration-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Join the Experience?
          </motion.h2>
          
          <motion.p 
            className="registration-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Don't miss out on this incredible opportunity to learn, network, and grow.
            Secure your spot today before it's too late!
          </motion.p>
          
          <motion.div
            className="button-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              ref={buttonRef}
              className="liquid-button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => window.open('https://example.com/register', '_blank')}
            >
              <span className="button-text">Register Now</span>
              <span className="button-hover"></span>
              <span className="button-hover button-hover-2"></span>
            </button>
            
            <div className="button-decoration">
              {[...Array(6)].map((_, i) => (
                <span key={i} className="decoration-dot" />
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="registration-features"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <span>Limited Seats Available</span>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <span>Early Bird Discounts</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🎁</div>
              <span>Exclusive Swag</span>
            </div>
          </motion.div>
        </div>
        
        <div className="floating-shapes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`floating-shape shape-${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Registration;
