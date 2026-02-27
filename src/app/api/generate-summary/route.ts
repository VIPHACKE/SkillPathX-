import { NextRequest, NextResponse } from "next/server";
import ZAI from "z-ai-web-dev-sdk";

interface SummaryRequest {
  name: string;
  skills: string[];
  experience?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: SummaryRequest = await request.json();
    const { name, skills, experience } = body;

    if (!name || !skills || skills.length === 0) {
      return NextResponse.json(
        { error: "Name and skills are required" },
        { status: 400 }
      );
    }

    // Try using AI for enhanced summary
    try {
      const zai = await ZAI.create();
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a professional CV writer. Create a compelling professional summary for a CV.
            Return ONLY the summary text (2-3 sentences), no JSON, no quotes.
            Make it professional, concise, and tailored to entry-level Indian job market.
            Maximum 50 words.`
          },
          {
            role: "user",
            content: `Name: ${name}
Skills: ${skills.join(", ")}
Experience: ${experience || "Entry level / Fresher"}

Generate a professional summary:`
          }
        ],
      });

      const summary = completion.choices[0]?.message?.content?.trim() || "";
      
      if (summary) {
        return NextResponse.json({ summary });
      }
    } catch (error) {
      console.error("AI summary error:", error);
    }

    // Fallback to template-based summary
    const experienceLevel = experience ? "experienced" : "entry-level";
    const skillsText = skills.length > 3 
      ? `${skills.slice(0, 3).join(", ")}, and ${skills.length - 3} more`
      : skills.join(", ");
    
    const summary = `Motivated ${experienceLevel} professional with expertise in ${skillsText}. Eager to contribute to innovative projects and grow within a dynamic team environment. Strong problem-solving abilities and committed to continuous learning and professional development.`;

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Summary generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary" },
      { status: 500 }
    );
  }
}
