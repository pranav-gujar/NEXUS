import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: 'Who can participate in Global Mandate 2.0?',
      answer: 'Global Mandate 2.0 is open to all students from any educational institution. Whether you\'re an undergraduate, postgraduate, or research scholar, you\'re welcome to participate in this exciting event.'
    },
    {
      question: 'How can I register for the event?',
      answer: 'You can register for Global Mandate 2.0 by visiting our registration page and filling out the required details. Make sure to register before the deadline to secure your spot in the event.'
    },
    {
      question: 'Is there any registration fee?',
      answer: 'No, participation in Global Mandate 2.0 is completely free of cost. There are no hidden charges or fees for any of the events or workshops.'
    },
    {
      question: 'What are the event timings?',
      answer: 'The event will be held from 9:00 AM to 6:00 PM on both days. Detailed schedule will be shared with registered participants via email.'
    },
    {
      question: 'Will certificates be provided?',
      answer: 'Yes, all participants will receive e-certificates of participation. Winners and runners-up will receive special certificates and exciting prizes.'
    },
    {
      question: 'What should I bring to the event?',
      answer: 'Please bring a valid college ID card, your registration confirmation, and any materials specified for your registered events. Laptops are recommended for technical events.'
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-icon">
            <FiHelpCircle />
          </div>
          <h2 className="faq-title">
            <span className="gradient-text">Frequently Asked</span>
            <span className="subtitle">Questions</span>
          </h2>
          <p className="faq-description">Find answers to common questions about Global Mandate 2.0</p>
        </div>

        <div className="faq-items">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <span className="question-text">{item.question}</span>
                <span className="icon-wrapper">
                  <FiChevronDown className="chevron-icon" />
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-content-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="faq-answer-container"
                  >
                    <div className="faq-answer">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      <div className="faq-pattern"></div>
    </section>
  );
};

export default FAQ;
