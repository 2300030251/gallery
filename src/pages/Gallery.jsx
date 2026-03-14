import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GalleryGrid from "../components/GalleryGrid";

export default function Gallery() {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("title-visible");
        }
      },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="gallery-page">
      <Navbar />

      <div className="gallery-hero" ref={titleRef}>
        <div className="gallery-hero-inner">
          <span className="gallery-eyebrow">✦ My Collection</span>
          <h1 className="gallery-heading">Lucky's Gallery</h1>
          <p className="gallery-subheading">
            Every picture tells a story, every memory lasts forever.
          </p>
          <div className="gallery-divider" />
        </div>
      </div>

      <GalleryGrid />

      <Footer />
    </div>
  );
}