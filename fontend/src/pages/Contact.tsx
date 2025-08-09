// src/pages/Contact.jsx
export const Contact = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>Contact Us</h1>
          <p>Have questions? We'd love to hear from you.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <div className="contact-item">
              <h3>📧 Email</h3>
              <p>support@careerboost.com</p>
            </div>
            <div className="contact-item">
              <h3>💬 Support</h3>
              <p>Available Monday - Friday, 9AM - 6PM EST</p>
            </div>
            <div className="contact-item">
              <h3>🌐 Social</h3>
              <p>Follow us on LinkedIn and Twitter for career tips</p>
            </div>
          </div>

          <div className="contact-form">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your.email@example.com" />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="How can we help?" />
              </div>
              <div className="form-group">
                <label>Message</label>
                {/* <textarea rows="5" placeholder="Tell us more about your inquiry..."></textarea> */}
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

