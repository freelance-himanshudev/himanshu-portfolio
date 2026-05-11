import { useState } from 'react';
import { certifications } from '../../data/portfolio';

export default function CertificationsOutput() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{
        fontSize: 11, color: 'var(--color-text-dim)',
        marginBottom: 18,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> ls -la ~/certifications/ --verified
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        marginBottom: 4,
      }}>
        {certifications.map((cert, i) => (
          <div
            key={cert.id}
            onMouseEnter={() => setHovered(cert.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: hovered === cert.id
                ? 'rgba(0,212,161,0.08)'
                : 'rgba(255,255,255,0.02)',
              border: `1px solid ${hovered === cert.id
                ? 'rgba(0,212,161,0.35)'
                : 'var(--color-border)'}`,
              borderRadius: 8,
              padding: '14px 16px',
              cursor: 'default',
              transition: 'all 0.2s ease',
              animation: 'fadeSlideIn 0.15s ease-out forwards',
              animationDelay: `${i * 70}ms`,
              opacity: 0,
              position: 'relative',
            }}
          >
            {hovered === cert.id && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at center, rgba(0,212,161,0.1) 0%, transparent 70%)',
                borderRadius: 8, pointerEvents: 'none',
                animation: 'glowPulse 1.5s ease-in-out infinite',
              }} />
            )}

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'flex', alignItems: 'start',
                justifyContent: 'space-between', marginBottom: 8, gap: 8,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: 12, fontWeight: 600,
                    color: cert.highlight ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    marginBottom: 2, lineHeight: 1.3,
                  }}>
                    {cert.name}
                  </div>
                  <div style={{
                    fontSize: 10, color: 'var(--color-blue)',
                    letterSpacing: '0.05em',
                  }}>
                    {cert.org}
                  </div>
                </div>
                {cert.highlight && (
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    width: 20, height: 20,
                    borderRadius: '50%',
                    background: 'rgba(0,212,161,0.15)',
                    border: '1px solid rgba(0,212,161,0.3)',
                    fontSize: 11, color: 'var(--color-accent)',
                  }}>
                    ★
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginBottom: 10,
                fontSize: 9, color: 'var(--color-text-dim)',
              }}>
                <span>{cert.date}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>ID: {cert.credentialId}</span>
              </div>

              <div style={{
                display: 'flex', gap: 5, flexWrap: 'wrap',
                marginBottom: 8,
              }}>
                {cert.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 8, padding: '2px 6px',
                    background: 'rgba(79,195,247,0.08)',
                    border: '1px solid rgba(79,195,247,0.15)',
                    color: 'var(--color-blue)',
                    borderRadius: 3,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{
                fontSize: 9,
                color: 'var(--color-accent)',
                letterSpacing: '0.05em',
              }}>
                <span style={{ color: 'var(--color-text-dim)' }}>verify</span>
                <span style={{ margin: '0 6px' }}>→</span>
                <span style={{ color: 'var(--color-blue)' }}>{cert.link}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 14, fontSize: 10,
        color: 'var(--color-text-dim)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: 10,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>Total credentials:</span> {certifications.length} verified
        <span style={{ marginLeft: 12, color: 'var(--color-accent)' }}>Highlight:</span> {certifications.filter(c => c.highlight).length} elite certifications
      </div>
    </div>
  );
}
