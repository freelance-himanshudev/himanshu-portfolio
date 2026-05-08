import { useEffect, useRef, useState } from 'react';
import { profile, stats } from '../data/portfolio';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

export default function ProfilePanel() {
  const [mounted, setMounted] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const padTime = (n: number) => String(n).padStart(2, '0');
  const timeStr = `${padTime(time.getHours())}:${padTime(time.getMinutes())}:${padTime(time.getSeconds())}`;

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,212,161,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,161,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
        animation: 'gridDrift 20s linear infinite',
      }} />

      {/* Corner accent top-left */}
      <div style={{
        position: 'absolute', top: 16, left: 16,
        width: 40, height: 40,
        borderTop: '1px solid rgba(0,212,161,0.3)',
        borderLeft: '1px solid rgba(0,212,161,0.3)',
        pointerEvents: 'none',
      }} />
      {/* Corner accent bottom-right */}
      <div style={{
        position: 'absolute', bottom: 16, right: 16,
        width: 40, height: 40,
        borderBottom: '1px solid rgba(0,212,161,0.3)',
        borderRight: '1px solid rgba(0,212,161,0.3)',
        pointerEvents: 'none',
      }} />

      {/* Floating particles */}
      {PARTICLES.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            borderRadius: '50%',
            background: 'var(--color-accent)',
            opacity: 0.4,
            pointerEvents: 'none',
            animation: `float ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Ambient glow center */}
      <div style={{
        position: 'absolute',
        width: 300, height: 300,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,161,0.06) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      {/* Main card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 300,
          transition: mounted ? 'transform 0.15s ease, opacity 0.6s ease' : 'opacity 0.6s ease',
          opacity: mounted ? 1 : 0,
          transform: `
            perspective(1000px)
            rotateX(${tilt.x}deg)
            rotateY(${tilt.y}deg)
            translateY(${mounted ? 0 : 12}px)
          `,
          animation: mounted ? 'float 5s ease-in-out infinite' : 'none',
          cursor: 'default',
        }}
      >
        {/* Card */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(15,25,35,0.95), rgba(10,18,28,0.98))',
          border: '1px solid rgba(0,212,161,0.2)',
          borderRadius: 16,
          padding: '28px 24px',
          boxShadow: `
            0 4px 24px rgba(0,0,0,0.6),
            0 0 0 1px rgba(0,212,161,0.06),
            0 0 40px rgba(0,212,161,0.08),
            inset 0 1px 0 rgba(255,255,255,0.04)
          `,
          backdropFilter: 'blur(20px)',
        }}>
          {/* Top status bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ef5350', '#ffd54f', '#00d4a1'].map((c, i) => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: c, opacity: 0.8,
                }} />
              ))}
            </div>
            <div style={{
              fontSize: 10, color: 'var(--color-text-dim)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
            }}>
              {timeStr}
            </div>
          </div>

          {/* Profile image */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            marginBottom: 20,
          }}>
            <div style={{
              position: 'relative',
              width: 88, height: 88,
            }}>
              {/* Glow ring */}
              <div style={{
                position: 'absolute', inset: -4,
                borderRadius: '50%',
                background: 'conic-gradient(from 0deg, var(--color-accent), transparent, var(--color-accent))',
                animation: 'gridDrift 4s linear infinite',
                opacity: 0.6,
              }} />
              <div style={{
                position: 'absolute', inset: -2,
                borderRadius: '50%',
                background: 'var(--color-surface)',
              }} />
              <img
                src={profile.image}
                alt={profile.name}
                style={{
                  width: 88, height: 88,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  position: 'relative', zIndex: 1,
                  display: 'block',
                  filter: 'saturate(0.9) contrast(1.05)',
                }}
              />
              {/* Online indicator */}
              <div style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 14, height: 14,
                borderRadius: '50%',
                background: 'var(--color-accent)',
                border: '2px solid var(--color-surface)',
                zIndex: 2,
                boxShadow: '0 0 8px var(--color-accent)',
                animation: 'statusPulse 2s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* Name & role */}
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{
              fontSize: 18, fontWeight: 600,
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.01em',
              marginBottom: 4,
            }}>
              {profile.name}
            </div>
            <div style={{
              fontSize: 11, color: 'var(--color-accent)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              {profile.role}
            </div>
            <div style={{
              fontSize: 11, color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5,
            }}>
              {profile.tagline}
            </div>
          </div>

          {/* Status badge */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 6, marginBottom: 20,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(0,212,161,0.08)',
              border: '1px solid rgba(0,212,161,0.2)',
              borderRadius: 20,
              padding: '4px 10px',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: 'var(--color-accent)',
                boxShadow: '0 0 6px var(--color-accent)',
                animation: 'statusPulse 2s ease-in-out infinite',
              }} />
              <span style={{
                fontSize: 10, color: 'var(--color-accent)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                fontWeight: 500,
              }}>
                Available for hire
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,212,161,0.2), transparent)',
            marginBottom: 16,
          }} />

          {/* Info rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {[
              { label: 'user', value: profile.handle },
              { label: 'location', value: profile.location },
              { label: 'email', value: profile.email },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{
                  fontSize: 10, color: 'var(--color-text-dim)',
                  minWidth: 52, letterSpacing: '0.06em',
                }}>
                  {row.label}:
                </span>
                <span style={{
                  fontSize: 11, color: 'var(--color-text-secondary)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,212,161,0.2), transparent)',
            marginBottom: 16,
          }} />

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 8,
          }}>
            {stats.map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--color-border)',
                borderRadius: 8,
                padding: '8px 10px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: 16, fontWeight: 700,
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.2, marginBottom: 3,
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontSize: 9, color: 'var(--color-text-dim)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <div style={{
        marginTop: 20, zIndex: 2,
        fontSize: 10, color: 'var(--color-text-dim)',
        letterSpacing: '0.1em', textAlign: 'center',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 1s ease 0.8s',
      }}>
        TYPE <span style={{ color: 'var(--color-accent)' }}>help</span> TO BEGIN
      </div>
    </div>
  );
}
