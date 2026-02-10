import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { mcpClient } from "@/lib/mcp-client";
import type { Metadata } from "next";
import { Rocket, Sparkles, Globe, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects | Laraib Tabbassum",
  description:
    "Portfolio of projects showcasing full-stack development and AI engineering expertise.",
};

async function getProjects() {
  try {
    const response = await mcpClient.getProjects();
    return response.projects;
  } catch (error) {
    console.error("Failed to fetch projects from MCP:", error);
    return [];
  }
}

const projectStats = [
  {
    icon: Rocket,
    value: "5+",
    label: "Live Projects",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Sparkles,
    value: "2",
    label: "AI-Powered Apps",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Globe,
    value: "100%",
    label: "Deployed on Vercel",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    icon: TrendingUp,
    value: "10+",
    label: "Technologies Used",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
];

export default async function ProjectsPage() {
  const projects = await getProjects();
  const aiProjects = projects.filter((p: any) => p.is_ai_work);
  const webProjects = projects.filter((p: any) => !p.is_ai_work);

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
              My{" "}
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              A showcase of my work spanning AI-powered applications, e-commerce platforms,
              dynamic websites, and more. Each project represents real-world problem-solving
              with modern technologies and best practices.
            </p>
            <p className="text-muted-foreground mb-8">
              Every project here has been deployed and is live. Click on any project to see
              it in action or explore the source code on GitHub.
            </p>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="py-12 bg-secondary/30">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {projectStats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-2xl bg-card border border-border text-center hover:border-primary/50 transition-colors"
              >
                <div className={`p-3 rounded-xl ${stat.bgColor} w-fit mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Projects Section */}
      {aiProjects.length > 0 && (
        <section className="py-16">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">AI-Powered Projects</h2>
                <p className="text-muted-foreground">Projects featuring AI chatbots, RAG systems, and LLM integration</p>
              </div>
            </div>
            <ProjectsGrid projects={aiProjects} />
          </div>
        </section>
      )}

      {/* Web Projects Section */}
      {webProjects.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Web Applications</h2>
                <p className="text-muted-foreground">Full-stack web applications built with modern technologies</p>
              </div>
            </div>
            <ProjectsGrid projects={webProjects} />
          </div>
        </section>
      )}

      {/* All Projects Fallback */}
      {projects.length === 0 && (
        <section className="py-16">
          <div className="container">
            <p className="text-muted-foreground text-center">Projects coming soon.</p>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to Work Together?</h2>
            <p className="text-muted-foreground mb-8">
              I'm always excited to take on new challenges and build innovative solutions.
              Whether you need a full-stack web application, an AI-powered chatbot, or
              anything in between, let's discuss your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/laraib28"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                View GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/laraib-adnan-744955252/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium border border-border hover:bg-secondary/80 transition-colors"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
