import {
  BlobState,
  GameObject,
  Wall,
  Direction,
} from "./types";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  BLOB_SIZE,
  BLOB_COLORS,
  ROOM_COLORS,
  ROOM_CONFIG,
  INTERACTION_RADIUS,
} from "./config";

// Draw the dark room background with ambient lighting
export function drawBackground(ctx: CanvasRenderingContext2D) {
  // Base background
  ctx.fillStyle = ROOM_COLORS.background;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Floor with subtle pattern
  ctx.fillStyle = ROOM_COLORS.floor;
  const tileSize = 40;
  for (let x = 40; x < CANVAS_WIDTH - 40; x += tileSize) {
    for (let y = 60; y < CANVAS_HEIGHT - 40; y += tileSize) {
      if ((x / tileSize + y / tileSize) % 2 === 0) {
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }
  }

  // Ambient glow in center
  const gradient = ctx.createRadialGradient(
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    0,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    CANVAS_WIDTH / 2
  );
  gradient.addColorStop(0, ROOM_COLORS.ambient);
  gradient.addColorStop(1, "transparent");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Vignette effect
  const vignette = ctx.createRadialGradient(
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    CANVAS_WIDTH / 4,
    CANVAS_WIDTH / 2,
    CANVAS_HEIGHT / 2,
    CANVAS_WIDTH / 1.2
  );
  vignette.addColorStop(0, "transparent");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.5)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// Draw walls
export function drawWalls(ctx: CanvasRenderingContext2D, walls: Wall[]) {
  walls.forEach((wall) => {
    // Wall base
    ctx.fillStyle = ROOM_COLORS.wall;
    ctx.fillRect(wall.x, wall.y, wall.width, wall.height);

    // Wall highlight/border
    ctx.strokeStyle = ROOM_COLORS.wallHighlight;
    ctx.lineWidth = 2;
    ctx.strokeRect(wall.x, wall.y, wall.width, wall.height);
  });
}

// Draw the blob character
export function drawBlob(
  ctx: CanvasRenderingContext2D,
  blob: BlobState,
  time: number
) {
  const { x, y, isMoving, facing, animationFrame } = blob;

  // Calculate idle pulse
  const pulseScale = isMoving ? 1 : 1 + Math.sin(time / 500) * 0.05;

  // Calculate squish for walking animation
  let scaleX = pulseScale;
  let scaleY = pulseScale;

  if (isMoving) {
    const walkCycle = Math.sin(animationFrame * 0.5);
    if (facing === "left" || facing === "right") {
      scaleX = 1 + walkCycle * 0.1;
      scaleY = 1 - walkCycle * 0.05;
    } else {
      scaleX = 1 - walkCycle * 0.05;
      scaleY = 1 + walkCycle * 0.1;
    }
  }

  const blobWidth = BLOB_SIZE * scaleX;
  const blobHeight = BLOB_SIZE * scaleY;
  const drawX = x - blobWidth / 2;
  const drawY = y - blobHeight / 2;

  // Glow effect
  const glowGradient = ctx.createRadialGradient(
    x,
    y,
    BLOB_SIZE / 2,
    x,
    y,
    BLOB_SIZE * 2
  );
  glowGradient.addColorStop(0, BLOB_COLORS.glow);
  glowGradient.addColorStop(1, "transparent");
  ctx.fillStyle = glowGradient;
  ctx.fillRect(x - BLOB_SIZE * 2, y - BLOB_SIZE * 2, BLOB_SIZE * 4, BLOB_SIZE * 4);

  // Shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.beginPath();
  ctx.ellipse(x, y + blobHeight / 2 + 4, blobWidth / 2.5, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Blob body - main shape
  const bodyGradient = ctx.createRadialGradient(
    x - blobWidth / 4,
    y - blobHeight / 4,
    0,
    x,
    y,
    blobWidth / 1.5
  );
  bodyGradient.addColorStop(0, BLOB_COLORS.highlight);
  bodyGradient.addColorStop(0.5, BLOB_COLORS.secondary);
  bodyGradient.addColorStop(1, BLOB_COLORS.primary);

  ctx.fillStyle = bodyGradient;
  ctx.beginPath();

  // Draw blob as a rounded shape
  const wobble = isMoving ? Math.sin(animationFrame * 0.3) * 2 : 0;
  ctx.ellipse(
    x + wobble,
    y,
    blobWidth / 2,
    blobHeight / 2,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Eyes
  const eyeOffsetX = facing === "left" ? -4 : facing === "right" ? 4 : 0;
  const eyeOffsetY = facing === "up" ? -3 : facing === "down" ? 3 : 0;

  // Left eye
  ctx.fillStyle = "#2D2D2D";
  ctx.beginPath();
  ctx.ellipse(
    x - 5 + eyeOffsetX,
    y - 2 + eyeOffsetY,
    3,
    4,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Right eye
  ctx.beginPath();
  ctx.ellipse(
    x + 5 + eyeOffsetX,
    y - 2 + eyeOffsetY,
    3,
    4,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Eye highlights
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.ellipse(x - 4 + eyeOffsetX, y - 3 + eyeOffsetY, 1.5, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(x + 6 + eyeOffsetX, y - 3 + eyeOffsetY, 1.5, 1.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Small smile
  ctx.strokeStyle = "#2D2D2D";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(x + eyeOffsetX, y + 4 + eyeOffsetY, 4, 0.2, Math.PI - 0.2);
  ctx.stroke();
}

// Draw game objects
export function drawObject(
  ctx: CanvasRenderingContext2D,
  obj: GameObject,
  time: number
) {
  const { x, y, width, height, type, isNearby, hasBeenInteracted, data } = obj;

  // Object glow when nearby
  if (isNearby) {
    const glowIntensity = 0.3 + Math.sin(time / 300) * 0.1;
    const glow = ctx.createRadialGradient(
      x + width / 2,
      y + height / 2,
      0,
      x + width / 2,
      y + height / 2,
      width
    );
    glow.addColorStop(0, `rgba(212, 131, 111, ${glowIntensity})`);
    glow.addColorStop(1, "transparent");
    ctx.fillStyle = glow;
    ctx.fillRect(x - width / 2, y - height / 2, width * 2, height * 2);
  }

  // Object base color based on type
  const colors: Record<string, { bg: string; border: string }> = {
    "quiz-terminal": { bg: "#3D5A80", border: "#98C1D9" },
    project: { bg: "#5C4B6C", border: "#9B8AA8" },
    skill: { bg: "#4A6741", border: "#8AB680" },
    personal: { bg: "#8B5E3C", border: "#C4A484" },
    timeline: { bg: "#6B4423", border: "#B87333" },
    secret: { bg: "#2D2D2D", border: "#4D4D4D" },
  };

  const color = colors[type] || colors.personal;
  const pulse = isNearby ? 1 + Math.sin(time / 200) * 0.05 : 1;
  const drawWidth = width * pulse;
  const drawHeight = height * pulse;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  // Shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.beginPath();
  ctx.ellipse(
    x + width / 2,
    y + height + 4,
    drawWidth / 2.5,
    6,
    0,
    0,
    Math.PI * 2
  );
  ctx.fill();

  // Object body
  ctx.fillStyle = color.bg;
  ctx.strokeStyle = color.border;
  ctx.lineWidth = 2;

  if (type === "quiz-terminal") {
    // Draw as arcade machine shape
    ctx.beginPath();
    ctx.roundRect(drawX, drawY, drawWidth, drawHeight, 8);
    ctx.fill();
    ctx.stroke();

    // Screen
    ctx.fillStyle = isNearby ? "#00FF00" : "#003300";
    ctx.fillRect(drawX + 8, drawY + 8, drawWidth - 16, drawHeight / 2);

    // Screen flicker
    if (Math.random() > 0.98) {
      ctx.fillStyle = "rgba(0, 255, 0, 0.1)";
      ctx.fillRect(drawX + 8, drawY + 8, drawWidth - 16, drawHeight / 2);
    }
  } else if (type === "skill") {
    // Draw as floating orb
    const orbGradient = ctx.createRadialGradient(
      x + width / 2 - 5,
      y + height / 2 - 5,
      0,
      x + width / 2,
      y + height / 2,
      width / 2
    );
    orbGradient.addColorStop(0, color.border);
    orbGradient.addColorStop(1, color.bg);
    ctx.fillStyle = orbGradient;
    ctx.beginPath();
    ctx.arc(x + width / 2, y + height / 2, drawWidth / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else {
    // Default rounded rectangle
    ctx.beginPath();
    ctx.roundRect(drawX, drawY, drawWidth, drawHeight, 6);
    ctx.fill();
    ctx.stroke();
  }

  // Icon emoji
  if (data.icon) {
    ctx.font = `${Math.min(width, height) * 0.5}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(data.icon, x + width / 2, y + height / 2);
  }

  // Checkmark if interacted
  if (hasBeenInteracted) {
    ctx.fillStyle = "#4CAF50";
    ctx.beginPath();
    ctx.arc(x + width - 4, y + 4, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✓", x + width - 4, y + 5);
  }
}

// Draw interaction prompt
export function drawInteractionPrompt(
  ctx: CanvasRenderingContext2D,
  obj: GameObject,
  time: number
) {
  const bounce = Math.sin(time / 200) * 3;
  const promptX = obj.x + obj.width / 2;
  const promptY = obj.y - 20 + bounce;

  // Background pill
  ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
  ctx.beginPath();
  ctx.roundRect(promptX - 40, promptY - 12, 80, 24, 12);
  ctx.fill();

  // Border
  ctx.strokeStyle = BLOB_COLORS.primary;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 12px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Press X", promptX, promptY);
}

// Draw exploration progress
export function drawProgress(
  ctx: CanvasRenderingContext2D,
  explored: number,
  total: number
) {
  const percentage = Math.round((explored / total) * 100);
  const barWidth = 100;
  const barHeight = 8;
  const x = CANVAS_WIDTH - barWidth - 20;
  const y = 20;

  // Background
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.beginPath();
  ctx.roundRect(x - 10, y - 20, barWidth + 20, 50, 8);
  ctx.fill();

  // Label
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "10px monospace";
  ctx.textAlign = "left";
  ctx.fillText("Explored", x, y - 5);

  // Bar background
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.beginPath();
  ctx.roundRect(x, y, barWidth, barHeight, 4);
  ctx.fill();

  // Bar fill
  const fillWidth = (explored / total) * barWidth;
  if (fillWidth > 0) {
    const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
    gradient.addColorStop(0, BLOB_COLORS.primary);
    gradient.addColorStop(1, BLOB_COLORS.secondary);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, fillWidth, barHeight, 4);
    ctx.fill();
  }

  // Percentage
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "center";
  ctx.fillText(`${percentage}%`, x + barWidth / 2, y + barHeight + 12);
}

// Draw controls hint
export function drawControlsHint(ctx: CanvasRenderingContext2D) {
  const x = 20;
  const y = CANVAS_HEIGHT - 30;

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "11px monospace";
  ctx.textAlign = "left";
  ctx.fillText("WASD to move • X to interact", x, y);
}
