import React from "react";
import "./SecureSection.css";
import { FiShield, FiCheckCircle, FiLock } from "react-icons/fi";

export default function SecureSection() {
  const secureCards = [
    {
      icon: <FiShield />,
      title: "Zero data breaches",
      sub: "reported in the past 8 years",
    },
    {
      icon: <FiCheckCircle />,
      title: "ISO certified",
      sub: "certified across 5 entities",
    },
    {
      icon: <FiLock />,
      title: "Industry-grade MFA",
      sub: "to protect every session",
    },
  ];

  return (
    <section className="secure-section">
      <h2 className="secure-title">Secure At Every Step</h2>

      <div className="secure-grid">
        {secureCards.map((card, index) => (
          <div key={index} className="secure-card">
            <div className="secure-icon">{card.icon}</div>
            <div className="secure-heading">{card.title}</div>
            <div className="secure-sub">{card.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
