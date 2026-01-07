import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./SectionPage.css";

export default function AdminPrivacyPolicy() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // INIT QUILL
  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["clean"],
          ],
        },
      });
    }
  }, []);

  // FETCH
  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }

    fetch(`${baseUrl}/api/pages/privacy-policy`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!data) return;
        setTitle(data.title || "Privacy Policy");
        quillRef.current.root.innerHTML = data.content || "";
      });
  }, []);

  // SAVE
 const handleSave = async () => {
  setLoading(true);
  const content = quillRef.current.root.innerHTML;

  try {
    const res = await fetch(`${baseUrl}/api/admin/pages/privacy-policy`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      throw new Error(data.message || "Save failed");
    }

    alert("Saved successfully");
  } catch (err) {
    console.error("SAVE ERROR:", err);
    alert("Save failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="section-page-container">
      <div className="section-header">
        <div>
          <h1 className="page-title">Pages <span className="subtitle">— Privacy Policy</span></h1>
          <p className="page-description">Edit Privacy Policy content</p>
        </div>
        <button className="new-btn" onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </div>

      <div className="table-container" style={{ padding: 20 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Page title"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #cbd5f5",
          }}
        />

        <div ref={editorRef} style={{ height: 350 }} />
      </div>
    </div>
  );
}
