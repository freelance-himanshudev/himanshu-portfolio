export const profile = {
  name: "Alex Chen",
  handle: "0xAlex",
  role: "Security Engineer",
  tagline: "Breaking systems to build better ones.",
  location: "San Francisco, CA",
  email: "alex@0xchen.dev",
  github: "github.com/0xalex",
  linkedin: "linkedin.com/in/alexchen",
  twitter: "@0xAlex",
  available: true,
  image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
};

export const about = [
  "Security engineer with 6+ years building offensive and defensive tooling.",
  "Specialize in application security, cloud infrastructure hardening, and reverse engineering.",
  "Shipped security systems protecting 10M+ users across fintech, defense, and SaaS.",
  "Obsessed with elegant systems: clean code, fast pipelines, zero-trust architectures.",
  "Open to senior security / full-stack roles at companies building ambitious products.",
];

export const stats = [
  { label: "CVEs Found", value: "23", suffix: "" },
  { label: "Systems Audited", value: "140+", suffix: "" },
  { label: "Years Exp", value: "6", suffix: "" },
  { label: "CTF Rank", value: "Top 1%", suffix: "" },
];

export const projects = [
  {
    id: "vaulthound",
    name: "VaultHound",
    description: "Automated secrets scanner for CI/CD pipelines. Detects leaked API keys, tokens, and credentials across 40+ platforms.",
    tech: ["Go", "Docker", "GitHub Actions", "Redis"],
    stars: 2100,
    status: "active",
    url: "github.com/0xalex/vaulthound",
    highlight: true,
  },
  {
    id: "netghost",
    name: "NetGhost",
    description: "High-performance network traffic analyzer with ML-based anomaly detection. Real-time threat intelligence.",
    tech: ["Rust", "Python", "eBPF", "PostgreSQL"],
    stars: 890,
    status: "active",
    url: "github.com/0xalex/netghost",
    highlight: false,
  },
  {
    id: "zerotrace",
    name: "ZeroTrace",
    description: "Privacy-first browser extension that blocks trackers, strips metadata, and anonymizes fingerprint vectors.",
    tech: ["TypeScript", "WebExtensions API", "Node.js"],
    stars: 1450,
    status: "active",
    url: "github.com/0xalex/zerotrace",
    highlight: false,
  },
  {
    id: "shellcraft",
    name: "ShellCraft",
    description: "Interactive shellcode playground for security researchers. Browser-based x86/x64 assembly environment.",
    tech: ["TypeScript", "WebAssembly", "React", "Capstone"],
    stars: 620,
    status: "beta",
    url: "github.com/0xalex/shellcraft",
    highlight: false,
  },
];

export const skills = {
  "Offensive Security": [
    { name: "Penetration Testing", level: 95 },
    { name: "Red Team Operations", level: 88 },
    { name: "Exploit Development", level: 82 },
    { name: "Reverse Engineering", level: 79 },
  ],
  "Defensive Security": [
    { name: "Threat Modeling", level: 92 },
    { name: "SIEM / SOC", level: 85 },
    { name: "Incident Response", level: 88 },
    { name: "Zero-Trust Architecture", level: 90 },
  ],
  "Engineering": [
    { name: "Go / Rust", level: 88 },
    { name: "Python", level: 95 },
    { name: "TypeScript / React", level: 87 },
    { name: "Cloud (AWS/GCP/K8s)", level: 83 },
  ],
  "Tools & Platforms": [
    { name: "Burp Suite / Metasploit", level: 93 },
    { name: "Ghidra / IDA Pro", level: 78 },
    { name: "Wireshark / Zeek", level: 90 },
    { name: "Docker / Terraform", level: 85 },
  ],
};

export const experience = [
  {
    role: "Senior Security Engineer",
    company: "Phantom AI",
    period: "2023 — Present",
    desc: "Leading application security for autonomous vehicle software stack. Built threat modeling framework adopted company-wide. Discovered and remediated 8 critical CVEs in embedded systems.",
  },
  {
    role: "Security Engineer II",
    company: "Axiom Financial",
    period: "2021 — 2023",
    desc: "Red team lead for fintech platform processing $2B+ daily. Established bug bounty program. Reduced MTTR from 72h to 4h through automated detection pipelines.",
  },
  {
    role: "Penetration Tester",
    company: "Cipher Labs (Contract)",
    period: "2019 — 2021",
    desc: "Conducted 40+ security assessments for Fortune 500 clients. Specialized in web application and API security. Authored 200+ page security advisory reports.",
  },
];

