import { Position, Rectangle, Wall, BlobState, GameObject } from "./types";
import { BLOB_SIZE, INTERACTION_RADIUS } from "./config";

// Check if two rectangles overlap (AABB collision)
export function rectanglesOverlap(a: Rectangle, b: Rectangle): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// Check if a point is inside a rectangle
export function pointInRectangle(point: Position, rect: Rectangle): boolean {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

// Get distance between two points
export function getDistance(a: Position, b: Position): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// Check if blob collides with any wall
export function checkWallCollision(
  x: number,
  y: number,
  walls: Wall[]
): boolean {
  const blobRect: Rectangle = {
    x: x - BLOB_SIZE / 2,
    y: y - BLOB_SIZE / 2,
    width: BLOB_SIZE,
    height: BLOB_SIZE,
  };

  for (const wall of walls) {
    if (rectanglesOverlap(blobRect, wall)) {
      return true;
    }
  }

  return false;
}

// Check if blob collides with any object (for solid objects)
export function checkObjectCollision(
  x: number,
  y: number,
  objects: GameObject[],
  excludeId?: string
): boolean {
  const blobRect: Rectangle = {
    x: x - BLOB_SIZE / 2,
    y: y - BLOB_SIZE / 2,
    width: BLOB_SIZE,
    height: BLOB_SIZE,
  };

  for (const obj of objects) {
    if (excludeId && obj.id === excludeId) continue;

    // Add some padding around objects for collision
    const objRect: Rectangle = {
      x: obj.x - 4,
      y: obj.y - 4,
      width: obj.width + 8,
      height: obj.height + 8,
    };

    if (rectanglesOverlap(blobRect, objRect)) {
      return true;
    }
  }

  return false;
}

// Find the nearest object within interaction radius
export function findNearbyObject(
  blob: BlobState,
  objects: GameObject[]
): GameObject | null {
  let nearest: GameObject | null = null;
  let nearestDistance = Infinity;

  for (const obj of objects) {
    const objCenter: Position = {
      x: obj.x + obj.width / 2,
      y: obj.y + obj.height / 2,
    };

    const distance = getDistance({ x: blob.x, y: blob.y }, objCenter);

    if (distance < INTERACTION_RADIUS && distance < nearestDistance) {
      nearest = obj;
      nearestDistance = distance;
    }
  }

  return nearest;
}

// Update which objects are nearby
export function updateObjectProximity(
  blob: BlobState,
  objects: GameObject[]
): void {
  objects.forEach((obj) => {
    const objCenter: Position = {
      x: obj.x + obj.width / 2,
      y: obj.y + obj.height / 2,
    };

    const distance = getDistance({ x: blob.x, y: blob.y }, objCenter);
    obj.isNearby = distance < INTERACTION_RADIUS;
  });
}

// Resolve collision by sliding along walls
export function resolveCollision(
  currentX: number,
  currentY: number,
  newX: number,
  newY: number,
  walls: Wall[],
  objects: GameObject[]
): Position {
  // Try full movement
  if (
    !checkWallCollision(newX, newY, walls) &&
    !checkObjectCollision(newX, newY, objects)
  ) {
    return { x: newX, y: newY };
  }

  // Try horizontal only
  if (
    !checkWallCollision(newX, currentY, walls) &&
    !checkObjectCollision(newX, currentY, objects)
  ) {
    return { x: newX, y: currentY };
  }

  // Try vertical only
  if (
    !checkWallCollision(currentX, newY, walls) &&
    !checkObjectCollision(currentX, newY, objects)
  ) {
    return { x: currentX, y: newY };
  }

  // Can't move
  return { x: currentX, y: currentY };
}
