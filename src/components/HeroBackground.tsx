import React from 'react';

/**
 * HeroBackground — Three-layer AI & technology editorial background.
 *
 * Layer A (deep, ~4-8% opacity):   Concentric rings, grid mesh, circuit traces, node graph
 * Layer B (mid, ~8-16% opacity):   Code panels, neural-net diagram, data graphs, terminal panels,
 *                                   processor chips, data-flow pipeline
 * Layer C: Cards (managed by CardDeck — untouched)
 *
 * CENTER FOCUS: Most content positioned behind/around the 5-card elliptical zone
 * (viewBox 1440×620; card zone: x 120-1320, y 80-580)
 *
 * Rules: pointer-events:none · z-index:0 · prefers-reduced-motion respected
 *        No heavy libraries · Pure SVG + CSS keyframes
 */
export const HeroBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* ─── Single full-viewport SVG canvas ─── */}
      <svg
        className="absolute inset-0 w-full h-full hero-bg-svg"
        viewBox="0 0 1440 620"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @media (prefers-reduced-motion: reduce) { .hb { animation: none !important; } }

            /* Slow orbit of traveling data dots */
            @keyframes hb-o1 {
              from { transform: rotate(10deg)  translateX(242px) rotate(-10deg);  }
              to   { transform: rotate(370deg) translateX(242px) rotate(-370deg); }
            }
            @keyframes hb-o2 {
              from { transform: rotate(195deg) translateX(356px) rotate(-195deg); }
              to   { transform: rotate(555deg) translateX(356px) rotate(-555deg); }
            }
            @keyframes hb-o3 {
              from { transform: rotate(310deg) translateX(470px) rotate(-310deg); }
              to   { transform: rotate(670deg) translateX(470px) rotate(-670deg); }
            }
            /* Dashed ring spin */
            @keyframes hb-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
            @keyframes hb-rspin{ from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
            /* Pulse / node glow */
            @keyframes hb-pulse { 0%,100%{opacity:.12} 50%{opacity:.28} }
            @keyframes hb-glow  { 0%,100%{opacity:.07} 50%{opacity:.16} }
            /* Data packet travelling along pipeline */
            @keyframes hb-pipe  { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
            /* Graph point bob */
            @keyframes hb-gbob  { 0%,100%{cy:0} 50%{cy:-4px} }
            /* Tiny float drift */
            @keyframes hb-drift { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
            /* Cursor blink in terminal */
            @keyframes hb-blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }

            /* Hide decorative extras on mobile */
            @media (max-width:639px) {
              .hb-desktop { display: none; }
            }
          `}</style>

          {/* ── Gradient for subtle code-panel backgrounds ── */}
          <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2a2a2a" stopOpacity="0.04"/>
            <stop offset="100%" stopColor="#2a2a2a" stopOpacity="0.01"/>
          </linearGradient>
          <linearGradient id="panelGradR" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#2a2a2a" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="#2a2a2a" stopOpacity="0.01"/>
          </linearGradient>

          {/* ── Clip viewport ── */}
          <clipPath id="hbvp"><rect width="1440" height="620"/></clipPath>
        </defs>

        <g clipPath="url(#hbvp)">

          {/* ════════════════════════════════════════════════════════
              ░░░  LAYER A — DEEP ATMOSPHERE  ░░░
              Concentric rings · dotted grid · global circuit traces
              Origin at bottom-center of card zone: cx=720 cy=640
              ════════════════════════════════════════════════════════ */}

          {/* Concentric rings — widened to fill card region */}
          <circle cx="720" cy="640" r="180" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.065"/>
          <circle cx="720" cy="640" r="280" stroke="#2a2a2a" strokeWidth="0.45" opacity="0.06"/>
          <circle cx="720" cy="640" r="390" stroke="#2a2a2a" strokeWidth="0.4" opacity="0.05"/>
          <circle cx="720" cy="640" r="510" stroke="#2a2a2a" strokeWidth="0.35" opacity="0.04"/>
          <circle cx="720" cy="640" r="640" stroke="#2a2a2a" strokeWidth="0.3" opacity="0.035"/>
          <circle cx="720" cy="640" r="780" stroke="#2a2a2a" strokeWidth="0.25" opacity="0.03"/>

          {/* Rotating dashed orbit ring — slow */}
          <circle cx="720" cy="640" r="430" stroke="#2a2a2a" strokeWidth="0.55"
            strokeDasharray="10 28" opacity="0.075"
            className="hb"
            style={{ transformOrigin:'720px 640px', animation:'hb-spin 80s linear infinite' }}
          />
          {/* Counter-rotating inner dashed ring */}
          <circle cx="720" cy="640" r="305" stroke="#2a2a2a" strokeWidth="0.45"
            strokeDasharray="5 32" opacity="0.06"
            className="hb"
            style={{ transformOrigin:'720px 640px', animation:'hb-rspin 55s linear infinite' }}
          />

          {/* Radial ticks at 15° on 390px ring */}
          {Array.from({length:24},(_,i)=>{
            const a=(i*15*Math.PI)/180;
            const big=i%6===0;
            return (
              <line key={i}
                x1={720+(385-( big?6:0))*Math.cos(a)} y1={640+(385-(big?6:0))*Math.sin(a)}
                x2={720+(395+(big?6:0))*Math.cos(a)} y2={640+(395+(big?6:0))*Math.sin(a)}
                stroke={big?"#ea3826":"#2a2a2a"}
                strokeWidth={big?0.9:0.5}
                opacity={big?0.1:0.07}
              />
            );
          })}

          {/* Traveling data dots */}
          <circle r="2.5" fill="#2a2a2a" opacity="0.18" className="hb"
            style={{ transformOrigin:'720px 640px', animation:'hb-o1 22s linear infinite' }}/>
          <circle r="2" fill="#ea3826" opacity="0.22" className="hb"
            style={{ transformOrigin:'720px 640px', animation:'hb-o2 38s linear infinite' }}/>
          <circle r="1.8" fill="#2a2a2a" opacity="0.14" className="hb"
            style={{ transformOrigin:'720px 640px', animation:'hb-o3 52s linear infinite' }}/>

          {/* Pulsing origin */}
          <circle cx="720" cy="640" r="3" fill="#ea3826" className="hb"
            style={{ animation:'hb-pulse 3.5s ease-in-out infinite' }}/>
          <line x1="706" y1="640" x2="734" y2="640" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.12"/>
          <line x1="720" y1="626" x2="720" y2="654" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.12"/>

          {/* Very faint global dot-grid behind center */}
          <g opacity="0.04" className="hb-desktop">
            {Array.from({length:10},(_,row)=>
              Array.from({length:22},(__,col)=>(
                <circle key={`g${row}-${col}`}
                  cx={150+col*54} cy={80+row*54}
                  r="1" fill="#2a2a2a"
                />
              ))
            )}
          </g>

          {/* Global circuit traces — peripheral edges */}
          <g opacity="0.055" stroke="#2a2a2a" strokeWidth="0.6" className="hb-desktop">
            {/* Top-centre trace */}
            <path d="M520 22 L580 22 L580 40 L640 40 L640 22 L700 22"/>
            <circle cx="580" cy="22" r="1.5" fill="#2a2a2a"/>
            <circle cx="640" cy="22" r="1.5" fill="#2a2a2a"/>
            {/* Right-edge traces */}
            <path d="M1420 160 L1400 160 L1400 200 L1420 200"/>
            <path d="M1420 260 L1390 260 L1390 310 L1420 310"/>
            {/* Left-edge traces */}
            <path d="M0 320 L30 320 L30 350 L55 350"/>
            <path d="M0 380 L22 380 L22 410 L48 410"/>
          </g>


          {/* ════════════════════════════════════════════════════════
              ░░░  LAYER B — AI CODING INTERFACE  ░░░
              Five zones corresponding to each card position:
              Far-left  (x≈160)  · Left (x≈340) · Centre (x≈720)
              Right (x≈1100) · Far-right (x≈1280)
              All elements: opacity 8-16%, pointer-events:none
              ════════════════════════════════════════════════════════ */}


          {/* ───────────────────────────────────────────────────────
              ZONE 1 (Far-Left / PROJECTS card, ~x:80-310, y:100-500)
              Contents: Python code panel · Neural-net node diagram · mini data graph
              ─────────────────────────────────────────────────────── */}

          {/* Code panel border */}
          <rect x="40" y="108" width="210" height="138" rx="4"
            fill="url(#panelGrad)" stroke="#2a2a2a" strokeWidth="0.6" opacity="0.12"/>
          {/* Panel header bar */}
          <rect x="40" y="108" width="210" height="14" rx="4" fill="#2a2a2a" opacity="0.06"/>
          {/* Traffic-light dots */}
          <circle cx="52" cy="115" r="2.5" fill="#ea3826" opacity="0.5"/>
          <circle cx="61" cy="115" r="2.5" fill="#2a2a2a" opacity="0.2"/>
          <circle cx="70" cy="115" r="2.5" fill="#2a2a2a" opacity="0.2"/>
          <text x="82" y="118" fontSize="6" fill="#2a2a2a" fontFamily="monospace" opacity="0.5">model_train.py</text>
          {/* Code lines */}
          <g fontFamily="monospace" fontSize="7.5" fill="#2a2a2a" opacity="0.15">
            <text x="48" y="136">
              <tspan fill="#ea3826" opacity="0.85">import</tspan>
              <tspan> tensorflow as tf</tspan>
            </text>
            <text x="48" y="148">
              <tspan fill="#ea3826" opacity="0.85">from</tspan>
              <tspan> sklearn</tspan>
              <tspan fill="#ea3826" opacity="0.85"> import</tspan>
              <tspan> metrics</tspan>
            </text>
            <text x="48" y="160"/>
            <text x="48" y="172">model = tf.keras.Sequential([</text>
            <text x="48" y="184">  Dense(128, activation=</text>
            <text x="48" y="196">    <tspan fill="#ea3826" opacity="0.9">'relu'</tspan>),</text>
            <text x="48" y="208">  Dense(64), Dense(1)</text>
            <text x="48" y="220">])</text>
            <text x="48" y="232">model.compile(optimizer=</text>
            <text x="48" y="236"/>
          </g>
          {/* Blinking cursor */}
          <rect x="48" y="232" width="5" height="8" fill="#ea3826" opacity="0.3"
            className="hb" style={{ animation:'hb-blink 1.1s step-end infinite' }}/>

          {/* Neural-net nodes — small, scattered left area */}
          <g opacity="0.11" className="hb-desktop">
            {/* Input layer */}
            {[300,330,360].map((y,i)=>(
              <g key={`ni${i}`}>
                <circle cx="88" cy={y} r="5" stroke="#2a2a2a" strokeWidth="0.7"
                  className="hb"
                  style={{ animation:`hb-pulse ${4+i*0.6}s ease-in-out infinite`, animationDelay:`${i*0.4}s` }}
                />
                {/* Connections to hidden */}
                {[310,330,350].map((hy,j)=>(
                  <line key={`c${j}`} x1="93" y1={y} x2="157" y2={hy}
                    stroke="#2a2a2a" strokeWidth="0.35" opacity="0.6"/>
                ))}
              </g>
            ))}
            {/* Hidden layer */}
            {[310,330,350].map((y,i)=>(
              <g key={`nh${i}`}>
                <circle cx="162" cy={y} r="5" stroke="#2a2a2a" strokeWidth="0.7"
                  className="hb"
                  style={{ animation:`hb-glow ${5+i*0.5}s ease-in-out infinite`, animationDelay:`${i*0.3}s` }}
                />
                <line x1="167" y1={y} x2="220" y2="330"
                  stroke="#2a2a2a" strokeWidth="0.35" opacity="0.6"/>
              </g>
            ))}
            {/* Output node */}
            <circle cx="225" cy="330" r="6" stroke="#ea3826" strokeWidth="0.8"
              className="hb" style={{ animation:'hb-pulse 2.8s ease-in-out infinite' }}/>
            {/* Labels */}
            <text x="80" y="296" fontSize="6" fill="#2a2a2a" fontFamily="monospace">INPUT</text>
            <text x="154" y="296" fontSize="6" fill="#2a2a2a" fontFamily="monospace">H[64]</text>
            <text x="216" y="296" fontSize="6" fill="#2a2a2a" fontFamily="monospace">OUT</text>
          </g>

          {/* Mini accuracy line chart */}
          <g opacity="0.1" className="hb-desktop">
            <line x1="52" y1="480" x2="52" y2="420" stroke="#2a2a2a" strokeWidth="0.7"/>
            <line x1="52" y1="480" x2="190" y2="480" stroke="#2a2a2a" strokeWidth="0.7"/>
            <polyline points="52,475 72,468 92,455 112,440 132,432 152,428 172,425 190,422"
              stroke="#2a2a2a" strokeWidth="1" fill="none"/>
            <polygon points="52,475 72,468 92,455 112,440 132,432 152,428 172,425 190,422 190,480 52,480"
              fill="#2a2a2a" opacity="0.025"/>
            {[[72,468],[112,440],[152,428],[190,422]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="2.5" fill="#ea3826" opacity="0.9"
                className="hb"
                style={{ animation:`hb-pulse ${3+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.6}s` }}
              />
            ))}
            <text x="52" y="494" fontSize="6" fill="#2a2a2a" fontFamily="monospace">accuracy vs epoch</text>
          </g>


          {/* ───────────────────────────────────────────────────────
              ZONE 2 (Left / CONTACT card, ~x:300-530, y:100-500)
              Contents: API snippet · data-flow pipeline · annotations
              ─────────────────────────────────────────────────────── */}

          {/* API code snippet */}
          <rect x="295" y="96" width="195" height="116" rx="4"
            fill="url(#panelGrad)" stroke="#2a2a2a" strokeWidth="0.55" opacity="0.1"/>
          <rect x="295" y="96" width="195" height="13" rx="4" fill="#2a2a2a" opacity="0.05"/>
          <circle cx="305" cy="102.5" r="2.3" fill="#ea3826" opacity="0.45"/>
          <circle cx="313" cy="102.5" r="2.3" fill="#2a2a2a" opacity="0.18"/>
          <circle cx="321" cy="102.5" r="2.3" fill="#2a2a2a" opacity="0.18"/>
          <text x="330" y="106" fontSize="5.8" fill="#2a2a2a" fontFamily="monospace" opacity="0.45">api_integration.js</text>
          <g fontFamily="monospace" fontSize="7.5" fill="#2a2a2a" opacity="0.14">
            <text x="302" y="124">
              <tspan fill="#ea3826" opacity="0.85">const</tspan>
              <tspan> pipeline = </tspan>
              <tspan fill="#ea3826" opacity="0.85">await</tspan>
            </text>
            <text x="302" y="136">  initializeAI(config);</text>
            <text x="302" y="148"/>
            <text x="302" y="160">
              <tspan fill="#ea3826" opacity="0.85">const</tspan>
              <tspan> result = </tspan>
              <tspan fill="#ea3826" opacity="0.85">await</tspan>
            </text>
            <text x="302" y="172">  pipeline.analyze(</text>
            <text x="302" y="184">    dataset, options</text>
            <text x="302" y="196">  );</text>
          </g>

          {/* Data-flow pipeline diagram */}
          <g opacity="0.095" className="hb-desktop">
            <text x="300" y="228" fontSize="6" fill="#2a2a2a" fontFamily="monospace">DATA PIPELINE</text>
            {/* Pipeline nodes */}
            {[
              {x:308,y:248,label:"RAW"},
              {x:370,y:248,label:"CLEAN"},
              {x:432,y:248,label:"FEAT"},
              {x:494,y:248,label:"MODEL"},
            ].map(({x,y,label},i)=>(
              <g key={`pipe${i}`}>
                <rect x={x} y={y-10} width="44" height="20" rx="3"
                  stroke="#2a2a2a" strokeWidth="0.6" fill="none"/>
                <text x={x+22} y={y+4} fontSize="6" fill="#2a2a2a" fontFamily="monospace"
                  textAnchor="middle">{label}</text>
                {i<3 && (
                  <>
                    <line x1={x+44} y1={y} x2={x+62} y2={y}
                      stroke="#2a2a2a" strokeWidth="0.6"
                      strokeDasharray="800" strokeDashoffset="0"
                    />
                    {/* animated data packet */}
                    <circle r="2" fill="#ea3826" opacity="0.7" className="hb"
                      style={{ animation:`hb-pulse ${2.5+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.5}s`,
                               transform:`translate(${x+52}px,${y}px)` }}
                    />
                  </>
                )}
              </g>
            ))}
            {/* Flow arrows */}
            <text x="355" y="252" fontSize="8" fill="#2a2a2a" opacity="0.6">›</text>
            <text x="416" y="252" fontSize="8" fill="#2a2a2a" opacity="0.6">›</text>
            <text x="478" y="252" fontSize="8" fill="#ea3826" opacity="0.5">›</text>
          </g>

          {/* Small waveform / signal */}
          <g opacity="0.07" className="hb-desktop">
            <polyline points="300,305 315,295 325,315 335,290 345,315 360,300 375,305"
              stroke="#2a2a2a" strokeWidth="0.8"/>
            <text x="300" y="320" fontSize="5.5" fill="#2a2a2a" fontFamily="monospace">signal_loss: 0.031</text>
          </g>


          {/* ───────────────────────────────────────────────────────
              ZONE 3 (Centre / ME portrait card, ~x:580-860, y:80-560)
              Contents: AI model diagram · concentric tech rings · math labels
              ─────────────────────────────────────────────────────── */}

          {/* Subtle concentric technical rings specifically around centre */}
          <circle cx="720" cy="340" r="95"  stroke="#2a2a2a" strokeWidth="0.6" opacity="0.06"/>
          <circle cx="720" cy="340" r="148" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.05"
            strokeDasharray="6 10"/>
          <circle cx="720" cy="340" r="205" stroke="#2a2a2a" strokeWidth="0.4" opacity="0.04"/>

          {/* Central AI model architecture diagram */}
          <g opacity="0.09" className="hb-desktop">
            <text x="660" y="78" fontSize="6" fill="#2a2a2a" fontFamily="monospace">AI MODEL ARCHITECTURE</text>
            {/* Layers stacked horizontally */}
            {[
              {x:598,label:"INPUT\n[512]",  w:54},
              {x:668,label:"DENSE\n[256]",  w:54},
              {x:738,label:"DENSE\n[128]",  w:54},
              {x:808,label:"ATTN\n[64]",   w:54},
              {x:878,label:"OUT\n[10]",    w:46},
            ].map(({x,label,w},i)=>(
              <g key={`layer${i}`}>
                <rect x={x} y="84" width={w} height="50" rx="3"
                  stroke={i===3?"#ea3826":"#2a2a2a"}
                  strokeWidth={i===3?0.9:0.6}
                  fill={i===3?"#ea3826":"none"}
                  fillOpacity={i===3?0.03:0}
                />
                {label.split('\n').map((l,li)=>(
                  <text key={li} x={x+w/2} y={97+li*13} fontSize="6"
                    fill={i===3?"#ea3826":"#2a2a2a"}
                    fontFamily="monospace" textAnchor="middle">{l}</text>
                ))}
                {i<4 && (
                  <line x1={x+w} y1="109" x2={x+w+14} y2="109"
                    stroke="#2a2a2a" strokeWidth="0.5" markerEnd="url(#arr)"/>
                )}
              </g>
            ))}
          </g>

          {/* Math / gradient annotations around centre */}
          <g fontFamily="monospace" fontSize="6.5" fill="#2a2a2a" opacity="0.1">
            <text x="592" y="160">∂L/∂w = -η·∇w</text>
            <text x="592" y="172">σ(z) = 1/(1+e⁻ᶻ)</text>
            <text x="820" y="160">ŷ = softmax(Wx+b)</text>
            <text x="820" y="172">loss = -Σ y·log(ŷ)</text>
          </g>

          {/* Central "AI core" labelled ring with rotating marker */}
          <circle cx="720" cy="340" r="60" stroke="#ea3826" strokeWidth="0.5"
            strokeDasharray="4 16" opacity="0.08"
            className="hb"
            style={{ transformOrigin:'720px 340px', animation:'hb-spin 30s linear infinite' }}
          />
          <text x="720" y="286" fontSize="5.5" fill="#2a2a2a" fontFamily="monospace"
            textAnchor="middle" opacity="0.1">CORE_v2.1</text>

          {/* Small training progress bar */}
          <g opacity="0.09" className="hb-desktop">
            <text x="598" y="200" fontSize="6" fill="#2a2a2a" fontFamily="monospace">training: epoch 128/128</text>
            <rect x="598" y="204" width="180" height="5" rx="2"
              stroke="#2a2a2a" strokeWidth="0.5" fill="none"/>
            <rect x="598" y="204" width="162" height="5" rx="2"
              fill="#ea3826" opacity="0.25"/>
            <text x="784" y="210" fontSize="5.5" fill="#ea3826" fontFamily="monospace" opacity="0.9">90%</text>
          </g>

          {/* Coordinate annotations beside centre ring */}
          <g fontFamily="monospace" fontSize="5.5" fill="#2a2a2a" opacity="0.09">
            <text x="630" y="344">x: 720.0</text>
            <text x="740" y="344">y: 340.0</text>
            <text x="680" y="410">r: 95 // anchor</text>
          </g>


          {/* ───────────────────────────────────────────────────────
              ZONE 4 (Right / SPORTS card, ~x:900-1130, y:100-500)
              Contents: Analytics chart · SQL snippet · processor chip
              ─────────────────────────────────────────────────────── */}

          {/* Analytics bar chart */}
          <g opacity="0.1" className="hb-desktop">
            <text x="930" y="226" fontSize="6" fill="#2a2a2a" fontFamily="monospace">performance_metrics.csv</text>
            <line x1="930" y1="320" x2="930" y2="238" stroke="#2a2a2a" strokeWidth="0.7"/>
            <line x1="930" y1="320" x2="1110" y2="320" stroke="#2a2a2a" strokeWidth="0.7"/>
            {/* Bars */}
            {[
              {x:944,h:48,label:"ACC"},
              {x:976,h:62,label:"F1"},
              {x:1008,h:40,label:"PRE"},
              {x:1040,h:70,label:"REC"},
              {x:1072,h:55,label:"AUC"},
            ].map(({x,h,label},i)=>(
              <g key={`bar${i}`}>
                <rect x={x} y={320-h} width="22" height={h}
                  stroke={i===3?"#ea3826":"#2a2a2a"}
                  strokeWidth={i===3?0.8:0.5}
                  fill={i===3?"#ea3826":"#2a2a2a"}
                  fillOpacity={i===3?0.08:0.05}
                />
                <text x={x+11} y={326} fontSize="5.5" fill="#2a2a2a"
                  fontFamily="monospace" textAnchor="middle">{label}</text>
              </g>
            ))}
            {/* Y-axis ticks */}
            {[280,300,320].map((y,i)=>(
              <g key={`yt${i}`}>
                <line x1="927" y1={y} x2="933" y2={y} stroke="#2a2a2a" strokeWidth="0.5"/>
                <text x="920" y={y+2} fontSize="5" fill="#2a2a2a" fontFamily="monospace"
                  textAnchor="end">{i===0?'0.9':i===1?'0.7':'0.5'}</text>
              </g>
            ))}
          </g>

          {/* SQL / pandas snippet */}
          <rect x="928" y="350" width="188" height="110" rx="4"
            fill="url(#panelGradR)" stroke="#2a2a2a" strokeWidth="0.55" opacity="0.1"/>
          <rect x="928" y="350" width="188" height="13" rx="4" fill="#2a2a2a" opacity="0.05"/>
          <circle cx="938" cy="356.5" r="2.3" fill="#ea3826" opacity="0.45"/>
          <circle cx="946" cy="356.5" r="2.3" fill="#2a2a2a" opacity="0.18"/>
          <circle cx="954" cy="356.5" r="2.3" fill="#2a2a2a" opacity="0.18"/>
          <text x="963" y="359.5" fontSize="5.8" fill="#2a2a2a" fontFamily="monospace" opacity="0.45">data_analysis.py</text>
          <g fontFamily="monospace" fontSize="7.5" fill="#2a2a2a" opacity="0.14">
            <text x="936" y="378">
              <tspan fill="#ea3826" opacity="0.85">import</tspan>
              <tspan> pandas </tspan>
              <tspan fill="#ea3826" opacity="0.85">as</tspan>
              <tspan> pd</tspan>
            </text>
            <text x="936" y="390">df = pd.read_csv(path)</text>
            <text x="936" y="402">X = df.drop(</text>
            <text x="936" y="414">  columns=[</text>
            <tspan/>
            <text x="936" y="426">    <tspan fill="#ea3826" opacity="0.9">'target'</tspan>])</text>
            <text x="936" y="438">y = df[</text>
            <text x="936" y="450">  <tspan fill="#ea3826" opacity="0.9">'target'</tspan>]</text>
          </g>

          {/* Small node scatter — right zone */}
          <g opacity="0.085" className="hb-desktop">
            {[[962,488],[990,470],[1018,492],[1046,466],[1074,480]].map(([cx,cy],i)=>(
              <g key={`sc${i}`}>
                <circle cx={cx} cy={cy} r="3" stroke="#2a2a2a" strokeWidth="0.5"
                  className="hb"
                  style={{ animation:`hb-glow ${3.5+i*0.4}s ease-in-out infinite`, animationDelay:`${i*0.5}s` }}
                />
                {i<4 && (
                  <line x1={cx+3} y1={cy} x2={cx+25} y2={cy+(i%2===0?-22:22)}
                    stroke="#2a2a2a" strokeWidth="0.4" opacity="0.6"/>
                )}
              </g>
            ))}
            <text x="958" y="508" fontSize="5.5" fill="#2a2a2a" fontFamily="monospace">scatter(X_pca, labels)</text>
          </g>


          {/* ───────────────────────────────────────────────────────
              ZONE 5 (Far-Right / SKILLS card, ~x:1140-1400, y:100-500)
              Contents: JS snippet · processor chip · circuit traces
              ─────────────────────────────────────────────────────── */}

          {/* JavaScript / skills snippet */}
          <rect x="1178" y="110" width="210" height="140" rx="4"
            fill="url(#panelGradR)" stroke="#2a2a2a" strokeWidth="0.6" opacity="0.11"/>
          <rect x="1178" y="110" width="210" height="13" rx="4" fill="#2a2a2a" opacity="0.05"/>
          <circle cx="1188" cy="116.5" r="2.3" fill="#ea3826" opacity="0.45"/>
          <circle cx="1196" cy="116.5" r="2.3" fill="#2a2a2a" opacity="0.18"/>
          <circle cx="1204" cy="116.5" r="2.3" fill="#2a2a2a" opacity="0.18"/>
          <text x="1213" y="119.5" fontSize="5.8" fill="#2a2a2a" fontFamily="monospace" opacity="0.45">skills_stack.ts</text>
          <g fontFamily="monospace" fontSize="7.5" fill="#2a2a2a" opacity="0.14">
            <text x="1186" y="138">
              <tspan fill="#ea3826" opacity="0.85">const</tspan>
              <tspan> skills = {'{'}</tspan>
            </text>
            <text x="1186" y="150">  languages: [</text>
            <text x="1186" y="162">    <tspan fill="#ea3826" opacity="0.85">"Python"</tspan>,</text>
            <text x="1186" y="174">    <tspan fill="#ea3826" opacity="0.85">"SQL"</tspan>,</text>
            <text x="1186" y="186">    <tspan fill="#ea3826" opacity="0.85">"TypeScript"</tspan>],</text>
            <text x="1186" y="198">  ml: [</text>
            <text x="1186" y="210">    <tspan fill="#ea3826" opacity="0.85">"PyTorch"</tspan>,</text>
            <text x="1186" y="222">    <tspan fill="#ea3826" opacity="0.85">"scikit-learn"</tspan>],</text>
            <text x="1186" y="234">{'}'}</text>
          </g>

          {/* Processor / AI chip — right edge */}
          <g opacity="0.1" className="hb-desktop">
            {/* Chip body */}
            <rect x="1238" y="276" width="58" height="58" stroke="#2a2a2a" strokeWidth="0.8" rx="4"/>
            <rect x="1246" y="284" width="42" height="42" stroke="#2a2a2a" strokeWidth="0.5" rx="2"/>
            {/* Pins left */}
            {[287,296,305,314,323].map((y,i)=>(
              <line key={`pl${i}`} x1="1238" y1={y} x2="1230" y2={y} stroke="#2a2a2a" strokeWidth="0.6"/>
            ))}
            {/* Pins right */}
            {[287,296,305,314,323].map((y,i)=>(
              <line key={`pr${i}`} x1="1296" y1={y} x2="1304" y2={y} stroke="#2a2a2a" strokeWidth="0.6"/>
            ))}
            {/* Pins top */}
            {[1250,1259,1268,1277,1286].map((x,i)=>(
              <line key={`pt${i}`} x1={x} y1="276" x2={x} y2="268" stroke="#2a2a2a" strokeWidth="0.6"/>
            ))}
            {/* Pins bottom */}
            {[1250,1259,1268,1277,1286].map((x,i)=>(
              <line key={`pb${i}`} x1={x} y1="334" x2={x} y2="342" stroke="#2a2a2a" strokeWidth="0.6"/>
            ))}
            {/* Inner grid */}
            <line x1="1246" y1="305" x2="1288" y2="305" stroke="#2a2a2a" strokeWidth="0.4" strokeDasharray="2 2"/>
            <line x1="1267" y1="284" x2="1267" y2="326" stroke="#2a2a2a" strokeWidth="0.4" strokeDasharray="2 2"/>
            <text x="1255" y="309" fontSize="7.5" fill="#2a2a2a" fontFamily="monospace" fontWeight="bold" opacity="1.2">GPU</text>
            {/* Pulsing core */}
            <circle cx="1267" cy="305" r="5" stroke="#ea3826" strokeWidth="0.6"
              className="hb" style={{ animation:'hb-pulse 2.5s ease-in-out infinite' }}/>
            <text x="1224" y="352" fontSize="6" fill="#2a2a2a" fontFamily="monospace">AI_PROC_x86</text>
          </g>

          {/* Circuit traces from chip */}
          <g opacity="0.065" stroke="#2a2a2a" strokeWidth="0.6" className="hb-desktop">
            <path d="M1304 305 L1330 305 L1330 370 L1360 370"/>
            <circle cx="1330" cy="305" r="1.5" fill="#2a2a2a"/>
            <circle cx="1330" cy="370" r="1.5" fill="#2a2a2a"/>
            <path d="M1267 342 L1267 390 L1300 390 L1300 420"/>
            <circle cx="1267" cy="390" r="1.5" fill="#2a2a2a"/>
            <circle cx="1300" cy="390" r="1.5" fill="#2a2a2a"/>
            <path d="M1230 305 L1200 305 L1200 370 L1178 370"/>
            <circle cx="1200" cy="305" r="1.5" fill="#2a2a2a"/>
          </g>

          {/* Memory usage chart beside chip */}
          <g opacity="0.09" className="hb-desktop">
            <text x="1178" y="376" fontSize="6" fill="#2a2a2a" fontFamily="monospace">memory_usage</text>
            {[
              {x:1180,h:32,c:"#2a2a2a"},
              {x:1196,h:48,c:"#2a2a2a"},
              {x:1212,h:24,c:"#2a2a2a"},
              {x:1228,h:56,c:"#ea3826"},
            ].map(({x,h,c},i)=>(
              <rect key={i} x={x} y={430-h} width="12" height={h}
                stroke={c} strokeWidth="0.5"
                fill={c} fillOpacity="0.07"
              />
            ))}
            <line x1="1178" y1="430" x2="1244" y2="430" stroke="#2a2a2a" strokeWidth="0.6"/>
          </g>


          {/* ───────────────────────────────────────────────────────
              INTER-CARD GAP ELEMENTS
              Data-connection lines flowing between card zones
              Small floating annotations in the gaps
              ─────────────────────────────────────────────────────── */}

          {/* Bezier data-flow arc — far-left to left zone */}
          <path d="M240 430 C290 390 330 420 380 400"
            stroke="#2a2a2a" strokeWidth="0.5" opacity="0.07" strokeDasharray="4 8"/>

          {/* Bezier data-flow arc — left zone to centre */}
          <path d="M495 390 C550 360 600 380 650 370"
            stroke="#2a2a2a" strokeWidth="0.5" opacity="0.06" strokeDasharray="4 8"/>

          {/* Bezier data-flow arc — centre to right zone */}
          <path d="M790 370 C840 360 890 395 940 380"
            stroke="#2a2a2a" strokeWidth="0.5" opacity="0.06" strokeDasharray="4 8"/>

          {/* Bezier data-flow arc — right zone to far-right */}
          <path d="M1118 430 C1150 410 1175 440 1200 420"
            stroke="#2a2a2a" strokeWidth="0.5" opacity="0.07" strokeDasharray="4 8"/>

          {/* Tiny inter-card annotation labels */}
          <g fontFamily="monospace" fontSize="6" fill="#2a2a2a" opacity="0.1">
            <text x="295" y="418">→ 2.4 GB/s</text>
            <text x="520" y="378">→ tensor[256]</text>
            <text x="808" y="366">→ inference</text>
            <text x="1130" y="416">→ weights</text>
          </g>

          {/* Center floating annotation cluster */}
          <g fontFamily="monospace" fontSize="6" fill="#2a2a2a" opacity="0.08" className="hb-desktop">
            <text x="558" y="448">batch_size: 32</text>
            <text x="558" y="458">lr: 0.001</text>
            <text x="820" y="448">dropout: 0.2</text>
            <text x="820" y="458">val_acc: 0.971</text>
          </g>


          {/* ───────────────────────────────────────────────────────
              PERIPHERAL ELEMENTS (Rocket, robot — from previous version,
              scaled/repositioned to stay outside card zone)
              ─────────────────────────────────────────────────────── */}

          {/* Rocket — upper right, small, drifting */}
          <g opacity="0.095" className="hb-desktop hb"
            style={{ transformOrigin:'1350px 100px', animation:'hb-drift 10s ease-in-out infinite' }}
          >
            <path d="M1350 40 C1342 50 1340 75 1340 92 L1360 92 C1360 75 1358 50 1350 40Z"
              stroke="#2a2a2a" strokeWidth="0.9"/>
            <path d="M1340 92 Q1340 104 1350 112 Q1360 104 1360 92Z"
              stroke="#2a2a2a" strokeWidth="0.7"/>
            <path d="M1340 100 L1332 116 L1340 114Z" stroke="#2a2a2a" strokeWidth="0.7"/>
            <path d="M1360 100 L1368 116 L1360 114Z" stroke="#2a2a2a" strokeWidth="0.7"/>
            <circle cx="1350" cy="72" r="4.5" stroke="#2a2a2a" strokeWidth="0.7"/>
            <path d="M1344 114 L1342 124 L1358 124 L1356 114Z"
              stroke="#2a2a2a" strokeWidth="0.6"/>
            <path d="M1345 124 Q1350 134 1355 124" stroke="#ea3826" strokeWidth="0.7" opacity="0.9"/>
            <line x1="1340" y1="82" x2="1360" y2="82" stroke="#2a2a2a" strokeWidth="0.4" strokeDasharray="2 3"/>
            <text x="1316" y="38" fontSize="5.5" fill="#2a2a2a" fontFamily="monospace">// LAUNCH_v1</text>
          </g>

          {/* Minimal robot — upper left, small */}
          <g opacity="0.085" className="hb-desktop">
            <rect x="54" y="148" width="34" height="26" stroke="#2a2a2a" strokeWidth="0.7" rx="3"/>
            <rect x="58" y="154" width="7" height="5" stroke="#2a2a2a" strokeWidth="0.5" rx="1"/>
            <rect x="73" y="154" width="7" height="5" stroke="#2a2a2a" strokeWidth="0.5" rx="1"/>
            <circle cx="61.5" cy="156.5" r="1.3" fill="#ea3826" opacity="0.7"
              className="hb" style={{ animation:'hb-pulse 2.5s ease-in-out infinite' }}/>
            <circle cx="76.5" cy="156.5" r="1.3" fill="#ea3826" opacity="0.7"
              className="hb" style={{ animation:'hb-pulse 2.5s ease-in-out infinite', animationDelay:'0.4s' }}/>
            <line x1="71" y1="148" x2="71" y2="142" stroke="#2a2a2a" strokeWidth="0.6"/>
            <circle cx="71" cy="140" r="2.5" stroke="#2a2a2a" strokeWidth="0.5"/>
            <rect x="60" y="174" width="22" height="4" stroke="#2a2a2a" strokeWidth="0.5" rx="1"/>
            <rect x="48" y="178" width="46" height="32" stroke="#2a2a2a" strokeWidth="0.7" rx="2"/>
            <text x="68" y="198" fontSize="5.5" fill="#2a2a2a" fontFamily="monospace"
              textAnchor="middle">AI</text>
          </g>

          {/* Global horizontal guide */}
          <line x1="60" y1="240" x2="1380" y2="240"
            stroke="#2a2a2a" strokeWidth="0.3" opacity="0.03" strokeDasharray="5 55"/>

          {/* Top micro-labels */}
          <g fontFamily="monospace" fill="#2a2a2a" fontSize="5.5">
            <text x="350" y="24" opacity="0.07">// val_accuracy: 97.2%</text>
            <text x="720" y="24" textAnchor="middle" opacity="0.065">epoch 128 · loss: 0.034 · lr: 1e-4</text>
            <text x="1050" y="24" opacity="0.065">// model: transformer_v3</text>
          </g>

        </g>
      </svg>
    </div>
  );
};
