import React, { useEffect, useMemo, useRef, useState } from "react";
import "./CorkboardHome.css";

/**
 * Mobile-only corkboard for the HOME cards (< 768px).
 * - `cards`  : the existing 7-card array: ids edits, projects, contact, me, sports, skills, youtube.
 * - `renderFace(card, isActive)` : your EXISTING card-face component so every card keeps
 *                                  its own artwork/theme. The ME card keeps its portrait.
 * - `onOpen(card)` : your EXISTING click handler (navigate(card.route)).
 * - `onActive(card|null)` : optional, your existing hover/focus callback that updates the hero label.
 * No fake board background is drawn: the portfolio's own clean background shows through.
 */

// Layout in % of board width (x) and % of board HEIGHT (y). rot = tilt in degrees. w = card width in % of board.
// ME (the about card with the portrait) takes the centre "group photo" spot.
const SLOTS = {
  edits:    { x: 23, y: 25, rot: -8, w: 34 },
  projects: { x: 77, y: 24, rot:  7, w: 34 },
  contact:  { x: 18, y: 50, rot:  6, w: 33 },
  me:       { x: 50, y: 51, rot: -2, w: 48 },   // biggest, in the middle, drawn on top
  sports:   { x: 82, y: 51, rot: -6, w: 33 },
  skills:   { x: 24, y: 76, rot: -5, w: 34 },
  youtube:  { x: 76, y: 77, rot:  7, w: 34 },
};

// Strings: every card connects to the ME pin, plus neighbour links to create the web.
const LINKS = [
  ["edits", "me"],
  ["projects", "me"],
  ["contact", "me"],
  ["sports", "me"],
  ["skills", "me"],
  ["youtube", "me"],
  ["edits", "projects"],
  ["edits", "contact"],
  ["projects", "sports"],
  ["contact", "skills"],
  ["sports", "youtube"],
  ["skills", "youtube"],
];

const FACE_W = 170, FACE_H = 260; // card face base dimension (px)
const PAD = 8, CAPTION = 26;       // polaroid padding + caption strip (px)

export default function CorkboardHome({ cards, renderFace, onOpen, onActive }) {
  const ref = useRef(null);
  const [W, setW] = useState(360);
  const [pressed, setPressed] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const updateWidth = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0) {
        setW(rect.width);
      }
    };
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    updateWidth();
    return () => ro.disconnect();
  }, []);

  const H = Math.round(W * 1.34); // board height follows width

  const laid = useMemo(() => {
    const out = {};
    cards.forEach((c) => {
      const s = SLOTS[c.id];
      if (!s) return;
      const targetW = (s.w / 100) * W;
      const scale = Math.max(0.4, (targetW - PAD * 2) / FACE_W);
      const faceW = Math.round(FACE_W * scale);
      const faceH = Math.round(FACE_H * scale);
      const frameW = faceW + PAD * 2;
      const frameH = faceH + PAD + CAPTION;
      const cx = (s.x / 100) * W;
      const cy = (s.y / 100) * H;

      // Exact rotated pushpin position at top center of each card
      const rad = (s.rot * Math.PI) / 180;
      const d = frameH / 2 - 2;
      const pinX = cx + d * Math.sin(rad);
      const pinY = cy - d * Math.cos(rad);

      out[c.id] = { ...s, frameW, frameH, faceW, faceH, scale, cx, cy, pinX, pinY };
    });
    return out;
  }, [cards, W, H]);

  const string = (a, b) => {
    const A = laid[a], B = laid[b];
    if (!A || !B) return null;
    const mx = (A.pinX + B.pinX) / 2;
    const my = (A.pinY + B.pinY) / 2 + 8; // slight gravitational sag
    return `M${A.pinX} ${A.pinY} Q${mx} ${my} ${B.pinX} ${B.pinY}`;
  };

  return (
    <div className="ck" ref={ref} style={{ height: H }}>
      {/* Red web connecting strings */}
      <svg className="ck-strings" width={W} height={H} aria-hidden="true">
        {LINKS.map(([a, b], i) => (
          <path
            key={a + "-" + b}
            d={string(a, b) || ""}
            className="ck-string"
            style={{ animationDelay: 0.2 + i * 0.05 + "s" }}
          />
        ))}
      </svg>

      {/* 7 Polaroid Cards */}
      {cards.map((c, i) => {
        const L = laid[c.id];
        if (!L) return null;
        const isMe = c.id === "me";
        const isPressed = pressed === c.id;

        return (
          <button
            key={c.id}
            type="button"
            className={"ck-card" + (isMe ? " ck-me" : "") + (isPressed ? " is-pressed" : "")}
            style={{
              left: L.cx,
              top: L.cy,
              width: L.frameW,
              height: L.frameH,
              "--rot": L.rot + "deg",
              zIndex: isPressed ? 60 : isMe ? 30 : 10 + i,
              animationDelay: i * 0.06 + "s",
            }}
            aria-label={"Open " + c.title}
            onClick={() => onOpen && onOpen(c)}
            onPointerDown={() => {
              setPressed(c.id);
              if (onActive) onActive(c);
            }}
            onPointerUp={() => setPressed(null)}
            onPointerCancel={() => setPressed(null)}
            onPointerLeave={() => setPressed(null)}
          >
            {/* Top red pushpin */}
            <span className="ck-pin" />

            {/* Exactly scaled card face */}
            <span className="ck-face-wrap" style={{ width: L.faceW, height: L.faceH }}>
              <span
                className="ck-face"
                style={{
                  width: FACE_W,
                  height: FACE_H,
                  transform: `scale(${L.scale})`,
                }}
              >
                {renderFace(c, isPressed)}
              </span>
            </span>

            {/* Polaroid caption */}
            <span className="ck-cap">{isMe ? "ABOUT ME" : c.title}</span>
          </button>
        );
      })}

      {/* Pushpin knots drawn above strings for realistic anchoring */}
      {Object.entries(laid).map(([id, L]) => (
        <i
          key={"knot-" + id}
          className="ck-knot"
          style={{ left: L.pinX, top: L.pinY, zIndex: 40 }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
