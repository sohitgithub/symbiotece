import React, { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

export default function Dropdown({ value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dropdown-container" ref={ref}>
      <button className="dropdown-btn" onClick={() => setOpen(!open)}>
        {value}
        <span className={`dropdown-arrow ${open ? "rotate" : ""}`}>⌄</span>
      </button>

      {open && (
        <div className="dropdown-menu">
          {options.map((opt, i) => (
            <div
              key={i}
              className="dropdown-item"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              <div className={`dropdown-radio ${value === opt ? "active" : ""}`} />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
