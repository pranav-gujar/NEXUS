import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const sponsors = [
    { name: 'Sponsor One', url: '#', logo: 'https://via.placeholder.com/100x50?text=Sponsor+1' },
    { name: 'Sponsor Two', url: '#', logo: 'https://via.placeholder.com/100x50?text=Sponsor+2' },
    { name: 'Sponsor Three', url: '#', logo: 'https://via.placeholder.com/100x50?text=Sponsor+3' },
  ];

  return (
    <footer className="footer-section bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="footer-content flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Branding */}
          <div className="footer-branding flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold text-white mb-2">Rotaract Club</h2>
            <p className="max-w-xs text-center md:text-left">
              Empowering youth through service, leadership, and fellowship.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="footer-social">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4 text-white text-lg">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:info@rotaractclub.org" className="text-indigo-400">info@rotaractclub.org</a></li>
              <li>Phone: <a href="tel:+1234567890" className="text-indigo-400">+1 (234) 567-890</a></li>
              <li>Address: 123 Rotaract St, City, Country</li>
            </ul>
          </div>

          {/* Event Sponsors */}
          <div className="footer-sponsors">
            <h3 className="text-xl font-semibold mb-4">Event Sponsors</h3>
            <div className="flex gap-4">
              {sponsors.map((sponsor, index) => (
                <a key={index} href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name}>
                  <img src={sponsor.logo} alt={sponsor.name} className="h-12 object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom mt-12 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rotaract Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
