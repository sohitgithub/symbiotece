import React from "react";
import Iridescence from "./Iridescence";
import "./HeroSection.css";


export default function HeroSection() {
  return (
    <>
    <section className="hero-wrapper">

      
      {/* Animated Background */}
      <Iridescence
        className="hero-bg"
        color={[0.35, 0.7, 1.0]}   
        mouseReact={false}
        amplitude={0.12}
        speed={0.8}
      />
      {/* Groww-style teal glow overlay */}
      <div className="hero-overlay"></div>

    

      {/* Center Content */}
      <div className="hero-content">
       <h1 className="hero-title">
        Driving Innovation in Synthetic and Biotech (Fermentation) APIs <br />
          with 'Forward Integration' into Advanced Injectable Formulations
        </h1>
        <button className="hero-btn"> <a href="/performance">Read More</a></button>

      </div>

    </section>
    </>
  );
}
