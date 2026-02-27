"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Button,
  ProjectCard,
  TypewriterText,
  FadeInSection,
} from "@/components";

const featuredProjects: { title: string; description: string; tags: string[]; github?: string; demo?: string }[] = [];

const skills: { name: string; items: string[] }[] = [];

export default function Home() {
  return (
    <div className="animated-gradient min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium mb-6">
                Welcome to my corner of the internet
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient">
                <TypewriterText text="Andrew Wei" delay={100} />
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-foreground-muted mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Governance lead at GT AISI and technical AI safety researcher at ERA.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link href="/projects">
                <Button size="lg">View My Work</Button>
              </Link>
              <Link href="/about">
                <Button variant="secondary" size="lg">
                  About Me
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-foreground-muted rounded-full flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div className="w-1.5 h-3 bg-foreground-muted rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Featured Projects
                </h2>
                <p className="text-foreground-muted">
                  A selection of my recent work
                </p>
              </div>
              <Link href="/projects" className="hidden sm:block">
                <Button variant="ghost">View All</Button>
              </Link>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <FadeInSection key={project.title} delay={index * 0.1}>
                <ProjectCard {...project} />
              </FadeInSection>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/projects">
              <Button variant="secondary">View All Projects</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-background-secondary relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Skills & Technologies
              </h2>
              <p className="text-foreground-muted">
                Technologies I work with regularly
              </p>
            </div>
          </FadeInSection>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((category, index) => (
              <FadeInSection key={category.name} delay={index * 0.1}>
                <div className="bg-background rounded-2xl border border-border p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 text-sm font-medium bg-background-secondary rounded-lg text-foreground-muted border border-border"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <FadeInSection>
            <div className="bg-gradient-to-br from-terracotta/10 to-purple/10 rounded-3xl p-8 md:p-12 text-center border border-border">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-lg text-foreground-muted mb-8 max-w-2xl mx-auto">
                I&apos;m always interested in hearing about new projects and
                opportunities. Whether you have a question or just want to say hi,
                feel free to reach out!
              </p>
              <a href="mailto:hello@example.com">
                <Button size="lg">Get In Touch</Button>
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}
