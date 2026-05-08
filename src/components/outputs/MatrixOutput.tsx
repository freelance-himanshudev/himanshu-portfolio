import { useEffect, useRef } from 'react';

export default function MatrixOutput() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = Math.floor(canvas.width / 14);
    const drops: number[] = Array(cols).fill(1);
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEF<>/\\|{}[]';

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 10, 12, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00d4a1';
      ctx.font = '12px JetBrains Mono, monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = y === 1
          ? '#e8f4f0'
          : `rgba(0, 212, 161, ${Math.random() * 0.6 + 0.3})`;
        ctx.fillText(char, i * 14, y * 14);
        if (y * 14 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const id = setInterval(draw, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{ fontSize: 11, color: 'var(--color-text-dim)', marginBottom: 12 }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> entering the matrix...
        <span style={{ color: 'var(--color-text-dim)', marginLeft: 12, fontSize: 10 }}>
          type any command to exit
        </span>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%', height: 200,
          display: 'block',
          borderRadius: 6,
          border: '1px solid var(--color-border)',
        }}
      />
    </div>
  );
}
