import { useState, useEffect, useCallback, useRef } from "react";
import ImageCard from "./ImageCard";

import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img8 from "../assets/img8.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

function LikeHeartIcon({ className }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 72 72"
      fill="none"
    >
      <path
        d="M50.5 11.5c-5.9 0-10.8 3-13.4 7.7c-2.6-4.7-7.5-7.7-13.4-7.7C14.8 11.5 8 18.4 8 27c0 15.7 18.6 29.3 29.1 37.5C47.4 56.3 66 42.7 66 27c0-8.6-6.8-15.5-15.5-15.5Z"
        fill="#d9dce3"
        stroke="#4c83c9"
        strokeWidth="2.8"
        transform="translate(2 -5) scale(0.9)"
      />
      <path
        d="M50.5 11.5c-5.9 0-10.8 3-13.4 7.7c-2.6-4.7-7.5-7.7-13.4-7.7C14.8 11.5 8 18.4 8 27c0 15.7 18.6 29.3 29.1 37.5C47.4 56.3 66 42.7 66 27c0-8.6-6.8-15.5-15.5-15.5Z"
        fill="#7bb4f7"
        stroke="#4c83c9"
        strokeWidth="3"
      />
      <path
        d="M44 18.5c4.9 0 8.6 3.7 8.6 8.8"
        stroke="#4c83c9"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}

export default function GalleryGrid() {
  const [selected, setSelected] = useState(null);
  const [showLikeBurst, setShowLikeBurst] = useState(false);
  const lastTapRef = useRef(0);
  const likeBurstTimerRef = useRef(null);

  const close = useCallback(() => setSelected(null), []);
  const prev = useCallback(() =>
    setSelected(i => (i - 1 + images.length) % images.length), []);
  const next = useCallback(() =>
    setSelected(i => (i + 1) % images.length), []);

  const triggerLike = useCallback(() => {
    if (selected === null) {
      return;
    }

    setShowLikeBurst(false);
    if (likeBurstTimerRef.current) {
      clearTimeout(likeBurstTimerRef.current);
    }

    requestAnimationFrame(() => {
      setShowLikeBurst(true);
    });

    likeBurstTimerRef.current = window.setTimeout(() => {
      setShowLikeBurst(false);
    }, 850);
  }, [selected]);

  const handleMediaTouchEnd = useCallback(() => {
    const now = Date.now();

    if (now - lastTapRef.current < 280) {
      triggerLike();
    }

    lastTapRef.current = now;
  }, [triggerLike]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected, close, prev, next]);

  useEffect(() => {
    return () => {
      if (likeBurstTimerRef.current) {
        clearTimeout(likeBurstTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <ImageCard key={index} image={img} onClick={() => setSelected(index)} />
        ))}
      </div>

      {selected !== null && (
        <div className="lightbox-overlay" onClick={close}>

          {/* ── Top bar ── */}
          <div className="lb-topbar" onClick={(e) => e.stopPropagation()}>
            <span className="lb-topbar-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                <line x1="4" y1="22" x2="4" y2="15"/>
              </svg>
              Lucky&apos;s Moments
            </span>
            <span className="lb-topbar-count">{selected + 1} / {images.length}</span>
            <button className="lb-close" onClick={close} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* ── Prev arrow ── */}
          <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* ── Main image ── */}
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <div className="lb-media" onDoubleClick={triggerLike} onTouchEnd={handleMediaTouchEnd}>
              <img src={images[selected]} alt={`Memory ${selected + 1}`} className="lb-img" />
              {showLikeBurst && (
                <div className="lightbox-like-burst" aria-hidden="true">
                  <LikeHeartIcon className="lightbox-heart-svg" />
                </div>
              )}
            </div>
          </div>

          {/* ── Next arrow ── */}
          <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* ── Bottom strip ── */}
          <div className="lb-bottom" onClick={(e) => e.stopPropagation()}>
            <p className="lb-hint">♥ Double tap to like</p>
            <div className="lb-thumbs">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`lb-thumb${i === selected ? " lb-thumb-active" : ""}`}
                  onClick={() => setSelected(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt={`Thumb ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </>
  );
}