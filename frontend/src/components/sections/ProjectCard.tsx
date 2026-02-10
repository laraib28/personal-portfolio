"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Star, ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  problem?: string;
  solution?: string;
  techStack: string[];
  isAiWork: boolean;
  featured: boolean;
  url?: string | null;
  github?: string | null;
  index?: number;
}

export function ProjectCard({
  id,
  title,
  problem,
  solution,
  techStack,
  isAiWork,
  featured,
  url,
  github,
  index = 0,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative p-6 rounded-2xl bg-card border border-border h-full flex flex-col overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Featured highlight bar */}
      {featured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-accent" />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {/* Header with title and badges */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {featured && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full font-medium shadow-sm shadow-primary/25">
              <Star className="w-3 h-3" />
              Featured
            </span>
          )}
          {isAiWork && (
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-full font-medium">
              <Sparkles className="w-3 h-3" />
              AI Project
            </span>
          )}
        </div>

        {/* Problem/Solution Description */}
        {(problem || solution) && (
          <div className="mb-4 space-y-2">
            {problem && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                <span className="font-medium text-foreground">Problem:</span> {problem}
              </p>
            )}
            {solution && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                <span className="font-medium text-foreground">Solution:</span> {solution}
              </p>
            )}
          </div>
        )}

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-xs px-2.5 py-1 bg-secondary/80 text-muted-foreground rounded-lg border border-border/50 group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 5 && (
            <span className="text-xs px-2.5 py-1 text-muted-foreground">
              +{techStack.length - 5} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
          <Link
            href={`/projects/${id}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary ml-auto"
          >
            Details
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
