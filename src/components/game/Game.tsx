"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  BlobState,
  InputState,
  GameObject,
  GameState,
  QuizState,
  DialogState,
  Direction,
} from "@/game/types";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BLOB_SPEED,
  ROOM_CONFIG,
  GAME_OBJECTS,
  ANIMATION_SPEED,
} from "@/game/config";
import {
  drawBackground,
  drawWalls,
  drawBlob,
  drawObject,
  drawInteractionPrompt,
  drawProgress,
  drawControlsHint,
} from "@/game/renderer";
import {
  checkWallCollision,
  checkObjectCollision,
  findNearbyObject,
  updateObjectProximity,
  resolveCollision,
} from "@/game/physics";
import { QuizOverlay } from "./QuizOverlay";
import { DialogOverlay } from "./DialogOverlay";

const initialBlobState: BlobState = {
  x: ROOM_CONFIG.spawnPoint.x,
  y: ROOM_CONFIG.spawnPoint.y,
  velocityX: 0,
  velocityY: 0,
  isMoving: false,
  facing: "down",
  animationFrame: 0,
  animationTimer: 0,
};

const initialQuizState: QuizState = {
  isActive: false,
  currentQuestion: 0,
  score: 0,
  answers: [],
  completed: false,
  showingFeedback: false,
  lastAnswerCorrect: null,
  selectedOption: -1,
};

const initialDialogState: DialogState = {
  isOpen: false,
  title: "",
  content: "",
};

