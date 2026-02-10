import { ProjectCard } from "./ProjectCard";

interface ProjectSummary {
  id: string;
  title: string;
  problem?: string;
  solution?: string;
  tech_stack: string[];
  is_ai_work: boolean;
  featured: boolean;
  url?: string | null;
  github?: string | null;
}

interface ProjectsGridProps {
  projects: ProjectSummary[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  // Sort: featured first, then AI projects, then others
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    if (a.is_ai_work && !b.is_ai_work) return -1;
    if (!a.is_ai_work && b.is_ai_work) return 1;
    return 0;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedProjects.map((project, index) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          title={project.title}
          problem={project.problem}
          solution={project.solution}
          techStack={project.tech_stack}
          isAiWork={project.is_ai_work}
          featured={project.featured}
          url={project.url}
          github={project.github}
          index={index}
        />
      ))}
    </div>
  );
}
