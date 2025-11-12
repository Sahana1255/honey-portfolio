// src/components/Confetti.tsx
import { useEffect, useRef } from "react";

type ConfettiProps = {
  particleCount?: number;
  duration?: number;
  colors?: string[];
};

export default function Confetti({
  particleCount = 80,
  duration = 1400,
  colors = ["#8b5cf6", "#6366f1", "#f472b6", "#60a5fa", "#f59e0b"],
}: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect user's reduced motion preference
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) return; // do not run confetti

    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const particles: any[] = [];
    const gravity = 0.35;
    const start = performance.now();

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: w / 2 + rand(-200, 200),
        y: h / 2 + rand(-40, 40),
        vx: rand(-8, 8),
        vy: rand(-12, -4),
        size: rand(6, 14),
        color: colors[Math.floor(rand(0, colors.length))],
        tilt: rand(-0.2, 0.2),
        angle: rand(0, Math.PI * 2),
      });
    }

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    let raf = 0;
    function draw(now: number) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, w, h);

      for (let p of particles) {
        p.vy += gravity * 0.18;
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.tilt * 0.05;
        p.vx *= 0.99;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (elapsed < duration) {
        raf = requestAnimationFrame(draw);
      } else {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(raf);
        setTimeout(() => ctx.clearRect(0, 0, w, h), 300);
      }
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [particleCount, duration, colors]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
