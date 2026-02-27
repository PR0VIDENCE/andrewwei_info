import { GameObject, QuizQuestion, RoomConfig, Wall } from "./types";

// Game canvas dimensions
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// Blob configuration
export const BLOB_SIZE = 32;
export const BLOB_SPEED = 150; // pixels per second
export const BLOB_COLORS = {
  primary: "#D4836F",
  secondary: "#E89B7E",
  highlight: "#F4B59F",
  glow: "rgba(212, 131, 111, 0.3)",
};

// Animation configuration
export const ANIMATION_FRAMES = 4;
export const ANIMATION_SPEED = 150; // ms per frame
export const IDLE_PULSE_SPEED = 1000; // ms for one pulse cycle

// Interaction configuration
export const INTERACTION_RADIUS = 60;
export const PROMPT_OFFSET_Y = -40;

// Room colors
export const ROOM_COLORS = {
  background: "#1A1918",
  floor: "#242322",
  wall: "#2D2D2D",
  wallHighlight: "#3D3D3D",
  ambient: "rgba(212, 131, 111, 0.05)",
};

// Room configuration
export const ROOM_CONFIG: RoomConfig = {
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  walls: [
    // Top wall
    { x: 0, y: 0, width: CANVAS_WIDTH, height: 60 },
    // Bottom wall
    { x: 0, y: CANVAS_HEIGHT - 40, width: CANVAS_WIDTH, height: 40 },
    // Left wall
    { x: 0, y: 0, width: 40, height: CANVAS_HEIGHT },
    // Right wall
    { x: CANVAS_WIDTH - 40, y: 0, width: 40, height: CANVAS_HEIGHT },
  ],
  spawnPoint: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 },
};

// Game objects - positions and data
export const GAME_OBJECTS: GameObject[] = [
  // Quiz Terminal - center back
  {
    id: "quiz-terminal",
    x: CANVAS_WIDTH / 2 - 32,
    y: 80,
    width: 64,
    height: 64,
    type: "quiz-terminal",
    label: "Quiz Terminal",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "How Well Do You Know Me?",
      description: "Test your knowledge with a fun quiz about me!",
      icon: "🎮",
    },
  },
  // Projects
  {
    id: "project-1",
    x: 80,
    y: 120,
    width: 48,
    height: 48,
    type: "project",
    label: "Project",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Full-Stack Web App",
      description:
        "A modern web application built with React and Node.js featuring real-time updates and seamless user experience.",
      icon: "🖥️",
      tags: ["React", "Node.js", "PostgreSQL"],
      link: "/projects",
    },
  },
  {
    id: "project-2",
    x: 80,
    y: 280,
    width: 48,
    height: 48,
    type: "project",
    label: "Project",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Design System",
      description:
        "A comprehensive component library with accessible, reusable components built for scalability.",
      icon: "🎨",
      tags: ["TypeScript", "Tailwind", "Storybook"],
    },
  },
  {
    id: "project-3",
    x: 80,
    y: 440,
    width: 48,
    height: 48,
    type: "project",
    label: "Project",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Developer Tool",
      description:
        "An open-source CLI tool that automates repetitive tasks and improves developer workflow.",
      icon: "🛠️",
      tags: ["Python", "CLI", "Automation"],
    },
  },
  // Skills
  {
    id: "skill-frontend",
    x: CANVAS_WIDTH - 128,
    y: 120,
    width: 40,
    height: 40,
    type: "skill",
    label: "Skill",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Frontend Development",
      description:
        "Expert in React, Next.js, TypeScript, and modern CSS. I love creating smooth, accessible user interfaces.",
      icon: "⚛️",
      tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    },
  },
  {
    id: "skill-backend",
    x: CANVAS_WIDTH - 128,
    y: 280,
    width: 40,
    height: 40,
    type: "skill",
    label: "Skill",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Backend Development",
      description:
        "Proficient in building scalable APIs and services. Experience with various databases and cloud platforms.",
      icon: "🔧",
      tags: ["Node.js", "Python", "PostgreSQL", "Redis"],
    },
  },
  {
    id: "skill-tools",
    x: CANVAS_WIDTH - 128,
    y: 440,
    width: 40,
    height: 40,
    type: "skill",
    label: "Skill",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Tools & DevOps",
      description:
        "Comfortable with modern development tools, CI/CD pipelines, and cloud infrastructure.",
      icon: "☁️",
      tags: ["Git", "Docker", "AWS", "Vercel"],
    },
  },
  // Personal items
  {
    id: "personal-coffee",
    x: 200,
    y: 480,
    width: 32,
    height: 32,
    type: "personal",
    label: "Coffee",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Coffee Enthusiast",
      description:
        "Fueled by coffee and curiosity. I love discovering new brewing methods and local coffee shops.",
      icon: "☕",
    },
  },
  {
    id: "personal-music",
    x: 350,
    y: 480,
    width: 32,
    height: 32,
    type: "personal",
    label: "Music",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Music & Creativity",
      description:
        "I play guitar and enjoy exploring different genres. Music helps me think through complex problems.",
      icon: "🎸",
    },
  },
  {
    id: "personal-travel",
    x: 500,
    y: 480,
    width: 32,
    height: 32,
    type: "personal",
    label: "Travel",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "World Explorer",
      description:
        "Love experiencing different cultures and finding inspiration in new places. Travel broadens perspective.",
      icon: "✈️",
    },
  },
  {
    id: "personal-books",
    x: 650,
    y: 480,
    width: 32,
    height: 32,
    type: "personal",
    label: "Books",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "Lifelong Learner",
      description:
        "Always reading and learning something new. From technical books to sci-fi, I love diving deep into ideas.",
      icon: "📚",
    },
  },
  // Timeline/Journey
  {
    id: "timeline",
    x: CANVAS_WIDTH / 2 + 100,
    y: 300,
    width: 48,
    height: 48,
    type: "timeline",
    label: "Journey",
    isNearby: false,
    hasBeenInteracted: false,
    data: {
      title: "My Journey",
      description:
        "From studying computer science to building products at startups, my journey has been driven by curiosity and a love for creating.",
      icon: "🗺️",
    },
  },
];

