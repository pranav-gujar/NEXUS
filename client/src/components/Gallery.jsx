import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';
import Masonry from 'react-masonry-css';
import './Gallery.css';
import one from '../assets/gallery/1.jpg';
import two from '../assets/gallery/2.jpg';
import six from '../assets/gallery/6.jpg';

// Local images for gallery
const galleryImages = [
  { 
    id: 1, 
    image: one,
    // alt: 'Keynote speech at Global Tech Summit'
  },
  { 
    id: 2, 
    image: two,
    // alt: 'Crowd at tech conference'
  },
  { 
    id: 3, 
    image: six,
    // alt: 'Networking session'
  },
];

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const slideshowInterval = useRef(null);

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle slideshow
  useEffect(() => {
    if (isSlideshowRunning) {
      slideshowInterval.current = setInterval(() => {
        nextImage();
      }, 3000);
    }

    return () => {
      if (slideshowInterval.current) clearInterval(slideshowInterval.current);
    };
  }, [isSlideshowRunning]);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
    if (isSlideshowRunning) {
      setIsSlideshowRunning(false);
    }
  };

  const nextImage = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % galleryImages.length;
      setSelectedImage(galleryImages[newIndex]);
      return newIndex;
    });
  };

  const prevImage = () => {
    setCurrentIndex(prevIndex => {
      const newIndex = (prevIndex - 1 + galleryImages.length) % galleryImages.length;
      setSelectedImage(galleryImages[newIndex]);
      return newIndex;
    });
  };

  const toggleSlideshow = () => {
    setIsSlideshowRunning(!isSlideshowRunning);
  };

  return (
    <section id="gallery" className="w-full bg-gray-900" style={{ padding: '6rem 0' }}>
      <div className="container mx-auto px-4">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center text-white"
          style={{
            marginTop: '2rem',
            marginBottom: '4rem',
            padding: '0 1rem'
          }}
        >
          <span className="bg-gradient-to-r from-green-300 to-sky-500 bg-clip-text text-transparent">
            Glimpses of Previous Events
          </span>
        </h2>
        
        <div className="gallery-controls">
          <button 
            className={`slideshow-btn ${isSlideshowRunning ? 'active' : ''}`}
            onClick={toggleSlideshow}
            aria-label={isSlideshowRunning ? 'Pause slideshow' : 'Start slideshow'}
          >
            {isSlideshowRunning ? <FiPause /> : <FiPlay />}
            {isSlideshowRunning ? 'Pause Slideshow' : 'Start Slideshow'}
          </button>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {galleryImages.map((image, index) => (
            <motion.div 
              className="gallery-item" 
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => openLightbox(image, index)}
            >
              <div className="gallery-image-container">
                <img 
                  src={image.image}
                  alt={image.alt}
                  className="gallery-image"
                  loading="lazy"
                />
                <div className="image-overlay">
                  <span className="zoom-icon">+</span>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target.className === 'lightbox' && closeLightbox()}
          >
            <button className="close-btn" onClick={closeLightbox} aria-label="Close">
              <FiX />
            </button>
            
            <div className="lightbox-content">
              <button 
                className="nav-btn prev-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
              >
                <FiChevronLeft />
              </button>
              
              <motion.div 
                className="lightbox-image-container"
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={selectedImage.image}
                  alt={selectedImage.alt}
                  className="lightbox-image"
                />
              </motion.div>
              
              <button 
                className="nav-btn next-btn" 
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next image"
              >
                <FiChevronRight />
              </button>
            </div>
            
            <div className="lightbox-footer">
              <div className="lightbox-footer-content">
                <div className="image-info">
                  <h3 className="image-title">
                    {selectedImage.alt}
                  </h3>
                  <p className="image-counter">
                    Image {currentIndex + 1} of {galleryImages.length}
                  </p>
                </div>
                <div className="lightbox-controls">
                  <button 
                    className={`slideshow-btn ${isSlideshowRunning ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSlideshow();
                    }}
                    aria-label={isSlideshowRunning ? 'Pause slideshow' : 'Play slideshow'}
                  >
                    {isSlideshowRunning ? <FiPause /> : <FiPlay />}
                    {isSlideshowRunning ? 'Pause' : 'Play'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
