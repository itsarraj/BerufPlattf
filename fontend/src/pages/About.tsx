// src/pages/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>About CareerBoost</h1>
          <p>Helping professionals achieve their career goals with AI-powered insights.</p>
        </div>

        <div className="content-section">
          <h2>Our Mission</h2>
          <p>
            At CareerBoost, we believe everyone deserves the opportunity to showcase their best professional self. 
            Our AI-powered platform provides personalized resume analysis and career readiness insights to help 
            job seekers stand out in today's competitive market.
          </p>
        </div>

        <div className="content-section">
          <h2>What We Do</h2>
          <div className="features-list">
            <div className="feature-item">
              <h3>🎯 Resume Analysis</h3>
              <p>Get detailed feedback on your resume's content, structure, and ATS optimization.</p>
            </div>
            <div className="feature-item">
              <h3>⚡ Instant Insights</h3>
              <p>Receive immediate recommendations to improve your job readiness score.</p>
            </div>
            <div className="feature-item">
              <h3>🎨 Personalized Tips</h3>
              <p>Get customized advice based on your career goals and industry.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default About;