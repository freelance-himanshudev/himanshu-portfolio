import { useEffect, useState } from 'react';

export default function NeofetchOutput() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const uptime = '47d 12h 33m';
  const padTime = (n: number) => String(n).padStart(2, '0');
  const timeStr = `${padTime(time.getHours())}:${padTime(time.getMinutes())}:${padTime(time.getSeconds())}`;

  const info = [
    { label: 'OS', value: 'KaliLinux 2024.1 x86_64' },
    { label: 'Kernel', value: '6.6.9-1-kali' },
    { label: 'Shell', value: 'zsh 5.9 + oh-my-zsh' },
    { label: 'Uptime', value: uptime },
    { label: 'Packages', value: '2847 (dpkg)' },
    { label: 'Terminal', value: 'Warp 0.2024.x' },
    { label: 'CPU', value: 'Intel Xeon E5-2690 @ 3.8GHz' },
    { label: 'Memory', value: '64GB DDR5 ECC' },
    { label: 'GPU', value: 'NVIDIA RTX 4090 24GB' },
    { label: 'Resolution', value: `${window.screen.width}x${window.screen.height}` },
    { label: 'Time', value: timeStr },
  ];

  const asciiArt = [
    '   ██████╗ ██╗  ██╗',
    '  ██╔═████╗╚██╗██╔╝',
    '  ██║██╔██║ ╚███╔╝ ',
    '  ████╔╝██║ ██╔██╗ ',
    '  ╚██████╔╝██╔╝ ██╗',
    '   ╚═════╝ ╚═╝  ╚═╝',
    '                    ',
    '  alex@secbox       ',
    '  ─────────────────',
  ];

  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        {/* ASCII Art */}
        <div style={{
          color: 'var(--color-accent)',
          lineHeight: 1.5,
          flexShrink: 0,
        }}>
          {asciiArt.map((line, i) => (
            <div key={i} style={{
              animation: 'fadeSlideIn 0.1s ease-out forwards',
              animationDelay: `${i * 40}ms`,
              opacity: 0,
            }}>
              {line}
            </div>
          ))}
          {/* Color palette */}
          <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
            {['#ef5350','#ffd54f','#00d4a1','#4fc3f7','#7986cb','#e91e63','#ff9800','#fff'].map(c => (
              <div key={c} style={{
                width: 14, height: 14,
                background: c, borderRadius: 2,
              }} />
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            color: 'var(--color-text-primary)',
            marginBottom: 8, fontSize: 12, fontWeight: 600,
          }}>
            <span style={{ color: 'var(--color-accent)' }}>alex</span>
            <span style={{ color: 'var(--color-text-dim)' }}>@</span>
            <span style={{ color: 'var(--color-blue)' }}>secbox</span>
          </div>
          <div style={{
            height: 1,
            background: 'var(--color-border)',
            marginBottom: 8,
          }} />
          {info.map((row, i) => (
            <div
              key={row.label}
              style={{
                display: 'flex', gap: 8, marginBottom: 2,
                animation: 'fadeSlideIn 0.1s ease-out forwards',
                animationDelay: `${i * 35 + 200}ms`,
                opacity: 0,
              }}
            >
              <span style={{
                color: 'var(--color-accent)',
                minWidth: 80, fontWeight: 500,
              }}>
                {row.label}
              </span>
              <span style={{ color: 'var(--color-text-dim)' }}>:</span>
              <span style={{ color: 'var(--color-text-secondary)' }}>
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
