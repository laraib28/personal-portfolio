import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { mcpClient } from "@/lib/mcp-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Full Stack AI Engineer Portfolio",
  description:
    "Professional portfolio showcasing full-stack development and AI engineering expertise. Specializing in Next.js, Python, and agentic AI systems.",
};

// Fallback data in case MCP server is unavailable
const fallbackProfile = {
  name: "Portfolio Owner",
  title: "Full Stack AI Engineer",
  summary:
    "Senior full-stack developer specializing in building production-grade AI systems. Expert in Next.js, Python, and agentic AI architectures.",
  expertise: [
    "Agentic AI Systems",
    "Full Stack Development",
    "Next.js & React",
    "Python & FastAPI",
  ],
  availability: "Available",
  location: "Remote",
  contact: {
    email: "contact@example.com",
  },
};

async function getProfile() {
  try {
    return await mcpClient.getProfile();
  } catch (error) {
    console.error("Failed to fetch profile from MCP:", error);
    return fallbackProfile;
  }
}

export default async function HomePage() {
  const profile = await getProfile();

  return (
    <>
      <Hero
        name={profile.name}
        title={profile.title}
        summary={profile.summary}
        expertise={profile.expertise}
      />
      <About
        availability={profile.availability}
        location={profile.location}
      />
    </>
  );
}
