// Game types and interfaces

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rectangle extends Position, Size {}

export type Direction = "up" | "down" | "left" | "right";

export interface BlobState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  isMoving: boolean;
  facing: Direction;
  animationFrame: number;
  animationTimer: number;
}

export interface InputState {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
  interact: boolean;
  escape: boolean;
}

export type GameObjectType =
  | "quiz-terminal"
  | "project"
  | "skill"
  | "personal"
  | "secret"
  | "timeline";

export interface GameObject {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: GameObjectType;
  label: string;
  isNearby: boolean;
  hasBeenInteracted: boolean;
  data: GameObjectData;
}

export interface GameObjectData {
  title: string;
  description: string;
  icon?: string;
  tags?: string[];
  link?: string;
  image?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: "basics" | "skills" | "preferences" | "personality" | "fun";
}

export interface QuizState {
  isActive: boolean;
  currentQuestion: number;
  score: number;
  answers: (boolean | null)[];
  completed: boolean;
  showingFeedback: boolean;
  lastAnswerCorrect: boolean | null;
  selectedOption: number;
}

export interface DialogState {
  isOpen: boolean;
  title: string;
  content: string;
  icon?: string;
  tags?: string[];
  link?: string;
}

export interface GameState {
  blob: BlobState;
  objects: GameObject[];
  quiz: QuizState;
  dialog: DialogState;
  nearbyObject: GameObject | null;
  explorationProgress: number;
  highScore: number;
}

export interface Wall {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RoomConfig {
  width: number;
  height: number;
  walls: Wall[];
  spawnPoint: Position;
}
