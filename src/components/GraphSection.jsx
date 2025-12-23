import React from "react";
import "./GraphSection.css";

export default function GraphSection() {
  return (
    <section className="graph-wrapper">

      {/* Text Section */}
      {/* <div className="graph-content">

        <button className="graph-button"><a href="https://www.symbiotec.com/about-us/">Read our story</a></button>
      </div> */}

      {/* Single Background Image */}
      <img
        src="/images/graph1.webp"  // only one image from public folder
        alt="Graph Illustration"
        className="graph-image"
      />
    </section>
  );
}
