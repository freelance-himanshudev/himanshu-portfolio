import { useState } from 'react';
import BootSequence from './components/BootSequence';
import ProfilePanel from './components/ProfilePanel';
import Terminal from './components/Terminal';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleBootComplete = () => {
    setBooted(true);
    setTimeout(() => setVisible(true), 50);
  };

  return (
    <>
      {/* Global background */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(0,212,161,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,161,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        animation: 'gridDrift 30s linear infinite',
      }} />

      {/* Scanline overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0,0,0,0.05) 2px,
          rgba(0,0,0,0.05) 4px
        )`,
      }} />

      {/* Ambient glow top-left */}
      <div style={{
        position: 'fixed', top: -100, left: -100,
        width: 400, height: 400,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,212,161,0.04) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {!booted && <BootSequence onComplete={handleBootComplete} />}

      {booted && (
        <div style={{
          display: 'flex',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          position: 'relative', zIndex: 1,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}>
          {/* LEFT PANEL — Profile */}
          <div style={{
            width: '32%',
            minWidth: 280,
            maxWidth: 380,
            height: '100%',
            borderRight: '1px solid var(--color-border)',
            background: 'linear-gradient(180deg, rgba(8,10,12,0.98) 0%, rgba(10,14,20,0.97) 100%)',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <ProfilePanel />
          </div>

          {/* RIGHT PANEL — Terminal */}
          <div style={{
            flex: 1,
            height: '100%',
            background: 'rgba(8,10,12,0.96)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}>
            <Terminal />
          </div>
        </div>
      )}
    </>
  );
}
