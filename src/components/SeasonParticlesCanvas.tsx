import React, { useEffect, useRef } from 'react';

export type SeasonType = 'spring' | 'summer' | 'autumn' | 'winter';
export type TimeOfDay = 'day' | 'sunset' | 'night';

interface SeasonParticlesCanvasProps {
  season: SeasonType;
  timeOfDay: TimeOfDay;
  enabled: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  pulse?: number;
}

export function SeasonParticlesCanvas({
  season,
  timeOfDay,
  enabled,
}: SeasonParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate season-appropriate particles
    const particleCount = season === 'summer' || timeOfDay === 'night' ? 35 : 45;
    const particles: Particle[] = [];

    const getParticleColor = () => {
      if (timeOfDay === 'night' || season === 'summer') {
        // Firefly soft bioluminescence
        return Math.random() > 0.4 ? '#86efac' : '#fef08a';
      }
      if (season === 'spring') {
        return Math.random() > 0.5 ? '#fbcfe8' : '#fda4af'; // Cherry blossom pink
      }
      if (season === 'autumn') {
        return Math.random() > 0.5 ? '#fb923c' : '#f87171'; // Autumn maple amber
      }
      // Winter snow
      return '#f1f5f9';
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: season === 'summer' || timeOfDay === 'night' ? 2 + Math.random() * 2.5 : 4 + Math.random() * 5,
        speedX: (Math.random() - 0.4) * 0.8,
        speedY: season === 'summer' || timeOfDay === 'night' ? (Math.random() - 0.5) * 0.6 : 0.4 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: 0.3 + Math.random() * 0.5,
        color: getParticleColor(),
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        if (season === 'summer' || timeOfDay === 'night') {
          // Fireflies pulse and wander
          p.pulse = (p.pulse || 0) + 0.04;
          const currentOpacity = 0.2 + 0.5 * Math.abs(Math.sin(p.pulse));

          // Draw soft glowing orb
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Core point
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = currentOpacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          // Petal / Leaf / Snow
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;

          if (season === 'spring') {
            // Cherry petal oval
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
          } else if (season === 'autumn') {
            // Maple shape diamond
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(p.size * 0.7, 0);
            ctx.lineTo(0, p.size);
            ctx.lineTo(-p.size * 0.7, 0);
            ctx.closePath();
            ctx.fill();
          } else {
            // Snowflake circle
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }

        // Screen wrap
        if (p.y > height + 20) {
          p.y = -10;
          p.x = Math.random() * width;
        } else if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -10;
        } else if (p.x < -20) {
          p.x = width + 10;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [season, timeOfDay, enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
    />
  );
}
