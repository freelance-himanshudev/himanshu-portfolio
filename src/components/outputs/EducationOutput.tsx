import { education } from '../../data/portfolio';

export default function EducationOutput() {
  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{
        fontSize: 11, color: 'var(--color-text-dim)', marginBottom: 16,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> ls -la ~/education/
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {education.map((e, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--color-border)',
              borderLeft: '3px solid rgba(0,212,161,0.4)',
              borderRadius: '0 8px 8px 0',
              padding: '12px 16px',
              animation: 'fadeSlideIn 0.15s ease-out forwards',
              animationDelay: `${i * 80}ms`,
              opacity: 0,
            }}
          >
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', marginBottom: 4, flexWrap: 'wrap', gap: 8,
            }}>
              <span style={{ fontSize: 13, color: 'var(--color-text-primary)', fontWeight: 600 }}>
                {e.degree}
              </span>
              <span style={{
                fontSize: 10,
                background: 'rgba(0,212,161,0.08)',
                border: '1px solid rgba(0,212,161,0.2)',
                color: 'var(--color-accent)',
                padding: '1px 7px', borderRadius: 3,
              }}>
                {e.year}
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-blue)', marginBottom: 4 }}>
              {e.school}
            </div>
            <div style={{ fontSize: 11, color: 'var(--color-text-dim)' }}>
              {e.note}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
