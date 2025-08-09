// src/pages/JobReadiness.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import './JobReadiness.css';

const JobReadiness = () => {
  const [formData, setFormData] = useState({
    resumeText: '',
    prompt: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.resumeText.trim()) {
      toast.error('Please enter your resume text');
      return;
    }

    if (!formData.prompt.trim()) {
      toast.error('Please enter your analysis prompt');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/career/analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.success) {
        setResult(data.data);
        toast.success('Analysis completed!');
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const promptSuggestions = [
    'Analyze my resume and provide a job readiness score out of 10 with specific improvement suggestions.',
    'Review my resume for ATS optimization and keyword improvements.',
    'Evaluate my skills and experience alignment for software engineering roles.',
    'Suggest improvements for better presentation and formatting of my resume.',
  ];

  return (
    <div className="job-readiness">
      <div className="container">
        <div className="page-header">
          <h1>Job Readiness Analysis</h1>
          <p>
            Get AI-powered insights on your resume and improve your chances of
            landing your dream job.
          </p>
        </div>

        <div className="analysis-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="resumeText">Resume Content</label>
              <textarea
                id="resumeText"
                name="resumeText"
                value={formData.resumeText}
                onChange={handleInputChange}
                placeholder="Paste your complete resume content here..."
                rows={12}
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="prompt">Analysis Instructions</label>
              <textarea
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleInputChange}
                placeholder="What specific analysis do you want? (e.g., 'Give me a job readiness score and improvement suggestions')"
                rows={4}
                disabled={isLoading}
              />

              <div className="prompt-suggestions">
                <p>Quick suggestions:</p>
                <div className="suggestions-grid">
                  {promptSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      className="suggestion-btn"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, prompt: suggestion }))
                      }
                      disabled={isLoading}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary btn-large ${
                isLoading ? 'loading' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Analyzing...' : 'Analyze My Resume'}
            </button>
          </form>
        </div>

        {result && (
          <div className="analysis-result">
            <h2>Analysis Results</h2>
            <div className="markdown-container">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({node, ...props}) => (
                    <div className="table-container">
                      <table {...props} />
                    </div>
                  )
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default JobReadiness;
