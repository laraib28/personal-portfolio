import { mcpClient } from "@/lib/mcp-client";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ProjectPageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  try {
    const project = await mcpClient.getProjectDetails(params.id);
    return {
      title: project.title,
      description: project.problem,
    };
  } catch {
    return {
      title: "Project Not Found",
    };
  }
}

async function getProject(id: string) {
  try {
    return await mcpClient.getProjectDetails(id);
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container py-12">
      <Link
        href="/projects"
        className="text-muted-foreground hover:text-foreground mb-6 inline-block"
      >
        &larr; Back to Projects
      </Link>

      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          {project.featured && (
            <span className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded-full">
              Featured
            </span>
          )}
          {project.is_ai_work && (
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 rounded-full">
              AI Project
            </span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">{project.title}</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Problem</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.problem}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Solution</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.solution}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Outcome</h2>
          <p className="text-muted-foreground leading-relaxed">
            {project.outcome}
          </p>
        </section>

        {(project.url || project.github) && (
          <section className="flex gap-4">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                View Live
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border rounded-md hover:bg-secondary transition-colors"
              >
                View Code
              </a>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
