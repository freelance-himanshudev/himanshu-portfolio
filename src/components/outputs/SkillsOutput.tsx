import { skills } from '../../data/portfolio';

export default function SkillsOutput() {
  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{
        fontSize: 11, color: 'var(--color-text-dim)',
        marginBottom: 16,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> cat skills.json | jq '.'
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {Object.entries(skills).map(([category, items], ci) => (
          <div
            key={category}
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--color-border)',
              borderRadius: 8, padding: '14px',
              animation: 'fadeSlideIn 0.15s ease-out forwards',
              animationDelay: `${ci * 100}ms`,
              opacity: 0,
            }}
          >
            <div style={{
              fontSize: 10, color: 'var(--color-accent)',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              marginBottom: 12, fontWeight: 600,
            }}>
              {category}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {items.map((skill, si) => (
                <div key={skill.name}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginBottom: 4,
                  }}>
                    <span style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                      {skill.name}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div style={{
                    height: 3, background: 'var(--color-border)',
                    borderRadius: 2, overflow: 'hidden',
                  }}>
                    <div
                      style={{
                        height: '100%',
                        background: skill.level >= 90
                          ? 'linear-gradient(90deg, var(--color-accent), #4fc3f7)'
                          : skill.level >= 80
                          ? 'linear-gradient(90deg, #4fc3f7, #81c784)'
                          : 'linear-gradient(90deg, #81c784, #a5d6a7)',
                        borderRadius: 2,
                        '--fill-width': `${skill.level}%`,
                        animation: `barFill 0.8s ease forwards`,
                        animationDelay: `${ci * 100 + si * 60 + 200}ms`,
                        width: 0,
                      } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
