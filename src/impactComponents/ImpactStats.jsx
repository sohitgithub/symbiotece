import React, { useEffect, useRef, useState } from "react";
import "./ImpactStats.css";
import { FaUserGraduate, FaMapMarkerAlt, FaUsers, FaFemale, FaCrown, FaLeaf } from "react-icons/fa";

const statsData = [
  {
    icon: <FaUserGraduate />,
    value: 13.9,
    suffix: "Mn+",
    title: "First-time investors",
    sub: "From tier 2, 3, 4 cities as of 30 Sep 2025."
  },
  {
    icon: <FaMapMarkerAlt />,
    value: 96.8,
    suffix: "%",
    title: "Of India’s PIN codes",
    sub: "By Active Users as of 30 Sep 2025."
  },
  {
    icon: <FaUsers />,
    value: 81,
    suffix: "%",
    title: "Active Users outside top 6 cities",
    sub: "As of 30 Sep 2025."
  },
  {
    icon: <FaFemale />,
    value: 3.5,
    suffix: "Mn",
    title: "Active women investors",
    sub: "On platform, as of 30 Sep 2025."
  },
  {
    icon: <FaUserGraduate />,
    value: 67.3,
    suffix: "%",
    title: "First-time women investors",
    sub: "Among all women investors as of 30 Sep 2025."
  },
  {
    icon: <FaUsers />,
    value: 30.1,
    suffix: "%",
    title: "Women in our team",
    sub: "As of 30 Sep 2025."
  },
  {
    icon: <FaCrown />,
    value: 31,
    suffix: " years",
    title: "Median age of Active Users",
    sub: "As of 30 Sep 2025."
  },
  {
    icon: <FaUserGraduate />,
    value: 10.1,
    suffix: "Mn",
    title: "Monthly readers on Groww Digest",
    sub: "For the 3 months, ended 30 Sep 2025."
  },
  {
    icon: <FaLeaf />,
    value: 844,
    suffix: "K",
    title: "First-time investors who are farmers",
    sub: "As of 30 Sep 2025."
  }
];

export default function ImpactStats() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Detect when section becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // Trigger only once
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
  }, []);

  return (
    <section className="impact-stats" ref={sectionRef}>
      <h2 className="stats-title">
        Democratizing Access <br /> To Financial Services
      </h2>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            value={stat.value}
            suffix={stat.suffix}
            title={stat.title}
            sub={stat.sub}
            animate={visible}
          />
        ))}
      </div>
    </section>
  );
}

// Card Component with Count Animation
function StatCard({ icon, value, suffix, title, sub, animate }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let start = 0;
    const end = value;
    const duration = 1800;
    const step = 20;
    const increment = (end - start) / (duration / step);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setCount(Number(start.toFixed(1)));
    }, step);

    return () => clearInterval(counter);
  }, [animate, value]);

  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">
        {count}
        {suffix}
      </div>
      <div className="stat-title">{title}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}
