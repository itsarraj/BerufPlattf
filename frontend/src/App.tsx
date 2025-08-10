// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'react-hot-toast';
import JobReadiness from './pages/JobReadiness';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#1F1F1F] text-white">
        <main>
          <Routes>
            <Route index element={<JobReadiness />} />
            <Route path="*" element={<JobReadiness />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#2B2B2B',
              color: '#ffffff',
              border: '1px solid #5324FD',
              borderRadius: '12px',
              fontSize: '14px',
              boxShadow: '0 10px 40px rgba(83, 36, 253, 0.3)',
            },
            success: {
              style: {
                border: '1px solid #FCC636',
                boxShadow: '0 10px 40px rgba(252, 198, 54, 0.3)',
              },
            },
            error: {
              style: {
                border: '1px solid #F5001E',
                boxShadow: '0 10px 40px rgba(245, 0, 30, 0.3)',
              },
            },
          }}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;