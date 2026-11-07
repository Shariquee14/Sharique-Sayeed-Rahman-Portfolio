import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import {
  motion,
  useAnimationFrame,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { creatives } from '../data/creatives'
import './CurvedWall.css'

/* ------------------------------------------------------------------
   TUNED PARAMETERS FOR CURVED 3D FOCUS WALL
------------------------------------------------------------------ */
const COLS = 5               // 5 columns per row (20 items = 4 rows)
const SIGMA = 1.15           // focus falloff width; neighbours lift slightly
const SCALE_GAIN = 0.38      // focused card expands cleanly by 38%
const Z_LIFT = 160           // px a focused card pops forward toward viewer
const ANGLE = 10             // degrees each column turns to face centre (gentle curve)
const CURVE = 0.12           // outer columns step back slightly in depth
const ARC = 0.04             // gentle vertical arc drop
const SPACING_X = 1.3        // horizontal spacing multiplier (visible gap between cards)
const SPACING_Y = 1.4        // vertical spacing multiplier (visible gap between cards)
const MIN_CARD = 90          // mobile minimum card size in px
const MAX_CARD = 200         // desktop maximum card size in px
const SPRING = { stiffness: 180, damping: 24, mass: 0.5 }   // smooth responsive motion
const SWAY = { ax: 0.45, ay: 0.2, speed: 0.0004 }          // subtle idle alive sway
const SWAY_AFTER_MS = 2000   // resume idle sway 2s after pointer leaves

// Shape of each card, in multiples of the square card size
const ASPECTS = {
  square: [1, 1],
  portrait: [0.82, 1.18],
  landscape: [1.16, 0.84],
}

/* ------------------------------------------------------------------ */

export default function CurvedWall({ items = creatives, label = 'Creatives gallery' }) {
  const rootRef = useRef(null)
  const reduced = useReducedMotion()
  const rows = Math.max(1, Math.ceil(items.length / COLS))

  // Responsive layout state measured from the container width
  const [layout, setLayout] = useState({ cw: 180, gx: 234, gy: 252, maxPanX: 0 })
  const layoutRef = useRef(layout)

  // Pointer position in grid coordinates
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const lastInteract = useRef(0)
  const sx = useSpring(rawX, SPRING)
  const sy = useSpring(rawY, SPRING)

  // Measure container and size cards so the wall fills the container width
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    const measure = () => {
      const W = el.getBoundingClientRect().width
      const spanUnits = (COLS - 1) * SPACING_X + 1
      const cw = Math.round(
        Math.min(MAX_CARD, Math.max(MIN_CARD, W / spanUnits)),
      )
      const gx = Math.round(cw * SPACING_X)
      const gy = Math.round(cw * SPACING_Y)
      // On mobile / narrow screens where grid width exceeds container width,
      // allow the wall to pan so side columns can be centered when focused
      const maxPanX = W < 768 ? Math.round(((COLS - 1) / 2) * gx) : 0
      const next = { cw, gx, gy, maxPanX }
      layoutRef.current = next
      setLayout(next)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Idle sway so the wall stays alive when nobody is interacting
  useAnimationFrame((t) => {
    if (reduced) return
    if (performance.now() - lastInteract.current < SWAY_AFTER_MS) return
    rawX.set(Math.sin(t * SWAY.speed) * SWAY.ax)
    rawY.set(Math.cos(t * SWAY.speed * 0.7) * SWAY.ay)
  })

  // Map mouse / finger across the ENTIRE wall width and height:
  // left edge = first column (col 0, targetX = -2)
  // right edge = last column (col 4, targetX = +2)
  // top edge = first row (row 0, targetY = -1.5)
  // bottom edge = last row (row 3, targetY = +1.5)
  const setFromPointer = (e) => {
    const el = rootRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (!r.width || !r.height) return

    const clientX =
      e.clientX !== undefined
        ? e.clientX
        : e.touches && e.touches[0]
        ? e.touches[0].clientX
        : 0
    const clientY =
      e.clientY !== undefined
        ? e.clientY
        : e.touches && e.touches[0]
        ? e.touches[0].clientY
        : 0

    const normX = Math.max(0, Math.min(1, (clientX - r.left) / r.width))
    const normY = Math.max(0, Math.min(1, (clientY - r.top) / r.height))

    const targetX = (normX - 0.5) * (COLS - 1)
    const targetY = (normY - 0.5) * (rows - 1)

    rawX.set(targetX)
    rawY.set(targetY)
    lastInteract.current = performance.now()
  }

  // Active touch drag support on mobile while preserving vertical scroll (pan-y)
  useEffect(() => {
    const el = rootRef.current
    if (!el || reduced) return

    const handleTouch = (e) => {
      if (e.touches && e.touches[0]) {
        setFromPointer(e.touches[0])
      }
    }

    el.addEventListener('touchmove', handleTouch, { passive: true })
    el.addEventListener('touchstart', handleTouch, { passive: true })

    return () => {
      el.removeEventListener('touchmove', handleTouch)
      el.removeEventListener('touchstart', handleTouch)
    }
  }, [reduced, rows])

  const handlers = reduced
    ? {}
    : {
        onPointerMove: setFromPointer,
        onPointerDown: setFromPointer,
        onPointerEnter: setFromPointer,
        onTouchStart: setFromPointer,
        onTouchMove: setFromPointer,
        onPointerUp: () => {
          lastInteract.current = performance.now()
        },
        onTouchEnd: () => {
          lastInteract.current = performance.now()
        },
        onPointerLeave: () => {
          lastInteract.current = performance.now() - SWAY_AFTER_MS + 200
        },
        onPointerCancel: () => {
          lastInteract.current = 0
        },
      }

  const { cw, gx, gy, maxPanX } = layout
  const height = Math.round((rows - 1) * gy + cw * 1.95)

  // On mobile, pan the plane smoothly with sx so the focused column centers on screen
  const planeX = useTransform(sx, (x) => {
    if (!maxPanX || maxPanX <= 0) return 0
    const norm = x / ((COLS - 1) / 2) // -1 to +1
    return -norm * maxPanX
  })

  return (
    <div
      ref={rootRef}
      className="cw-root"
      role="region"
      aria-label={label}
      style={{ height }}
      {...handlers}
    >
      <div className="cw-stage">
        <motion.div className="cw-plane" style={{ x: planeX }}>
          {items.map((item, i) => {
            const col = i % COLS
            const row = Math.floor(i / COLS)
            const cx = col - (COLS - 1) / 2
            const cy = row - (rows - 1) / 2
            return (
              <WallCard
                key={item.src + i}
                item={item}
                cx={cx}
                cy={cy}
                cw={cw}
                gx={gx}
                gy={gy}
                sxv={sx}
                syv={sy}
                reduced={reduced}
              />
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

function WallCard({ item, cx, cy, cw, gx, gy, sxv, syv, reduced }) {
  const [aw, ah] = ASPECTS[item.aspect] || ASPECTS.square
  const w = Math.round(cw * aw)
  const h = Math.round(cw * ah)

  // Distance from pointer to this card centre:
  // Card nearest the pointer reaches full focus (1.0), with falloff lifting neighbours slightly
  const focus = useTransform([sxv, syv], ([x, y]) => {
    if (reduced) return 0
    const dist = Math.hypot(x - cx, y - cy)
    if (dist <= 0.3) return 1.0
    return Math.exp(-((dist - 0.3) ** 2) / (SIGMA * SIGMA))
  })

  // Base 3D curved wall geometry
  const baseZ = -CURVE * cw * cx * cx
  const baseY = ARC * cw * cx * cx
  const baseRot = cx * ANGLE

  // Transforms only: z, rotateY, scale, zIndex
  // No opacity or filter animation so cards stay 100% crisp and colourful
  const z = useTransform(focus, (f) => baseZ + Z_LIFT * f)
  const rotateY = useTransform(focus, (f) => baseRot * (1 - f))
  const scale = useTransform(focus, (f) => 1 + SCALE_GAIN * f)
  const zIndex = useTransform(focus, (f) => 10 + Math.round(f * 100))

  return (
    <motion.div
      className="cw-card"
      style={{
        width: w,
        height: h,
        borderRadius: Math.min(20, Math.round(cw * 0.14)),
        left: -w / 2,
        top: -h / 2,
        x: cx * gx,
        y: cy * gy + baseY,
        z,
        rotateY,
        scale,
        zIndex,
      }}
    >
      <img
        src={item.src}
        alt={item.alt || ''}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </motion.div>
  )
}
