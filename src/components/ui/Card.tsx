"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = true, className = "", ...props }: CardProps) {
  return (
    <motion.div
      className={`bg-background-secondary rounded-2xl border border-border p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4, boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.12)" } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
