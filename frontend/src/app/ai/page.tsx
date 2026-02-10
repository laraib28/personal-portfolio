import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { mcpClient } from "@/lib/mcp-client";
import type { Metadata } from "next";
import { Brain, MessageSquare, Zap, Shield, Bot, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Work | Laraib Tabbassum",
  description:
    "AI and agentic systems projects showcasing expertise in prompt engineering, OpenAI SDK, and intelligent automation.",
};

async function getAIProjects() {
  try {
    const response = await mcpClient.getProjects({ is_ai_work: true });
    return response.projects;
  } catch (error) {
    console.error("Failed to fetch AI projects from MCP:", error);
    return [];
  }
}

const aiCapabilities = [
  {
    icon: MessageSquare,
    title: "AI Chatbots",
    description: "Building conversational AI interfaces that understand context and provide helpful responses",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    icon: Brain,
    title: "RAG Systems",
    description: "Retrieval Augmented Generation for accurate, context-aware AI responses from custom data",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    icon: Zap,
    title: "Prompt Engineering",
    description: "Crafting effective prompts for optimal AI performance and accurate outputs",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    icon: Shield,
    title: "Secure Integration",
    description: "Implementing AI with proper authentication, rate limiting, and data protection",
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  }
];

const aiTools = [
  { name: "OpenAI SDK", description: "GPT-4, Function Calling, Embeddings" },
  { name: "Claude CLI", description: "Anthropic Claude, Agentic Workflows" },
  { name: "Google Gemini", description: "Multimodal AI Integration" },
  { name: "RAG Pipeline", description: "Vector Search, Document Retrieval" },
  { name: "Vercel AI SDK", description: "Streaming Responses, Edge Runtime" },
  { name: "Better Auth", description: "Secure User Authentication" }
];

export default async function AIWorkPage() {
  const projects = await getAIProjects();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-blue-500/5" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI & Machine Learning
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              AI-Powered{" "}
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              I specialize in building intelligent applications that leverage the power of
              Large Language Models (LLMs). From conversational AI chatbots to RAG-based
              systems, I create AI solutions that solve real problems.
            </p>
            <p className="text-muted-foreground">
              My AI work focuses on practical implementations using OpenAI, Claude, and Gemini
              APIs, with emphasis on user experience, accuracy, and responsible AI practices.
            </p>
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">AI Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Expertise in building various types of AI-powered applications
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCapabilities.map((capability) => (
              <div
                key={capability.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/5 transition-all duration-300"
              >
                <div className={`p-3 rounded-xl ${capability.bgColor} w-fit mb-4`}>
                  <capability.icon className={`w-6 h-6 ${capability.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools & Technologies */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Tools & Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The AI stack I use to build intelligent applications
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {aiTools.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Projects */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">AI Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real-world applications showcasing AI integration and intelligent features
            </p>
          </div>

          {projects.length > 0 ? (
            <ProjectsGrid projects={projects} />
          ) : (
            <p className="text-muted-foreground text-center">AI projects coming soon.</p>
          )}
        </div>
      </section>

      {/* How I Approach AI */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">My Approach to AI Development</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Understand the Problem</h3>
                  <p className="text-muted-foreground">
                    Before writing any code, I deeply understand what problem the AI needs to solve
                    and what success looks like.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Choose the Right Model</h3>
                  <p className="text-muted-foreground">
                    Different tasks require different AI models. I select the most appropriate
                    model based on cost, speed, and capability requirements.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Craft Effective Prompts</h3>
                  <p className="text-muted-foreground">
                    Good prompts are the key to reliable AI behavior. I spend time engineering
                    prompts that produce consistent, accurate outputs.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Build with User Experience in Mind</h3>
                  <p className="text-muted-foreground">
                    AI should feel natural and helpful. I focus on streaming responses, clear
                    feedback, and graceful error handling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
