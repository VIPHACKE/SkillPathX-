"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  IndianRupee,
  Clock,
  Building2,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Search,
  Filter,
  Sparkles,
} from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  experience: string;
  competition: "Low" | "Medium" | "High";
  skills: string[];
  postedDays: number;
  applyUrl: string;
}

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechStart India",
    location: "Bangalore, Karnataka",
    salaryRange: "₹4 - ₹6 LPA",
    experience: "0-1 years",
    competition: "Medium",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    postedDays: 2,
    applyUrl: "#",
  },
  {
    id: "2",
    title: "Junior Data Analyst",
    company: "DataDriven Solutions",
    location: "Mumbai, Maharashtra",
    salaryRange: "₹3 - ₹5 LPA",
    experience: "0-2 years",
    competition: "High",
    skills: ["Excel", "SQL", "Python", "Data Analysis"],
    postedDays: 1,
    applyUrl: "#",
  },
  {
    id: "3",
    title: "Digital Marketing Executive",
    company: "GrowthBox",
    location: "Delhi NCR",
    salaryRange: "₹2.5 - ₹4 LPA",
    experience: "0-1 years",
    competition: "Low",
    skills: ["Digital Marketing", "Content Writing", "Social Media"],
    postedDays: 3,
    applyUrl: "#",
  },
  {
    id: "4",
    title: "Python Developer",
    company: "CodeCraft Labs",
    location: "Hyderabad, Telangana",
    salaryRange: "₹4 - ₹7 LPA",
    experience: "0-2 years",
    competition: "Medium",
    skills: ["Python", "Django", "SQL", "REST APIs"],
    postedDays: 5,
    applyUrl: "#",
  },
  {
    id: "5",
    title: "UI/UX Designer",
    company: "DesignFirst Studio",
    location: "Pune, Maharashtra",
    salaryRange: "₹3 - ₹5 LPA",
    experience: "0-1 years",
    competition: "Medium",
    skills: ["UI/UX Design", "Figma", "Graphic Design"],
    postedDays: 4,
    applyUrl: "#",
  },
  {
    id: "6",
    title: "Content Writer",
    company: "WordWise Media",
    location: "Remote",
    salaryRange: "₹2 - ₹3.5 LPA",
    experience: "0-1 years",
    competition: "Low",
    skills: ["Content Writing", "SEO", "Communication"],
    postedDays: 1,
    applyUrl: "#",
  },
  {
    id: "7",
    title: "Java Developer Trainee",
    company: "Enterprise Solutions Ltd",
    location: "Chennai, Tamil Nadu",
    salaryRange: "₹3.5 - ₹5 LPA",
    experience: "Fresher",
    competition: "High",
    skills: ["Java", "SQL", "Spring Boot"],
    postedDays: 6,
    applyUrl: "#",
  },
  {
    id: "8",
    title: "Video Editor",
    company: "Creative Studios",
    location: "Mumbai, Maharashtra",
    salaryRange: "₹2.5 - ₹4.5 LPA",
    experience: "0-1 years",
    competition: "Low",
    skills: ["Video Editing", "After Effects", "Premiere Pro"],
    postedDays: 2,
    applyUrl: "#",
  },
];

const competitionConfig = {
  Low: { icon: TrendingDown, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  Medium: { icon: Minus, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  High: { icon: TrendingUp, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompetition, setSelectedCompetition] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setJobs(mockJobs);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Use useMemo for filtering instead of useEffect
  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCompetition !== "all") {
      filtered = filtered.filter((job) => job.competition === selectedCompetition);
    }

    return filtered;
  }, [searchQuery, selectedCompetition, jobs]);

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
            <Sparkles className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-sm text-gray-300">AI-Powered Job Matching</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Live Job Opportunities{" "}
            <span className="text-gradient">Matching Your Skills</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover jobs tailored to your skills with real-time market insights and competition analysis.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card glass-card-hover p-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title, company, or skill..."
                className="glass-input pl-10 w-full"
              />
            </div>

            {/* Competition Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedCompetition}
                onChange={(e) => setSelectedCompetition(e.target.value)}
                className="glass-input min-w-[140px]"
              >
                <option value="all">All Levels</option>
                <option value="Low">Low Competition</option>
                <option value="Medium">Medium</option>
                <option value="High">High Competition</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400 text-sm">
            Showing <span className="text-white font-semibold">{filteredJobs.length}</span> jobs
          </p>
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 animate-pulse">
                <div className="h-6 bg-white/10 rounded w-1/3 mb-4" />
                <div className="h-4 bg-white/5 rounded w-1/4 mb-2" />
                <div className="h-4 bg-white/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No jobs found matching your criteria</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job, index) => {
              const compConfig = competitionConfig[job.competition];
              const CompetitionIcon = compConfig.icon;

              return (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card glass-card-hover p-6"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Main Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00d4ff]/20 to-[#06b6d4]/20 border border-[#00d4ff]/20 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-[#00d4ff]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                          <p className="text-gray-400 text-sm">{job.company}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#00d4ff]" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <IndianRupee className="w-4 h-4 text-green-400" />
                          {job.salaryRange}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-500" />
                          {job.experience}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Competition & Apply */}
                    <div className="flex lg:flex-col items-center lg:items-end gap-3">
                      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${compConfig.bg} ${compConfig.border} border`}>
                        <CompetitionIcon className={`w-4 h-4 ${compConfig.color}`} />
                        <span className={`text-sm font-medium ${compConfig.color}`}>
                          {job.competition} Competition
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{job.postedDays}d ago</span>
                      <a
                        href={job.applyUrl}
                        className="btn-primary text-sm flex items-center gap-2"
                      >
                        Apply Now
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Want to generate a CV for these jobs?</p>
          <Link href="/cv-generator" className="btn-secondary inline-flex items-center gap-2">
            Generate Professional CV
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
