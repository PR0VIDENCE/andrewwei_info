"use client";

import { motion } from "framer-motion";
import { Button, FadeInSection } from "@/components";

const timeline = [
  {
    year: "2024",
    title: "Senior Software Engineer",
    company: "Tech Company",
    description:
      "Leading development of core platform features and mentoring junior developers.",
  },
  {
    year: "2022",
    title: "Software Engineer",
    company: "Startup Inc",
    description:
      "Built scalable microservices and contributed to 3x user growth.",
  },
  {
    year: "2020",
    title: "Junior Developer",
    company: "Agency Co",
    description:
      "Developed client websites and learned modern web development practices.",
  },
  {
    year: "2020",
    title: "Computer Science Degree",
    company: "University",
    description:
      "Graduated with honors, focusing on software engineering and algorithms.",
  },
];

const interests = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Open Source",
    description: "Contributing to projects that make developers' lives easier.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Learning",
    description: "Always exploring new technologies and development patterns.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Travel",
    description: "Experiencing different cultures and finding inspiration worldwide.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    title: "Music",
    description: "Playing guitar and discovering new genres to fuel creativity.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeInSection>
          <div className="max-w-3xl mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Me
            </h1>
            <p className="text-xl text-foreground-muted leading-relaxed mb-6">
              I&apos;m a software engineer based in San Francisco, passionate about
              creating digital experiences that are both beautiful and functional.
            </p>
            <p className="text-lg text-foreground-muted leading-relaxed">
              With a background in computer science and several years of industry
              experience, I specialize in building full-stack web applications using
              modern technologies. I believe in writing clean, maintainable code and
              creating interfaces that users love.
            </p>
          </div>
        </FadeInSection>

        {/* Photo and Bio */}
        <FadeInSection delay={0.1}>
          <div className="grid md:grid-cols-2 gap-12 mb-24">
            {/* Photo placeholder */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-terracotta/20 to-purple/20 border border-border overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-background-secondary border border-border mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-16 h-16 text-foreground-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-sm text-foreground-muted">Your photo here</p>
                  </div>
                </div>
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-terracotta/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            {/* Quick Facts */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Quick Facts</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-terracotta">01.</span>
                  <span className="text-foreground-muted">
                    Currently building products at a fast-growing startup
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terracotta">02.</span>
                  <span className="text-foreground-muted">
                    5+ years of experience in web development
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terracotta">03.</span>
                  <span className="text-foreground-muted">
                    Contributed to 10+ open source projects
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terracotta">04.</span>
                  <span className="text-foreground-muted">
                    Mentored 15+ junior developers
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terracotta">05.</span>
                  <span className="text-foreground-muted">
                    Always learning something new
                  </span>
                </li>
              </ul>
              <div className="pt-4">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary">Download Resume</Button>
                </a>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Timeline */}
        <FadeInSection delay={0.2}>
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-foreground mb-8">My Journey</h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />

              {/* Timeline items */}
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Content */}
                    <div className={`md:w-1/2 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                      <span className="text-sm font-medium text-terracotta">{item.year}</span>
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="text-foreground-muted">{item.company}</p>
                      <p className="text-sm text-foreground-muted mt-2">{item.description}</p>
                    </div>

                    {/* Dot */}
                    <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-terracotta rounded-full border-4 border-background" />

                    {/* Empty space for alignment */}
                    <div className="hidden md:block md:w-1/2" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Interests */}
        <FadeInSection delay={0.3}>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">
              Beyond Coding
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  className="bg-background-secondary rounded-2xl border border-border p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
                    {interest.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {interest.title}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {interest.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
