"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { DialogState } from "@/game/types";

interface DialogOverlayProps {
  dialog: DialogState;
  onClose: () => void;
}

export function DialogOverlay({ dialog, onClose }: DialogOverlayProps) {
  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "x" || e.key === "X" || e.key === "Enter") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-[#1A1918] border-2 border-terracotta/50 rounded-xl p-6 max-w-sm w-full mx-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        {dialog.icon && (
          <motion.div
            className="text-5xl text-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
          >
            {dialog.icon}
          </motion.div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white text-center mb-3">
          {dialog.title}
        </h3>

        {/* Content */}
        <p className="text-gray-300 text-center mb-4 leading-relaxed">
          {dialog.content}
        </p>

        {/* Tags */}
        {dialog.tags && dialog.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {dialog.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-terracotta/20 text-terracotta rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        {dialog.link && (
          <Link
            href={dialog.link}
            className="block text-center text-terracotta hover:text-terracotta-dark underline mb-4"
          >
            Learn more →
          </Link>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
        >
          Continue (X / ESC)
        </button>
      </motion.div>
    </motion.div>
  );
}
