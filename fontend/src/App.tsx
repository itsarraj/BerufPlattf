// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import JobReadiness from './pages/JobReadiness';
import About from './pages/About';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="job-readiness" element={<JobReadiness />} />
            {/* <Route path="about" element={<About />} /> */}
            {/* <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>

        <Footer />
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#f9fafb',
              border: '1px solid #374151',
              borderRadius: '8px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;