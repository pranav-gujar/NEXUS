import React from 'react';
import { motion } from 'framer-motion';
import './EventPoster.css';

const EventPoster = () => {
  return (
    <section className="event-poster-section">
      <motion.div 
        className="event-poster-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="poster-image">
          <img 
            src="https://i.pinimg.com/736x/1a/12/22/1a1222efca7ff882eec2e81c1726e145.jpg"
            alt="Event Poster"
            loading="lazy"
            className="poster-img"
          />
          <div className="poster-overlay"></div>
          <div className="poster-date">OCT 15-16</div>
        </div>
      </motion.div>
    </section>
  );
};

export default EventPoster;
