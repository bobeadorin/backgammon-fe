import { useRef, useState, useEffect, useCallback } from "react";

// ─── SPRITE SHEET CONFIG ────────────────────────────────────────────────────
// The sheet is 1080×1080px, tiled 2×2 with the same 7-col × 7-row animation.
// We only use the top-left tile: 7 cols × 7 rows = 49 frames.
// Each cell: ~154×154 px (1080/7 ≈ 154).
// The sheet actually repeats the same sequence 4× (2 cols × 2 rows of tiles),
// so reading just the top-left quadrant gives us all unique animation frames.

export const COLS = 7;
export const ROWS = 7;
export const TOTAL_FRAMES = COLS * ROWS; // 49

// Cell size in the full 1080px sheet (top-left tile only)
export const TILE_W = 1080 / 2; // 540 — width of one tile
export const TILE_H = 1080 / 2; // 540 — height of one tile
export const CELL_W = TILE_W / COLS; // ~77px
export const CELL_H = TILE_H / ROWS; // ~77px

export const ROLL_DURATION_MS = 1500;

// Frame indices (within the 7×7 tile) that best show each face value.
// The red-pip frames are the "result" frames. Mapped by visual inspection:
// Row 0: mostly 1-pip / top faces
// Row 1: tumbling transitions
// Row 2-3: mid-roll chaos
// Row 4-5: red-pip highlight frames (used as final value indicators)
// Row 6: final settled faces
export const VALUE_FRAMES: Record<number, number> = {
  1: 0,   // top-left: face 1
  2: 7,   // row 1, col 0
  3: 14,  // row 2, col 0
  4: 21,  // row 3, col 0
  5: 28,  // row 4, col 0
  6: 35,  // row 5, col 0
};

export type DiceRollerReturn = {
  roll: () => void;
  rolling: boolean;
  result: number | null;
  history: number[];
};

export function useDiceRoller(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  spriteSheetUrl: string
): DiceRollerReturn {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const drawFrame = useCallback(
    (frameIndex: number, imgOverride?: HTMLImageElement) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const img = imgOverride ?? imgRef.current;
      if (!img?.complete || img.naturalWidth === 0) return;

      const col = frameIndex % COLS;
      const row = Math.floor(frameIndex / COLS);

      // Source coords: top-left tile only
      const sx = col * CELL_W;
      const sy = row * CELL_H;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, sx, sy, CELL_W, CELL_H, 0, 0, canvas.width, canvas.height);
    },
    [canvasRef]
  );

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = spriteSheetUrl;
    imgRef.current = img;
    img.onload = () => drawFrame(0, img);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [spriteSheetUrl, drawFrame]);

  const roll = useCallback(() => {
    if (rolling) return;

    const finalValue = Math.floor(Math.random() * 6) + 1;
    const targetFrame = VALUE_FRAMES[finalValue];
    const startTime = performance.now();

    setRolling(true);
    setResult(null);

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ROLL_DURATION_MS, 1);

      // Deceleration: fast scramble → slow crawl
      const speed = progress < 0.65
        ? 35
        : 35 + ((progress - 0.65) / 0.35) * 220;

      const frameIndex = Math.floor((elapsed / speed) % TOTAL_FRAMES);
      drawFrame(frameIndex);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        drawFrame(targetFrame);
        setRolling(false);
        setResult(finalValue);
        setHistory((prev) => [finalValue, ...prev].slice(0, 10));
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [rolling, drawFrame]);

  return { roll, rolling, result, history };
}