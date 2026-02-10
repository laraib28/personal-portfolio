import { env } from "./env";

const MCP_BASE_URL = env.MCP_SERVER_URL;

export interface Profile {
  name: string;
  title: string;
  summary: string;
  expertise: string[];
  availability: string;
  location: string;
  contact: {
    email: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: string;
  years: number;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  tech_stack: string[];
  outcome: string;
  images?: string[];
  is_ai_work: boolean;
  featured: boolean;
  url?: string;
  github?: string;
}

class MCPClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`MCP request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getProfile(): Promise<Profile> {
    return this.fetch<Profile>("/api/v1/profile");
  }

  async getSkills(category?: string): Promise<{ skills: Skill[] }> {
    const params = category ? `?category=${category}` : "";
    return this.fetch<{ skills: Skill[] }>(`/api/v1/skills${params}`);
  }

  async getProjects(options?: {
    featured?: boolean;
    is_ai_work?: boolean;
  }): Promise<{ projects: Project[] }> {
    const params = new URLSearchParams();
    if (options?.featured !== undefined) {
      params.append("featured", String(options.featured));
    }
    if (options?.is_ai_work !== undefined) {
      params.append("is_ai_work", String(options.is_ai_work));
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    return this.fetch<{ projects: Project[] }>(`/api/v1/projects${query}`);
  }

  async getProjectDetails(projectId: string): Promise<Project> {
    return this.fetch<Project>(`/api/v1/projects/${projectId}`);
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return this.fetch<{ status: string; timestamp: string }>("/health");
  }
}

export const mcpClient = new MCPClient(MCP_BASE_URL);
