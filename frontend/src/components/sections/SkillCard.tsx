"use client";

import { motion } from "framer-motion";

interface SkillCardProps {
  name: string;
  category: string;
  proficiency: string;
  years: number;
  description?: string;
  index?: number;
}

export function SkillCard({
  name,
  category,
  proficiency,
  years,
  description,
  index = 0,
}: SkillCardProps) {
  const proficiencyConfig = {
    Expert: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-500/20",
      bar: "bg-emerald-500",
      width: "w-full",
    },
    Advanced: {
      bg: "bg-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-500/20",
      bar: "bg-blue-500",
      width: "w-4/5",
    },
    Intermediate: {
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-500/20",
      bar: "bg-amber-500",
      width: "w-3/5",
    },
  };

  const config = proficiencyConfig[proficiency as keyof typeof proficiencyConfig] || proficiencyConfig.Intermediate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${config.bg} ${config.text} ${config.border}`}>
          {proficiency}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </p>
      )}

      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs px-2.5 py-1 bg-secondary rounded-lg text-muted-foreground">
          {category}
        </span>
        <span className="text-xs text-muted-foreground">
          {years}+ {years === 1 ? "year" : "years"}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full ${config.bar} ${config.width} rounded-full transition-all duration-500`} />
      </div>
    </motion.div>
  );
}
