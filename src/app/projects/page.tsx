"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard, FadeInSection } from "@/components";

const allProjects = [
  {
    title: "Project One",
    description:
      "A full-stack web application built with modern technologies. Features real-time updates and seamless user experience.",
    tags: ["React", "Node.js", "PostgreSQL"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Project Two",
    description:
      "Mobile-first design system and component library. Optimized for performance and accessibility.",
    tags: ["TypeScript", "Tailwind", "Storybook"],
    category: "frontend",
    github: "https://github.com",
  },
  {
    title: "Project Three",
    description:
      "Open-source tool that helps developers automate repetitive tasks and improve their workflow.",
    tags: ["Python", "CLI", "Automation"],
    category: "tools",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce solution with cart management, payment processing, and inventory tracking.",
    tags: ["Next.js", "Stripe", "Prisma"],
    category: "fullstack",
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Dashboard UI Kit",
    description:
      "Comprehensive dashboard components and layouts for data-driven applications.",
    tags: ["React", "D3.js", "Tailwind"],
    category: "frontend",
    github: "https://github.com",
  },
  {
    title: "API Gateway",
    description:
      "Lightweight API gateway for microservices with rate limiting and authentication.",
    tags: ["Go", "Docker", "Kubernetes"],
    category: "backend",
    github: "https://github.com",
  },
];

const categories = [
  { id: "all", label: "All" },
  { id: "fullstack", label: "Full Stack" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "tools", label: "Tools" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Projects
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              A collection of projects I&apos;ve worked on. From full-stack applications
              to open-source tools, each project represents a unique challenge and
              learning opportunity.
            </p>
          </div>
        </FadeInSection>

        {/* Filter */}
        <FadeInSection delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === category.id
                    ? "bg-terracotta text-white"
                    : "bg-background-secondary text-foreground-muted hover:text-foreground border border-border"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </FadeInSection>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  github={project.github}
                  demo={project.demo}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-foreground-muted">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
