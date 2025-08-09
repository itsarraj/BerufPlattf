// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">CareerBoost</h3>
            <p className="footer-description">
              Empowering professionals with AI-powered career insights and resume analysis.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/job-readiness" className="footer-link">Job Readiness</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">Career Tips</a>
              <a href="#" className="footer-link">Resume Templates</a>
              <a href="#" className="footer-link">Interview Guide</a>
              <a href="#" className="footer-link">FAQ</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-links">
              <a href="#" className="footer-link">LinkedIn</a>
              <a href="#" className="footer-link">Twitter</a>
              <a href="#" className="footer-link">GitHub</a>
              <a href="mailto:support@careerboost.com" className="footer-link">Email</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 CareerBoost. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#" className="footer-link">Privacy Policy</a>
            <a href="#" className="footer-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;