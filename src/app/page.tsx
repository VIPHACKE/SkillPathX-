"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  Target,
  Briefcase,
  CheckCircle2,
  X,
  Loader2,
  ArrowRight,
  IndianRupee,
  BarChart3,
  MapPin,
  Clock,
  BookOpen,
} from "lucide-react";

const suggestedSkills = [
  "HTML", "CSS", "JavaScript", "React", "Python", "Java", "Node.js",
  "Communication", "Excel", "Graphic Design", "Video Editing", "Data Analysis",
  "SQL", "Machine Learning", "Digital Marketing", "Content Writing",
  "Photography", "UI/UX Design", "Project Management", "Sales",
];

interface CareerResult {
  career: string;
  salaryRange: string;
  placementProbability: number;
  roadmap: { step: number; title: string; description: string }[];
  skillGap: {
    current: string[];
    required: string[];
    missing: string[];
  };
}

// Initialize session ID synchronously
const getSessionId = (): string => {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem("skillpathx_session");
  if (!sid) {
    sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("skillpathx_session", sid);
  }
  return sid;
};

export default function HomePage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CareerResult | null>(null);
  const [sessionId] = useState<string>(getSessionId);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills((prev) => [...prev, customSkill.trim()]);
      setCustomSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const generateCareerPlan = async () => {
    if (selectedSkills.length === 0) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch("/api/career-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: selectedSkills,
          sessionId,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error generating career plan:", error);
      // Fallback mock data
      setResult({
        career: "Frontend Developer",
        salaryRange: "₹3 LPA – ₹6 LPA",
        placementProbability: 42,
        roadmap: [
          { step: 1, title: "Improve Core Skills", description: "Master JavaScript, HTML, CSS fundamentals" },
          { step: 2, title: "Build 2 Projects", description: "Create portfolio projects using React" },
          { step: 3, title: "Internship / Freelance", description: "Gain real-world experience" },
          { step: 4, title: "Apply Smartly", description: "Target startups and growing companies" },
        ],
        skillGap: {
          current: selectedSkills,
          required: ["JavaScript", "React", "TypeScript", "Git", "REST APIs", "CSS Frameworks"],
          missing: ["TypeScript", "Git", "REST APIs", "CSS Frameworks"].filter(s => !selectedSkills.includes(s)),
        },
      });
    }

    setIsGenerating(false);
  };

  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-[#00d4ff]" />
              <span className="text-sm text-gray-300">AI-Powered Career Planning</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Turn Your Skills into a{" "}
              <span className="text-gradient">Career Plan</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              AI-powered roadmap designed for Indian job market reality. Get realistic salary estimates, placement probability, and personalized guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skill Input Section */}
      <section id="generate" className="pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card glass-card-hover p-6 sm:p-8"
          >
            <h2 className="text-xl font-semibold text-white mb-2">Select Your Skills</h2>
            <p className="text-gray-400 text-sm mb-6">Choose skills you have or type custom ones</p>

            {/* Selected Skills Display */}
            {selectedSkills.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-400 mb-3">Your Skills ({selectedSkills.length})</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <motion.span
                      key={skill}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/30 text-[#00d4ff] text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Skills */}
            <div className="mb-6">
              <p className="text-sm text-gray-400 mb-3">Suggested Skills</p>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`skill-tag ${selectedSkills.includes(skill) ? "selected" : ""}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Skill Input */}
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
                placeholder="Type a custom skill..."
                className="glass-input flex-1"
              />
              <button
                onClick={addCustomSkill}
                className="btn-secondary"
              >
                Add
              </button>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateCareerPlan}
              disabled={selectedSkills.length === 0 || isGenerating}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Your Career Plan...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate My Career Plan
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Result Section */}
      <AnimatePresence>
        {result && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-20 px-4"
          >
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Career Suggestion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card glass-card-hover p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#06b6d4]/20 border border-[#00d4ff]/20 mb-4">
                  <Briefcase className="w-8 h-8 text-[#00d4ff]" />
                </div>
                <p className="text-sm text-gray-400 mb-2">Suggested Career</p>
                <h2 className="text-3xl font-bold text-gradient mb-2">{result.career}</h2>
                <p className="text-gray-400 text-sm">Based on your current skill set</p>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Salary Range */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card glass-card-hover p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-green-500/10">
                      <IndianRupee className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Salary Range</p>
                      <p className="text-xs text-gray-500">Indian Market - Entry Level</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{result.salaryRange}</p>
                  <p className="text-xs text-gray-500 mt-2">*Based on current market trends for freshers</p>
                </motion.div>

                {/* Placement Probability */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card glass-card-hover p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-[#00d4ff]/10">
                      <BarChart3 className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Placement Probability</p>
                      <p className="text-xs text-gray-500">Based on competition & skill gap</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white mb-3">{result.placementProbability}%</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-bar-fill"
                      style={{ width: `${result.placementProbability}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {result.placementProbability >= 60 
                      ? "Good chances! Focus on building projects." 
                      : result.placementProbability >= 40 
                      ? "Moderate. Consider upskilling in key areas."
                      : "Build more skills to improve your chances."}
                  </p>
                </motion.div>
              </div>

              {/* Career Roadmap */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card glass-card-hover p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#00d4ff]" />
                  Career Roadmap
                </h3>
                <div className="space-y-4">
                  {result.roadmap.map((step, index) => (
                    <div key={step.step} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#06b6d4] flex items-center justify-center text-[#0a0a1a] font-bold flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1 glass-card p-4 bg-white/5">
                        <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skill Gap Analysis */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card glass-card-hover p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Target className="w-5 h-5 text-[#00d4ff]" />
                  Skill Gap Analysis
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-green-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Your Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.skillGap.current.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[#00d4ff] mb-3">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {result.skillGap.required.map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 rounded-full text-sm ${
                            result.skillGap.missing.includes(skill)
                              ? "bg-orange-500/10 border border-orange-500/20 text-orange-400"
                              : "bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff]"
                          }`}
                        >
                          {skill} {!result.skillGap.missing.includes(skill) && "✓"}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {result.skillGap.missing.length > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <p className="text-sm text-orange-400">
                      <strong>Skills to Learn:</strong> {result.skillGap.missing.join(", ")}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="/jobs"
                  className="btn-primary flex items-center justify-center gap-2"
                >
                  View Matching Jobs
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/cv-generator"
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  Generate CV
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
