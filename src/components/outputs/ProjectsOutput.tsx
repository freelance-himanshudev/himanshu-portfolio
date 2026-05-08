import { useState } from 'react';
import { projects } from '../../data/portfolio';

export default function ProjectsOutput() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{
        fontSize: 11, color: 'var(--color-text-dim)',
        marginBottom: 16, letterSpacing: '0.1em',
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> ls -la ~/projects/
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {projects.map((p, i) => (
          <div
            key={p.id}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === p.id
                ? 'rgba(0,212,161,0.06)'
                : 'rgba(255,255,255,0.02)',
              border: `1px solid ${hovered === p.id ? 'rgba(0,212,161,0.25)' : 'var(--color-border)'}`,
              borderRadius: 8,
              padding: '14px 16px',
              cursor: 'default',
              transition: 'all 0.2s ease',
              animation: 'fadeSlideIn 0.15s ease-out forwards',
              animationDelay: `${i * 80}ms`,
              opacity: 0,
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  color: p.highlight ? 'var(--color-accent)' : 'var(--color-blue)',
                  fontSize: 13, fontWeight: 600,
                }}>
                  {p.name}
                </span>
                {p.highlight && (
                  <span style={{
                    fontSize: 9, padding: '1px 6px',
                    background: 'rgba(0,212,161,0.15)',
                    border: '1px solid rgba(0,212,161,0.3)',
                    color: 'var(--color-accent)',
                    borderRadius: 3, letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    FEATURED
                  </span>
                )}
                <span style={{
                  fontSize: 9, padding: '1px 6px',
                  background: p.status === 'active'
                    ? 'rgba(0,212,161,0.1)'
                    : 'rgba(255,213,79,0.1)',
                  border: `1px solid ${p.status === 'active' ? 'rgba(0,212,161,0.2)' : 'rgba(255,213,79,0.2)'}`,
                  color: p.status === 'active' ? 'var(--color-accent)' : 'var(--color-yellow)',
                  borderRadius: 3, letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {p.status}
                </span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 11, color: 'var(--color-text-dim)',
              }}>
                <span style={{ color: 'var(--color-yellow)' }}>★</span>
                <span>{p.stars.toLocaleString()}</span>
              </div>
            </div>

            <div style={{
              fontSize: 11, color: 'var(--color-text-secondary)',
              lineHeight: 1.6, marginBottom: 10,
            }}>
              {p.description}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    fontSize: 9, padding: '2px 7px',
                    background: 'rgba(79,195,247,0.08)',
                    border: '1px solid rgba(79,195,247,0.15)',
                    color: 'var(--color-blue)',
                    borderRadius: 3, letterSpacing: '0.05em',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              <span style={{
                fontSize: 10, color: 'var(--color-text-dim)',
              }}>
                {p.url}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
