import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { useAnimationFrame, useReducedMotion } from 'framer-motion'
import { creatives } from '../data/creatives'
import WallBackground from './WallBackground'
import './CurvedWall.css'

/* ------------------------------------------------------------------
   FULL-AREA 3D SPHERICAL FOCUS WALL (v3)
------------------------------------------------------------------ */
const SIGMA = 1.15           // focus spread falloff
const Z_LIFT = 180           // px a focused card pops forward toward viewer
const ANGLE_Y = 12           // degrees outer columns turn inward
const ANGLE_X = 10           // degrees outer rows tilt inward (spherical bend)
const CURVE_X = 0.14         // horizontal spherical depth curvature
const CURVE_Y = 0.12         // vertical spherical depth curvature
const MAX_SPEED_X = 2.4      // max scroll speed in columns / second
const MAX_SPEED_Y = 2.0      // max scroll speed in rows / second
const DEADBAND = 0.12        // center calm zone
const FRICTION = 0.94        // touch drag momentum deceleration factor
const SWAY = { ax: 0.35, ay: 0.18, speed: 0.00045 }
const SWAY_AFTER_MS = 2200

// Shape multiplier per aspect ratio
const ASPECTS = {
  square: [1, 1],
  portrait: [0.82, 1.18],
  landscape: [1.16, 0.84],
}

// Symmetric modulo wrap around max
const wrap = (val, max) => ((((val + max / 2) % max) + max) % max) - max / 2

/* ------------------------------------------------------------------ */

