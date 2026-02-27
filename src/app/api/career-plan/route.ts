import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

interface CareerPlanRequest {
  skills: string[];
  sessionId: string;
}

interface CareerPlanResponse {
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

// Career mappings based on skill combinations
const careerMappings: Record<string, { career: string; salaryRange: string; probability: number; requiredSkills: string[] }> = {
  "frontend": {
    career: "Frontend Developer",
    salaryRange: "₹3 LPA – ₹6 LPA",
    probability: 45,
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Git", "Responsive Design"],
  },
  "backend": {
    career: "Backend Developer",
    salaryRange: "₹3.5 LPA – ₹7 LPA",
    probability: 40,
    requiredSkills: ["Python", "Java", "Node.js", "SQL", "REST APIs", "Git"],
  },
  "fullstack": {
    career: "Full Stack Developer",
    salaryRange: "₹4 LPA – ₹8 LPA",
    probability: 35,
    requiredSkills: ["JavaScript", "React", "Node.js", "SQL", "Git", "REST APIs"],
  },
  "data": {
    career: "Junior Data Analyst",
    salaryRange: "₹3 LPA – ₹5 LPA",
    probability: 50,
    requiredSkills: ["Excel", "SQL", "Python", "Data Analysis", "Statistics"],
  },
  "marketing": {
    career: "Digital Marketing Executive",
    salaryRange: "₹2.5 LPA – ₹4 LPA",
    probability: 55,
    requiredSkills: ["Digital Marketing", "Content Writing", "SEO", "Social Media", "Analytics"],
  },
  "design": {
    career: "UI/UX Designer",
    salaryRange: "₹3 LPA – ₹5 LPA",
    probability: 42,
    requiredSkills: ["UI/UX Design", "Figma", "Graphic Design", "User Research", "Prototyping"],
  },
  "content": {
    career: "Content Writer",
    salaryRange: "₹2 LPA – ₹3.5 LPA",
    probability: 60,
    requiredSkills: ["Content Writing", "SEO", "Communication", "Research", "Editing"],
  },
  "video": {
    career: "Video Editor",
    salaryRange: "₹2.5 LPA – ₹4.5 LPA",
    probability: 48,
    requiredSkills: ["Video Editing", "Premiere Pro", "After Effects", "Storytelling"],
  },
  "python": {
    career: "Python Developer",
    salaryRange: "₹3.5 LPA – ₹6 LPA",
    probability: 43,
    requiredSkills: ["Python", "Django", "SQL", "REST APIs", "Git"],
  },
  "java": {
    career: "Java Developer",
    salaryRange: "₹3.5 LPA – ₹6 LPA",
    probability: 40,
    requiredSkills: ["Java", "Spring Boot", "SQL", "Git", "REST APIs"],
  },
};

function determineCareer(skills: string[]): CareerPlanResponse {
  const skillLower = skills.map(s => s.toLowerCase());
  
  // Determine career path based on skill combination
  let bestMatch = {
    career: "Software Developer",
    salaryRange: "₹3 LPA – ₹5 LPA",
    probability: 35,
    requiredSkills: ["Programming", "Problem Solving", "Communication"],
  };

  // Frontend skills
  if (skillLower.some(s => ["html", "css", "javascript", "react"].includes(s))) {
    bestMatch = careerMappings["frontend"];
  }
  
  // Backend skills
  if (skillLower.some(s => ["python", "java", "node.js", "sql"].includes(s))) {
    if (skillLower.some(s => ["html", "css", "javascript", "react"].includes(s))) {
      bestMatch = careerMappings["fullstack"];
    } else {
      bestMatch = skillLower.includes("python") ? careerMappings["python"] : 
                  skillLower.includes("java") ? careerMappings["java"] : 
                  careerMappings["backend"];
    }
  }
  
  // Data skills
  if (skillLower.some(s => ["excel", "sql", "data analysis", "python"].includes(s)) &&
      !skillLower.some(s => ["html", "css", "react"].includes(s))) {
    bestMatch = careerMappings["data"];
  }
  
  // Marketing skills
  if (skillLower.some(s => ["digital marketing", "content writing", "seo", "social media"].includes(s))) {
    bestMatch = careerMappings["marketing"];
  }
  
  // Design skills
  if (skillLower.some(s => ["ui/ux design", "graphic design", "figma"].includes(s))) {
    bestMatch = careerMappings["design"];
  }
  
  // Content skills
  if (skillLower.some(s => ["content writing", "communication"].includes(s)) &&
      !skillLower.some(s => ["javascript", "python", "java"].includes(s))) {
    bestMatch = careerMappings["content"];
  }
  
  // Video skills
  if (skillLower.some(s => ["video editing", "premiere pro", "after effects"].includes(s))) {
    bestMatch = careerMappings["video"];
  }

  // Calculate missing skills
  const missingSkills = bestMatch.requiredSkills.filter(
    req => !skillLower.some(skill => req.toLowerCase().includes(skill) || skill.includes(req.toLowerCase()))
  );

  // Adjust probability based on skill match
  const matchRatio = (bestMatch.requiredSkills.length - missingSkills.length) / bestMatch.requiredSkills.length;
  const adjustedProbability = Math.round(bestMatch.probability * (0.5 + matchRatio * 0.5));

  return {
    career: bestMatch.career,
    salaryRange: bestMatch.salaryRange,
    placementProbability: Math.min(adjustedProbability, 75),
    roadmap: [
      { step: 1, title: "Improve Core Skills", description: `Master ${bestMatch.requiredSkills.slice(0, 2).join(" and ")} fundamentals` },
      { step: 2, title: "Build 2 Projects", description: "Create portfolio projects to showcase your skills" },
      { step: 3, title: "Internship / Freelance", description: "Gain real-world experience through internships" },
      { step: 4, title: "Apply Smartly", description: "Target companies matching your skill level" },
    ],
    skillGap: {
      current: skills,
      required: bestMatch.requiredSkills,
      missing: missingSkills,
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CareerPlanRequest = await request.json();
    const { skills } = body;

    if (!skills || skills.length === 0) {
      return NextResponse.json(
        { error: "Skills are required" },
        { status: 400 }
      );
    }

    // Try using AI for enhanced analysis
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a career advisor for Indian job market. Analyze the given skills and suggest the best career path. 
            Return ONLY a JSON object with this exact structure:
            {
              "career": "Job Title",
              "salaryRange": "₹X LPA – ₹Y LPA",
              "placementProbability": number between 20-70,
              "roadmap": [{"step": 1, "title": "...", "description": "..."}, ...],
              "skillGap": {
                "current": ["skill1"],
                "required": ["skill1", "skill2"],
                "missing": ["skill2"]
              }
            }
            
            Important: Keep salary REALISTIC for Indian entry-level market (₹2-8 LPA max).
            Placement probability should be conservative (20-70%).`
          },
          {
            role: "user",
            content: `Skills: ${skills.join(", ")}`
          }
        ],
      });

      const responseText = completion.choices[0]?.message?.content || "";
      
      // Try to parse AI response
      try {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const aiResult = JSON.parse(jsonMatch[0]);
          return NextResponse.json(aiResult);
        }
      } catch {
        // Fall back to rule-based if AI parsing fails
      }
    } catch {
      // Fall back to rule-based if AI fails
    }

    // Fallback to rule-based career matching
    const result = determineCareer(skills);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Career plan error:", error);
    return NextResponse.json(
      { error: "Failed to generate career plan" },
      { status: 500 }
    );
  }
}
