"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, GraduationCap, Heart, Coffee, Code2, Rocket } from "lucide-react";

interface AboutProps {
  availability: string;
  location: string;
}

export function About({ availability, location }: AboutProps) {
  const highlights = [
    {
      icon: Code2,
      title: "Clean Code Advocate",
      description: "Writing maintainable, scalable, and well-documented code"
    },
    {
      icon: Rocket,
      title: "Fast Learner",
      description: "Quick to adapt to new technologies and frameworks"
    },
    {
      icon: Heart,
      title: "Passionate Developer",
      description: "Love building products that make a difference"
    },
    {
      icon: Coffee,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant solutions"
    }
  ];

  const journey = [
    {
      year: "2024",
      title: "AI & LLM Integration",
      description: "Specialized in OpenAI SDK, Claude CLI, RAG systems, and building AI-powered chatbots"
    },
    {
      year: "2023",
      title: "Full Stack Development",
      description: "Mastered Next.js, React, TypeScript, and modern web development practices"
    },
    {
      year: "2022",
      title: "Started Coding Journey",
      description: "Began learning programming with Python and web fundamentals"
    }
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate Full Stack Developer from Pakistan, dedicated to creating
            impactful web applications and AI-powered solutions.
          </p>
        </motion.div>

        {/* Main Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Clock className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-semibold">Availability</h3>
            </div>
            <p className="text-muted-foreground flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  availability === "Available"
                    ? "bg-green-500 animate-pulse"
                    : availability === "Limited Availability"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
              />
              {availability}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <MapPin className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-semibold">Location</h3>
            </div>
            <p className="text-muted-foreground">{location}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Briefcase className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-semibold">Experience</h3>
            </div>
            <p className="text-muted-foreground">2+ Years Professional</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <GraduationCap className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-semibold">Focus Area</h3>
            </div>
            <p className="text-muted-foreground">AI & Web Development</p>
          </motion.div>
        </div>

        {/* What I Bring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">What I Bring to the Table</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">My Journey</h3>
          <div className="max-w-2xl mx-auto">
            {journey.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {item.year}
                  </div>
                  {index !== journey.length - 1 && (
                    <div className="w-0.5 h-full bg-border mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
