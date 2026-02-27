"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FileText,
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Code,
  FolderKanban,
  Download,
  Sparkles,
  Loader2,
  Plus,
  X,
} from "lucide-react";

interface CVData {
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string[];
  projects: string[];
  experience: string;
  summary: string;
}

export default function CVGeneratorPage() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cvData, setCvData] = useState<CVData>({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: [],
    projects: [],
    experience: "",
    summary: "",
  });
  const [newSkill, setNewSkill] = useState("");
  const [newProject, setNewProject] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !cvData.skills.includes(newSkill.trim())) {
      setCvData({ ...cvData, skills: [...cvData.skills, newSkill.trim()] });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setCvData({ ...cvData, skills: cvData.skills.filter((s) => s !== skill) });
  };

  const addProject = () => {
    if (newProject.trim() && !cvData.projects.includes(newProject.trim())) {
      setCvData({ ...cvData, projects: [...cvData.projects, newProject.trim()] });
      setNewProject("");
    }
  };

  const removeProject = (project: string) => {
    setCvData({ ...cvData, projects: cvData.projects.filter((p) => p !== project) });
  };

  const generateSummary = async () => {
    if (!cvData.name || cvData.skills.length === 0) return;

    setIsGenerating(true);

    try {
      const response = await fetch("/api/generate-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cvData.name,
          skills: cvData.skills,
          experience: cvData.experience,
        }),
      });

      const data = await response.json();
      setCvData({ ...cvData, summary: data.summary });
    } catch (error) {
      // Fallback summary
      const summary = `Motivated ${cvData.experience || "entry-level"} professional with expertise in ${cvData.skills.slice(0, 3).join(", ")}${cvData.skills.length > 3 ? " and more" : ""}. Eager to contribute to innovative projects and grow within a dynamic team environment. Strong problem-solving abilities and commitment to continuous learning.`;
      setCvData({ ...cvData, summary });
    }

    setIsGenerating(false);
    setShowPreview(true);
  };

  const downloadCV = () => {
    // Create printable content
    const printContent = `
      <html>
        <head>
          <title>${cvData.name} - CV</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; }
            h1 { color: #0ea5e9; margin-bottom: 5px; }
            h2 { color: #334155; border-bottom: 2px solid #0ea5e9; padding-bottom: 5px; margin-top: 25px; }
            .contact { color: #64748b; margin-bottom: 20px; }
            .section { margin-bottom: 20px; }
            .skill-tag { display: inline-block; background: #f0f9ff; padding: 4px 12px; margin: 2px; border-radius: 20px; font-size: 12px; }
            .project { margin-bottom: 10px; padding-left: 15px; border-left: 3px solid #0ea5e9; }
          </style>
        </head>
        <body>
          <h1>${cvData.name}</h1>
          <div class="contact">
            ${cvData.email} | ${cvData.phone}
          </div>
          
          <div class="section">
            <h2>Professional Summary</h2>
            <p>${cvData.summary}</p>
          </div>
          
          <div class="section">
            <h2>Education</h2>
            <p>${cvData.education}</p>
          </div>
          
          <div class="section">
            <h2>Skills</h2>
            ${cvData.skills.map(s => `<span class="skill-tag">${s}</span>`).join(" ")}
          </div>
          
          ${cvData.projects.length > 0 ? `
          <div class="section">
            <h2>Projects</h2>
            ${cvData.projects.map(p => `<div class="project">${p}</div>`).join("")}
          </div>
          ` : ""}
          
          ${cvData.experience ? `
          <div class="section">
            <h2>Experience</h2>
            <p>${cvData.experience}</p>
          </div>
          ` : ""}
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="relative min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <FileText className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-sm text-gray-300">Professional CV Builder</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Auto-Generate Your{" "}
            <span className="text-gradient">Professional CV</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enter your details and let AI create a professional summary. Download as PDF instantly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Personal Info */}
            <div className="glass-card glass-card-hover p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#00d4ff]" />
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={cvData.name}
                    onChange={(e) => setCvData({ ...cvData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="glass-input"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        value={cvData.email}
                        onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="tel"
                        value={cvData.phone}
                        onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="glass-input pl-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="glass-card glass-card-hover p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#00d4ff]" />
                Education
              </h3>
              <textarea
                value={cvData.education}
                onChange={(e) => setCvData({ ...cvData, education: e.target.value })}
                placeholder="B.Tech in Computer Science from XYZ College (2020-2024)&#10;CGPA: 8.5/10"
                className="glass-input h-24 resize-none"
              />
            </div>

            {/* Skills */}
            <div className="glass-card glass-card-hover p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-[#00d4ff]" />
                Skills
              </h3>
              {cvData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {cvData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#00d4ff]/20 border border-[#00d4ff]/30 text-[#00d4ff] text-sm"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  placeholder="Add a skill"
                  className="glass-input flex-1"
                />
                <button onClick={addSkill} className="btn-secondary">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Projects */}
            <div className="glass-card glass-card-hover p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-[#00d4ff]" />
                Projects
              </h3>
              {cvData.projects.length > 0 && (
                <div className="space-y-2 mb-4">
                  {cvData.projects.map((project) => (
                    <div
                      key={project}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <span className="text-gray-300 text-sm">{project}</span>
                      <button onClick={() => removeProject(project)}>
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addProject()}
                  placeholder="E.g., E-commerce Website using React"
                  className="glass-input flex-1"
                />
                <button onClick={addProject} className="btn-secondary">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Experience */}
            <div className="glass-card glass-card-hover p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#00d4ff]" />
                Experience (Optional)
              </h3>
              <textarea
                value={cvData.experience}
                onChange={(e) => setCvData({ ...cvData, experience: e.target.value })}
                placeholder="Software Intern at ABC Company (Jan 2024 - Mar 2024)&#10;- Developed frontend features&#10;- Collaborated with team on API integration"
                className="glass-input h-24 resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateSummary}
              disabled={!cvData.name || cvData.skills.length === 0 || isGenerating}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Summary...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate CV Summary
                </>
              )}
            </button>
          </motion.div>

          {/* CV Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">CV Preview</h3>
                {showPreview && (
                  <button
                    onClick={downloadCV}
                    className="btn-primary text-sm flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                )}
              </div>

              {showPreview && cvData.summary ? (
                <div
                  ref={cvRef}
                  className="bg-white rounded-lg p-6 text-gray-800 min-h-[500px]"
                >
                  {/* Header */}
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{cvData.name || "Your Name"}</h1>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-1">
                      {cvData.email && <span>{cvData.email}</span>}
                      {cvData.phone && <span>{cvData.phone}</span>}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mb-4">
                    <h2 className="text-sm font-bold text-sky-600 uppercase tracking-wider mb-2">
                      Professional Summary
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">{cvData.summary}</p>
                  </div>

                  {/* Education */}
                  {cvData.education && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold text-sky-600 uppercase tracking-wider mb-2">
                        Education
                      </h2>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{cvData.education}</p>
                    </div>
                  )}

                  {/* Skills */}
                  {cvData.skills.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold text-sky-600 uppercase tracking-wider mb-2">
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {cvData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-sky-50 text-sky-700 rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {cvData.projects.length > 0 && (
                    <div className="mb-4">
                      <h2 className="text-sm font-bold text-sky-600 uppercase tracking-wider mb-2">
                        Projects
                      </h2>
                      <ul className="space-y-2">
                        {cvData.projects.map((project) => (
                          <li key={project} className="text-sm text-gray-600 pl-3 border-l-2 border-sky-200">
                            {project}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Experience */}
                  {cvData.experience && (
                    <div>
                      <h2 className="text-sm font-bold text-sky-600 uppercase tracking-wider mb-2">
                        Experience
                      </h2>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{cvData.experience}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white/5 rounded-lg p-12 text-center min-h-[500px] flex items-center justify-center">
                  <div>
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Fill in your details and generate to preview your CV</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
