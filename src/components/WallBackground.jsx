import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import './WallBackground.css'

const WallBackground = forwardRef(function WallBackground({
  stageWidth = 1440,
  stageHeight = 800,
  reduced = false,
}, ref) {
  const gridRef = useRef(null)
  const spotlightRef = useRef(null)
  const p1Ref = useRef([])
  const p2Ref = useRef([])
  const p3Ref = useRef([])
  const streaksRef = useRef([])

  // Expose imperative update method so CurvedWall can animate background
  // directly without causing React component re-renders on every frame (60fps)
  useImperativeHandle(ref, () => ({
    update(pointerX, pointerY, scrollX, scrollY, speed) {
      if (reduced) return

      // 1. Parallax dot grid
      if (gridRef.current) {
        const gridShiftX = (-pointerX * 28 + (scrollX * 12) % 32)
        const gridShiftY = (-pointerY * 22 + (scrollY * 12) % 32)
        gridRef.current.style.transform = `translate3d(${gridShiftX.toFixed(1)}px, ${gridShiftY.toFixed(1)}px, 0)`
      }

      // 2. Soft spotlight behind focused card
      if (spotlightRef.current) {
        const spotlightX = stageWidth / 2 + pointerX * (stageWidth * 0.44)
        const spotlightY = stageHeight / 2 + pointerY * (stageHeight * 0.42)
        spotlightRef.current.style.transform = `translate3d(${spotlightX.toFixed(1)}px, ${spotlightY.toFixed(1)}px, 0)`
      }

      // 3. Floating shapes depth layers
      const t1 = `translate3d(${(-pointerX * 16).toFixed(1)}px, ${(-pointerY * 12).toFixed(1)}px, 0)`
      const t2 = `translate3d(${(-pointerX * 28).toFixed(1)}px, ${(-pointerY * 20).toFixed(1)}px, 0)`
      const t3 = `translate3d(${(-pointerX * 38).toFixed(1)}px, ${(-pointerY * 26).toFixed(1)}px, 0)`

      for (let i = 0; i < p1Ref.current.length; i++) {
        if (p1Ref.current[i]) p1Ref.current[i].style.transform = t1
      }
      for (let i = 0; i < p2Ref.current.length; i++) {
        if (p2Ref.current[i]) p2Ref.current[i].style.transform = t2
      }
      for (let i = 0; i < p3Ref.current.length; i++) {
        if (p3Ref.current[i]) p3Ref.current[i].style.transform = t3
      }

      // 4. Speed streaks
      const speedRatio = Math.min(1, Math.max(0, (speed - 0.5) / 1.5))
      const streakOpacity = (speedRatio * 0.55).toFixed(2)
      const streakTransform = `scaleX(${(1 + speedRatio * 0.4).toFixed(2)})`

      for (let i = 0; i < streaksRef.current.length; i++) {
        const sEl = streaksRef.current[i]
        if (sEl) {
          sEl.style.opacity = streakOpacity
          sEl.style.transform = streakTransform
        }
      }
    }
  }), [reduced, stageWidth, stageHeight])

  return (
    <div className="cw-bg" aria-hidden="true">
      {/* 1. Very soft drifting gradient orbs */}
      <div className="cw-bg-orb cw-bg-orb-1" />
      <div className="cw-bg-orb cw-bg-orb-2" />
      <div className="cw-bg-orb cw-bg-orb-3" />
      <div className="cw-bg-orb cw-bg-orb-4" />

      {/* 2. Faint dot grid */}
      <div ref={gridRef} className="cw-bg-grid" />

      {/* 3. Soft spotlight under focused card */}
      <div ref={spotlightRef} className="cw-bg-spotlight" />

      {/* 4. Floating shapes at different depth tiers */}
      <div ref={el => { p1Ref.current[0] = el }} className="cw-bg-shape cw-shape-ring-1" />
      <div ref={el => { p2Ref.current[0] = el }} className="cw-bg-shape cw-shape-ring-2" />
      <div ref={el => { p2Ref.current[1] = el }} className="cw-bg-shape cw-shape-plus-1">+</div>
      <div ref={el => { p1Ref.current[1] = el }} className="cw-bg-shape cw-shape-plus-2">+</div>
      <div ref={el => { p3Ref.current[0] = el }} className="cw-bg-shape cw-shape-dot-1" />
      <div ref={el => { p1Ref.current[2] = el }} className="cw-bg-shape cw-shape-dot-2" />
      <div ref={el => { p2Ref.current[2] = el }} className="cw-bg-shape cw-shape-line-1" />
      <div ref={el => { p3Ref.current[1] = el }} className="cw-bg-shape cw-shape-line-2" />

      {/* 5. Speed streaks when scrolling fast */}
      <div ref={el => { streaksRef.current[0] = el }} className="cw-bg-streak cw-streak-1" />
      <div ref={el => { streaksRef.current[1] = el }} className="cw-bg-streak cw-streak-2" />
      <div ref={el => { streaksRef.current[2] = el }} className="cw-bg-streak cw-streak-3" />
    </div>
  )
})

export default WallBackground
