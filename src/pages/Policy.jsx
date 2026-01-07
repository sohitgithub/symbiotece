import React, { useEffect, useState } from "react";
import "./Policy.css";

export default function PrivacyPolicy() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pages/privacy-policy`)
      .then((res) => res.json())
      .then((data) => setPage(data));
  }, []);

  if (!page) return null;

  return (
    <section className="privacy-wrapper">
      <div className="privacy-content">
        <h1 className="privacy-main-title">{page.title}</h1>

        {/* SAFE RENDER */}
        <div
          className="privacy-dynamic"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </section>
  );
}
