import React, { useRef, useState, useEffect } from "react";
import "./CorkboardGrid.css";
import defaultBg from "../assets/corkboard_bg.jpg";

// Default cards: compact, cohesive arrangement around WORK
const DEFAULT_CARDS = [
  { id: 1, title: "Creatives", tag: "Creatives", x: 73, y: 20, r: 4, img: "" },
  { id: 2, title: "Designed and Branding", tag: "Branding", x: 76, y: 58, r: -3, img: "" },
  { id: 3, title: "Motion Graphics & Typography", tag: "Motion", x: 23, y: 54, r: -5, img: "" },
  { id: 4, title: "Video Editing", tag: "Video", x: 48, y: 78, r: 3, img: "" },
];

export default function CorkboardGrid({
  cards = DEFAULT_CARDS,
  heading = "WORK",
  bgImage,
  onSelect,
}) {
  const boardRef = useRef(null);
  const rRef = useRef(null);
  const [hubPos, setHubPos] = useState({ x: 27, y: 10.5 });
  const finalBg = bgImage || defaultBg;

  useEffect(() => {
    const updateHub = () => {
      if (!rRef.current || !boardRef.current) return;
      const rRect = rRef.current.getBoundingClientRect();
      const boardRect = boardRef.current.getBoundingClientRect();
      if (boardRect.width === 0 || boardRect.height === 0) return;
      // Position pin onto the upper junction / loop of letter R
      const x = ((rRect.left + rRect.width * 0.48 - boardRect.left) / boardRect.width) * 100;
      const y = ((rRect.top + rRect.height * 0.38 - boardRect.top) / boardRect.height) * 100;
      setHubPos({
        x: Number(x.toFixed(1)),
        y: Number(y.toFixed(1)),
      });
    };

    updateHub();
    window.addEventListener("resize", updateHub);
    const timer = setTimeout(updateHub, 120);
    return () => {
      window.removeEventListener("resize", updateHub);
      clearTimeout(timer);
    };
  }, [heading]);

  return (
    <section
      ref={boardRef}
      className="cork-board"
      aria-label={typeof heading === "string" ? heading : "Work Portfolio"}
    >
      {/* Background Cartoon Character Layer */}
      <div className="cork-bg-layer" aria-hidden="true">
        <img
          src={finalBg}
          alt="Sharique creative character illustration"
          className="cork-bg-img"
        />
        <div className="cork-bg-overlay" />
      </div>

      {/* Single-line WORK Header & Blue PORTFOLIO Tag */}
      <div className="cork-header-wrap">
        <h2 className="cork-heading">
          {heading === "WORK" ? (
            <>
              WO<span ref={rRef} className="cork-heading-r">R</span>K
            </>
          ) : (
            heading
          )}
        </h2>
        <div className="cork-tag">PORTFOLIO</div>
      </div>

      {/* Red Strings connecting Letter R pin to each card's pin */}
      <svg
        className="cork-strings"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {cards.map((c) => {
          // Card top pin is roughly 11% above card center
          const targetY = c.y - 11;
          const mx = (hubPos.x + c.x) / 2;
          const my = (hubPos.y + targetY) / 2 + 2; // subtle natural sag
          return (
            <path
              key={c.id}
              d={`M ${hubPos.x} ${hubPos.y} Q ${mx} ${my} ${c.x} ${targetY}`}
              className="cork-string"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {/* Main Red Pin attached to Letter R in WORK */}
      <span
        className="cork-pin cork-pin--hub"
        style={{ left: hubPos.x + "%", top: hubPos.y + "%" }}
      />

      {/* The 4 Pinned Creative Cards */}
      {cards.map((c) => (
        <button
          key={c.id}
          type="button"
          className="cork-card"
          style={{ "--x": c.x + "%", "--y": c.y + "%", "--r": c.r + "deg" }}
          onClick={() => onSelect && onSelect(c)}
          aria-label={c.title}
        >
          <span className="cork-pin cork-pin--card" />
          <div className="cork-photo">
            {c.img ? (
              <img src={c.img} alt={c.title} loading="lazy" />
            ) : (
              <span className="cork-ph">{c.tag}</span>
            )}
          </div>
          <div className="cork-caption">{c.title}</div>
        </button>
      ))}
    </section>
  );
}
