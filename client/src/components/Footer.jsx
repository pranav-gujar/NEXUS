import React from 'react';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import './Footer.css';
import PGTLogo from '../assets/logos/PGT Logo.png';

const Footer = () => {
  const sponsors = [
    { name: 'PGT Global Network', url: 'https://www.linkedin.com/company/pgt-global-network/', logo: PGTLogo },
    // Add more sponsors if available
  ];

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          
          {/* Branding */}
          <div className="footer-branding">
            <h2>NEXUS 2K25</h2>
            <p>Empowering youth through service, leadership, and fellowship.</p>
          </div>

          {/* Social Media Links */}
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a
                href="https://www.instagram.com/wcerotaract"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/rotaract-club-of-wce-sangli/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.youtube.com/@rotaractclubofwcesangli7003/featured"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul>
              <li>
                Email: <br />
                <a href="mailto:rotaractclubofwcesangli@gmail.com">
                  rotaractclubofwcesangli@gmail.com
                </a>
              </li>
              <li>
                Phone: <br />
                <a href="tel:+919665136330">+91 96651 36330</a>
              </li>
              <li>
                Address: <br />
                <a href="https://share.google/idflacvpBZp1IuahD">
                  Walchand College of Engineering,
                  Vishrambag, Sangli, Maharashtra 416415, India
                </a>
              </li>
            </ul>
          </div>

          {/* Event Sponsors */}
          <div className="footer-sponsors">
            <h3>Event Sponsors</h3>
            <div className={`sponsor-list ${sponsors.length === 1 ? 'single-sponsor' : ''}`}>
  {sponsors.map((sponsor, index) => (
    <a
      key={index}
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={sponsor.name}
    >
      <img src={sponsor.logo} alt={sponsor.name} />
    </a>
  ))}
</div>

          </div>
        </div>

        {/* Bottom note */}
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} Rotaract Club Of WCE Sangli. 
          All rights reserved. <br /> Developed with ❤️ by TechOps Rotaract.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
