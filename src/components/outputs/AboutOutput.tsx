import { about, stats } from '../../data/portfolio';

export default function AboutOutput() {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ color: 'var(--color-accent)', fontSize: 12 }}>{'>'}</span>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: 12, letterSpacing: '0.1em' }}>
          cat about.txt
        </span>
      </div>

      {about.map((line, i) => (
        <div
          key={i}
          style={{
            display: 'flex', gap: 12, marginBottom: 6,
            animation: 'fadeSlideIn 0.14s ease-out forwards',
            animationDelay: `${i * 60}ms`,
            opacity: 0,
          }}
        >
          <span style={{ color: 'var(--color-text-dim)', fontSize: 11, minWidth: 16, paddingTop: 1 }}>
            {i + 1}
          </span>
          <span style={{ color: 'var(--color-text-primary)', fontSize: 12, lineHeight: 1.7 }}>
            {line}
          </span>
        </div>
      ))}

      <div style={{
        marginTop: 20,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
        animation: 'fadeSlideIn 0.14s ease-out forwards',
        animationDelay: `${about.length * 60 + 40}ms`,
        opacity: 0,
      }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: 'rgba(0,212,161,0.05)',
            border: '1px solid rgba(0,212,161,0.15)',
            borderRadius: 8,
            padding: '12px',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 20, fontWeight: 700,
              color: 'var(--color-accent)',
              lineHeight: 1.2, marginBottom: 4,
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: 9, color: 'var(--color-text-dim)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
