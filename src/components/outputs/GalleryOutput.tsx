import { useState, useRef, useEffect } from 'react';
import { gallery } from '../../data/portfolio';

export default function GalleryOutput() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedIdx(prev => (prev !== null ? (prev + 1) % gallery.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx(prev => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : gallery.length - 1));
      } else if (e.key === 'Escape') {
        setSelectedIdx(null);
      }
    };
    if (selectedIdx !== null) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [selectedIdx]);

  const selectedImage = selectedIdx !== null ? gallery[selectedIdx] : null;

  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{
        fontSize: 11, color: 'var(--color-text-dim)',
        marginBottom: 16,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> open gallery/ --recursive --preview-mode
      </div>

      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 12,
          marginBottom: selectedImage ? 20 : 0,
        }}
      >
        {gallery.map((item, i) => (
          <div
            key={item.id}
            onClick={() => setSelectedIdx(i)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 8,
              cursor: 'pointer',
              aspectRatio: '1 / 1',
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid ${hovered === item.id
                ? 'rgba(0,212,161,0.35)'
                : 'var(--color-border)'}`,
              animation: 'fadeSlideIn 0.15s ease-out forwards',
              animationDelay: `${i * 60}ms`,
              opacity: 0,
              transition: 'all 0.2s ease',
              transform: hovered === item.id ? 'scale(1.02)' : 'scale(1)',
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'filter 0.3s ease, transform 0.3s ease',
                filter: hovered === item.id ? 'saturate(1.2) contrast(1.1)' : 'saturate(0.95) contrast(1)',
                transform: hovered === item.id ? 'scale(1.08)' : 'scale(1)',
              }}
            />

            <div style={{
              position: 'absolute', inset: 0,
              background: hovered === item.id
                ? 'linear-gradient(135deg, rgba(0,212,161,0.3) 0%, rgba(79,195,247,0.15) 100%)'
                : 'rgba(0,0,0,0.4)',
              transition: 'background 0.3s ease',
              display: 'flex', flexDirection: 'column',
              justifyContent: 'flex-end', padding: '12px',
            }}>
              {hovered === item.id && (
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 1px,
                    rgba(0,212,161,0.03) 1px,
                    rgba(0,212,161,0.03) 2px
                  )`,
                  pointerEvents: 'none',
                  animation: 'scanMove 3s linear infinite',
                }} />
              )}

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{
                  fontSize: 10, color: 'var(--color-text-primary)',
                  fontWeight: 600, marginBottom: 2,
                  opacity: hovered === item.id ? 1 : 0.7,
                  transition: 'opacity 0.2s ease',
                }}>
                  {item.title}
                </div>
                <div style={{
                  fontSize: 8, color: 'var(--color-text-dim)',
                  opacity: hovered === item.id ? 1 : 0.5,
                  transition: 'opacity 0.2s ease',
                }}>
                  {item.location}
                </div>
              </div>
            </div>

            {hovered === item.id && (
              <div style={{
                position: 'absolute', inset: 0,
                borderRadius: 8,
                border: '1px solid rgba(0,212,161,0.5)',
                boxShadow: '0 0 16px rgba(0,212,161,0.2)',
                pointerEvents: 'none',
              }} />
            )}

            <div style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(0,212,161,0.1)',
              border: '1px solid rgba(0,212,161,0.2)',
              borderRadius: 4,
              padding: '3px 7px',
              fontSize: 8,
              color: 'var(--color-accent)',
              opacity: hovered === item.id ? 1 : 0,
              transition: 'opacity 0.2s ease',
            }}>
              CLICK
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedIdx(null);
          }}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{
            maxWidth: '90vw', maxHeight: '85vh',
            display: 'flex', flexDirection: 'column',
            background: 'rgba(15,25,35,0.95)',
            border: '1px solid rgba(0,212,161,0.2)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(0,212,161,0.15)',
            animation: 'terminalBoot 0.3s ease',
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid rgba(0,212,161,0.1)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'rgba(0,0,0,0.3)',
            }}>
              <div style={{
                fontSize: 11, color: 'var(--color-accent)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {selectedImage.title} — {selectedImage.date}
              </div>
              <button
                onClick={() => setSelectedIdx(null)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 4,
                  padding: '3px 8px',
                  fontSize: 11,
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(239,83,80,0.1)';
                  el.style.borderColor = 'rgba(239,83,80,0.3)';
                  el.style.color = 'var(--color-red)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.background = 'rgba(255,255,255,0.05)';
                  el.style.borderColor = 'var(--color-border)';
                  el.style.color = 'var(--color-text-secondary)';
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              flex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
              background: 'rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                style={{
                  maxWidth: '100%', maxHeight: '100%',
                  objectFit: 'contain',
                  animation: 'fadeIn 0.3s ease',
                }}
              />
            </div>

            <div style={{
              padding: '14px 16px',
              borderTop: '1px solid rgba(0,212,161,0.1)',
              background: 'rgba(0,0,0,0.3)',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', marginBottom: 8,
              }}>
                <div style={{ fontSize: 11, color: 'var(--color-text-primary)' }}>
                  {selectedImage.caption}
                </div>
                <div style={{
                  fontSize: 9, color: 'var(--color-text-dim)',
                  backgroundColor: 'rgba(0,212,161,0.08)',
                  border: '1px solid rgba(0,212,161,0.2)',
                  borderRadius: 4,
                  padding: '2px 8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>
                  {selectedImage.category}
                </div>
              </div>

              <div style={{
                fontSize: 9, color: 'var(--color-text-dim)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: 10,
                paddingTop: 10,
                borderTop: '1px solid var(--color-border)',
              }}>
                <div>
                  {selectedIdx !== null ? selectedIdx + 1 : 0} / {gallery.length}
                </div>
                <div>
                  <span style={{ color: 'var(--color-accent)' }}>←→</span> Navigate
                  {' '}
                  <span style={{ marginLeft: 12, color: 'var(--color-accent)' }}>ESC</span> Close
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedIdx(idx => (idx !== null ? (idx - 1 + gallery.length) % gallery.length : 0))}
            style={{
              position: 'absolute', left: 20,
              background: 'rgba(0,212,161,0.1)',
              border: '1px solid rgba(0,212,161,0.2)',
              borderRadius: 6,
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: 'var(--color-accent)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,161,0.2)';
              e.currentTarget.style.borderColor = 'rgba(0,212,161,0.5)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,161,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,161,0.1)';
              e.currentTarget.style.borderColor = 'rgba(0,212,161,0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ‹
          </button>
          <button
            onClick={() => setSelectedIdx(idx => (idx !== null ? (idx + 1) % gallery.length : 0))}
            style={{
              position: 'absolute', right: 20,
              background: 'rgba(0,212,161,0.1)',
              border: '1px solid rgba(0,212,161,0.2)',
              borderRadius: 6,
              width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: 'var(--color-accent)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,212,161,0.2)';
              e.currentTarget.style.borderColor = 'rgba(0,212,161,0.5)';
              e.currentTarget.style.boxShadow = '0 0 12px rgba(0,212,161,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(0,212,161,0.1)';
              e.currentTarget.style.borderColor = 'rgba(0,212,161,0.2)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            ›
          </button>
        </div>
      )}

      <div style={{
        marginTop: 12, fontSize: 10,
        color: 'var(--color-text-dim)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: 10,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>Total events:</span> {gallery.length} memories captured
      </div>
    </div>
  );
}
