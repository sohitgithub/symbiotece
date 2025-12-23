import React from "react";
import "./ImpactHero.css";


export default function ImpactHero() {
  return (
    <section className="impact-hero">
      
      {/* LEFT TEXT */}
      <div className="impact-left">
        <h1 className="impact-title">Impact & Culture</h1>
        <p className="impact-subtitle">
          Building a Sustainable Future, Together
        </p>
      </div>

      {/* RIGHT VIDEO SECTION */}
      <div className="impact-right">
        <video
          className="impact-video"
          src="/videos/video1.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

    </section>
  );
}
