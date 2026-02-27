"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizState } from "@/game/types";
import { QUIZ_QUESTIONS, getScoreTitle } from "@/game/config";

interface QuizOverlayProps {
  quiz: QuizState;
  onAnswer: (index: number) => void;
  onSubmit: (isCorrect: boolean, nextQuestion: boolean) => void;
  onComplete: () => void;
  onClose: () => void;
  onRetry: () => void;
  highScore: number;
}

export function QuizOverlay({
  quiz,
  onAnswer,
  onSubmit,
  onComplete,
  onClose,
  onRetry,
  highScore,
}: QuizOverlayProps) {
  const currentQuestion = QUIZ_QUESTIONS[quiz.currentQuestion];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const percentage = Math.round((quiz.score / totalQuestions) * 100);
  const scoreTitle = getScoreTitle(percentage);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (quiz.completed) {
        if (e.key.toLowerCase() === "r") {
          onRetry();
        } else if (e.key === "Escape") {
          onClose();
        }
        return;
      }

      if (quiz.showingFeedback) {
        if (e.key === "Enter" || e.key === " " || e.key.toLowerCase() === "x") {
          e.preventDefault();
          if (quiz.currentQuestion < totalQuestions - 1) {
            onSubmit(quiz.lastAnswerCorrect!, true);
          } else {
            onComplete();
          }
        }
        return;
      }

      // Navigate options with number keys or WASD
      const key = e.key.toLowerCase();
      if (key >= "1" && key <= "4") {
        const index = parseInt(key) - 1;
        if (index < currentQuestion.options.length) {
          onAnswer(index);
        }
      } else if (key === "w" || e.key === "ArrowUp") {
        e.preventDefault();
        const newIndex = quiz.selectedOption <= 0 ? currentQuestion.options.length - 1 : quiz.selectedOption - 1;
        onAnswer(newIndex);
      } else if (key === "s" || e.key === "ArrowDown") {
        e.preventDefault();
        const newIndex = quiz.selectedOption >= currentQuestion.options.length - 1 ? 0 : quiz.selectedOption + 1;
        onAnswer(newIndex);
      } else if ((key === "x" || e.key === "Enter" || e.key === " ") && quiz.selectedOption >= 0) {
        e.preventDefault();
        const isCorrect = quiz.selectedOption === currentQuestion.correct;
        onSubmit(isCorrect, false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quiz, currentQuestion, onAnswer, onSubmit, onComplete, onClose, onRetry, totalQuestions]);

  return (
    <motion.div
      className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center rounded-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#1A1918] border-2 border-terracotta/50 rounded-xl p-6 max-w-md w-full mx-4"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🎮</span> Quiz Time!
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close quiz"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress */}
        {!quiz.completed && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Question {quiz.currentQuestion + 1} of {totalQuestions}</span>
              <span>Score: {quiz.score}</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-terracotta"
                initial={{ width: 0 }}
                animate={{ width: `${((quiz.currentQuestion + (quiz.showingFeedback ? 1 : 0)) / totalQuestions) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {quiz.completed ? (
            // Results screen
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="text-6xl mb-4">{scoreTitle.emoji}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{scoreTitle.title}</h3>
              <p className="text-4xl font-bold text-terracotta mb-2">
                {quiz.score} / {totalQuestions}
              </p>
              <p className="text-gray-400 mb-4">{percentage}% correct</p>

              {quiz.score > highScore && highScore > 0 && (
                <motion.p
                  className="text-green-400 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.3 }}
                >
                  🎉 New High Score!
                </motion.p>
              )}

              {percentage === 100 && (
                <motion.div
                  className="bg-gradient-to-r from-purple/20 to-terracotta/20 rounded-lg p-4 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.5 }}
                >
                  <p className="text-white">🏆 Perfect Score! You really know me!</p>
                </motion.div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={onRetry}
                  className="px-6 py-2 bg-terracotta hover:bg-terracotta-dark text-white font-medium rounded-lg transition-colors"
                >
                  Try Again (R)
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
                >
                  Close (ESC)
                </button>
              </div>
            </motion.div>
          ) : quiz.showingFeedback ? (
            // Feedback screen
            <motion.div
              key={`feedback-${quiz.currentQuestion}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                className={`text-center p-4 rounded-lg mb-4 ${
                  quiz.lastAnswerCorrect
                    ? "bg-green-900/50 border border-green-500"
                    : "bg-red-900/50 border border-red-500"
                }`}
              >
                <div className="text-4xl mb-2">
                  {quiz.lastAnswerCorrect ? "✅" : "❌"}
                </div>
                <p className="text-white font-medium">
                  {quiz.lastAnswerCorrect ? "Correct!" : "Not quite!"}
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-gray-300 text-sm">{currentQuestion.explanation}</p>
              </div>

              <button
                onClick={() => {
                  if (quiz.currentQuestion < totalQuestions - 1) {
                    onSubmit(quiz.lastAnswerCorrect!, true);
                  } else {
                    onComplete();
                  }
                }}
                className="w-full py-3 bg-terracotta hover:bg-terracotta-dark text-white font-medium rounded-lg transition-colors"
              >
                {quiz.currentQuestion < totalQuestions - 1 ? "Next Question (X)" : "See Results (X)"}
              </button>
            </motion.div>
          ) : (
            // Question screen
            <motion.div
              key={`question-${quiz.currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <p className="text-white text-lg mb-4">{currentQuestion.question}</p>

              <div className="space-y-2 mb-4">
                {currentQuestion.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => onAnswer(index)}
                    className={`w-full p-3 rounded-lg text-left transition-all flex items-center gap-3 ${
                      quiz.selectedOption === index
                        ? "bg-terracotta/30 border-2 border-terracotta text-white"
                        : "bg-gray-800 border-2 border-transparent text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center text-sm font-mono ${
                        quiz.selectedOption === index
                          ? "bg-terracotta text-white"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span>{option}</span>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => {
                  if (quiz.selectedOption >= 0) {
                    const isCorrect = quiz.selectedOption === currentQuestion.correct;
                    onSubmit(isCorrect, false);
                  }
                }}
                disabled={quiz.selectedOption < 0}
                className={`w-full py-3 font-medium rounded-lg transition-colors ${
                  quiz.selectedOption >= 0
                    ? "bg-terracotta hover:bg-terracotta-dark text-white"
                    : "bg-gray-700 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Answer (X)
              </button>

              <p className="text-gray-500 text-xs text-center mt-3">
                Use W/S or ↑/↓ to navigate • Numbers to select • X to confirm
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
