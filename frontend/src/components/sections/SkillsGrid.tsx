import { SkillCard } from "./SkillCard";
import type { Skill } from "@/lib/mcp-client";

interface SkillsGridProps {
  skills: Skill[];
  groupByCategory?: boolean;
}

export function SkillsGrid({ skills, groupByCategory = true }: SkillsGridProps) {
  if (!groupByCategory) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <SkillCard
            key={skill.id}
            name={skill.name}
            category={skill.category}
            proficiency={skill.proficiency}
            years={skill.years}
            description={(skill as any).description}
            index={index}
          />
        ))}
      </div>
    );
  }

  // Group skills by category - include all possible categories
  const categories = [
    "Frontend",
    "Backend",
    "AI & LLM",
    "DevOps",
    "Deployment",
    "Tools",
    "Methodology",
    "Security"
  ];

  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  // Sort categories by the order defined, then any remaining
  const sortedCategories = [
    ...categories.filter(cat => groupedSkills[cat]?.length > 0),
    ...Object.keys(groupedSkills).filter(cat => !categories.includes(cat))
  ];

  const categoryIcons: Record<string, string> = {
    "Frontend": "🎨",
    "Backend": "⚙️",
    "AI & LLM": "🤖",
    "DevOps": "🔧",
    "Deployment": "🚀",
    "Tools": "🛠️",
    "Methodology": "📋",
    "Security": "🔒"
  };

  return (
    <div className="space-y-12">
      {sortedCategories.map((category) => {
        const categorySkills = groupedSkills[category];
        if (!categorySkills || categorySkills.length === 0) return null;

        return (
          <div key={category}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{categoryIcons[category] || "📦"}</span>
              <div>
                <h3 className="text-xl font-bold">{category}</h3>
                <p className="text-sm text-muted-foreground">
                  {categorySkills.length} {categorySkills.length === 1 ? "skill" : "skills"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorySkills.map((skill, index) => (
                <SkillCard
                  key={skill.id}
                  name={skill.name}
                  category={skill.category}
                  proficiency={skill.proficiency}
                  years={skill.years}
                  description={(skill as any).description}
                  index={index}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
