"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  href?: string;
  github?: string;
  demo?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  href,
  github,
  demo,
}: ProjectCardProps) {
  const cardContent = (
    <motion.div
      className="group relative bg-background-secondary rounded-2xl border border-border overflow-hidden h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <div className="relative h-48 bg-background overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 to-purple/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-terracotta transition-colors">
          {title}
        </h3>
        <p className="text-sm text-foreground-muted mb-4 line-clamp-2">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-background rounded-lg text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        {(github || demo) && (
          <div className="flex items-center gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-medium text-foreground-muted hover:text-terracotta transition-colors"
              >
                GitHub
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-sm font-medium text-foreground-muted hover:text-terracotta transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
}
