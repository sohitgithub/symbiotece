import React from "react";
import "./Certificate.css";

export default function Certificate() {
  const certificates = [
    { img: "/images/flogo1.png", label: "FDA" },
    { img: "/images/flogo2.png", label: "EU GMP" },
    { img: "/images/flogo3.png", label: "ISO" },
    { img: "/images/flogo4.png", label: "GMP" },
  ];

  return (
    <section className="cert-section">
      <h2 className="cert-title">Certifications</h2>

      <div className="cert-row">
        {certificates.map((item, index) => (
          <div className="cert-box" key={index}>
            <img src={item.img} alt={item.label} className="cert-icon" />
            <p className="cert-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
