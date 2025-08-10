// src/pages/JobReadiness.tsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type JobReadinessType = 'SCORE' | 'IMPROVE' | 'FULL';

interface AnalysisResult {
  type: JobReadinessType;
  data: any;
  success: boolean;
}

const JobReadiness = () => {
  const [formData, setFormData] = useState({
    resumeText: '',
    prompt: '',
  });
  const [analysisType, setAnalysisType] = useState<JobReadinessType>('FULL');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resumeText.trim()) {
      toast.error('Please enter your resume text');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/career/analysis`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          analysisType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (data.success) {
        setResult({
          type: analysisType,
          data: data.data,
          success: true
        });
        toast.success('Analysis completed!');
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    switch (result.type) {
      case 'SCORE':
        return <ScoreResult data={result.data} />;
      case 'IMPROVE':
        return <ImproveResult data={result.data} />;
      case 'FULL':
        return <FullResult data={result.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#1F1F1F] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#5324FD] to-[#FCC636] rounded-2xl mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            CareerBoost
          </h1>
          <p className="text-lg text-gray-400">
            AI-powered resume analysis and career insights
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-[#2B2B2B] border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Resume Input */}
            <div className="mb-8">
              <label htmlFor="resumeText" className="block text-sm font-semibold text-white mb-3">
                Resume Content
              </label>
              <textarea
                id="resumeText"
                name="resumeText"
                value={formData.resumeText}
                onChange={handleInputChange}
                placeholder="Paste your complete resume content here..."
                rows={12}
                disabled={isLoading}
                required
                className="w-full px-4 py-3 bg-[#1F1F1F] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5324FD] focus:border-transparent font-mono text-sm resize-none transition-all"
              />
            </div>

            {/* Analysis Type */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-white mb-3">
                Analysis Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['SCORE', 'IMPROVE', 'FULL'] as JobReadinessType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`py-3 px-4 rounded-xl border transition-all duration-200 font-medium ${
                      analysisType === type
                        ? 'bg-[#5324FD] border-[#5324FD] text-white shadow-lg shadow-[#5324FD]/30'
                        : 'bg-[#1F1F1F] border-gray-600 text-gray-300 hover:bg-[#5324FD]/10 hover:border-[#5324FD]/50'
                    }`}
                    onClick={() => setAnalysisType(type)}
                    disabled={isLoading}
                  >
                    {type === 'SCORE' ? 'Score Only' : type === 'IMPROVE' ? 'Improvements' : 'Full Analysis'}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Instructions */}
            <div className="mb-8">
              <label htmlFor="prompt" className="block text-sm font-semibold text-white mb-3">
                Custom Instructions (Optional)
              </label>
              <textarea
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleInputChange}
                placeholder="Add specific requirements or focus areas..."
                rows={3}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-[#1F1F1F] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5324FD] focus:border-transparent resize-none transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#5324FD] to-[#FCC636] hover:from-[#5324FD]/90 hover:to-[#FCC636]/90 shadow-lg shadow-[#5324FD]/30 hover:shadow-xl hover:shadow-[#5324FD]/40'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Resume...
                </span>
              ) : 'Analyze Resume'}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 bg-[#2B2B2B] border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-8 py-6 border-b border-gray-700 bg-gradient-to-r from-[#5324FD]/10 to-[#FCC636]/10">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <svg className="w-6 h-6 mr-3 text-[#FCC636]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analysis Results
                <span className="ml-3 px-3 py-1 bg-[#5324FD]/20 text-[#5324FD] text-sm rounded-full font-medium">
                  {result.type}
                </span>
              </h2>
            </div>
            <div className="p-8">
              {renderResult()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Result Components
const ScoreResult = ({ data }: { data: any }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative w-48 h-48 mb-8">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="rgb(55, 65, 81)"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 45 * (data.score / 100)}, ${2 * Math.PI * 45}`}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5324FD" />
            <stop offset="100%" stopColor="#FCC636" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-bold text-white">{data.score}</span>
      </div>
    </div>
    
    <div className="max-w-2xl">
      <h3 className="text-2xl font-bold text-white mb-4">Assessment Summary</h3>
      <p className="text-gray-300 text-lg leading-relaxed">{data.reason}</p>
      
      {data.confidence && (
        <div className="mt-6 p-4 bg-[#1F1F1F] rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400">Confidence Level</span>
            <span className="text-sm font-bold text-[#FCC636]">{(data.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#5324FD] to-[#FCC636] h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${data.confidence * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  </div>
);

const ImproveResult = ({ data }: { data: any }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between p-6 bg-[#1F1F1F] rounded-xl border border-gray-700">
      <div className="flex items-center space-x-4">
        <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide ${
          data.severity === 'high' ? 'bg-[#F5001E]/20 text-[#F5001E] border border-[#F5001E]/30' :
          data.severity === 'medium' ? 'bg-[#FCC636]/20 text-[#FCC636] border border-[#FCC636]/30' :
          'bg-[#5324FD]/20 text-[#5324FD] border border-[#5324FD]/30'
        }`}>
          {data.severity} Priority
        </span>
        <div className="text-white">
          <div className="text-sm text-gray-400 mb-1">Impact Potential</div>
          <div className="text-2xl font-bold">{data.impactPotential}%</div>
        </div>
      </div>
      <div className="w-32">
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-[#5324FD] to-[#FCC636] transition-all duration-1000 ease-out"
            style={{ width: `${data.impactPotential}%` }}
          ></div>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-white mb-6">Recommended Improvements</h3>
      <div className="space-y-4">
        {data.improvements.map((item: string, i: number) => (
          <div key={i} className="flex items-start p-4 bg-[#1F1F1F] rounded-xl border border-gray-700 hover:border-[#5324FD]/50 transition-all">
            <div className="flex-shrink-0 w-6 h-6 mt-1 mr-4">
              <div className="w-full h-full rounded-full border-2 border-[#5324FD] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#5324FD] rounded-full"></div>
              </div>
            </div>
            <span className="text-gray-300 leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FullResult = ({ data }: { data: any }) => (
  <div className="space-y-8">
    {/* Score and Overview */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-[#1F1F1F] rounded-xl p-6 border border-gray-700 text-center">
        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#5324FD] to-[#FCC636] mb-2">
          {data.score}
        </div>
        <div className="text-gray-400 text-sm uppercase tracking-wide">Overall Score</div>
      </div>

      <div className="lg:col-span-2 bg-[#1F1F1F] rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Key Strengths</h3>
        <div className="flex flex-wrap gap-2">
          {data.strengths.map((s: string, i: number) => (
            <span
              key={i}
              className="px-3 py-2 bg-[#5324FD]/20 text-[#5324FD] rounded-lg text-sm font-medium border border-[#5324FD]/30"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* Weaknesses */}
    <div className="bg-[#1F1F1F] rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">Areas for Improvement</h3>
      <div className="flex flex-wrap gap-2">
        {data.weaknesses.map((w: string, i: number) => (
          <span
            key={i}
            className="px-3 py-2 bg-[#F5001E]/20 text-[#F5001E] rounded-lg text-sm font-medium border border-[#F5001E]/30"
          >
            {w}
          </span>
        ))}
      </div>
    </div>

    {/* Action Plan */}
    <div className="bg-[#1F1F1F] rounded-xl border border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-bold text-white">Action Plan</h3>
      </div>
      
      <div className="divide-y divide-gray-700">
        {data.improvementPlan.map((item: any, i: number) => (
          <div key={i} className="p-6 hover:bg-[#2B2B2B]/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                    item.priority.toLowerCase() === 'high' ? 'bg-[#F5001E]/20 text-[#F5001E] border border-[#F5001E]/30' :
                    item.priority.toLowerCase() === 'medium' ? 'bg-[#FCC636]/20 text-[#FCC636] border border-[#FCC636]/30' : 
                    'bg-[#5324FD]/20 text-[#5324FD] border border-[#5324FD]/30'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default JobReadiness;