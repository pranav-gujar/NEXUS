import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiHelpCircle } from 'react-icons/fi';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: 'Who can participate in NEXUS 2025?',
      answer: 'NEXUS is open to all students from any educational institution. Whether you\'re an undergraduate, postgraduate, or research scholar, you\'re welcome to participate in this exciting event.'
    },
  {
    question: "How do I register for the events?",
    answer: "You can register online through our official website nexus.rotaractwce.org , After clicking Register button you will be redirected to the secure Google Form to complete registration."
  },
  {
    question: "Is there any registration fee?",
    answer: "Yes, a nominal fee is applicable for events to cover logistics and resources. Please check individual event details for exact amounts."
  },
  {
    question: "Will certificates be provided?",
    answer: "Yes, all participants will receive certificates. Winners and finalists will be awarded special certificates and exciting prizes."
  },
  {
    question: "Where will the events be conducted?",
    answer: "The events will be conducted at Walchand College of Engineering, Sangli."
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
          <p className="faq-description">Find answers to common questions about NEXUS 2k25</p>
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