export default function CurvedWall({ items = creatives, label = 'Creatives gallery' }) {
  const rootRef = useRef(null)
  const planeRef = useRef(null)
  const reduced = useReducedMotion()

  // Dynamically compute grid dimensions from the items array
  const totalItems = items.length
  const COLS = Math.max(5, Math.ceil(Math.sqrt(totalItems * 1.3)))
  const ROWS = Math.max(4, Math.ceil(totalItems / COLS))

  // Responsive full-area sizing
  const [layout, setLayout] = useState({
    cw: 220,
    gx: 270,
    gy: 240,
    width: 1440,
    height: 740,
  })
  const layoutRef = useRef(layout)

  // DOM refs to all cards for 60fps direct transform updates
  const cardRefs = useRef([])

  // State for WallBackground
  const [bgState, setBgState] = useState({
    pointerX: 0,
    pointerY: 0,
    scrollX: 0,
    scrollY: 0,
    speed: 0,
  })

  // Physics and continuous scroll states
  const scrollRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    targetVx: 0,
    targetVy: 0,
    pointerX: 0,
    pointerY: 0,
    smoothPointerX: 0,
    smoothPointerY: 0,
    tiltX: 0,
    tiltY: 0,
    isInteracting: false,
    lastInteractTime: 0,
    // Touch dragging tracking
    isDragging: false,
    lastTouchX: 0,
    lastTouchY: 0,
    dragVx: 0,
    dragVy: 0,
    lastTouchTime: 0,
  })

  // Measure full-bleed area: cards fill entire remaining width & height
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return

    const measure = () => {
      const W = window.innerWidth
      const headerOffset = W < 640 ? 140 : 160
      const H = Math.max(540, window.innerHeight - headerOffset)

      const isMobile = W < 640
      // Large cards so the wall spans all four edges with outer cards partly bleeding out
      const cw = isMobile
        ? Math.max(130, Math.round(W / 2.7))
        : Math.max(190, Math.min(240, Math.round(W / 6.0)))

      const gx = Math.round(cw * (isMobile ? 0.95 : 1.15))
      const gy = Math.round(cw * (isMobile ? 1.05 : 1.08))

      const next = { cw, gx, gy, width: W, height: H }
      layoutRef.current = next
      setLayout(next)
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Mouse & Pointer Tracking: full responsiveness across top, bottom, and side edges
  const handlePointerMove = (clientX, clientY) => {
    const el = rootRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height) return

    const s = scrollRef.current
    // Normalized position relative to center [-1, 1] across the FULL area
    const nx = Math.max(-1, Math.min(1, (clientX - (r.left + r.width / 2)) / (r.width / 2)))
    const ny = Math.max(-1, Math.min(1, (clientY - (r.top + r.height / 2)) / (r.height / 2)))

    s.pointerX = nx
    s.pointerY = ny
    s.isInteracting = true
    s.lastInteractTime = performance.now()

    // Deadband check: calm in center, responsive in all 4 directions (top & bottom react identically to middle)
    const absX = Math.abs(nx)
    const absY = Math.abs(ny)

    s.targetVx =
      absX <= DEADBAND
        ? 0
        : Math.sign(nx) * Math.pow((absX - DEADBAND) / (1 - DEADBAND), 1.25) * MAX_SPEED_X

    s.targetVy =
      absY <= DEADBAND
        ? 0
        : Math.sign(ny) * Math.pow((absY - DEADBAND) / (1 - DEADBAND), 1.25) * MAX_SPEED_Y
  }

  const onPointerMove = (e) => {
    if (reduced || scrollRef.current.isDragging) return
    handlePointerMove(e.clientX, e.clientY)
  }

  const onPointerLeave = () => {
    const s = scrollRef.current
    s.isInteracting = false
    s.targetVx = 0
    s.targetVy = 0
    s.lastInteractTime = performance.now() - SWAY_AFTER_MS + 400
  }

  // Mobile Touch drag with momentum; vertical page scroll preserved via touch-action: pan-y
  const onTouchStart = (e) => {
    if (reduced || !e.touches || !e.touches[0]) return
    const t = e.touches[0]
    const s = scrollRef.current
    s.isDragging = true
    s.isInteracting = true
    s.lastTouchX = t.clientX
    s.lastTouchY = t.clientY
    s.dragVx = 0
    s.dragVy = 0
    s.lastTouchTime = performance.now()
    handlePointerMove(t.clientX, t.clientY)
  }

  const onTouchMove = (e) => {
    if (reduced || !e.touches || !e.touches[0]) return
    const t = e.touches[0]
    const s = scrollRef.current
    const now = performance.now()
    const dt = Math.max(0.008, (now - s.lastTouchTime) / 1000)

    const dx = t.clientX - s.lastTouchX
    const dy = t.clientY - s.lastTouchY

    const { gx, gy } = layoutRef.current
    if (gx > 0 && gy > 0) {
      s.x -= dx / gx
      s.y -= dy / gy
      s.dragVx = - (dx / gx) / dt
      s.dragVy = - (dy / gy) / dt
    }

    s.lastTouchX = t.clientX
    s.lastTouchY = t.clientY
    s.lastTouchTime = now
    s.lastInteractTime = now
    handlePointerMove(t.clientX, t.clientY)
  }

  const onTouchEnd = () => {
    const s = scrollRef.current
    s.isDragging = false
    s.lastInteractTime = performance.now()
    s.vx = Math.max(-MAX_SPEED_X * 1.5, Math.min(MAX_SPEED_X * 1.5, s.dragVx * 0.45))
    s.vy = Math.max(-MAX_SPEED_Y * 1.5, Math.min(MAX_SPEED_Y * 1.5, s.dragVy * 0.45))
    s.targetVx = 0
    s.targetVy = 0
  }

  useEffect(() => {
    const el = rootRef.current
    if (!el || reduced) return

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove', onTouchMove, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove', onTouchMove)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [reduced])

  // 60FPS Spherical 3D Animation Loop with Wall Tilt and Edge Coverage
  useAnimationFrame((time, delta) => {
    if (reduced) return

    const s = scrollRef.current
    const dt = Math.min(0.05, Math.max(0.001, delta / 1000))
    const { cw, gx, gy } = layoutRef.current
    if (!cw || !gx || !gy) return

    // 1. Position and Velocity integration with springy inertia
    if (!s.isDragging) {
      const accelRate = Math.min(1, dt * 5.5)
      s.vx += (s.targetVx - s.vx) * accelRate
      s.vy += (s.targetVy - s.vy) * accelRate

      if (s.targetVx === 0 && Math.abs(s.vx) > 0.01) s.vx *= FRICTION
      if (s.targetVy === 0 && Math.abs(s.vy) > 0.01) s.vy *= FRICTION

      s.x += s.vx * dt
      s.y += s.vy * dt
    }

    // 2. Pointer tracking & springy wall tilt toward pointer (4-6 degrees)
    s.smoothPointerX += (s.pointerX - s.smoothPointerX) * Math.min(1, dt * 9)
    s.smoothPointerY += (s.pointerY - s.smoothPointerY) * Math.min(1, dt * 9)

    // Gentle tilt of the whole wall toward the pointer
    const targetTiltX = -s.smoothPointerY * 5.2
    const targetTiltY = s.smoothPointerX * 5.8
    s.tiltX += (targetTiltX - s.tiltX) * Math.min(1, dt * 7)
    s.tiltY += (targetTiltY - s.tiltY) * Math.min(1, dt * 7)

    if (planeRef.current) {
      planeRef.current.style.transform = `rotateX(${s.tiltX.toFixed(2)}deg) rotateY(${s.tiltY.toFixed(2)}deg)`
    }

    // Update background state smoothly
    const currentSpeed = Math.hypot(s.vx, s.vy)
    setBgState({
      pointerX: s.smoothPointerX,
      pointerY: s.smoothPointerY,
      scrollX: s.x,
      scrollY: s.y,
      speed: currentSpeed,
    })

    // 3. Idle sway when idle
    let swayX = 0
    let swayY = 0
    if (performance.now() - s.lastInteractTime >= SWAY_AFTER_MS) {
      swayX = Math.sin(time * SWAY.speed) * SWAY.ax
      swayY = Math.cos(time * SWAY.speed * 0.7) * SWAY.ay
    }

    const currentScrollX = s.x + swayX
    const currentScrollY = s.y + swayY

    // 4. Pointer focus position in on-screen grid space (spanning top, bottom & corners)
    const pointerCellX = s.smoothPointerX * 2.5
    const pointerCellY = s.smoothPointerY * 1.8

    // 5. Transform all cards: spherical bend, no square lines, edge bleeding
    const cardList = cardRefs.current
    for (let i = 0; i < totalItems; i++) {
      const cardEl = cardList[i]
      if (!cardEl) continue

      const col0 = i % COLS
      const row0 = Math.floor(i / COLS)

      // Endless modulo wrap
      const relX = wrap(col0 - currentScrollX, COLS)
      const relY = wrap(row0 - currentScrollY, ROWS)

      // Culling: keep visible window + edges rendered
      if (Math.abs(relX) > 3.4 || Math.abs(relY) > 2.6) {
        cardEl.style.display = 'none'
        continue
      }
      cardEl.style.display = 'block'

      // Focus distance from pointer to this card centre
      const dist = Math.hypot(relX - pointerCellX, relY - pointerCellY)
      const focus = dist <= 0.35 ? 1.0 : Math.exp(-((dist - 0.35) ** 2) / (SIGMA * SIGMA))

      // SPHERICAL BEND: cards toward the edges sink in depth and rotate inward in BOTH X & Y
      const baseSphereZ = - (CURVE_X * (relX * relX) + CURVE_Y * (relY * relY)) * cw
      const edgeDropZ =
        Math.max(0, Math.abs(relX) - 2.2) ** 2 * 140 +
        Math.max(0, Math.abs(relY) - 1.6) ** 2 * 140
      const baseZ = baseSphereZ - edgeDropZ

      // 3D rotations toward the centre of the sphere
      const rotY = (relX * ANGLE_Y) * (1 - focus)
      const rotX = (-relY * ANGLE_X) * (1 - focus)

      // Lift focused card forward in Z (scale 0.76 to 1.0 => NO CSS upscale blur!)
      const z = baseZ + Z_LIFT * focus
      const scale = 0.76 + 0.24 * focus
      const x = relX * gx
      const y = relY * gy
      const zIndex = 10 + Math.round(focus * 100)

      // Growing contact shadow when card comes forward
      if (focus > 0.45) {
        if (!cardEl.classList.contains('is-focused')) cardEl.classList.add('is-focused')
      } else {
        if (cardEl.classList.contains('is-focused')) cardEl.classList.remove('is-focused')
      }

      cardEl.style.transform = `translate3d(${Math.round(x * 10) / 10}px, ${Math.round(y * 10) / 10}px, ${Math.round(z * 10) / 10}px) rotateX(${Math.round(rotX * 10) / 10}deg) rotateY(${Math.round(rotY * 10) / 10}deg) scale(${scale.toFixed(3)})`
      cardEl.style.zIndex = zIndex
    }
  })

  const { cw, width, height } = layout

  return (
    <div
      ref={rootRef}
      className="cw-root"
      role="region"
      aria-label={label}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerMove}
      onPointerEnter={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* 1. Living Motion Graphics Background */}
      <WallBackground
        pointerX={bgState.pointerX}
        pointerY={bgState.pointerY}
        scrollX={bgState.scrollX}
        scrollY={bgState.scrollY}
        speed={bgState.speed}
        stageWidth={width}
        stageHeight={height}
        reduced={reduced}
      />

      {/* 2. 3D Spherical Stage with Whole-Wall Springy Tilt */}
      <div className="cw-stage">
        <div ref={planeRef} className="cw-plane">
          {items.map((item, i) => {
            const [aw, ah] = ASPECTS[item.aspect] || ASPECTS.square
            const w = Math.round(cw * aw)
            const h = Math.round(cw * ah)
            const borderRadius = Math.min(22, Math.round(cw * 0.12))

            return (
              <div
                key={item.src + i}
                ref={(el) => { cardRefs.current[i] = el }}
                className="cw-card"
                style={{
                  width: w,
                  height: h,
                  marginLeft: -w / 2,
                  marginTop: -h / 2,
                  borderRadius,
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt || ''}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
