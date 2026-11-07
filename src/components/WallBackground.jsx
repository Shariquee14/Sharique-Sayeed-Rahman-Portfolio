import React from 'react'
import './WallBackground.css'

export default function WallBackground({
  pointerX = 0,
  pointerY = 0,
  scrollX = 0,
  scrollY = 0,
  speed = 0,
  stageWidth = 1440,
  stageHeight = 800,
  reduced = false,
}) {
  // Parallax grid that shifts opposite to the pointer AND moves with wall scroll
  const gridShiftX = (-pointerX * 28 + (scrollX * 12) % 32)
  const gridShiftY = (-pointerY * 22 + (scrollY * 12) % 32)
  const gridStyle = reduced
    ? {}
    : {
        transform: `translate3d(${gridShiftX.toFixed(1)}px, ${gridShiftY.toFixed(1)}px, 0)`,
      }

  // Soft spotlight behind focused card that tracks pointer smoothly
  const spotlightX = stageWidth / 2 + pointerX * (stageWidth * 0.44)
  const spotlightY = stageHeight / 2 + pointerY * (stageHeight * 0.42)
  const spotlightStyle = reduced
    ? { display: 'none' }
    : {
        transform: `translate3d(${spotlightX.toFixed(1)}px, ${spotlightY.toFixed(1)}px, 0)`,
      }

  // Subtle speed stretch when scrolling fast
  const speedRatio = Math.min(1, Math.max(0, (speed - 0.5) / 1.5))
  const streakOpacity = reduced ? 0 : speedRatio * 0.55

  // Parallax depth styles for floating shapes
  const p1 = reduced ? {} : { transform: `translate3d(${(-pointerX * 16).toFixed(1)}px, ${(-pointerY * 12).toFixed(1)}px, 0)` }
  const p2 = reduced ? {} : { transform: `translate3d(${(-pointerX * 28).toFixed(1)}px, ${(-pointerY * 20).toFixed(1)}px, 0)` }
  const p3 = reduced ? {} : { transform: `translate3d(${(-pointerX * 38).toFixed(1)}px, ${(-pointerY * 26).toFixed(1)}px, 0)` }

  return (
    <div className="cw-bg" aria-hidden="true">
      {/* 1. Very soft drifting gradient orbs (Pale blue, Lavender, Peach, Mint) */}
      <div className="cw-bg-orb cw-bg-orb-1" />
      <div className="cw-bg-orb cw-bg-orb-2" />
      <div className="cw-bg-orb cw-bg-orb-3" />
      <div className="cw-bg-orb cw-bg-orb-4" />

      {/* 2. Faint dot grid that shifts opposite to pointer AND moves with wall scroll speed */}
      <div className="cw-bg-grid" style={gridStyle} />

      {/* 3. Soft spotlight under the focused card */}
      <div className="cw-bg-spotlight" style={spotlightStyle} />

      {/* 4. Thin floating shapes at different depths */}
      <div className="cw-bg-shape cw-shape-ring-1" style={p1} />
      <div className="cw-bg-shape cw-shape-ring-2" style={p2} />
      <div className="cw-bg-shape cw-shape-plus-1" style={p2}>+</div>
      <div className="cw-bg-shape cw-shape-plus-2" style={p1}>+</div>
      <div className="cw-bg-shape cw-shape-dot-1" style={p3} />
      <div className="cw-bg-shape cw-shape-dot-2" style={p1} />
      <div className="cw-bg-shape cw-shape-line-1" style={p2} />
      <div className="cw-bg-shape cw-shape-line-2" style={p3} />

      {/* 5. Speed streaks when the wall scrolls fast */}
      <div
        className="cw-bg-streak cw-streak-1"
        style={{ opacity: streakOpacity, transform: `scaleX(${1 + speedRatio * 0.4})` }}
      />
      <div
        className="cw-bg-streak cw-streak-2"
        style={{ opacity: streakOpacity, transform: `scaleX(${1 + speedRatio * 0.4})` }}
      />
      <div
        className="cw-bg-streak cw-streak-3"
        style={{ opacity: streakOpacity, transform: `scaleX(${1 + speedRatio * 0.4})` }}
      />
    </div>
  )
}
