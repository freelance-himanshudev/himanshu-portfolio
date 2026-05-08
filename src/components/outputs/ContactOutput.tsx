import { useState } from 'react';
import { profile } from '../../data/portfolio';

export default function ContactOutput() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [field, setField] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fields = [
    { key: 'name', prompt: 'Enter your name:', placeholder: 'John Doe' },
    { key: 'email', prompt: 'Enter your email:', placeholder: 'john@example.com' },
    { key: 'message', prompt: 'Enter your message:', placeholder: 'Hello Alex...' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && field.trim()) {
      const currentField = fields[step];
      setFormData(prev => ({ ...prev, [currentField.key]: field }));
      setField('');
      if (step < fields.length - 1) {
        setStep(prev => prev + 1);
      } else {
        setSubmitting(true);
        setTimeout(() => {
          setSubmitting(false);
          setSubmitted(true);
        }, 1800);
      }
    }
  };

  return (
    <div style={{ fontFamily: 'var(--font-mono)' }}>
      <div style={{
        fontSize: 11, color: 'var(--color-text-dim)', marginBottom: 16,
      }}>
        <span style={{ color: 'var(--color-accent)' }}>{'>'}</span> ./contact.sh
      </div>

      <div style={{ marginBottom: 14 }}>
        {[
          { label: 'email', value: profile.email },
          { label: 'github', value: profile.github },
          { label: 'twitter', value: profile.twitter },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', gap: 12, marginBottom: 4,
          }}>
            <span style={{ color: 'var(--color-text-dim)', fontSize: 11, minWidth: 56 }}>
              {row.label}:
            </span>
            <span style={{ color: 'var(--color-blue)', fontSize: 11 }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>

      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, rgba(0,212,161,0.3), transparent)',
        marginBottom: 16,
      }} />

      <div style={{ fontSize: 11, color: 'var(--color-accent)', marginBottom: 12 }}>
        {'>'} Interactive message form:
      </div>

      {/* Filled fields */}
      {Object.entries(formData).filter(([, v]) => v).map(([k, v]) => (
        <div key={k} style={{
          display: 'flex', gap: 8, marginBottom: 6, fontSize: 11,
        }}>
          <span style={{ color: 'var(--color-text-dim)' }}>[{k}]</span>
          <span style={{ color: 'var(--color-text-primary)' }}>{v}</span>
          <span style={{ color: 'var(--color-accent)' }}>✓</span>
        </div>
      ))}

      {!submitted && !submitting && step < fields.length && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(0,212,161,0.2)',
          borderRadius: 6, padding: '8px 12px',
        }}>
          <span style={{ color: 'var(--color-accent)', fontSize: 11 }}>
            {fields[step].prompt}
          </span>
          <input
            autoFocus
            value={field}
            onChange={e => setField(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={fields[step].placeholder}
            style={{
              background: 'transparent', border: 'none', outline: 'none',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: 11, flex: 1,
              caretColor: 'var(--color-accent)',
            }}
          />
        </div>
      )}

      {submitting && (
        <div style={{
          fontSize: 11, color: 'var(--color-yellow)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--color-yellow)',
            animation: 'statusPulse 0.6s ease-in-out infinite',
          }} />
          Transmitting message...
        </div>
      )}

      {submitted && (
        <div style={{
          background: 'rgba(0,212,161,0.06)',
          border: '1px solid rgba(0,212,161,0.2)',
          borderRadius: 8, padding: '12px 16px',
          animation: 'fadeSlideIn 0.2s ease-out forwards',
        }}>
          <div style={{ color: 'var(--color-accent)', fontSize: 12, marginBottom: 4 }}>
            ✓ Message transmitted successfully.
          </div>
          <div style={{ color: 'var(--color-text-dim)', fontSize: 11 }}>
            Expect a response within 24–48 hours.
          </div>
        </div>
      )}
    </div>
  );
}
