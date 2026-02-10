import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { mcpClient } from "@/lib/mcp-client";
import type { Metadata } from "next";
import { Code2, Cpu, Cloud, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Skills | Laraib Tabbassum",
  description:
    "Technical skills and expertise in full-stack development, AI systems, and modern web technologies.",
};

async function getSkills() {
  try {
    const response = await mcpClient.getSkills();
    return response.skills;
  } catch (error) {
    console.error("Failed to fetch skills from MCP:", error);
    return [];
  }
}

const skillHighlights = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building responsive, accessible, and performant user interfaces with React, Next.js, and TypeScript",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Cpu,
    title: "AI & LLM Integration",
    description: "Creating intelligent applications with OpenAI, Gemini, Claude, and RAG-based systems",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Cloud,
    title: "Deployment & DevOps",
    description: "Deploying and managing applications on Vercel, Railway, and Docker containers",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: Wrench,
    title: "Development Practices",
    description: "Following SDD methodology, clean code principles, and agile development workflows",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
];

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Technical{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              With 2+ years of hands-on experience, I've developed a comprehensive skill set
              spanning frontend development, backend systems, AI integration, and modern DevOps
              practices. Every skill listed here has been applied in real-world projects.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                27+ Technologies
              </span>
              <span className="px-4 py-2 bg-green-500/10 text-green-500 rounded-full text-sm font-medium">
                Continuously Learning
              </span>
              <span className="px-4 py-2 bg-purple-500/10 text-purple-500 rounded-full text-sm font-medium">
                AI Specialist
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Highlights */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Core Competencies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className={`p-3 rounded-xl ${highlight.bgColor} w-fit mb-4`}>
                  <highlight.icon className={`w-6 h-6 ${highlight.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                <p className="text-sm text-muted-foreground">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Skills Grid */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Complete Skill Set</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Detailed breakdown of all technologies and tools I work with, organized by category.
              Each skill has been used in production projects.
            </p>
          </div>

          {skills.length > 0 ? (
            <SkillsGrid skills={skills} groupByCategory />
          ) : (
            <p className="text-muted-foreground text-center">Skills coming soon.</p>
          )}
        </div>
      </section>

      {/* Learning Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Always Learning</h2>
            <p className="text-muted-foreground mb-8">
              Technology evolves rapidly, and so do I. I'm constantly exploring new tools,
              frameworks, and methodologies to stay at the forefront of web development and AI.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-card border border-border rounded-lg text-sm">
                Currently Exploring: Advanced RAG Patterns
              </span>
              <span className="px-4 py-2 bg-card border border-border rounded-lg text-sm">
                Next Up: LangChain & Vector Databases
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
