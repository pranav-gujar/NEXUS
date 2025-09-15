import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCalendarAlt, FaTrophy, FaUserTie, FaLaptopCode, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Timeline.css';

// Register GSAP plugins
// Event icons mapping
const eventIcons = {
  'Registration': <FaUserTie className="event-icon" />,
  'Inauguration': <FaTrophy className="event-icon" />,
  'Workshop': <FaLaptopCode className="event-icon" />,
  'Prize Distribution': <FaTrophy className="event-icon" />,
  'default': <FaCalendarAlt className="event-icon" />
};

// Get appropriate icon for event
const getEventIcon = (title) => {
  const key = Object.keys(eventIcons).find(key => 
    title.toLowerCase().includes(key.toLowerCase())
  );
  return eventIcons[key] || eventIcons.default;
};

gsap.registerPlugin(ScrollTrigger);

const timelineData = [
  {
    day: "Day 1",
    date: "September 15, 2023",
    theme: "#4a90e2",
    events: [
      { 
        time: "09:00 AM - 10:00 AM", 
        title: "Registration & Collection of Essentials",
        description: "Check-in and collect your event kit and badge"
      },
      { 
        time: "10:00 AM - 11:00 AM", 
        title: "Inauguration Ceremony",
        description: "Welcome address and lighting of the lamp"
      },
      { 
        time: "11:30 AM - 01:00 PM", 
        title: "Technical Events - Round 1",
        description: "Preliminary rounds of technical competitions"
      },
      { 
        time: "02:00 PM - 04:00 PM", 
        title: "Workshop Sessions",
        description: "Interactive workshops on emerging technologies"
      },
      { 
        time: "04:30 PM - 06:00 PM", 
        title: "Fun Activities",
        description: "Networking and team-building activities"
      }
    ]
  },
  {
    day: "Day 2",
    date: "September 16, 2023",
    theme: "#9c27b0",
    highlight: true,
    events: [
      { 
        time: "09:30 AM - 11:30 AM", 
        title: "Technical Events - Finals",
        description: "Final rounds of technical competitions"
      },
      { 
        time: "12:00 PM - 02:00 PM", 
        title: "Project Showcase",
        description: "Exhibition of innovative projects"
      },
      { 
        time: "03:00 PM - 04:30 PM", 
        title: "Prize Distribution Ceremony",
        description: "Awarding the winners and closing remarks",
        highlight: true 
      },
      { 
        time: "05:00 PM - 06:00 PM", 
        title: "Closing Ceremony & Networking",
        description: "Vote of thanks and networking session"
      }
    ]
  }
];

const Timeline = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Animate timeline on scroll
    gsap.fromTo(
      timelineRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate items on scroll
    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(
        item,
        { 
          opacity: 0,
          y: 40,
          scale: 0.98
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          delay: i * 0.15
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="w-full bg-gradient-to-b from-gray-900 to-gray-900 overflow-hidden" style={{ padding: '120px 0 60px' }} ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center w-full"
          style={{ 
            marginBottom: '80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 w-full">
            <span className="bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
              Event
            </span>{' '}
            <span className="text-white">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" style={{ margin: '16px auto 0' }}></div>
        </motion.div>
        
        <div className="timeline-container relative" ref={timelineRef}>
          {/* Decorative elements */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl -z-10"></div>
          
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/30 via-indigo-500 to-blue-500/30 opacity-70"></div>
          
          {timelineData.map((dayData, dayIndex) => (
            <div 
              key={dayIndex}
              className={`timeline-day ${dayData.highlight ? 'highlight' : ''} ${dayIndex < timelineData.length - 1 ? 'mb-32' : 'mb-0'}`}
              style={{ '--day-theme': dayData.theme }}
            >
              <div className="relative" style={{ padding: '100px 0 60px' }}>
                <div className="day-header bg-gray-800/90 backdrop-blur-md px-8 py-4 rounded-full border border-gray-700/50 shadow-xl transform transition-all duration-300 hover:scale-105">
                  <h3 className="day-title text-xl font-bold text-white text-center">
                    <span className="bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent ">
                      {dayData.day}
                    </span>
                    <span className="block text-sm font-medium text-indigo-200 mt-1">{dayData.date}</span>
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {dayData.events.map((event, eventIndex) => (
                  <div 
                    key={eventIndex}
                    ref={el => el && !itemsRef.current.includes(el) && itemsRef.current.push(el)}
                    className={`timeline-item group relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden ${
                      event.highlight ? 'ring-2 ring-yellow-400/40' : ''
                    }`}
                  >
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start space-x-4">
                        <div className="event-icon flex-shrink-0 mt-1 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300">
                          {getEventIcon(event.title)}
                        </div>
                        <div className="event-content flex-1">
                          <div className="event-time text-xs font-medium text-indigo-300/90 mb-1.5 tracking-wide">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300">
                              {event.time}
                            </span>
                          </div>
                          <h4 className="event-title font-semibold text-white text-base md:text-[17px] leading-snug group-hover:text-indigo-100 transition-colors duration-300">
                            {event.title}
                          </h4>
                          {event.description && (
                            <p className="event-description text-gray-300/90 text-sm mt-2 leading-relaxed">
                              {event.description}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {event.highlight && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-br from-yellow-400 to-yellow-500 text-yellow-900 p-1.5 rounded-full shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                          <FaTrophy className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="timeline-line">
            <div className="line-progress"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
