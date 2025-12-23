import React, { useEffect, useState } from "react";
import { FORM_SCHEMAS } from "../config/formSchemas";
import { SECTION_CONFIG } from "../config/sectionConfig";
import "./UploadForm.css";

export default function UploadForm({
  sectionKey,
  onDone,
  editData = null,
}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  /* 🔹 SECTION + SCHEMA */
  const section = SECTION_CONFIG[sectionKey];
  const schemaName = section?.schema;
  const fields = FORM_SCHEMAS[schemaName] || [];

  /* 🔹 FORM STATE (DYNAMIC) */
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("Draft");

  /* 🔹 PREFILL WHEN EDITING */
  useEffect(() => {
    if (editData) {
      const initial = {
        title: editData.title || "",
        summary: editData.summary || "",
        date: editData.date || "",
        status: editData.status || "Draft",
      };

      // Load flags if any (future-safe)
      if (editData.flags) {
        Object.assign(initial, editData.flags);
      }

      setForm(initial);
      setStatus(editData.status || "Draft");
    }
  }, [editData]);

  /* 🔹 HANDLE CHANGE */
  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* 🔹 SUBMIT */
  async function submit(e) {
    e.preventDefault();

    if (!token) {
      window.location.href = "/admin";
      return;
    }

    /* 🔹 BUILD META */
    const meta = {
      title: form.title || "",
      summary: form.summary || "",
      date: form.date || "",
      category: section.category,
      subcategory: section.subcategory,
      status,
      flags: {},
    };

    /* 🔹 STORE EXTRA FIELDS IN flags */
    fields.forEach((f) => {
      if (!["title", "summary", "file"].includes(f.name)) {
        meta.flags[f.name] = form[f.name];
      }
    });

    const fd = new FormData();
    fd.append("meta", JSON.stringify(meta));

    if (form.file instanceof File) {
      fd.append("files", form.file);
    }

    const isEdit = Boolean(editData);
    const url = isEdit
      ? `${baseUrl}/api/content/${editData._id}`
      : `${baseUrl}/api/content`;

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: fd,
    });

    if (!res.ok) {
      alert(isEdit ? "Update failed" : "Upload failed");
      return;
    }

    onDone && onDone();
  }

  return (
    <form className="upload-form" onSubmit={submit}>
      <h3 className="upload-title">
        {editData ? "Edit" : "New"} {section.label}
      </h3>

      {/* 🔹 DYNAMIC FIELDS */}
      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          <label>{field.label}</label>

          {["text", "number", "url"].includes(field.type) && (
            <input
              type={field.type}
              className="upload-input"
              value={form[field.name] || ""}
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) =>
                updateField(field.name, e.target.value)
              }
            />
          )}

          {field.type === "textarea" && (
            <textarea
              className="upload-textarea"
              value={form[field.name] || ""}
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) =>
                updateField(field.name, e.target.value)
              }
            />
          )}

          {field.type === "select" && (
            <select
              className="upload-input"
              value={form[field.name] || ""}
              required={field.required}
              onChange={(e) =>
                updateField(field.name, e.target.value)
              }
            >
              <option value="">Select</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {field.type === "file" && (
            <input
              type="file"
              className="upload-input"
              accept={field.accept}
              required={!editData && field.required}
              onChange={(e) =>
                updateField(field.name, e.target.files[0])
              }
            />
          )}
        </div>
      ))}

      {/* 🔹 STATUS */}
      <div className="upload-grid">
        <select
          className="upload-input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {["Draft", "In Review", "Approved", "Published"].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            )
          )}
        </select>
      </div>

      {/* 🔹 ACTIONS */}
      <div className="upload-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            document
              .getElementById(editData ? "editItem" : "newItem")
              .close();
            onDone && onDone();
          }}
        >
          Cancel
        </button>

        <button className="btn-primary" type="submit">
          {editData ? "Update" : "Save"}
        </button>
      </div>
    </form>
  );
}