export const education = [
  {
    degree: "B.S. Computer Science",
    school: "UC Berkeley",
    year: "2019",
    note: "Focus: Systems Security, Cryptography",
  },
  {
    degree: "OSCP Certification",
    school: "Offensive Security",
    year: "2020",
    note: "Passed with distinction",
  },
  {
    degree: "CISSP Certification",
    school: "ISC²",
    year: "2022",
    note: "Information Systems Security Professional",
  },
];

export const socials = [
  { platform: "GitHub", handle: "0xalex", url: "github.com/0xalex", icon: "github" },
  { platform: "Twitter", handle: "@0xAlex", url: "twitter.com/0xAlex", icon: "twitter" },
  { platform: "LinkedIn", handle: "alexchen", url: "linkedin.com/in/alexchen", icon: "linkedin" },
  { platform: "HackerOne", handle: "0xalex", url: "hackerone.com/0xalex", icon: "shield" },
  { platform: "Blog", handle: "0xchen.dev/blog", url: "0xchen.dev/blog", icon: "rss" },
];

export const certifications = [
  {
    id: "oscp",
    name: "Offensive Security Certified Professional",
    org: "Offensive Security",
    date: "2020",
    credentialId: "OS-2020-001847",
    link: "verify.offensive-security.com",
    tags: ["pentesting", "exploit-dev", "web-security"],
    highlight: true,
  },
  {
    id: "cissp",
    name: "Certified Information Systems Security Professional",
    org: "ISC²",
    date: "2022",
    credentialId: "ISC2-2022-847291",
    link: "verify.isc2.org",
    tags: ["governance", "risk-management", "compliance"],
    highlight: true,
  },
  {
    id: "ceh",
    name: "Certified Ethical Hacker",
    org: "EC-Council",
    date: "2021",
    credentialId: "EC-2021-5847291",
    link: "verify.eccouncil.org",
    tags: ["hacking", "network-security"],
  },
  {
    id: "aws-sec",
    name: "AWS Certified Security – Specialty",
    org: "Amazon Web Services",
    date: "2023",
    credentialId: "AWS-2023-SEC-847291",
    link: "aws.amazon.com/verification",
    tags: ["cloud", "aws", "security"],
  },
  {
    id: "gcp-security",
    name: "Google Cloud Professional Cloud Security Engineer",
    org: "Google Cloud",
    date: "2023",
    credentialId: "GCP-2023-847291",
    link: "google.com/cloud/certification",
    tags: ["cloud", "gcp", "security"],
  },
  {
    id: "htb-rank",
    name: "Hack The Box Grandmaster",
    org: "Hack The Box",
    date: "2024",
    credentialId: "HTB-GRANDMASTER-2024",
    link: "hackthebox.com/profile/0xalex",
    tags: ["ctf", "hacking", "problem-solving"],
    highlight: true,
  },
];

export const gallery = [
  {
    id: "defcon-2023",
    title: "DEF CON 31",
    location: "Las Vegas, NV",
    date: "2023",
    category: "conference",
    caption: "Networking at the world's largest hacking conference",
    image: "https://images.pexels.com/photos/1707820/pexels-photo-1707820.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "ctf-win-2023",
    title: "CTF Championship Victory",
    location: "San Francisco, CA",
    date: "2023",
    category: "competition",
    caption: "First place finish in national security CTF competition",
    image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "black-hat-2023",
    title: "Black Hat USA",
    location: "Las Vegas, NV",
    date: "2023",
    category: "conference",
    caption: "Speaking on advanced threat hunting techniques",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "hackathon-2024",
    title: "Security Hackathon",
    location: "Mountain View, CA",
    date: "2024",
    category: "hackathon",
    caption: "Building automated vulnerability detection systems",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "rsa-conference",
    title: "RSA Conference 2024",
    location: "San Francisco, CA",
    date: "2024",
    category: "conference",
    caption: "Cybersecurity innovation showcase and networking",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "team-photo",
    title: "Security Research Team",
    location: "San Francisco, CA",
    date: "2024",
    category: "team",
    caption: "Collaborating on next-gen defensive security tools",
    image: "https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

export const filesystem = {
  "/home/alex": ["about.txt", "projects/", "skills.json", "experience.log", "contact.sh", "certifications/", "gallery/"],
  "/home/alex/projects": ["vaulthound/", "netghost/", "zerotrace/", "shellcraft/"],
  "/etc/security": ["config.yaml", "policies/", "audit.log"],
};
