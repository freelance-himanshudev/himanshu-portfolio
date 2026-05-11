import { useEffect, useRef, useState, useCallback } from 'react';
import HelpOutput from './outputs/HelpOutput';
import AboutOutput from './outputs/AboutOutput';
import ProjectsOutput from './outputs/ProjectsOutput';
import SkillsOutput from './outputs/SkillsOutput';
import ExperienceOutput from './outputs/ExperienceOutput';
import EducationOutput from './outputs/EducationOutput';
import ContactOutput from './outputs/ContactOutput';
import SocialsOutput from './outputs/SocialsOutput';
import NeofetchOutput from './outputs/NeofetchOutput';
import HackOutput from './outputs/HackOutput';
import MatrixOutput from './outputs/MatrixOutput';
import StatusOutput from './outputs/StatusOutput';
import CertificationsOutput from './outputs/CertificationsOutput';
import GalleryOutput from './outputs/GalleryOutput';

type OutputItem =
  | { id: number; type: 'command'; text: string }
  | { id: number; type: 'output'; component: React.ReactNode }
  | { id: number; type: 'text'; text: string; color?: string };

const QUICK_COMMANDS = ['help', 'about', 'projects', 'skills', 'certifications', 'gallery', 'experience', 'contact', 'clear'];
const ALL_COMMANDS = [
  'help', 'about', 'projects', 'skills', 'experience', 'education',
  'contact', 'socials', 'certifications', 'gallery', 'whoami', 'ls',
  'neofetch', 'status', 'hack', 'matrix', 'sudo', 'resume', 'theme', 'clear',
];

const WELCOME_TEXT = [
  { text: '  ██████╗ ██╗  ██╗ █████╗ ██╗     ███████╗██╗  ██╗', color: '#00d4a1' },
  { text: ' ██╔═████╗╚██╗██╔╝██╔══██╗██║     ██╔════╝╚██╗██╔╝', color: '#00d4a1' },
  { text: ' ██║██╔██║ ╚███╔╝ ███████║██║     █████╗   ╚███╔╝ ', color: '#00c49a' },
  { text: ' ████╔╝██║ ██╔██╗ ██╔══██║██║     ██╔══╝   ██╔██╗ ', color: '#00b090' },
  { text: ' ╚██████╔╝██╔╝ ██╗██║  ██║███████╗███████╗██╔╝ ██╗', color: '#009e84' },
  { text: '  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝', color: '#009e84' },
];

function getOutput(cmd: string): React.ReactNode {
  const c = cmd.trim().toLowerCase().split(' ')[0];
  switch (c) {
    case 'help': return <HelpOutput />;
    case 'about': return <AboutOutput />;
    case 'projects': return <ProjectsOutput />;
    case 'skills': return <SkillsOutput />;
    case 'experience': return <ExperienceOutput />;
    case 'education': return <EducationOutput />;
    case 'contact': return <ContactOutput />;
    case 'socials': return <SocialsOutput />;
    case 'certifications': return <CertificationsOutput />;
    case 'gallery': return <GalleryOutput />;
    case 'neofetch': return <NeofetchOutput />;
    case 'hack': return <HackOutput />;
    case 'matrix': return <MatrixOutput />;
    case 'status': return <StatusOutput />;
    case 'whoami': return null;
    case 'ls': return null;
    case 'sudo': return null;
    case 'resume': return null;
    case 'theme': return null;
    default: return null;
  }
}

function getTextOutput(cmd: string): string | null {
  const c = cmd.trim().toLowerCase();
  if (c === 'whoami') return 'alex • security engineer • 0xAlex • /home/alex';
  if (c.startsWith('ls')) {
    const arg = c.split(' ')[1];
    if (arg === '~/projects' || arg === 'projects') {
      return 'vaulthound/  netghost/  zerotrace/  shellcraft/';
    }
    return 'about.txt  projects/  skills.json  experience.log  contact.sh  resume.pdf';
  }
  if (c.startsWith('sudo')) return '[sudo] password for alex: *** Permission denied.';
  if (c === 'resume') return 'Opening resume.pdf... → https://0xchen.dev/resume.pdf';
  if (c === 'theme') return 'Theme toggled. Available: cyber-green (current), midnight-blue, crimson-red';
  if (c === 'exit') return 'Nice try. There is no exit. 👁️';
  return null;
}

let idCounter = 0;
const nextId = () => ++idCounter;