export function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameStateRef = useRef<GameState>({
    blob: { ...initialBlobState },
    objects: JSON.parse(JSON.stringify(GAME_OBJECTS)),
    quiz: { ...initialQuizState },
    dialog: { ...initialDialogState },
    nearbyObject: null,
    explorationProgress: 0,
    highScore: 0,
  });

  const inputRef = useRef<InputState>({
    up: false,
    down: false,
    left: false,
    right: false,
    interact: false,
    escape: false,
  });

  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>(0);

  const [quiz, setQuiz] = useState<QuizState>(initialQuizState);
  const [dialog, setDialog] = useState<DialogState>(initialDialogState);
  const [nearbyObject, setNearbyObject] = useState<GameObject | null>(null);
  const [explorationProgress, setExplorationProgress] = useState(0);

  // Load saved progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem("exploration-progress");
    const savedHighScore = localStorage.getItem("quiz-high-score");
    const savedInteracted = localStorage.getItem("interacted-objects");

    if (savedProgress) {
      setExplorationProgress(parseInt(savedProgress, 10));
      gameStateRef.current.explorationProgress = parseInt(savedProgress, 10);
    }

    if (savedHighScore) {
      gameStateRef.current.highScore = parseInt(savedHighScore, 10);
    }

    if (savedInteracted) {
      const interactedIds = JSON.parse(savedInteracted) as string[];
      gameStateRef.current.objects.forEach((obj) => {
        if (interactedIds.includes(obj.id)) {
          obj.hasBeenInteracted = true;
        }
      });
    }
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "w" || key === "arrowup") inputRef.current.up = true;
      if (key === "s" || key === "arrowdown") inputRef.current.down = true;
      if (key === "a" || key === "arrowleft") inputRef.current.left = true;
      if (key === "d" || key === "arrowright") inputRef.current.right = true;
      if (key === "x" || key === "enter" || key === " ") {
        inputRef.current.interact = true;
        e.preventDefault();
      }
      if (key === "escape") {
        inputRef.current.escape = true;
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (key === "w" || key === "arrowup") inputRef.current.up = false;
      if (key === "s" || key === "arrowdown") inputRef.current.down = false;
      if (key === "a" || key === "arrowleft") inputRef.current.left = false;
      if (key === "d" || key === "arrowright") inputRef.current.right = false;
      if (key === "x" || key === "enter" || key === " ") inputRef.current.interact = false;
      if (key === "escape") inputRef.current.escape = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handle interactions
  const handleInteraction = useCallback(() => {
    const state = gameStateRef.current;
    const nearby = findNearbyObject(state.blob, state.objects);

    if (!nearby) return;

    if (nearby.type === "quiz-terminal") {
      // Open quiz
      const newQuizState: QuizState = {
        isActive: true,
        currentQuestion: 0,
        score: 0,
        answers: [],
        completed: false,
        showingFeedback: false,
        lastAnswerCorrect: null,
        selectedOption: -1,
      };
      gameStateRef.current.quiz = newQuizState;
      setQuiz(newQuizState);
    } else {
      // Open dialog for other objects
      const newDialogState: DialogState = {
        isOpen: true,
        title: nearby.data.title,
        content: nearby.data.description,
        icon: nearby.data.icon,
        tags: nearby.data.tags,
        link: nearby.data.link,
      };
      gameStateRef.current.dialog = newDialogState;
      setDialog(newDialogState);

      // Mark as interacted if not already
      if (!nearby.hasBeenInteracted) {
        nearby.hasBeenInteracted = true;
        const newProgress = state.objects.filter((o) => o.hasBeenInteracted).length;
        gameStateRef.current.explorationProgress = newProgress;
        setExplorationProgress(newProgress);

        // Save to localStorage
        localStorage.setItem("exploration-progress", newProgress.toString());
        const interactedIds = state.objects
          .filter((o) => o.hasBeenInteracted)
          .map((o) => o.id);
        localStorage.setItem("interacted-objects", JSON.stringify(interactedIds));
      }
    }
  }, []);

  // Close dialog
  const handleCloseDialog = useCallback(() => {
    const newDialogState: DialogState = {
      isOpen: false,
      title: "",
      content: "",
    };
    gameStateRef.current.dialog = newDialogState;
    setDialog(newDialogState);
  }, []);

  // Quiz handlers
  const handleQuizAnswer = useCallback((answerIndex: number) => {
    setQuiz((prev) => ({ ...prev, selectedOption: answerIndex }));
  }, []);

  const handleQuizSubmit = useCallback(
    (isCorrect: boolean, nextQuestion: boolean) => {
      setQuiz((prev) => {
        const newAnswers = [...prev.answers, isCorrect];
        const newScore = prev.score + (isCorrect ? 1 : 0);

        if (nextQuestion) {
          return {
            ...prev,
            currentQuestion: prev.currentQuestion + 1,
            score: newScore,
            answers: newAnswers,
            showingFeedback: false,
            lastAnswerCorrect: null,
            selectedOption: -1,
          };
        }

        return {
          ...prev,
          showingFeedback: true,
          lastAnswerCorrect: isCorrect,
          score: newScore,
          answers: newAnswers,
        };
      });
    },
    []
  );

  const handleQuizComplete = useCallback(() => {
    setQuiz((prev) => {
      const state = gameStateRef.current;

      // Save high score
      if (prev.score > state.highScore) {
        localStorage.setItem("quiz-high-score", prev.score.toString());
        state.highScore = prev.score;
      }

      // Mark quiz terminal as interacted
      const quizTerminal = state.objects.find((o) => o.id === "quiz-terminal");
      if (quizTerminal && !quizTerminal.hasBeenInteracted) {
        quizTerminal.hasBeenInteracted = true;
        const newProgress = state.objects.filter((o) => o.hasBeenInteracted).length;
        state.explorationProgress = newProgress;
        setExplorationProgress(newProgress);
        localStorage.setItem("exploration-progress", newProgress.toString());
        const interactedIds = state.objects
          .filter((o) => o.hasBeenInteracted)
          .map((o) => o.id);
        localStorage.setItem("interacted-objects", JSON.stringify(interactedIds));
      }

      return { ...prev, completed: true };
    });
  }, []);

  const handleQuizClose = useCallback(() => {
    const newQuizState = { ...initialQuizState };
    gameStateRef.current.quiz = newQuizState;
    setQuiz(newQuizState);
  }, []);

  const handleQuizRetry = useCallback(() => {
    const newQuizState: QuizState = {
      isActive: true,
      currentQuestion: 0,
      score: 0,
      answers: [],
      completed: false,
      showingFeedback: false,
      lastAnswerCorrect: null,
      selectedOption: -1,
    };
    gameStateRef.current.quiz = newQuizState;
    setQuiz(newQuizState);
  }, []);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let previousInteract = false;
    let previousEscape = false;

    const gameLoop = (currentTime: number) => {
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      const state = gameStateRef.current;
      const input = inputRef.current;

      // Handle escape key for closing overlays
      if (input.escape && !previousEscape) {
        if (state.dialog.isOpen) {
          handleCloseDialog();
        } else if (state.quiz.isActive && !state.quiz.showingFeedback) {
          handleQuizClose();
        }
      }
      previousEscape = input.escape;

      // Only process game input if no overlay is open
      if (!state.quiz.isActive && !state.dialog.isOpen) {
        // Handle interaction
        if (input.interact && !previousInteract) {
          handleInteraction();
        }
        previousInteract = input.interact;

        // Calculate velocity based on input
        let vx = 0;
        let vy = 0;

        if (input.up) vy = -BLOB_SPEED;
        if (input.down) vy = BLOB_SPEED;
        if (input.left) vx = -BLOB_SPEED;
        if (input.right) vx = BLOB_SPEED;

        // Normalize diagonal movement
        if (vx !== 0 && vy !== 0) {
          vx *= 0.707;
          vy *= 0.707;
        }

        // Update facing direction
        if (vy < 0) state.blob.facing = "up";
        else if (vy > 0) state.blob.facing = "down";
        else if (vx < 0) state.blob.facing = "left";
        else if (vx > 0) state.blob.facing = "right";

        // Calculate new position
        const newX = state.blob.x + vx * deltaTime;
        const newY = state.blob.y + vy * deltaTime;

        // Resolve collisions
        const resolved = resolveCollision(
          state.blob.x,
          state.blob.y,
          newX,
          newY,
          ROOM_CONFIG.walls,
          state.objects
        );

        state.blob.x = resolved.x;
        state.blob.y = resolved.y;
        state.blob.velocityX = vx;
        state.blob.velocityY = vy;
        state.blob.isMoving = vx !== 0 || vy !== 0;

        // Update animation
        if (state.blob.isMoving) {
          state.blob.animationTimer += deltaTime * 1000;
          if (state.blob.animationTimer >= ANIMATION_SPEED) {
            state.blob.animationTimer = 0;
            state.blob.animationFrame = (state.blob.animationFrame + 1) % 4;
          }
        }

        // Update object proximity
        updateObjectProximity(state.blob, state.objects);
        const nearby = findNearbyObject(state.blob, state.objects);
        state.nearbyObject = nearby;
        setNearbyObject(nearby);
      }

      // Render
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawBackground(ctx);
      drawWalls(ctx, ROOM_CONFIG.walls);

      // Draw objects
      state.objects.forEach((obj) => {
        drawObject(ctx, obj, currentTime);
      });

      // Draw blob
      drawBlob(ctx, state.blob, currentTime);

      // Draw interaction prompt if nearby and no overlay open
      if (state.nearbyObject && !state.quiz.isActive && !state.dialog.isOpen) {
        drawInteractionPrompt(ctx, state.nearbyObject, currentTime);
      }

      // Draw UI
      drawProgress(ctx, state.explorationProgress, state.objects.length);
      drawControlsHint(ctx);

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleInteraction, handleCloseDialog, handleQuizClose]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="rounded-xl border-2 border-border shadow-lg"
        style={{ imageRendering: "pixelated" }}
      />

      {/* Quiz Overlay */}
      {quiz.isActive && (
        <QuizOverlay
          quiz={quiz}
          onAnswer={handleQuizAnswer}
          onSubmit={handleQuizSubmit}
          onComplete={handleQuizComplete}
          onClose={handleQuizClose}
          onRetry={handleQuizRetry}
          highScore={gameStateRef.current.highScore}
        />
      )}

      {/* Dialog Overlay */}
      {dialog.isOpen && (
        <DialogOverlay dialog={dialog} onClose={handleCloseDialog} />
      )}
    </div>
  );
}
