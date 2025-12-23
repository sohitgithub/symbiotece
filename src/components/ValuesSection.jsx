import React from "react";
import "./ValuesSection.css";

import { GiRingedPlanet, GiStack, GiSundial, GiTripleYin,GiAbbotMeeple } from "react-icons/gi";
import { RiShieldCheckLine } from "react-icons/ri";


export default function ValuesSection() {
  const values = [
    {
      icon: <GiRingedPlanet />,
      title: "Customer Obsession",
      desc: "Every idea and decision starts with one question: Does this help our users?",
    },
    {
      icon: <GiStack />,
      title: "Keeping It Simple",
      desc: "Simplicity drives everything we build — inside and outside our platform.",
    },
    {
      icon: <GiSundial />,
      title: "Thinking Long-Term",
      desc: "We innovate today with a vision to build a better tomorrow for everyone.",
    },
    {
      icon: <GiTripleYin />,
      title: "Being Transparent",
      desc: "Trust is earned. That’s why we prioritize being honest and upfront, always.",
    },
    {
      icon: <RiShieldCheckLine />,
      title: "Reliability, Always",
      desc: "Every second of our platform is backed by speed, stability, and security.",
    },
    {
        icon:<GiAbbotMeeple />,
        title: "Collaboration",
        desc: "Great ideas can come from anywhere. We believe in the power of teamwork.",
    }
  ];

  return (
    <section className="values-wrapper">
      <h2 className="values-title">Our Values</h2>
      <p className="values-subtitle">The principles that guide everything we do.</p>

      <div className="values-grid">
        {values.map((v, index) => (
          <div className="value-card" key={index}>
            <div className="value-icon">{v.icon}</div>
            <h3 className="value-title">{v.title}</h3>
            <p className="value-desc">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
