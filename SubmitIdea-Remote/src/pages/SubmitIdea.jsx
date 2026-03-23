import React, { useState } from "react";
import "../style.css";

const SubmitIdea = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    targetAudience: "",
    problemStatement: "",
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "description") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setError("");
    setAnalysisResult(null);
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/ideas/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setAnalysisResult(result.data);
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 overflow-x-hidden min-h-screen flex flex-col items-center z-20 relative">
      {/* Subtle Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-orange-100/30 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-indigo-100/30 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="w-full max-w-[800px] py-20 px-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        {/* Header Block */}
        <div className="text-center mb-16 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-[11px] font-bold text-orange-600 uppercase tracking-widest shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            AI Engine v2.4 Active
          </div>
          <h1 className="text-5xl md:text-6xl font-serif-display text-stone-900 tracking-tight leading-[1.05]">
            Validate your <span className="text-orange-500">Startup Idea</span>
          </h1>
          <p className="text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
            Harness powerful AI analysis to understand market demand, risks, and competition before you write your first line of code.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-stone-200/60 rounded-[32px] p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_45px_rgb(120,113,108,0.08)] transition-all duration-700">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Title */}
            <div className="space-y-4">
              <label htmlFor="title" className="block text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                Project Title
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. AI-powered fitness assistant"
                  className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl pl-14 pr-7 py-5 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all placeholder:text-stone-300 text-stone-900 text-lg shadow-sm"
                  onChange={handleInputChange}
                  value={formData.title}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <label htmlFor="description" className="block text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                The Core Vision
              </label>
              <div className="relative group">
                <div className="absolute left-6 top-6 text-stone-300 group-focus-within:text-orange-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  placeholder="What problem are you solving? Who is it for? How does it make money?"
                  className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl pl-14 pr-7 py-5 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all placeholder:text-stone-300 text-stone-900 text-lg resize-none shadow-sm leading-relaxed"
                  onChange={handleInputChange}
                  value={formData.description}
                  required
                />
                <div className="absolute bottom-5 right-5 text-[10px] font-mono text-stone-400 tracking-tighter opacity-50 uppercase">
                  {charCount.toString().padStart(4, '0')} CHARACTERS
                </div>
              </div>
            </div>

            {/* Grid for Small Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label htmlFor="category" className="block text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                  Industry / Category
                </label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-orange-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <select
                    id="category"
                    name="category"
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl pl-14 pr-7 py-5 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all text-stone-900 appearance-none cursor-pointer text-lg shadow-sm"
                    onChange={handleInputChange}
                    value={formData.category}
                    required
                  >
                    <option value="" disabled>Select category</option>
                    <option value="saas">SaaS</option>
                    <option value="marketplace">Marketplace</option>
                    <option value="ai">AI / ML</option>
                    <option value="fintech">Fintech</option>
                    <option value="health">Health Tech</option>
                    <option value="edtech">EdTech</option>
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="targetAudience" className="block text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">
                  Target Audience
                </label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-orange-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="targetAudience"
                    name="targetAudience"
                    placeholder="e.g. Solo founders, Gen Z"
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-2xl pl-14 pr-7 py-5 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all placeholder:text-stone-300 text-stone-900 text-lg shadow-sm"
                    onChange={handleInputChange}
                    value={formData.targetAudience}
                    required
                  />
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="pt-8 text-center">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-3 bg-stone-900 hover:bg-stone-800 text-white font-bold py-6 rounded-[24px] shadow-2xl shadow-stone-900/20 active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isAnalyzing ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xl tracking-tight">AI Analysis in Progress...</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl tracking-tight">Analyze startup idea</span>
                    <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 text-red-600 border border-red-200 rounded-2xl text-center">
            {error}
          </div>
        )}

        {/* Info Blocks or Analysis Result Underneath */}
        {analysisResult ? (
          <div className="mt-16 bg-white border border-stone-200/60 rounded-[32px] p-8 md:p-14 shadow-lg animate-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl font-serif-display text-stone-900 mb-8 border-b border-stone-100 pb-4">
              Analysis Results
            </h2>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-green-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Strengths
                  </h3>
                  <ul className="space-y-3">
                    {analysisResult.analysisResult?.pros?.map((pro, i) => (
                      <li key={i} className="flex gap-3 text-stone-700 text-lg">
                        <span className="text-green-500 mt-1">•</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Risks
                  </h3>
                  <ul className="space-y-3">
                    {analysisResult.analysisResult?.cons?.map((con, i) => (
                      <li key={i} className="flex gap-3 text-stone-700 text-lg">
                        <span className="text-red-400 mt-1">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:w-72 flex flex-col items-center justify-start pt-4 border-t md:border-t-0 md:border-l border-stone-100 md:pl-12">
                <div className="w-32 h-32 rounded-full border-8 border-stone-50 flex items-center justify-center relative shadow-inner mb-6">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r="46%" fill="none" stroke="#f5f5f4" strokeWidth="8" />
                    <circle
                      cx="50%" cy="50%" r="46%"
                      fill="none"
                      stroke="#f97316"
                      strokeWidth="8"
                      strokeDasharray="300"
                      strokeDashoffset={300 - (300 * analysisResult.validationScore) / 100}
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="text-center z-10">
                    <span className="block text-4xl font-black text-stone-900">{analysisResult.validationScore}</span>
                  </div>
                </div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 text-center">Validation Score</h4>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-stone-100">
              <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-3">AI Feedback</h3>
              <p className="text-stone-800 text-lg leading-relaxed italic border-l-4 border-orange-500 pl-4 py-1 bg-gradient-to-r from-orange-50/50 to-transparent">
                "{analysisResult.analysisResult?.feedback}"
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Market Integrity",
                desc: "Deep search across current trends and active competitors.",
                icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
              },
              {
                title: "Execution Risks",
                desc: "Mapping technical and operational hurdles in your niche.",
                icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
              },
              {
                title: "Blue Ocean Logic",
                desc: "Finding gaps where you can dominate with unique value.",
                icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-orange-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-stone-900">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-24 text-center text-[10px] font-black uppercase tracking-widest text-stone-300">
          Idea Validator Engine © 2026 Powered by IdeaProof
        </p>
      </div>
    </div>
  );
};

export default SubmitIdea;
;