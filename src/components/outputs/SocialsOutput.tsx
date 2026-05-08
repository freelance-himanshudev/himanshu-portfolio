import { socials } from '../../data/portfolio';

export default function SocialsOutput() {
  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{
        fontSize: 11, color: 'var(--color-text-dim)', marginBottom: 16,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> cat socials.json
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {socials.map((s, i) => (
          <div
            key={s.platform}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--color-border)',
              borderRadius: 8, padding: '10px 14px',
              animation: 'fadeSlideIn 0.14s ease-out forwards',
              animationDelay: `${i * 60}ms`,
              opacity: 0,
            }}
          >
            <span style={{
              fontSize: 10, color: 'var(--color-text-dim)',
              minWidth: 70, letterSpacing: '0.05em',
            }}>
              {s.platform}
            </span>
            <span style={{ color: 'var(--color-text-dim)', fontSize: 10 }}>→</span>
            <span style={{ fontSize: 11, color: 'var(--color-blue)', flex: 1 }}>
              {s.handle}
            </span>
            <span style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>
              {s.url}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
