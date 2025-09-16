import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FaCrown, FaStar, FaMedal, FaHandsHelping } from 'react-icons/fa';
import { GiDiamondTrophy, GiStarSwirl } from 'react-icons/gi';
import './Sponsors.css';
import PGTLogo from '../assets/logos/PGT Logo.png';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Sponsors = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  // Sample sponsor data - replace with actual sponsor data
  // Icons for different sponsor categories
  const categoryIcons = {
    'Title Sponsor': <FaCrown className="category-icon" />,
    'Co-Sponsors': <GiDiamondTrophy className="category-icon" />,
    'Associate Sponsors': <FaStar className="category-icon" />,
    'Community Partners': <FaHandsHelping className="category-icon" />,
  };

  // Function to generate consistent placeholder image based on name
  const getPlaceholderImage = (name) => {
    const colors = [
      'FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEEAD', 'D4A5A5', '9B786F', 'E6E6FA',
      'B2F9D3', 'F9B2B2', 'B2D8F9', 'F9F2B2', 'D8B2F9', 'F9B2E6', 'B2F9F2', 'F9D8B2'
    ];
    const bgColor = colors[Math.abs(name.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % colors.length];
    const textColor = parseInt(bgColor, 16) > 0xffffff/2 ? '000000' : 'ffffff';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=${textColor}&size=300&font-size=0.5&length=2&rounded=true`;
  };

  const sponsorsData = {
    'Title Sponsor': [
      { 
        name: 'PGT Global Network', 
        logo: PGTLogo,
        website: 'https://www.pgtglobalnetwork.com'
      },
    ],
    // 'Co-Sponsors': [
    //   { 
    //     name: 'CloudNine', 
    //     logo: 'https://logo.clearbit.com/cloudnine.com',
    //     website: 'https://cloudnine.com'
    //   },
    //   { 
    //     name: 'DataDyne', 
    //     logo: 'https://logo.clearbit.com/datadyne.org',
    //     website: 'https://datadyne.org'
    //   },
    // ],
    // 'Associate Sponsors': [
    //   { 
    //     name: 'CodeCraft', 
    //     logo: 'https://logo.clearbit.com/codecraft.dev',
    //     website: 'https://codecraft.dev'
    //   },
    //   { 
    //     name: 'PixelPioneers', 
    //     logo: 'https://logo.clearbit.com/pixelpioneers.tech',
    //     website: 'https://pixelpioneers.tech'
    //   },
    //   { 
    //     name: 'NexusLabs', 
    //     logo: 'https://logo.clearbit.com/nexuslabs.io',
    //     website: 'https://nexuslabs.io'
    //   },
    // ],
    // 'Community Partners': [
    //   { 
    //     name: 'DevCommunity', 
    //     logo: 'https://logo.clearbit.com/devcommunity.com',
    //     website: 'https://devcommunity.com'
    //   },
    //   { 
    //     name: 'CodeForAll', 
    //     logo: 'https://logo.clearbit.com/codeforall.org',
    //     website: 'https://codeforall.org'
    //   },
    //   { 
    //     name: 'Tech4Good', 
    //     logo: 'https://logo.clearbit.com/tech4good.network',
    //     website: 'https://tech4good.network'
    //   },
    //   { 
    //     name: 'FutureCoders', 
    //     logo: 'https://logo.clearbit.com/futurecoders.io',
    //     website: 'https://futurecoders.io'
    //   },
    // ],
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const ctaVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5,
        type: 'spring',
        stiffness: 150,
      },
    },
    hover: {
      scale: 1.03,
      transition: {
        type: 'spring',
        stiffness: 300,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  useEffect(() => {
    // Animate section on scroll
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

    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <section className="sponsors-section" id="sponsors" ref={sectionRef}>
      {/* Decorative floating elements */}
      <div className="floating-element floating-element-1"></div>
      <div className="floating-element floating-element-2"></div>

      <div className="sponsors-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-title-wrapper">
            <GiStarSwirl className="decorative-icon top-left" />
            <GiStarSwirl className="decorative-icon top-right" />
            <motion.h2 className="section-title" ref={titleRef}>
              Our <span className="gradient-text">Sponsors</span>
            </motion.h2>
            <div className="section-title-underline"></div>
          </div>

          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're grateful to our amazing sponsors for their generous support and partnership in making this event possible.
            Their contribution helps us create an unforgettable experience for all participants.
          </motion.p>
        </motion.div>

        {Object.entries(sponsorsData).map(([category, sponsors]) => (
  <div 
    key={category} 
    className={`sponsor-category ${sponsors.length === 1 ? 'single-sponsor' : ''}`} // ✅ add class if only one
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
    }}
  >
    <motion.div
      className="category-header"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="category-icon-wrapper">
        {categoryIcons[category]}
      </div>
      <h3 className="category-title">{category}</h3>
      <div className="category-underline"></div>
    </motion.div>

    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <motion.div
        className="sponsors-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={`${category}-${sponsor.name}-${index}`}
            className="sponsor-item"
            variants={itemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <a 
              href={sponsor.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="sponsor-logo-link"
            >
              <div className="sponsor-logo-container">
                <img
                  src={sponsor.logo}
                  alt={`${sponsor.name} logo`}
                  className="sponsor-logo"
                  loading="lazy"
                  onError={(e) => {
                    if (!e.target.src.includes('logo.clearbit.com')) {
                      const domain = sponsor.website ? 
                        sponsor.website.replace(/^https?:\/\//, '').split('/')[0] : 
                        sponsor.name.toLowerCase().replace(/\s+/g, '');
                      e.target.src = `https://logo.clearbit.com/${domain}?size=300`;
                      e.target.onerror = (err) => {
                        err.target.onerror = null;
                        err.target.src = getPlaceholderImage(sponsor.name);
                      };
                    } else {
                      e.target.onerror = null;
                      e.target.src = getPlaceholderImage(sponsor.name);
                    }
                  }}
                />
              </div>
              <p className="sponsor-name">{sponsor.name}</p>
              <div className="sponsor-glow"></div>
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
))}


        <motion.div
          className="become-sponsor"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={ctaVariants}
        >
          {/* <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Want to join our sponsor family?</h3>
            <p>
              Become a sponsor and get your brand in front of tech enthusiasts, developers, and industry leaders.
              Let's create something amazing together!
            </p>
            <motion.a
              href="mailto:sponsors@example.com"
              className="sponsor-cta"
              whileHover="hover"
              whileTap="tap"
              variants={ctaVariants}
            >
              <span>Become a Sponsor</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div> */}
          <div className="cta-decoration">
            <div className="cta-orb cta-orb-1"></div>
            <div className="cta-orb cta-orb-2"></div>
            <div className="cta-orb cta-orb-3"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
