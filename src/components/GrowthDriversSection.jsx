import React from "react";
import "./GrowthDriversSection.css";

export default function GrowthDriversSection() {
  return (
    <section className="growth-section">
      <h2 className="growth-title">Growth Drivers</h2>

      <div className="growth-cards">
        
        {/* CARD 1 */}
        <div className="growth-card big-icon-card">
          <div className="growth-img-wrapper">
            <img
              src="/images/icon-injectable-Black.png"
              className="growth-img black-img"
              alt="Black Icon"
            />
            <img
              src="/images/icon-injectable-Blue.png"
              className="growth-img blue-img"
              alt="Blue Icon"
            />
          </div>

          <p className="growth-text">
            Forward integration with injectable formulations
          </p>
        </div>

        {/* CARD 2 */}
        <div className="growth-card">
          <div className="growth-img-wrapper">
            <img
              src="/images/icon-fermentation-black.png"
              className="growth-img black-img"
              alt="Black Icon"
            />
            <img
              src="/images/icon-fermentation-blue.png"
              className="growth-img blue-img"
              alt="Blue Icon"
            />
          </div>

          <p className="growth-text">
            Expansion into niche fermentation-based segments
          </p>
        </div>

      </div>
    </section>
  );
}
