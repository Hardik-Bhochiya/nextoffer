// Curated developer avatar presets encoded as crisp, self-contained SVG Data URIs (100% offline & reliable)
export const presetAvatars = [
  {
    id: 'avatar-fullstack',
    name: 'Full Stack Wizard',
    category: 'Full Stack',
    accent: 'from-indigo-600 to-cyan-500',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4f46e5" />
            <stop offset="100%" stop-color="#06b6d4" />
          </linearGradient>
          <linearGradient id="face" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#f8fafc" />
            <stop offset="100%" stop-color="#cbd5e1" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="36" fill="url(#bg)"/>
        <circle cx="60" cy="52" r="26" fill="url(#face)"/>
        <path d="M38 46 Q60 30 82 46 Q60 38 38 46" fill="#1e293b"/>
        <circle cx="51" cy="52" r="3.5" fill="#0f172a"/>
        <circle cx="69" cy="52" r="3.5" fill="#0f172a"/>
        <path d="M54 62 Q60 67 66 62" stroke="#0f172a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <rect x="42" y="47" width="16" height="10" rx="3" fill="none" stroke="#6366f1" stroke-width="2"/>
        <rect x="62" y="47" width="16" height="10" rx="3" fill="none" stroke="#6366f1" stroke-width="2"/>
        <line x1="58" y1="52" x2="62" y2="52" stroke="#6366f1" stroke-width="2"/>
        <path d="M30 102 C30 80 44 76 60 76 C76 76 90 80 90 102 Z" fill="#0f172a"/>
        <path d="M48 76 L60 90 L72 76" fill="#6366f1"/>
      </svg>
    `)}`
  },
  {
    id: 'avatar-algo-master',
    name: 'Algorithm Master',
    category: 'DSA & Competitions',
    accent: 'from-amber-500 to-rose-500',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f59e0b" />
            <stop offset="100%" stop-color="#f43f5e" />
          </linearGradient>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#fed7aa" />
            <stop offset="100%" stop-color="#fbcfe8" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="36" fill="url(#bg2)"/>
        <circle cx="60" cy="52" r="26" fill="url(#glow)"/>
        <!-- Headband -->
        <rect x="34" y="42" width="52" height="9" rx="3" fill="#881337"/>
        <circle cx="60" cy="46.5" r="3" fill="#fbbf24"/>
        <circle cx="51" cy="55" r="3.5" fill="#1e1b4b"/>
        <circle cx="69" cy="55" r="3.5" fill="#1e1b4b"/>
        <path d="M53 64 Q60 70 67 64" stroke="#1e1b4b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M28 104 C28 82 42 76 60 76 C78 76 92 82 92 104 Z" fill="#1e1b4b"/>
        <circle cx="60" cy="88" r="4" fill="#fbbf24"/>
      </svg>
    `)}`
  },
  {
    id: 'avatar-cyber-guardian',
    name: 'Cyber & Security Pro',
    category: 'Security / Cloud',
    accent: 'from-emerald-500 to-teal-700',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#10b981" />
            <stop offset="100%" stop-color="#0f766e" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="36" fill="url(#bg3)"/>
        <!-- Cyber Hood -->
        <path d="M30 52 C30 30 42 22 60 22 C78 22 90 30 90 52 C90 74 84 80 60 80 C36 80 30 74 30 52 Z" fill="#022c22"/>
        <ellipse cx="60" cy="54" rx="20" ry="22" fill="#042f2e"/>
        <!-- Cyber Visor -->
        <path d="M42 50 C42 46 78 46 78 50 C78 56 42 56 42 50 Z" fill="#34d399"/>
        <line x1="44" y1="50" x2="76" y2="50" stroke="#ecfdf5" stroke-width="1.5"/>
        <path d="M24 104 C24 82 40 76 60 76 C80 76 96 82 96 104 Z" fill="#064e3b"/>
        <path d="M54 84 L60 90 L66 84" stroke="#34d399" stroke-width="2" fill="none"/>
      </svg>
    `)}`
  },
  {
    id: 'avatar-ai-architect',
    name: 'AI & ML Pioneer',
    category: 'AI / Machine Learning',
    accent: 'from-purple-600 to-pink-500',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#9333ea" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>
          <linearGradient id="cyberHead" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fdf4ff" />
            <stop offset="100%" stop-color="#e9d5ff" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="36" fill="url(#bg4)"/>
        <circle cx="60" cy="52" r="26" fill="url(#cyberHead)"/>
        <path d="M36 40 C44 26 76 26 84 40 C72 34 48 34 36 40 Z" fill="#581c87"/>
        <circle cx="50" cy="52" r="4" fill="#a855f7"/>
        <circle cx="70" cy="52" r="4" fill="#ec4899"/>
        <circle cx="50" cy="52" r="1.5" fill="#ffffff"/>
        <circle cx="70" cy="52" r="1.5" fill="#ffffff"/>
        <path d="M54 63 Q60 67 66 63" stroke="#581c87" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Neural Nodes -->
        <circle cx="60" cy="38" r="2.5" fill="#ec4899"/>
        <line x1="60" y1="40" x2="60" y2="45" stroke="#ec4899" stroke-width="1.5"/>
        <path d="M28 104 C28 82 42 76 60 76 C78 76 92 82 92 104 Z" fill="#3b0764"/>
      </svg>
    `)}`
  },
  {
    id: 'avatar-terminal-hacker',
    name: 'Terminal Neo',
    category: 'DevOps / Systems',
    accent: 'from-slate-900 to-emerald-900',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#022c22" />
            <stop offset="100%" stop-color="#0f172a" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="36" fill="url(#bg5)"/>
        <circle cx="60" cy="52" r="26" fill="#10b981" opacity="0.2"/>
        <rect x="36" y="34" width="48" height="36" rx="8" fill="#020617" stroke="#10b981" stroke-width="2"/>
        <!-- Terminal code lines -->
        <text x="42" y="47" font-family="monospace" font-size="8" font-weight="bold" fill="#34d399">&gt; cd /dev</text>
        <text x="42" y="58" font-family="monospace" font-size="8" font-weight="bold" fill="#10b981">&gt; make run_</text>
        <path d="M26 104 C26 84 42 78 60 78 C78 78 94 84 94 104 Z" fill="#020617" stroke="#10b981" stroke-width="1.5"/>
      </svg>
    `)}`
  },
  {
    id: 'avatar-frontend-artisan',
    name: 'Frontend Craftsperson',
    category: 'UI/UX & Frontend',
    accent: 'from-rose-500 to-indigo-600',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f43f5e" />
            <stop offset="100%" stop-color="#6366f1" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="36" fill="url(#bg6)"/>
        <circle cx="60" cy="52" r="26" fill="#fdf2f8"/>
        <!-- Modern stylish hair -->
        <path d="M34 48 C34 28 86 28 86 48 C86 54 80 40 60 38 C40 36 34 54 34 48 Z" fill="#4338ca"/>
        <!-- Headphones -->
        <path d="M30 52 C30 32 90 32 90 52" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/>
        <rect x="27" y="46" width="7" height="14" rx="3.5" fill="#ffffff"/>
        <rect x="86" y="46" width="7" height="14" rx="3.5" fill="#ffffff"/>
        <circle cx="51" cy="53" r="3" fill="#1e1b4b"/>
        <circle cx="69" cy="53" r="3" fill="#1e1b4b"/>
        <path d="M54 62 Q60 66 66 62" stroke="#1e1b4b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M28 104 C28 82 42 76 60 76 C78 76 92 82 92 104 Z" fill="#1e1b4b"/>
      </svg>
    `)}`
  },
  {
    id: 'avatar-cloud-architect',
    name: 'Cloud & Kubernetes Pro',
    category: 'Cloud / DevOps',
    accent: 'from-blue-600 to-cyan-400',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg7" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#38bdf8" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="36" fill="url(#bg7)"/>
        <circle cx="60" cy="52" r="26" fill="#f0f9ff"/>
        <path d="M36 44 C42 30 78 30 84 44 C72 38 48 38 36 44 Z" fill="#0369a1"/>
        <!-- Glasses -->
        <rect x="42" y="48" width="15" height="10" rx="3" fill="none" stroke="#0284c7" stroke-width="2"/>
        <rect x="63" y="48" width="15" height="10" rx="3" fill="none" stroke="#0284c7" stroke-width="2"/>
        <line x1="57" y1="53" x2="63" y2="53" stroke="#0284c7" stroke-width="2"/>
        <circle cx="49" cy="53" r="2.5" fill="#0f172a"/>
        <circle cx="70" cy="53" r="2.5" fill="#0f172a"/>
        <path d="M54 64 Q60 68 66 64" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M28 104 C28 82 42 76 60 76 C78 76 92 82 92 104 Z" fill="#082f49"/>
        <!-- Cloud badge on chest -->
        <path d="M54 88 C54 86 56 84 58 84 C59 82 62 82 63 84 C65 84 66 86 66 88 Z" fill="#38bdf8"/>
      </svg>
    `)}`
  },
  {
    id: 'avatar-scholar-lead',
    name: 'Core CS Scholar',
    category: 'Academics / Core CS',
    accent: 'from-amber-600 to-yellow-400',
    url: `data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
        <defs>
          <linearGradient id="bg8" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#d97706" />
            <stop offset="100%" stop-color="#facc15" />
          </linearGradient>
        </defs>
        <rect width="120" height="120" rx="36" fill="url(#bg8)"/>
        <circle cx="60" cy="54" r="25" fill="#fefce8"/>
        <!-- Graduation / Scholar Cap -->
        <polygon points="60,24 92,36 60,48 28,36" fill="#1e293b"/>
        <polygon points="60,44 76,38 76,50 60,56 44,50 44,38" fill="#0f172a"/>
        <line x1="88" y1="38" x2="88" y2="52" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="88" cy="53" r="2.5" fill="#f59e0b"/>
        <circle cx="52" cy="56" r="3" fill="#0f172a"/>
        <circle cx="68" cy="56" r="3" fill="#0f172a"/>
        <path d="M55 65 Q60 69 65 65" stroke="#0f172a" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M28 104 C28 82 42 78 60 78 C78 78 92 82 92 104 Z" fill="#0f172a"/>
      </svg>
    `)}`
  }
];

export const getAvatarById = (id) => presetAvatars.find(a => a.id === id);