export default function Terminal() {
  const [outputs, setOutputs] = useState<OutputItem[]>([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [autocomplete, setAutocomplete] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  useEffect(() => {
    // Initial welcome sequence
    const welcomeItems: OutputItem[] = [
      ...WELCOME_TEXT.map(w => ({ id: nextId(), type: 'text' as const, text: w.text, color: w.color })),
      { id: nextId(), type: 'text', text: '' },
      { id: nextId(), type: 'text', text: `  Welcome, operator. Logged in as: alex@secbox`, color: '#8fa8b8' },
      { id: nextId(), type: 'text', text: `  Type 'help' for available commands.`, color: '#4a6572' },
      { id: nextId(), type: 'text', text: '' },
    ];
    setOutputs(welcomeItems);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      inputRef.current?.focus();
    }
  }, [initialized]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === 'clear') {
      setOutputs([]);
      setInput('');
      return;
    }

    const items: OutputItem[] = [
      { id: nextId(), type: 'command', text: trimmed },
      { id: nextId(), type: 'text', text: '' },
    ];

    const textOut = getTextOutput(trimmed);
    if (textOut) {
      items.push({ id: nextId(), type: 'text', text: textOut, color: '#8fa8b8' });
    } else {
      const comp = getOutput(trimmed);
      if (comp) {
        items.push({ id: nextId(), type: 'output', component: comp });
      } else {
        const c = trimmed.toLowerCase().split(' ')[0];
        items.push({
          id: nextId(), type: 'text',
          text: `Command not found: ${c}. Type 'help' for available commands.`,
          color: '#ef5350',
        });
      }
    }

    items.push({ id: nextId(), type: 'text', text: '' });
    items.push({ id: nextId(), type: 'text', text: '' });
    setOutputs(prev => [...prev, ...items]);
    setHistory(prev => [trimmed, ...prev.slice(0, 49)]);
    setHistoryIdx(-1);
    setInput('');
    scrollToBottom();
  }, [scrollToBottom]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(idx);
      setInput(history[idx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(idx);
      setInput(idx === -1 ? '' : history[idx]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (input.trim()) {
        const match = ALL_COMMANDS.find(c => c.startsWith(input.toLowerCase()));
        if (match) setInput(match);
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setOutputs([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.trim()) {
      const match = ALL_COMMANDS.find(c => c.startsWith(val.toLowerCase()) && c !== val.toLowerCase());
      setAutocomplete(match || null);
    } else {
      setAutocomplete(null);
    }
  };

  return (
    <div
      style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        fontFamily: 'var(--font-mono)',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal header */}
      <div style={{
        padding: '10px 16px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', gap: 12,
        flexShrink: 0,
        background: 'rgba(8,10,12,0.8)',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ef5350', '#ffd54f', '#00d4a1'].map((c, i) => (
            <div key={i} style={{
              width: 9, height: 9, borderRadius: '50%',
              background: c, opacity: 0.75,
            }} />
          ))}
        </div>
        <div style={{
          flex: 1, textAlign: 'center',
          fontSize: 11, color: 'var(--color-text-dim)',
          letterSpacing: '0.1em',
        }}>
          alex@secbox — ~/terminal — zsh
        </div>
        <div style={{ fontSize: 10, color: 'var(--color-text-dim)' }}>
          bash 5.2
        </div>
      </div>

      {/* Quick commands */}
      <div style={{
        padding: '8px 16px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', gap: 6, flexWrap: 'wrap',
        flexShrink: 0,
        background: 'rgba(8,10,12,0.6)',
      }}>
        {QUICK_COMMANDS.map(cmd => (
          <button
            key={cmd}
            onClick={(e) => { e.stopPropagation(); runCommand(cmd); }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--color-border)',
              borderRadius: 5,
              padding: '3px 9px',
              fontSize: 10,
              color: 'var(--color-text-secondary)',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              letterSpacing: '0.05em',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(0,212,161,0.08)';
              el.style.borderColor = 'rgba(0,212,161,0.3)';
              el.style.color = 'var(--color-accent)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget;
              el.style.background = 'rgba(255,255,255,0.03)';
              el.style.borderColor = 'var(--color-border)';
              el.style.color = 'var(--color-text-secondary)';
            }}
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Output area */}
      <div
        ref={containerRef}
        style={{
          flex: 1, overflowY: 'auto',
          padding: '16px 20px',
          scrollBehavior: 'smooth',
        }}
      >
        {outputs.map(item => {
          if (item.type === 'command') {
            return (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                marginBottom: 6,
                animation: 'fadeSlideIn 0.1s ease-out forwards',
              }}>
                <span style={{ color: 'var(--color-accent)', fontSize: 11 }}>
                  alex@secbox
                </span>
                <span style={{ color: 'var(--color-text-dim)', fontSize: 11 }}>:~$</span>
                <span style={{ color: 'var(--color-text-primary)', fontSize: 12 }}>
                  {item.text}
                </span>
              </div>
            );
          }
          if (item.type === 'text') {
            if (!item.text) return <div key={item.id} style={{ height: 8 }} />;
            return (
              <div key={item.id} style={{
                fontSize: 11, lineHeight: 1.7, marginBottom: 2,
                color: item.color || 'var(--color-text-secondary)',
                animation: 'fadeSlideIn 0.1s ease-out forwards',
              }}>
                {item.text}
              </div>
            );
          }
          if (item.type === 'output') {
            return (
              <div key={item.id} style={{
                marginBottom: 6, paddingLeft: 0,
                animation: 'fadeSlideIn 0.15s ease-out forwards',
              }}>
                {item.component}
              </div>
            );
          }
          return null;
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: '10px 20px',
        borderTop: '1px solid var(--color-border)',
        flexShrink: 0,
        background: 'rgba(8,10,12,0.8)',
      }}>
        {/* Autocomplete hint */}
        {autocomplete && (
          <div style={{
            fontSize: 10, color: 'var(--color-text-dim)',
            marginBottom: 4, paddingLeft: 120,
          }}>
            <span style={{ color: 'var(--color-accent)', opacity: 0.5 }}>
              {autocomplete.slice(input.length)}
            </span>
            <span style={{ marginLeft: 8, color: 'var(--color-text-dim)' }}>
              (Tab to complete)
            </span>
          </div>
        )}

        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: 'var(--color-accent)', fontSize: 11, whiteSpace: 'nowrap' }}>
            alex@secbox
          </span>
          <span style={{ color: 'var(--color-text-dim)', fontSize: 11 }}>:~$</span>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none', outline: 'none',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                caretColor: 'var(--color-accent)',
              }}
            />
          </div>
          {/* Blinking cursor visual (behind input caret) */}
          <span style={{
            display: 'inline-block',
            width: 8, height: 14,
            background: 'var(--color-accent)',
            opacity: 0.7,
            animation: 'blink 1.1s step-end infinite',
            borderRadius: 1,
            flexShrink: 0,
          }} />
        </div>
      </div>
    </div>
  );
}
