import { useEffect, useState } from 'react';

const hackLines = [
  { text: "[>] Initializing breach protocol...", color: '#00d4a1', delay: 0 },
  { text: "[>] Scanning target: localhost:3000", color: '#4fc3f7', delay: 180 },
  { text: "[*] Open ports: 22/SSH  80/HTTP  443/HTTPS  3306/MySQL", color: '#8fa8b8', delay: 400 },
  { text: "[>] Running exploit modules...", color: '#ffd54f', delay: 650 },
  { text: "[+] CVE-2024-1337 — Buffer overflow found", color: '#00d4a1', delay: 900 },
  { text: "[>] Injecting shellcode payload...", color: '#ffd54f', delay: 1100 },
  { text: "[*] Establishing reverse shell...", color: '#8fa8b8', delay: 1350 },
  { text: "[+] Shell spawned: root@target:~#", color: '#00d4a1', delay: 1600 },
  { text: "[>] Exfiltrating /etc/shadow...", color: '#ffd54f', delay: 1850 },
  { text: "[+] 1247 hashes captured.", color: '#00d4a1', delay: 2100 },
  { text: "[>] Covering tracks: wiping logs...", color: '#8fa8b8', delay: 2300 },
  { text: "[+] Breach complete. Access maintained.", color: '#00d4a1', delay: 2600 },
  { text: "", color: '', delay: 2800 },
  { text: "[ This is a simulation. No systems were harmed. ]", color: '#4a6572', delay: 2850 },
];

export default function HackOutput() {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    hackLines.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisible(prev => [...prev, i]);
      }, line.delay));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{ marginBottom: 12, fontSize: 11, color: 'var(--color-text-dim)' }}>
        <span style={{ color: 'var(--color-red)' }}>!</span> INITIATING BREACH SEQUENCE — AUTHORIZED SIMULATION
      </div>
      {hackLines.map((line, i) => (
        <div
          key={i}
          style={{
            fontSize: 11, lineHeight: 1.8,
            color: line.color || 'transparent',
            opacity: visible.includes(i) ? 1 : 0,
            transition: 'opacity 0.2s ease',
          }}
        >
          {line.text || '\u00a0'}
        </div>
      ))}
    </div>
  );
}
