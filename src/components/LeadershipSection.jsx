import React, { useState } from "react";
import "./LeadershipSection.css";

export default function LeadershipSection() {
  const leaders = [
    {
      name: "MR ANIL SATWANI",
      role: "Managing Director",
      degree: "MBA (Finance), MA (Economic), B.Sc (Chem.)",
      bio: `With over two decades of discerning experience as the promoter director, 
      Anil manages the overall business aspects of Symbiotec with strong expertise 
      in technical, commercial and finance sectors.`,
    },
    {
      name: "MR. SHANKAR GOPALAKRISHNAN",
      role: "Nominee Director",
      degree: "CA and Certified Public Accountant (CPA)",
      bio: `Shankar brings 28+ years of expertise across domestic & cross-border M&A 
      including major acquisitions for Actavis and Hikal.`,
    },
    {
      name: "MR ROHIT MANTRI",
      role: "Nominee Director",
      degree: "CA, CS",
      bio: `Rohit leads life sciences investments at MOPE with 15+ years of private 
      equity and investment banking experience.`,
    },
    {
      name: "MR SUMIT GUPTA",
      role: "Nominee Director",
      degree: "MBA, B.Tech",
      bio: `Sumit has 12+ years of private equity experience focusing on growth and 
      life sciences investments.`,
    },
    {
      name: "MR VISHY CHEBROL",
      role: "Nominee Director",
      degree: "PhD, MBA, B.Tech",
      bio: `Vishy is CIO & MD at InvAscent with deep expertise in pricing derivatives, 
      global markets, and strategic investments.`,
    },
  ];

  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);

  const switchLeader = (i) => {
    setAnimate(true);
    setTimeout(() => {
      setActive(i);
      setAnimate(false);
    }, 250); // animation duration matches CSS
  };

  return (
    <section className="leader-container">

      {/* LEFT SIDE DETAILS */}
      <div className={`leader-details ${animate ? "slide-out" : "slide-in"}`}>
        <h2 className="leader-title">LEADERSHIP</h2>

        <h3 className="ld-name">{leaders[active].name}</h3>
        <div className="line-highlight"></div>

        <p className="ld-role">{leaders[active].role}</p>
        <p className="ld-degree">{leaders[active].degree}</p>
        <p className="ld-bio">{leaders[active].bio}</p>
      </div>

      {/* RIGHT SIDE LIST */}
      <div className="leader-list">
        {leaders.map((item, i) => (
          <div
            key={i}
            className={`leader-item ${active === i ? "active" : ""}`}
            onClick={() => switchLeader(i)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </section>
  );
}
