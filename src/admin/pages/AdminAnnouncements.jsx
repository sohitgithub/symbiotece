import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SectionPage.css";
import "./AdminAnnouncements.css";

// ICONS
const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M10 11v6M14 11v6" />
  </svg>
);

export default function AdminAnnouncements() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selected, setSelected] = useState(null);

  const initialForm = {
    title: "",
    category: "",
    year: "",
    announcement_date: "",
    pdf: null,
  };

  const [formData, setFormData] = useState(initialForm);

  // FETCH
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/announcements`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!token) navigate("/admin");
    else fetchAnnouncements();
  }, [token]);

  // HANDLERS
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFile = (e) =>
    setFormData({ ...formData, pdf: e.target.files[0] });

  const closeModals = () => {
    setShowCreate(false);
    setShowEdit(false);
    setShowDelete(false);
    setFormData(initialForm);
    setSelected(null);
  };

  // SAVE (FIXED)
  const handleSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("category", formData.category);
    fd.append("year", formData.year);
    fd.append("announcement_date", formData.announcement_date);

    if (formData.pdf) {
      fd.append("pdf", formData.pdf); // MUST MATCH BACKEND
    }

    const url = isEdit
      ? `${baseUrl}/api/announcements/${selected.id}`
      : `${baseUrl}/api/announcements`;

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      if (!res.ok) throw new Error();
      closeModals();
      fetchAnnouncements();
    } catch {
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const confirmDelete = async () => {
    setLoading(true);
    try {
      await fetch(`${baseUrl}/api/announcements/${selected.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      closeModals();
      fetchAnnouncements();
    } catch {
      alert("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-page-container">
      <div className="section-header">
        <div>
          <h1 className="page-title"><span className="subtitle">Announcements</span></h1>
          <p className="page-description">Manage corporate announcements</p>
        </div>
        <button className="new-btn" onClick={() => setShowCreate(true)}>+ New</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.announcement_date).toLocaleDateString("en-GB")}</td>
                <td className="title-cell">{item.title}</td>
                <td>{item.category}</td>
                <td className="actions-cell">
                  {item.pdf_url && (
                    <a href={`${baseUrl}${item.pdf_url}`} target="_blank" rel="noreferrer" className="icon-btn view-btn">
                      <ViewIcon />
                    </a>
                  )}
                  <button className="icon-btn edit-btn" onClick={() => {
                    setSelected(item);
                    setFormData({
                      title: item.title,
                      category: item.category,
                      year: item.year,
                      announcement_date: item.announcement_date.slice(0, 10),
                      pdf: null,
                    });
                    setShowEdit(true);
                  }}>
                    <EditIcon />
                  </button>
                  <button className="icon-btn delete-btn" onClick={() => {
                    setSelected(item);
                    setShowDelete(true);
                  }}>
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showCreate || showEdit) && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">{showEdit ? "Edit" : "Add"} Announcement</h2>
            <form className="modal-form" onSubmit={(e) => handleSubmit(e, showEdit)}>
              <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option>Board Meetings</option>
                <option>Shareholders Meetings</option>
                <option>Postal Ballot</option>
                <option>Other Corporate Filings</option>
              </select>
              <input name="year" placeholder="Year (e.g. 2025)" value={formData.year} onChange={handleChange} required />
              <input type="date" name="announcement_date" value={formData.announcement_date} onChange={handleChange} required />
              <input type="file" accept="application/pdf" onChange={handleFile} />
              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={closeModals}>Cancel</button>
                <button className="save-btn">{loading ? "Saving..." : "Save"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDelete && (
        <div className="modal-overlay">
          <div className="modal-card delete-modal-card">
            <h2 className="modal-title">Delete Announcement</h2>
            <p>Delete <b>{selected?.title}</b>?</p>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModals}>Cancel</button>
              <button className="delete-confirm-btn" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
