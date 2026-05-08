import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

const bootLines = [
  { text: "BIOS v2.1.4 — Initializing hardware...", delay: 0 },
  { text: "CPU: Intel Xeon E5-2690 [8 cores @ 3.80GHz] ✓", delay: 120 },
  { text: "Memory: 64GB DDR5 ECC — OK", delay: 240 },
  { text: "Storage: NVMe 2TB [LUKS encrypted] — mounted", delay: 360 },
  { text: "Network: eth0 [192.168.1.x] — UP", delay: 480 },
  { text: "Loading kernel modules...", delay: 600 },
  { text: "Initializing security subsystems...", delay: 720 },
  { text: "Firewall: iptables rules loaded [847 rules]", delay: 840 },
  { text: "IDS/IPS: Snort 3.1.9 — ACTIVE", delay: 960 },
  { text: "VPN: WireGuard tunnel — ESTABLISHED", delay: 1080 },
  { text: "Mounting encrypted vaults...", delay: 1200 },
  { text: "Loading portfolio environment v3.0.0...", delay: 1380 },
  { text: "All systems nominal. Welcome, operator.", delay: 1560 },
];

export default function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay + 200));
    });

    timers.push(setTimeout(() => {
      setDone(true);
    }, 2000));

    timers.push(setTimeout(() => {
      setFadeOut(true);
    }, 2400));

    timers.push(setTimeout(() => {
      onComplete();
    }, 2900));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: '#050709',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        fontFamily: 'var(--font-mono)',
        transition: 'opacity 0.5s ease',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(0,212,161,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,161,0.04) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div style={{
        width: '100%', maxWidth: 680,
        padding: '0 24px',
      }}>
        {/* Logo */}
        <div style={{
          marginBottom: 32,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: 'var(--color-accent)',
            boxShadow: '0 0 12px var(--color-accent)',
            animation: 'statusPulse 1.5s ease-in-out infinite',
          }} />
          <span style={{ color: 'var(--color-accent)', fontSize: 13, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            SYSTEM BOOT
          </span>
        </div>

        {/* Boot lines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {bootLines.map((line, i) => (
            <div
              key={i}
              style={{
                display: 'flex', gap: 12, alignItems: 'flex-start',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
                opacity: visibleLines.includes(i) ? 1 : 0,
                transform: visibleLines.includes(i) ? 'translateX(0)' : 'translateX(-8px)',
              }}
            >
              <span style={{ color: 'var(--color-text-dim)', fontSize: 11, minWidth: 24, paddingTop: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{
                color: i === bootLines.length - 1
                  ? 'var(--color-accent)'
                  : i >= bootLines.length - 3
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
                fontSize: 12,
                lineHeight: 1.6,
              }}>
                {line.text}
              </span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {done && (
          <div style={{ marginTop: 32 }}>
            <div style={{
              height: 2, background: 'var(--color-border)',
              borderRadius: 1, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--color-accent), #4fc3f7)',
                animation: 'barFill 0.4s ease forwards',
                '--fill-width': '100%',
              } as React.CSSProperties} />
            </div>
            <div style={{
              marginTop: 8, fontSize: 11,
              color: 'var(--color-accent)',
              textAlign: 'right',
              letterSpacing: '0.1em',
            }}>
              INITIALIZING INTERFACE...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
