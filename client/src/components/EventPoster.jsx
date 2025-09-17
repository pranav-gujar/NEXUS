import React from "react";
import { motion } from "framer-motion";
import "./EventPoster.css";
import poster from "../assets/poster.png";

const EventPoster = () => {
  return (
    <section className="event-poster-section">
      <motion.div
        className="event-poster-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="poster-image">
          <img
            src={poster}
            alt="Event Poster"
            loading="lazy"
            className="poster-img"
          />
          <div className="poster-overlay"></div>
          <div className="poster-date">OCT 11-12</div>
        </div>
      </motion.div>
    </section>
  );
};

export default EventPoster;