// Quiz questions about you (customize these!)
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "What's my favorite programming language?",
    options: ["JavaScript", "Python", "TypeScript", "Rust"],
    correct: 2,
    explanation:
      "TypeScript! I love the type safety and developer experience it provides.",
    category: "preferences",
  },
  {
    id: 2,
    question: "What framework do I use most for web development?",
    options: ["Vue.js", "Angular", "Next.js", "Svelte"],
    correct: 2,
    explanation:
      "Next.js is my go-to for building modern web applications with great performance.",
    category: "skills",
  },
  {
    id: 3,
    question: "What's my preferred way to style applications?",
    options: ["Plain CSS", "SASS/SCSS", "Tailwind CSS", "CSS-in-JS"],
    correct: 2,
    explanation:
      "Tailwind CSS! I love the utility-first approach and rapid development it enables.",
    category: "preferences",
  },
  {
    id: 4,
    question: "How do I approach problem-solving?",
    options: [
      "Dive in and figure it out",
      "Research extensively first",
      "Break it into smaller pieces",
      "Ask someone else",
    ],
    correct: 2,
    explanation:
      "I break complex problems into smaller, manageable pieces - it makes everything more approachable!",
    category: "personality",
  },
  {
    id: 5,
    question: "What's my favorite beverage while coding?",
    options: ["Energy drinks", "Tea", "Coffee", "Water"],
    correct: 2,
    explanation: "Coffee is my fuel! Preferably a nice pour-over or cold brew.",
    category: "fun",
  },
  {
    id: 6,
    question: "What type of music do I listen to while working?",
    options: [
      "Complete silence",
      "Lo-fi beats",
      "Heavy metal",
      "Podcast/audiobooks",
    ],
    correct: 1,
    explanation:
      "Lo-fi beats are perfect - just enough background without being distracting.",
    category: "fun",
  },
  {
    id: 7,
    question: "What's most important to me in code?",
    options: [
      "Clever one-liners",
      "Readability and maintainability",
      "Maximum performance",
      "Minimum lines of code",
    ],
    correct: 1,
    explanation:
      "Readability and maintainability! Code is read more than it's written.",
    category: "personality",
  },
  {
    id: 8,
    question: "What database do I prefer for most projects?",
    options: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
    correct: 2,
    explanation:
      "PostgreSQL - it's powerful, reliable, and handles complex queries beautifully.",
    category: "skills",
  },
  {
    id: 9,
    question: "What's my approach to learning new technologies?",
    options: [
      "Watch tutorials only",
      "Read documentation cover-to-cover",
      "Build a project with it",
      "Wait until it's absolutely necessary",
    ],
    correct: 2,
    explanation:
      "I learn best by building! Nothing beats hands-on experience with real projects.",
    category: "personality",
  },
  {
    id: 10,
    question: "Where do I prefer to work?",
    options: [
      "Busy office",
      "Coffee shop",
      "Home office",
      "Anywhere with WiFi",
    ],
    correct: 2,
    explanation:
      "Home office - I love having my setup exactly how I like it, plus easy coffee access!",
    category: "fun",
  },
];

// Score titles based on percentage
export const SCORE_TITLES: { threshold: number; title: string; emoji: string }[] = [
  { threshold: 100, title: "Blob Expert", emoji: "🏆" },
  { threshold: 80, title: "Getting Close", emoji: "🌟" },
  { threshold: 60, title: "On The Right Track", emoji: "👍" },
  { threshold: 40, title: "Keep Exploring", emoji: "🔍" },
  { threshold: 0, title: "Just Getting Started", emoji: "🌱" },
];

export const getScoreTitle = (percentage: number) => {
  for (const tier of SCORE_TITLES) {
    if (percentage >= tier.threshold) {
      return tier;
    }
  }
  return SCORE_TITLES[SCORE_TITLES.length - 1];
};
