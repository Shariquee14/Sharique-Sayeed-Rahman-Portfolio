import React from 'react';

/**
 * SubpageBackground — Subtle, light-colored AI & technology-themed background graphics
 * for all portfolio subpages (/about, /projects, /contact, /achievements, /skills-education).
 *
 * Responsively optimized for both mobile phones and desktop/laptop screens:
 * - Desktop Tier (sm:block, hidden on mobile): Full-width 1440×900 SVG with expansive code panels,
 *   neural networks, AI robot, space telemetry rocket, radar charts, loss curves, and circuit networks.
 * - Mobile Tier (sm:hidden, visible on phone): Tailored 390×844 SVG ensuring the AI robot, rocket,
 *   code symbols, graphs, circuits, and math formulas are fully visible without horizontal clipping.
 *
 * Visual Harmony:
 * - Uses exact low-contrast lines (0.04 - 0.12 opacity) matching Home page HeroBackground.
 * - Seamless dark mode inversion via .hero-bg-svg CSS filter.
 * - Pointer-events: none and fixed z-0 so it stays decorative and never interferes with interactions.
 */
export const SubpageBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0"
    >
      {/* ══════════════════════════════════════════════════════════════
          1. MOBILE TIER (Visible exclusively on phones: max-width < 640px)
          ViewBox: 390 × 844 tailored specifically for standard mobile screens
          ══════════════════════════════════════════════════════════════ */}
      <svg
        className="sm:hidden absolute inset-0 w-full h-full hero-bg-svg"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @media (prefers-reduced-motion: reduce) { .sb-m-anim { animation: none !important; } }
            @keyframes sb-m-pulse { 0%,100% { opacity: 0.15; } 50% { opacity: 0.35; } }
            @keyframes sb-m-spin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          `}</style>
          <linearGradient id="sbMobGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#2a2a2a" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Subtle dot matrix across mobile screen */}
        <g opacity="0.035">
          {Array.from({ length: 14 }, (_, row) =>
            Array.from({ length: 8 }, (__, col) => (
              <circle key={`mdot-${row}-${col}`} cx={25 + col * 48} cy={30 + row * 60} r="1" fill="#2a2a2a" />
            ))
          )}
        </g>

        {/* Technical crosshairs at mobile margins */}
        {[[24, 40], [366, 40], [24, 280], [366, 280], [24, 520], [366, 520], [24, 780], [366, 780]].map(([x, y], i) => (
          <g key={`mcross-${i}`} opacity="0.09">
            <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke="#2a2a2a" strokeWidth="0.6" />
            <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke="#2a2a2a" strokeWidth="0.6" />
          </g>
        ))}

        {/* ── MOBILE AI ROBOT (Top-Left Margin ~x: 18, y: 70) ── */}
        <g opacity="0.12" transform="translate(18, 70)">
          <rect x="6" y="10" width="38" height="34" rx="8" stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
          {/* Antenna */}
          <line x1="25" y1="10" x2="25" y2="2" stroke="#2a2a2a" strokeWidth="0.8" />
          <circle cx="25" cy="2" r="2" fill="#ea3826" opacity="0.8" className="sb-m-anim" style={{ animation: 'sb-m-pulse 2.5s infinite' }} />
          {/* Ears */}
          <rect x="2" y="20" width="4" height="14" rx="2" stroke="#2a2a2a" strokeWidth="0.6" />
          <rect x="44" y="20" width="4" height="14" rx="2" stroke="#2a2a2a" strokeWidth="0.6" />
          {/* Visor & Eyes */}
          <rect x="12" y="19" width="26" height="9" rx="3" stroke="#2a2a2a" strokeWidth="0.6" fill="#2a2a2a" fillOpacity="0.03" />
          <circle cx="19" cy="23.5" r="1.8" fill="#ea3826" opacity="0.85" />
          <circle cx="31" cy="23.5" r="1.8" fill="#ea3826" opacity="0.85" />
          {/* Mouth */}
          <line x1="17" y1="36" x2="33" y2="36" stroke="#2a2a2a" strokeWidth="0.6" />
          <text x="25" y="52" fontSize="4.5" fill="#2a2a2a" fontFamily="monospace" textAnchor="middle">AI_BOT</text>
        </g>

        {/* ── MOBILE ROCKET (Top-Right Margin ~x: 326, y: 65) ── */}
        <g opacity="0.11" transform="translate(326, 65)">
          <path d="M 24 5 Q 35 20 35 48 L 13 48 Q 13 20 24 5 Z" stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
          <circle cx="24" cy="28" r="4" stroke="#2a2a2a" strokeWidth="0.6" fill="none" />
          <circle cx="24" cy="28" r="2" fill="#ea3826" opacity="0.75" />
          {/* Fins */}
          <path d="M 13 38 L 4 52 L 13 48 Z" stroke="#2a2a2a" strokeWidth="0.7" fill="none" />
          <path d="M 35 38 L 44 52 L 35 48 Z" stroke="#2a2a2a" strokeWidth="0.7" fill="none" />
          {/* Thruster exhaust */}
          <path d="M 19 50 Q 24 68 24 74 Q 24 68 29 50 Z" stroke="#ea3826" strokeWidth="0.6" fill="#ea3826" fillOpacity="0.08" />
          <text x="24" y="85" fontSize="4.5" fill="#2a2a2a" fontFamily="monospace" textAnchor="middle">ORBIT_v2</text>
        </g>

        {/* ── MOBILE CODE SNIPPET (Mid-Left ~x: 18, y: 295) ── */}
        <g opacity="0.12" transform="translate(18, 295)">
          <rect x="0" y="0" width="160" height="72" rx="4" fill="url(#sbMobGrad)" stroke="#2a2a2a" strokeWidth="0.6" />
          <rect x="0" y="0" width="160" height="11" rx="4" fill="#2a2a2a" opacity="0.04" />
          <circle cx="8" cy="5.5" r="1.8" fill="#ea3826" opacity="0.6" />
          <circle cx="14" cy="5.5" r="1.8" fill="#2a2a2a" opacity="0.2" />
          <text x="22" y="8" fontSize="5" fill="#2a2a2a" fontFamily="monospace" opacity="0.6">model.py</text>
          <g fontFamily="monospace" fontSize="5.5" fill="#2a2a2a" opacity="0.85">
            <text x="6" y="22"><tspan fill="#ea3826">import</tspan> torch.nn as nn</text>
            <text x="6" y="32">model = Transformer()</text>
            <text x="6" y="42">out = model.forward(x)</text>
            <text x="6" y="52">loss = criterion(out, y)</text>
            <text x="6" y="62">loss.backward()</text>
          </g>
        </g>

        {/* ── MOBILE ACCURACY CHART (Mid-Right ~x: 235, y: 295) ── */}
        <g opacity="0.11" transform="translate(235, 295)">
          <text x="0" y="8" fontSize="5" fill="#2a2a2a" fontFamily="monospace">ACCURACY / EPOCH</text>
          <line x1="0" y1="58" x2="135" y2="58" stroke="#2a2a2a" strokeWidth="0.6" />
          <line x1="0" y1="14" x2="0" y2="58" stroke="#2a2a2a" strokeWidth="0.6" />
          <polyline points="4,52 24,46 48,34 76,26 104,22 130,20" stroke="#2a2a2a" strokeWidth="1" fill="none" />
          <circle cx="48" cy="34" r="2" fill="#ea3826" opacity="0.8" />
          <circle cx="104" cy="22" r="2" fill="#ea3826" opacity="0.8" />
          <text x="96" y="14" fontSize="4.5" fill="#ea3826" fontFamily="monospace">98.4%</text>
        </g>

        {/* ── MOBILE RADAR / SPIDER CHART (Lower-Left ~x: 18, y: 550) ── */}
        <g opacity="0.10" transform="translate(20, 550)">
          <text x="40" y="0" fontSize="5" fill="#2a2a2a" fontFamily="monospace" textAnchor="middle">METRICS_RADAR</text>
          <polygon points="40,16 66,32 66,62 40,78 14,62 14,32" stroke="#2a2a2a" strokeWidth="0.5" fill="none" />
          <polygon points="40,26 56,36 56,58 40,68 24,58 24,36" stroke="#2a2a2a" strokeWidth="0.4" fill="none" strokeDasharray="2 2" />
          <polygon points="40,20 62,38 52,60 36,64 20,48 28,28" stroke="#ea3826" strokeWidth="0.8" fill="#ea3826" fillOpacity="0.08" />
        </g>

        {/* ── MOBILE NEURAL SYNAPSE (Lower-Right ~x: 245, y: 550) ── */}
        <g opacity="0.10" transform="translate(245, 550)">
          <text x="45" y="0" fontSize="5" fill="#2a2a2a" fontFamily="monospace">NEURAL_NODES</text>
          {[16, 36, 56].map((y, i) => (
            <circle key={`mnode1-${i}`} cx="12" cy={y} r="2.5" stroke="#2a2a2a" strokeWidth="0.6" fill="none" />
          ))}
          {[26, 46].map((y, i) => (
            <circle key={`mnode2-${i}`} cx="52" cy={y} r="2.5" stroke="#ea3826" strokeWidth="0.7" fill="none" />
          ))}
          <circle cx="92" cy="36" r="3" stroke="#2a2a2a" strokeWidth="0.6" fill="none" />
          <line x1="14" y1="16" x2="50" y2="26" stroke="#2a2a2a" strokeWidth="0.3" />
          <line x1="14" y1="36" x2="50" y2="26" stroke="#2a2a2a" strokeWidth="0.3" />
          <line x1="14" y1="36" x2="50" y2="46" stroke="#2a2a2a" strokeWidth="0.3" />
          <line x1="14" y1="56" x2="50" y2="46" stroke="#2a2a2a" strokeWidth="0.3" />
          <line x1="54" y1="26" x2="89" y2="36" stroke="#ea3826" strokeWidth="0.4" />
          <line x1="54" y1="46" x2="89" y2="36" stroke="#ea3826" strokeWidth="0.4" />
        </g>

        {/* Mobile Circuit Lines & Symbols */}
        <g opacity="0.08" stroke="#2a2a2a" strokeWidth="0.6">
          <path d="M 0 200 L 25 200 L 45 220 L 70 220" fill="none" />
          <circle cx="70" cy="220" r="1.5" fill="#ea3826" />
          <path d="M 390 480 L 365 480 L 345 500 L 320 500" fill="none" />
          <circle cx="320" cy="500" r="1.5" fill="#2a2a2a" />
        </g>
        <g fontFamily="monospace" fontSize="6.5" fill="#2a2a2a" opacity="0.08">
          <text x="18" y="470">&lt;AI /&gt;</text>
          <text x="325" y="470">&#123; ...ops &#125;</text>
          <text x="18" y="730">Loss = -log(P)</text>
          <text x="290" y="730">v3.2 // SYS</text>
        </g>
      </svg>


      {/* ══════════════════════════════════════════════════════════════
          2. DESKTOP & LAPTOP TIER (Visible on sm: and above >= 640px)
          ViewBox: 1440 × 900 expansive editorial HUD matching HeroBackground
          ══════════════════════════════════════════════════════════════ */}
      <svg
        className="hidden sm:block absolute inset-0 w-full h-full hero-bg-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @media (prefers-reduced-motion: reduce) { .sb-d-anim { animation: none !important; } }
            @keyframes sb-d-spin  { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes sb-d-rspin { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            @keyframes sb-d-pulse { 0%,100% { opacity: 0.12; } 50% { opacity: 0.32; } }
            @keyframes sb-d-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
          `}</style>
          <linearGradient id="sbDeskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#2a2a2a" stopOpacity="0.01" />
          </linearGradient>
          <clipPath id="sbDeskClip"><rect width="1440" height="900" /></clipPath>
        </defs>

        <g clipPath="url(#sbDeskClip)">
          {/* Global faint dot grid across desktop viewport */}
          <g opacity="0.035">
            {Array.from({ length: 14 }, (_, row) =>
              Array.from({ length: 24 }, (__, col) => (
                <circle key={`ddot-${row}-${col}`} cx={60 + col * 58} cy={40 + row * 62} r="1" fill="#2a2a2a" />
              ))
            )}
          </g>

          {/* Large background technical rings */}
          <circle cx="200" cy="180" r="160" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.05" />
          <circle
            cx="200" cy="180" r="120" stroke="#2a2a2a" strokeWidth="0.45" strokeDasharray="6 14" opacity="0.06"
            className="sb-d-anim" style={{ transformOrigin: '200px 180px', animation: 'sb-d-spin 70s linear infinite' }}
          />

          <circle cx="1240" cy="720" r="180" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.05" />
          <circle
            cx="1240" cy="720" r="140" stroke="#2a2a2a" strokeWidth="0.45" strokeDasharray="8 18" opacity="0.06"
            className="sb-d-anim" style={{ transformOrigin: '1240px 720px', animation: 'sb-d-rspin 80s linear infinite' }}
          />

          {/* Technical Crosshairs across screen */}
          {[
            [120, 90], [380, 70], [720, 60], [1080, 80], [1340, 110],
            [80, 450], [420, 480], [1020, 440], [1360, 490],
            [160, 810], [540, 830], [890, 820], [1280, 840],
          ].map(([x, y], idx) => (
            <g key={`dcross-${idx}`} opacity="0.08">
              <line x1={x - 6} y1={y} x2={x + 6} y2={y} stroke="#2a2a2a" strokeWidth="0.6" />
              <line x1={x} y1={y - 6} x2={x} y2={y + 6} stroke="#2a2a2a" strokeWidth="0.6" />
            </g>
          ))}

          {/* ── DESKTOP AI ROBOT ILLUSTRATION (Left Margin ~x: 68, y: 290) ── */}
          <g opacity="0.11" transform="translate(68, 290)">
            <rect x="20" y="24" width="76" height="66" rx="14" stroke="#2a2a2a" strokeWidth="1" fill="none" />
            {/* Antenna with pulsing orb */}
            <line x1="58" y1="24" x2="58" y2="8" stroke="#2a2a2a" strokeWidth="1" />
            <circle cx="58" cy="8" r="4" fill="#ea3826" opacity="0.75" className="sb-d-anim" style={{ animation: 'sb-d-pulse 3s infinite' }} />
            <line x1="52" y1="4" x2="64" y2="4" stroke="#2a2a2a" strokeWidth="0.6" opacity="0.5" />
            {/* Ears */}
            <rect x="13" y="44" width="7" height="26" rx="3" stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
            <rect x="96" y="44" width="7" height="26" rx="3" stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
            {/* Visor & Eyes */}
            <rect x="30" y="42" width="56" height="18" rx="6" stroke="#2a2a2a" strokeWidth="0.8" fill="#2a2a2a" fillOpacity="0.04" />
            <circle cx="45" cy="51" r="3.5" fill="#ea3826" opacity="0.85" className="sb-d-anim" style={{ animation: 'sb-d-pulse 2.5s infinite' }} />
            <circle cx="71" cy="51" r="3.5" fill="#ea3826" opacity="0.85" className="sb-d-anim" style={{ animation: 'sb-d-pulse 2.5s infinite', animationDelay: '0.4s' }} />
            {/* Audio spectrum mouth */}
            <line x1="42" y1="74" x2="74" y2="74" stroke="#2a2a2a" strokeWidth="0.8" />
            <line x1="46" y1="71" x2="46" y2="77" stroke="#2a2a2a" strokeWidth="0.6" />
            <line x1="52" y1="69" x2="52" y2="79" stroke="#2a2a2a" strokeWidth="0.6" />
            <line x1="58" y1="67" x2="58" y2="81" stroke="#ea3826" strokeWidth="0.7" />
            <line x1="64" y1="69" x2="64" y2="79" stroke="#2a2a2a" strokeWidth="0.6" />
            <line x1="70" y1="71" x2="70" y2="77" stroke="#2a2a2a" strokeWidth="0.6" />
            {/* Forehead circuits */}
            <circle cx="38" cy="33" r="1.5" fill="#2a2a2a" />
            <circle cx="58" cy="31" r="1.5" fill="#ea3826" />
            <circle cx="78" cy="33" r="1.5" fill="#2a2a2a" />
            <path d="M38 33 L48 31 L68 31 L78 33" stroke="#2a2a2a" strokeWidth="0.5" />
            {/* Telemetry plate */}
            <line x1="48" y1="90" x2="48" y2="98" stroke="#2a2a2a" strokeWidth="0.8" />
            <line x1="68" y1="90" x2="68" y2="98" stroke="#2a2a2a" strokeWidth="0.8" />
            <path d="M26 98 L90 98 L100 124 L16 124 Z" stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
            <circle cx="58" cy="111" r="4.5" stroke="#ea3826" strokeWidth="0.7" fill="none" />
            <circle cx="58" cy="111" r="2" fill="#ea3826" opacity="0.6" />
            <text x="58" y="136" fontSize="6" fill="#2a2a2a" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">
              AI_SYNAPSE_v4
            </text>
          </g>

          {/* ── DESKTOP ROCKET / SPACE VECTOR (Right Margin ~x: 1260, y: 190) ── */}
          <g opacity="0.10" transform="translate(1260, 190)">
            <path d="M 50 10 Q 70 35 70 85 L 30 85 Q 30 35 50 10 Z" stroke="#2a2a2a" strokeWidth="1" fill="none" />
            <path d="M 45 25 Q 50 10 55 25 Z" fill="#ea3826" opacity="0.4" />
            <circle cx="50" cy="50" r="7" stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
            <circle cx="50" cy="50" r="3.5" fill="#ea3826" opacity="0.7" className="sb-d-anim" style={{ animation: 'sb-d-pulse 3s infinite' }} />
            <line x1="33" y1="65" x2="67" y2="65" stroke="#2a2a2a" strokeWidth="0.6" />
            <line x1="31" y1="78" x2="69" y2="78" stroke="#2a2a2a" strokeWidth="0.6" strokeDasharray="2 2" />
            <path d="M 30 70 L 12 92 L 30 85 Z" stroke="#2a2a2a" strokeWidth="0.9" fill="none" />
            <path d="M 70 70 L 88 92 L 70 85 Z" stroke="#2a2a2a" strokeWidth="0.9" fill="none" />
            <line x1="50" y1="78" x2="50" y2="92" stroke="#2a2a2a" strokeWidth="0.9" />
            <polygon points="40,85 60,85 64,94 36,94" stroke="#2a2a2a" strokeWidth="0.8" fill="none" />
            <path d="M 40 94 Q 50 120 50 128 Q 50 120 60 94 Z" stroke="#ea3826" strokeWidth="0.8" fill="#ea3826" fillOpacity="0.08" className="sb-d-anim" style={{ animation: 'sb-d-pulse 2s infinite' }} />
            <path d="M 44 94 Q 50 112 50 118 Q 50 112 56 94 Z" fill="#ea3826" opacity="0.25" />
            <path d="M 50 135 L 50 200" stroke="#2a2a2a" strokeWidth="0.6" strokeDasharray="4 6" opacity="0.6" />
            <circle cx="50" cy="155" r="1.5" fill="#2a2a2a" />
            <circle cx="50" cy="180" r="1.5" fill="#ea3826" />
            <text x="50" y="215" fontSize="6" fill="#2a2a2a" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em">
              ORBITAL_VELOCITY: 7.8km/s
            </text>
          </g>

          {/* ── CODE PANEL: Top-Left (Python PyTorch / GenAI) ── */}
          <g opacity="0.13" transform="translate(60, 48)">
            <rect x="0" y="0" width="220" height="130" rx="6" fill="url(#sbDeskGrad)" stroke="#2a2a2a" strokeWidth="0.6" />
            <rect x="0" y="0" width="220" height="15" rx="6" fill="#2a2a2a" opacity="0.05" />
            <circle cx="12" cy="7.5" r="2.5" fill="#ea3826" opacity="0.6" />
            <circle cx="20" cy="7.5" r="2.5" fill="#2a2a2a" opacity="0.2" />
            <circle cx="28" cy="7.5" r="2.5" fill="#2a2a2a" opacity="0.2" />
            <text x="40" y="10.5" fontSize="6" fill="#2a2a2a" fontFamily="monospace" opacity="0.6">model_architecture.py</text>
            <g fontFamily="monospace" fontSize="7" fill="#2a2a2a" opacity="0.85">
              <text x="10" y="30"><tspan fill="#ea3826" opacity="0.85">import</tspan> torch.nn as nn</text>
              <text x="10" y="42"><tspan fill="#ea3826" opacity="0.85">class</tspan> NeuralTransformer(nn.Module):</text>
              <text x="10" y="54">  <tspan fill="#ea3826" opacity="0.85">def</tspan> __init__(self, d_model=512):</text>
              <text x="10" y="66">    self.attn = MultiHeadAttention()</text>
              <text x="10" y="78">    self.norm = LayerNorm(d_model)</text>
              <text x="10" y="90">  <tspan fill="#ea3826" opacity="0.85">def</tspan> forward(self, x, mask):</text>
              <text x="10" y="102">    <tspan fill="#ea3826" opacity="0.85">return</tspan> self.norm(x + self.attn(x))</text>
            </g>
            <rect x="10" y="110" width="5" height="7" fill="#ea3826" opacity="0.4" className="sb-d-anim" style={{ animation: 'sb-d-blink 1.2s step-end infinite' }} />
          </g>

          {/* ── CODE PANEL: Bottom-Right (TypeScript / Agent Service) ── */}
          <g opacity="0.12" transform="translate(1160, 520)">
            <rect x="0" y="0" width="220" height="125" rx="6" fill="url(#sbDeskGrad)" stroke="#2a2a2a" strokeWidth="0.6" />
            <rect x="0" y="0" width="220" height="15" rx="6" fill="#2a2a2a" opacity="0.05" />
            <circle cx="12" cy="7.5" r="2.5" fill="#ea3826" opacity="0.6" />
            <circle cx="20" cy="7.5" r="2.5" fill="#2a2a2a" opacity="0.2" />
            <circle cx="28" cy="7.5" r="2.5" fill="#2a2a2a" opacity="0.2" />
            <text x="40" y="10.5" fontSize="6" fill="#2a2a2a" fontFamily="monospace" opacity="0.6">agent_orchestrator.ts</text>
            <g fontFamily="monospace" fontSize="7" fill="#2a2a2a" opacity="0.85">
              <text x="10" y="30"><tspan fill="#ea3826" opacity="0.85">interface</tspan> AgentConfig {'{'}</text>
              <text x="10" y="42">  model: <tspan fill="#ea3826" opacity="0.85">"gpt-4o" | "gemini-pro"</tspan>;</text>
              <text x="10" y="54">  temperature: 0.2;</text>
              <text x="10" y="66">{'}'}</text>
              <text x="10" y="78"><tspan fill="#ea3826" opacity="0.85">const</tspan> agent = <tspan fill="#ea3826" opacity="0.85">new</tspan> ReasoningAgent();</text>
              <text x="10" y="90"><tspan fill="#ea3826" opacity="0.85">await</tspan> agent.execute(workflow);</text>
            </g>
          </g>

          {/* ── CODE PANEL: Bottom-Left (SQL & Data Analytics) ── */}
          <g opacity="0.11" transform="translate(60, 680)">
            <rect x="0" y="0" width="200" height="110" rx="6" fill="url(#sbDeskGrad)" stroke="#2a2a2a" strokeWidth="0.6" />
            <rect x="0" y="0" width="200" height="15" rx="6" fill="#2a2a2a" opacity="0.05" />
            <circle cx="12" cy="7.5" r="2.5" fill="#ea3826" opacity="0.6" />
            <circle cx="20" cy="7.5" r="2.5" fill="#2a2a2a" opacity="0.2" />
            <circle cx="28" cy="7.5" r="2.5" fill="#2a2a2a" opacity="0.2" />
            <text x="40" y="10.5" fontSize="6" fill="#2a2a2a" fontFamily="monospace" opacity="0.6">metrics_query.sql</text>
            <g fontFamily="monospace" fontSize="7" fill="#2a2a2a" opacity="0.85">
              <text x="10" y="30"><tspan fill="#ea3826" opacity="0.85">SELECT</tspan> model_id, accuracy, latency</text>
              <text x="10" y="42"><tspan fill="#ea3826" opacity="0.85">FROM</tspan> production_runs</text>
              <text x="10" y="54"><tspan fill="#ea3826" opacity="0.85">WHERE</tspan> f1_score &gt;= 0.94</text>
              <text x="10" y="66"><tspan fill="#ea3826" opacity="0.85">ORDER BY</tspan> timestamp <tspan fill="#ea3826" opacity="0.85">DESC</tspan></text>
              <text x="10" y="78"><tspan fill="#ea3826" opacity="0.85">LIMIT</tspan> 100;</text>
            </g>
          </g>

          {/* ── CHART 1: Loss Convergence Curve (Top-Right ~x: 1080, y: 50) ── */}
          <g opacity="0.10" transform="translate(1080, 50)">
            <text x="0" y="10" fontSize="6" fill="#2a2a2a" fontFamily="monospace">MODEL LOSS CONVERGENCE</text>
            <line x1="0" y1="80" x2="160" y2="80" stroke="#2a2a2a" strokeWidth="0.6" />
            <line x1="0" y1="20" x2="0" y2="80" stroke="#2a2a2a" strokeWidth="0.6" />
            <path d="M 5 25 Q 35 68 80 72 T 155 76" stroke="#2a2a2a" strokeWidth="1.2" fill="none" />
            <circle cx="35" cy="55" r="2.5" fill="#ea3826" opacity="0.8" className="sb-d-anim" style={{ animation: 'sb-d-pulse 2.8s infinite' }} />
            <circle cx="80" cy="72" r="2.5" fill="#ea3826" opacity="0.8" className="sb-d-anim" style={{ animation: 'sb-d-pulse 2.8s infinite', animationDelay: '0.6s' }} />
            <circle cx="155" cy="76" r="2.5" fill="#ea3826" opacity="0.8" className="sb-d-anim" style={{ animation: 'sb-d-pulse 2.8s infinite', animationDelay: '1.2s' }} />
            <text x="165" y="78" fontSize="5.5" fill="#ea3826" fontFamily="monospace">loss: 0.012</text>
            <text x="0" y="92" fontSize="5" fill="#2a2a2a" fontFamily="monospace">epoch 0</text>
            <text x="140" y="92" fontSize="5" fill="#2a2a2a" fontFamily="monospace">epoch 300</text>
          </g>

          {/* ── CHART 2: Radar Spider Metric Chart (Mid-Left ~x: 170, y: 480) ── */}
          <g opacity="0.09" transform="translate(170, 480)">
            <text x="50" y="0" fontSize="6" fill="#2a2a2a" fontFamily="monospace" textAnchor="middle">EVAL_RADAR</text>
            {[40, 26, 12].map((r, i) => (
              <polygon
                key={`dhex-${i}`}
                points={`
                  ${50 + r * Math.cos(0)},${50 + r * Math.sin(0)}
                  ${50 + r * Math.cos(Math.PI / 3)},${50 + r * Math.sin(Math.PI / 3)}
                  ${50 + r * Math.cos((2 * Math.PI) / 3)},${50 + r * Math.sin((2 * Math.PI) / 3)}
                  ${50 + r * Math.cos(Math.PI)},${50 + r * Math.sin(Math.PI)}
                  ${50 + r * Math.cos((4 * Math.PI) / 3)},${50 + r * Math.sin((4 * Math.PI) / 3)}
                  ${50 + r * Math.cos((5 * Math.PI) / 3)},${50 + r * Math.sin((5 * Math.PI) / 3)}
                `}
                stroke="#2a2a2a" strokeWidth="0.5" fill="none"
              />
            ))}
            {Array.from({ length: 6 }, (_, i) => {
              const ang = (i * Math.PI) / 3;
              return (
                <line key={`dsp-${i}`} x1="50" y1="50" x2={50 + 44 * Math.cos(ang)} y2={50 + 44 * Math.sin(ang)} stroke="#2a2a2a" strokeWidth="0.4" />
              );
            })}
            <polygon points="84,50 74,74 34,68 14,50 28,34 72,28" stroke="#ea3826" strokeWidth="1" fill="#ea3826" fillOpacity="0.06" />
            <text x="96" y="52" fontSize="4.5" fill="#2a2a2a" fontFamily="monospace">ACC</text>
            <text x="80" y="86" fontSize="4.5" fill="#2a2a2a" fontFamily="monospace">F1</text>
            <text x="20" y="86" fontSize="4.5" fill="#2a2a2a" fontFamily="monospace">AUC</text>
            <text x="-4" y="52" fontSize="4.5" fill="#2a2a2a" fontFamily="monospace">LAT</text>
            <text x="16" y="24" fontSize="4.5" fill="#2a2a2a" fontFamily="monospace">SEC</text>
            <text x="80" y="24" fontSize="4.5" fill="#2a2a2a" fontFamily="monospace">SCL</text>
          </g>

          {/* ── CHART 3: Benchmark Bar Metrics (Mid-Right ~x: 1040, y: 680) ── */}
          <g opacity="0.10" transform="translate(1040, 680)">
            <text x="0" y="0" fontSize="6" fill="#2a2a2a" fontFamily="monospace">SYSTEM BENCHMARKS</text>
            <line x1="0" y1="70" x2="160" y2="70" stroke="#2a2a2a" strokeWidth="0.6" />
            {[
              { label: 'BERT', val: 56, x: 14 },
              { label: 'GPT', val: 68, x: 48 },
              { label: 'LLaMA', val: 62, x: 82 },
              { label: 'CLAUDE', val: 72, x: 116 },
            ].map((bar, i) => (
              <g key={`dbar-${i}`}>
                <rect
                  x={bar.x} y={70 - bar.val} width="18" height={bar.val} rx="2"
                  stroke={i === 3 ? '#ea3826' : '#2a2a2a'} strokeWidth="0.6"
                  fill={i === 3 ? '#ea3826' : '#2a2a2a'} fillOpacity={i === 3 ? 0.12 : 0.04}
                />
                <text x={bar.x + 9} y="80" fontSize="5" fill="#2a2a2a" fontFamily="monospace" textAnchor="middle">
                  {bar.label}
                </text>
              </g>
            ))}
          </g>

          {/* ── CIRCUITS & PCB TRACES ── */}
          <g opacity="0.07" stroke="#2a2a2a" strokeWidth="0.6">
            <path d="M 320 0 L 320 30 L 360 70 L 480 70" fill="none" />
            <circle cx="480" cy="70" r="1.8" fill="#2a2a2a" />
            <circle cx="360" cy="70" r="1.8" fill="#ea3826" />

            <path d="M 880 0 L 880 20 L 920 60 L 990 60" fill="none" />
            <circle cx="990" cy="60" r="1.8" fill="#2a2a2a" />

            <path d="M 0 420 L 40 420 L 65 445 L 65 480" fill="none" />
            <circle cx="65" cy="480" r="1.8" fill="#2a2a2a" />

            <path d="M 1440 380 L 1400 380 L 1380 400 L 1340 400" fill="none" />
            <circle cx="1340" cy="400" r="1.8" fill="#2a2a2a" />

            <path d="M 460 900 L 460 860 L 490 830 L 580 830" fill="none" />
            <circle cx="580" cy="830" r="1.8" fill="#2a2a2a" />
          </g>

          {/* ── NEURAL SYNAPSE CLUSTER (Center-Top ~x: 640, y: 160) ── */}
          <g opacity="0.08" transform="translate(640, 160)">
            {[20, 45, 70, 95].map((y, i) => (
              <circle key={`dnn1-${i}`} cx="20" cy={y} r="3" stroke="#2a2a2a" strokeWidth="0.6" fill="none" />
            ))}
            {[30, 55, 80].map((y, i) => (
              <circle key={`dnn2-${i}`} cx="80" cy={y} r="3" stroke="#ea3826" strokeWidth="0.7" fill="none" />
            ))}
            {[40, 65].map((y, i) => (
              <circle key={`dnn3-${i}`} cx="140" cy={y} r="3.5" stroke="#2a2a2a" strokeWidth="0.6" fill="none" />
            ))}
            {[20, 45, 70, 95].map((y1, i) =>
              [30, 55, 80].map((y2, j) => (
                <line key={`dsyn1-${i}-${j}`} x1="23" y1={y1} x2="77" y2={y2} stroke="#2a2a2a" strokeWidth="0.3" opacity="0.6" />
              ))
            )}
            {[30, 55, 80].map((y1, i) =>
              [40, 65].map((y2, j) => (
                <line key={`dsyn2-${i}-${j}`} x1="83" y1={y1} x2="137" y2={y2} stroke={i === 1 ? '#ea3826' : '#2a2a2a'} strokeWidth="0.35" opacity="0.7" />
              ))
            )}
            <text x="80" y="112" fontSize="5.5" fill="#2a2a2a" fontFamily="monospace" textAnchor="middle">
              FEEDFORWARD_DENSE_NET
            </text>
          </g>

          {/* ── BINARY DATA STREAMS & MATHEMATICAL FORMULAS ── */}
          <g fontFamily="monospace" fontSize="6.5" fill="#2a2a2a" opacity="0.075">
            <text x="360" y="380">01000001 01001001 00100000 01000100 01010011</text>
            <text x="360" y="392">01010010 01000101 01010011 01000101 01000001</text>
            <text x="880" y="420">01010000 01011001 01010100 01001111 01010010</text>
            <text x="880" y="432">01000011 01001000 00100000 01010110 00110010</text>

            <text x="560" y="700">L_G = E[log(1 - D(G(z)))] + E[log D(x)]</text>
            <text x="560" y="714">Attn(Q,K,V) = softmax((Q K^T) / sqrt(d_k)) V</text>
            <text x="560" y="728">W_(t+1) = W_t - lr * grad(Loss) + momentum * v_t</text>
          </g>

          {/* Floating code symbols */}
          <g fontFamily="monospace" fontSize="11" fill="#2a2a2a" opacity="0.08" fontWeight="bold">
            <text x="320" y="140">&lt;AI /&gt;</text>
            <text x="440" y="240">&#123; ...state &#125;</text>
            <text x="960" y="160">=&gt; async (ctx)</text>
            <text x="1100" y="260">class NeuralNet</text>
            <text x="360" y="720">import tensorflow</text>
            <text x="820" y="760">softmax(z_i)</text>
            <text x="1050" y="800">lambda x: x**2</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
