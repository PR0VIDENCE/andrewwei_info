"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Game } from "@/components/game/Game";
import { FadeInSection, Button } from "@/components";

export default function ExplorePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-terracotta/10 text-terracotta text-sm font-medium mb-4">
              Interactive Experience
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore & Discover
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Guide the blob through a dark room to learn about me in a fun, interactive way.
              Interact with objects to discover projects, skills, and more!
            </p>
          </div>
        </FadeInSection>

        {/* Game Container */}
        <FadeInSection delay={0.1}>
          <div className="flex justify-center mb-8">
            {showGame ? (
              <div className="relative">
                <Game />

                {/* Mobile warning */}
                <div className="md:hidden mt-4 p-4 bg-terracotta/10 border border-terracotta/30 rounded-lg text-center">
                  <p className="text-sm text-foreground-muted">
                    This game works best on desktop with a keyboard.
                    Use WASD to move and X to interact.
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                className="bg-[#1A1918] rounded-xl border-2 border-border p-12 text-center max-w-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎮
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-4">Ready to Explore?</h2>
                <p className="text-gray-400 mb-6">
                  Guide a friendly blob through a mysterious room filled with interactive objects.
                  Discover facts about me, take a quiz, and unlock hidden surprises!
                </p>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowGame(true)}
                    className="w-full py-3 bg-terracotta hover:bg-terracotta-dark text-white font-medium rounded-lg transition-colors"
                  >
                    Start Exploring
                  </button>
                  <div className="text-sm text-gray-500">
                    <p className="font-medium mb-2">Controls:</p>
                    <p>WASD or Arrow Keys — Move</p>
                    <p>X or Enter — Interact</p>
                    <p>ESC — Close dialogs</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </FadeInSection>

        {/* Instructions / Legend */}
        {showGame && (
          <FadeInSection delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-background-secondary rounded-xl border border-border p-6 text-center">
                <div className="w-12 h-12 bg-[#3D5A80] rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🎮</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Quiz Terminal</h3>
                <p className="text-sm text-foreground-muted">
                  Test your knowledge with a fun quiz about me!
                </p>
              </div>
              <div className="bg-background-secondary rounded-xl border border-border p-6 text-center">
                <div className="w-12 h-12 bg-[#5C4B6C] rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">🖥️</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Projects</h3>
                <p className="text-sm text-foreground-muted">
                  Discover the things I&apos;ve built and worked on.
                </p>
              </div>
              <div className="bg-background-secondary rounded-xl border border-border p-6 text-center">
                <div className="w-12 h-12 bg-[#4A6741] rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">⚛️</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Skills</h3>
                <p className="text-sm text-foreground-muted">
                  Learn about my technical expertise and tools.
                </p>
              </div>
            </div>
          </FadeInSection>
        )}

        {/* CTA to other pages */}
        <FadeInSection delay={0.3}>
          <div className="text-center">
            <p className="text-foreground-muted mb-4">
              Prefer a traditional experience?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/about">
                <Button variant="secondary">About Me</Button>
              </Link>
              <Link href="/projects">
                <Button variant="secondary">View Projects</Button>
              </Link>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
}
