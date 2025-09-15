import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiPlay, FiPause } from 'react-icons/fi';
import Masonry from 'react-masonry-css';
import './Gallery.css';

// High-quality tech event and conference images
const galleryImages = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Keynote speech at Global Tech Summit'
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Crowd at tech conference'
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Networking session'
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Team collaboration workshop'
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80', 
    alt: 'Panel discussion with industry experts'
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Speaker engaging with audience'
  },
  { 
    id: 7, 
    src: 'https://images.unsplash.com/photo-1524179091875-b4893398b2b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Workshop in progress'
  },
  { 
    id: 8, 
    src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1411&q=80', 
    alt: 'Audience listening to presentation'
  },
  { 
    id: 9, 
    src: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Speaker on stage with presentation'
  },
  { 
    id: 10, 
    src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Conference stage with lighting effects'
  },
  { 
    id: 11, 
    src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Networking at the event'
  },
  { 
    id: 12, 
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Audience applauding'
  },
  { 
    id: 13, 
    src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1484&q=80', 
    alt: 'Speaker with presentation slides'
  },
  { 
    id: 14, 
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Panel discussion with multiple speakers'
  },
  { 
    id: 15, 
    src: 'https://images.unsplash.com/photo-1522071901879-4c7b0a4c5f4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 
    alt: 'Crowd at tech exhibition'
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  let slideshowInterval;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isSlideshowRunning) {
      slideshowInterval = setInterval(() => {
        nextImage();
      }, 3000);
    }

    return () => {
      if (slideshowInterval) clearInterval(slideshowInterval);
    };
  }, [isSlideshowRunning, currentIndex]);

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
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    setSelectedImage(galleryImages[(currentIndex + 1) % galleryImages.length]);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    setSelectedImage(galleryImages[(currentIndex - 1 + galleryImages.length) % galleryImages.length]);
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
            Glimpses of Global Mandate 2.0
          </span>{' '}
          <span className="text-gray-200"></span>
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
                  src={image.src} 
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
                  src={selectedImage.src} 
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
