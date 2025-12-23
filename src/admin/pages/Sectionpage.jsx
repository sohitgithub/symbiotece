import React, { useEffect, useState } from "react";
import UploadForm from "./UploadForm";
import { SECTION_CONFIG } from "../config/sectionConfig";
import "./SectionPage.css";

export default function SectionPage({ sectionKey }) {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [versions, setVersions] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const section = SECTION_CONFIG[sectionKey];
  const { category, subcategory } = section;

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const role = localStorage.getItem("role") || "editor";
  const token = localStorage.getItem("token") || "";

  async function load() {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (subcategory) params.set("subcategory", subcategory);
    if (q) params.set("q", q);

    const res = await fetch(`${baseUrl}/api/content?${params.toString()}`);
    const data = await res.json();
    setItems(data);
  }

  useEffect(() => {
    load();
  }, [category, subcategory, q]);

  async function action(id, path) {
    const res = await fetch(`${baseUrl}/api/content/${id}/${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      alert("Action failed");
      return;
    }
    load();
  }

  async function remove(id) {
  if (!window.confirm("Are you sure you want to delete this content?")) return;

  const res = await fetch(`${baseUrl}/api/content/${id}/delete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    alert("Delete failed");
    return;
  }
  load();
}


  async function openVersions(id) {
    const r = await fetch(`${baseUrl}/api/content/${id}/versions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await r.json();
    setVersions(data);
    document.getElementById("verDlg").showModal();
  }

  function openEdit(item) {
    setEditItem(item);
    document.getElementById("editItem").showModal();
  }

  return (
    <div className="section-page">
      {/* HEADER */}
      <div className="section-header">
        <div>
          <h1>
            {category}
            {subcategory && <span> — {subcategory}</span>}
          </h1>
          <p>Upload, workflow & version history</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => document.getElementById("newItem").showModal()}
        >
          + New
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="search-input"
        placeholder="Search…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th className="right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => {
              const files = JSON.parse(row.files_json || "[]");
              return (
                <tr key={row._id}>
                  <td>
                    <div className="title">{row.title}</div>
                    <div className="subtitle">{row.subcategory}</div>
                  </td>
                  <td>{row.date || "—"}</td>
                  <td>
                    <span className={`status ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="right actions">
                    <button onClick={() => openVersions(row._id)}>
                      versions
                    </button>

                    {role !== "reviewer" && row.status === "Draft" && (
                      <button
                        className="ok"
                        onClick={() => action(row._id, "submit")}
                      >
                        submit
                      </button>
                    )}

                    {(role === "reviewer" || role === "admin") &&
                      row.status === "In Review" && (
                        <>
                          <button
                            className="ok"
                            onClick={() => action(row._id, "approve")}
                          >
                            approve
                          </button>
                          <button
                            className="danger"
                            onClick={() => action(row._id, "reject")}
                          >
                            reject
                          </button>
                        </>
                      )}

                    {role === "admin" &&
                      (row.status === "Approved" ||
                        row.status === "In Review") && (
                        <button
                          className="info"
                          onClick={() => action(row._id, "publish")}
                        >
                          publish
                        </button>
                      )}

                    <button
                      className="info"
                      onClick={() => openEdit(row)}
                    >
                      Edit
                    </button>

                    <button
                      className="danger"
                      onClick={() => remove(row._id)}
                    >
                      Delete
                    </button>

                    {files[0] && (
                      <a
                        href={`${baseUrl}${files[0].path}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* NEW ITEM MODAL */}
      <dialog id="newItem">
        <UploadForm
          sectionKey={sectionKey}
          onDone={() => {
            document.getElementById("newItem").close();
            load();
          }}
        />
      </dialog>

      {/* EDIT ITEM MODAL */}
      <dialog id="editItem">
        {editItem && (
          <UploadForm
            sectionKey={sectionKey}
            editData={editItem}
            onDone={() => {
              document.getElementById("editItem").close();
              setEditItem(null);
              load();
            }}
          />
        )}
      </dialog>

      {/* VERSIONS MODAL */}
      <dialog id="verDlg">
        <div className="modal">
          <h3>Version History</h3>

          <ul>
            {versions.map((v) => (
              <li key={v._id}>
                <span>
                  v{v.version} • {v.created_by}
                </span>
                <small>
                  {new Date(v.createdAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>

          <div className="modal-actions">
            <button
              onClick={() =>
                document.getElementById("verDlg").close()
              }
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
