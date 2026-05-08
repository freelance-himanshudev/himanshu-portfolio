import { experience } from '../../data/portfolio';

export default function ExperienceOutput() {
  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{
        fontSize: 11, color: 'var(--color-text-dim)', marginBottom: 16,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> tail -n 100 experience.log
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {experience.map((e, i) => (
          <div
            key={i}
            style={{
              display: 'flex', gap: 16,
              animation: 'fadeSlideIn 0.15s ease-out forwards',
              animationDelay: `${i * 100}ms`,
              opacity: 0,
            }}
          >
            {/* Timeline */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              minWidth: 12,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                background: i === 0 ? 'var(--color-accent)' : 'var(--color-border-bright)',
                border: i === 0 ? '2px solid rgba(0,212,161,0.4)' : '2px solid var(--color-border)',
                boxShadow: i === 0 ? '0 0 8px rgba(0,212,161,0.5)' : 'none',
                marginTop: 4,
              }} />
              {i < experience.length - 1 && (
                <div style={{
                  width: 1, flexGrow: 1, minHeight: 40,
                  background: 'linear-gradient(to bottom, var(--color-border-bright), var(--color-border))',
                  margin: '4px 0',
                }} />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: i < experience.length - 1 ? 24 : 0, flex: 1 }}>
              <div style={{
                display: 'flex', alignItems: 'baseline',
                justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 8,
              }}>
                <span style={{
                  fontSize: 13, fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}>
                  {e.role}
                </span>
                <span style={{
                  fontSize: 10, color: 'var(--color-text-dim)',
                }}>
                  {e.period}
                </span>
              </div>
              <div style={{
                fontSize: 11, color: 'var(--color-accent)',
                marginBottom: 6, letterSpacing: '0.05em',
              }}>
                @ {e.company}
              </div>
              <div style={{
                fontSize: 11, color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
              }}>
                {e.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
