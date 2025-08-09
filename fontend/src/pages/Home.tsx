// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Boost Your <span className="highlight">Career</span> Readiness
            </h1>
            <p className="hero-description">
              Get personalized insights and recommendations to improve your job readiness. 
              Upload your resume and receive AI-powered feedback to land your dream job.
            </p>
            <div className="hero-buttons">
              <Link to="/job-readiness" className="btn btn-primary">
                Check My Resume
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-graphic">
              <div className="graphic-circle"></div>
              <div className="graphic-dots"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose CareerBoost?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>AI-Powered Analysis</h3>
              <p>Get intelligent feedback on your resume using advanced AI technology.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Results</h3>
              <p>Receive immediate insights and recommendations within seconds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Personalized Tips</h3>
              <p>Get customized suggestions based on your specific career goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Boost Your Career?</h2>
            <p>Join thousands of professionals who have improved their job prospects.</p>
            <Link to="/job-readiness" className="btn btn-primary btn-large">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;