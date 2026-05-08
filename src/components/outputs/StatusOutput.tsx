import { useEffect, useState } from 'react';

function randomBetween(a: number, b: number) {
  return Math.floor(Math.random() * (b - a) + a);
}

export default function StatusOutput() {
  const [cpu, setCpu] = useState(randomBetween(12, 35));
  const [mem, setMem] = useState(randomBetween(38, 62));
  const [net, setNet] = useState(randomBetween(4, 28));
  const [threats, setThreats] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCpu(randomBetween(8, 45));
      setMem(randomBetween(35, 68));
      setNet(randomBetween(2, 40));
      setThreats(Math.random() > 0.92 ? 1 : 0);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const Bar = ({ value, color }: { value: number; color: string }) => (
    <div style={{
      height: 4, background: 'var(--color-border)',
      borderRadius: 2, overflow: 'hidden', flex: 1,
    }}>
      <div style={{
        height: '100%', width: `${value}%`,
        background: color, borderRadius: 2,
        transition: 'width 0.8s ease',
      }} />
    </div>
  );

  const systems = [
    { name: 'Firewall', status: 'ACTIVE', ok: true },
    { name: 'IDS/IPS', status: 'MONITORING', ok: true },
    { name: 'VPN Tunnel', status: 'CONNECTED', ok: true },
    { name: 'Vault', status: 'LOCKED', ok: true },
    { name: 'Threat Intel', status: threats ? 'ALERT' : 'CLEAR', ok: threats === 0 },
    { name: 'Audit Log', status: 'RECORDING', ok: true },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{ fontSize: 11, color: 'var(--color-text-dim)', marginBottom: 16 }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> systemctl status --all
      </div>

      {/* Resources */}
      <div style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid var(--color-border)',
        borderRadius: 8, padding: '14px',
        marginBottom: 12,
      }}>
        <div style={{
          fontSize: 10, color: 'var(--color-accent)',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          marginBottom: 10,
        }}>
          Resource Monitor
        </div>
        {[
          { label: 'CPU', value: cpu, color: cpu > 70 ? '#ef5350' : '#00d4a1' },
          { label: 'MEM', value: mem, color: mem > 75 ? '#ffd54f' : '#4fc3f7' },
          { label: 'NET', value: net, color: '#7986cb' },
        ].map(r => (
          <div key={r.label} style={{
            display: 'flex', alignItems: 'center',
            gap: 10, marginBottom: 6,
          }}>
            <span style={{
              fontSize: 10, color: 'var(--color-text-dim)',
              minWidth: 30,
            }}>
              {r.label}
            </span>
            <Bar value={r.value} color={r.color} />
            <span style={{
              fontSize: 10, color: r.color,
              minWidth: 32, textAlign: 'right',
            }}>
              {r.value}%
            </span>
          </div>
        ))}
      </div>

      {/* Security systems */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 6,
      }}>
        {systems.map((s, i) => (
          <div
            key={s.name}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${s.ok ? 'var(--color-border)' : 'rgba(239,83,80,0.3)'}`,
              borderRadius: 6, padding: '7px 10px',
              animation: 'fadeSlideIn 0.12s ease-out forwards',
              animationDelay: `${i * 50}ms`,
              opacity: 0,
            }}
          >
            <span style={{ fontSize: 10, color: 'var(--color-text-secondary)' }}>
              {s.name}
            </span>
            <span style={{
              fontSize: 9, letterSpacing: '0.08em',
              color: s.ok ? 'var(--color-accent)' : 'var(--color-red)',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: s.ok ? 'var(--color-accent)' : 'var(--color-red)',
                animation: !s.ok ? 'statusPulse 0.8s ease-in-out infinite' : undefined,
              }} />
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
