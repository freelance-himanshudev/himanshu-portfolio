const commands = [
  { cmd: "about", desc: "Who is Alex Chen" },
  { cmd: "projects", desc: "Open source & personal projects" },
  { cmd: "skills", desc: "Technical skill matrix" },
  { cmd: "experience", desc: "Work history & roles" },
  { cmd: "education", desc: "Degrees & certifications" },
  { cmd: "certifications", desc: "Professional credentials & achievements" },
  { cmd: "gallery", desc: "Event photos & memories" },
  { cmd: "contact", desc: "Get in touch" },
  { cmd: "socials", desc: "Social links & profiles" },
  { cmd: "whoami", desc: "Current operator info" },
  { cmd: "ls", desc: "List filesystem directory" },
  { cmd: "neofetch", desc: "System information" },
  { cmd: "status", desc: "Live system status" },
  { cmd: "hack", desc: "Initiate breach sequence" },
  { cmd: "matrix", desc: "Enter the matrix" },
  { cmd: "sudo", desc: "Elevate privileges" },
  { cmd: "theme", desc: "Toggle color theme" },
  { cmd: "clear", desc: "Clear terminal output" },
];

export default function HelpOutput() {
  return (
    <div style={{ fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>
      <div style={{ color: 'var(--color-accent)', marginBottom: 12, fontSize: 12 }}>
        ╔══════════════════════════════════════╗
      </div>
      <div style={{ color: 'var(--color-accent)', marginBottom: 4, fontSize: 12 }}>
        ║  AVAILABLE COMMANDS — 0xAlex Shell   ║
      </div>
      <div style={{ color: 'var(--color-accent)', marginBottom: 16, fontSize: 12 }}>
        ╚══════════════════════════════════════╝
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 24px' }}>
        {commands.map((c, i) => (
          <div
            key={c.cmd}
            style={{
              display: 'flex', gap: 8, alignItems: 'baseline',
              animation: 'fadeSlideIn 0.12s ease-out forwards',
              animationDelay: `${i * 30}ms`,
              opacity: 0,
            }}
          >
            <span style={{
              color: 'var(--color-blue)',
              fontSize: 12, minWidth: 80,
            }}>
              {c.cmd}
            </span>
            <span style={{
              color: 'var(--color-text-dim)',
              fontSize: 11,
            }}>
              — {c.desc}
            </span>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 16, fontSize: 11,
        color: 'var(--color-text-dim)', borderTop: '1px solid var(--color-border)',
        paddingTop: 10,
      }}>
        <span style={{ color: 'var(--color-yellow)' }}>TIP:</span> Press{' '}
        <span style={{ color: 'var(--color-accent)' }}>Tab</span> to autocomplete commands.
        Use <span style={{ color: 'var(--color-accent)' }}>↑↓</span> to navigate history.
      </div>
    </div>
  );
}
