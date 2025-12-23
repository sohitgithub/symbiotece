import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
// import "../SectionPage.css";
import "../admin/pages/SectionPage.css";

// --- ICONS ---
const ViewIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#40a9ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);

export default function QuarterlyResults() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);

  // --- Main State ---
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // --- Modal State ---
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // New View Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // --- Form State ---
  const initialFormState = {
    financialYear: "",
    quarter: "",
    documentType: "",
    status: "Draft",
    pdfFile: null,
  };
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState("");

  const fyOptions = ["FY23", "FY24", "FY25"];
  const quarterOptions = ["Q1", "Q2", "Q3", "Q4"];
  const docTypeOptions = ["Financial Results", "Investor Presentation", "Press Release"];
  const statusOptions = ["Draft", "Published"];

  // --- 1. Fetch Data ---
  const fetchResults = async () => {
    setIsLoading(true);
    try {
      let url = `${baseUrl}/api/quarterly-results`;
      if (searchQuery) url += `?search=${encodeURIComponent(searchQuery)}`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        navigate("/login"); return;
      }
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching results:", err);
    } finally {
      setIsLoading(false);
    }x
  };

  useEffect(() => {
    if (token) fetchResults();
  }, [token, searchQuery]);

  // --- 2. Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, pdfFile: e.target.files[0] }));
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setFormError("");
    setSelectedItem(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // --- 3. Modal Openers ---
  const openCreateModal = () => {
    resetForm();
    setShowCreateModal(true);
  };

  const openEditModal = (item) => {
    setSelectedItem(item);
    setFormData({
      financialYear: item.financial_year,
      quarter: item.quarter,
      documentType: item.document_type,
      status: item.status,
      pdfFile: null
    });
    setFormError("");
    setShowEditModal(true);
  };

  const openViewModal = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  }

  const closeModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowViewModal(false);
    setShowDeleteModal(false);
    resetForm();
  };

  // --- 4. Submit Handlers ---
  const handleSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    setFormError("");
    setIsLoading(true);

    const dataToSend = new FormData();
    dataToSend.append("financialYear", formData.financialYear);
    dataToSend.append("quarter", formData.quarter);
    dataToSend.append("documentType", formData.documentType);
    dataToSend.append("status", formData.status);
    if (formData.pdfFile) {
      dataToSend.append("pdfFile", formData.pdfFile);
    }

    const url = isEdit
      ? `${baseUrl}/api/quarterly-results/${selectedItem.id}`
      : `${baseUrl}/api/quarterly-results`;

    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        body: dataToSend,
      });

      if (!res.ok) throw new Error("Failed to save");

      closeModals();
      fetchResults();
    } catch (err) {
      setFormError("Error saving data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/quarterly-results/${selectedItem.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      closeModals();
      fetchResults();
    } catch (err) {
      alert("Failed to delete item.");
    } finally {
      setIsLoading(false);
    }
  }

  // --- Render Helpers ---
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderModalForm = (isEdit) => (
    <form className="modal-form" onSubmit={(e) => handleSubmit(e, isEdit)}>
      <div className="form-group">
        <label>Financial Year</label>
        <select name="financialYear" value={formData.financialYear} onChange={handleInputChange} required>
          <option value="">Select</option>
          {fyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Quarter</label>
        <select name="quarter" value={formData.quarter} onChange={handleInputChange} required>
          <option value="">Select</option>
          {quarterOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Document Type</label>
        <select name="documentType" value={formData.documentType} onChange={handleInputChange} required>
          <option value="">Select</option>
          {docTypeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Upload PDF {isEdit && <span className="hint">(Optional - overrides existing)</span>}</label>
        <div className="file-input-wrapper">
          <input type="file" ref={fileInputRef} name="pdfFile" accept="application/pdf" onChange={handleFileChange} required={!isEdit && !selectedItem?.pdf_path} />
          <span className="file-chosen-text">{formData.pdfFile ? formData.pdfFile.name : "No file chosen"}</span>
        </div>
      </div>
      <div className="form-group">
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleInputChange}>
          {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      {formError && <p className="form-error">{formError}</p>}
      <div className="modal-footer">
        <button type="button" className="cancel-btn" onClick={closeModals}>Cancel</button>
        <button type="submit" className="save-btn" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );

  return (
    <div className="section-page-container">
      <div className="section-header">
        <div>
          <h1 className="page-title">Performance <span className="subtitle">— Quarterly Results</span></h1>
          <p className="page-description">Upload, workflow & version history</p>
        </div>
        <button className="new-btn" onClick={openCreateModal}>+ New</button>
      </div>

      <div className="search-container">
        <input
          type="text" className="search-input" placeholder="Search..."
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th className="actions-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                {isLoading ? "Loading..." : "No results found."}
              </td></tr>
            ) : (
              results.map((item) => (
                <tr key={item.id}>
                  <td className="title-cell">{item.generated_title}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td><span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                  <td className="actions-cell">
                    {/* TYPO FIXED: 'icon-btnn' -> 'icon-btn' */}
                    <button className="icon-btnn view-btn" onClick={() => openViewModal(item)} title="View">
                      <ViewIcon />
                    </button>
                    <button className="icon-btnn edit-btn" onClick={() => openEditModal(item)} title="Edit">
                      <EditIcon />
                    </button>
                    <button className="icon-btnn delete-btn" onClick={() => openDeleteModal(item)} title="Delete">
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODALS --- */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">New Quarterly Results</h2>
            {renderModalForm(false)}
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2 className="modal-title">Edit Result</h2>
            {renderModalForm(true)}
          </div>
        </div>
      )}

      {/* --- NEW VIEW MODAL --- */}
      {showViewModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card view-modal-card">
            <h2 className="modal-title">Result Details</h2>

            <div className="view-row">
              <strong>Title:</strong> <span>{selectedItem.generated_title}</span>
            </div>
            <div className="view-row">
              <strong>Financial Year:</strong> <span>{selectedItem.financial_year}</span>
            </div>
            <div className="view-row">
              <strong>Quarter:</strong> <span>{selectedItem.quarter}</span>
            </div>
            <div className="view-row">
              <strong>Status:</strong> <span className={`status-badge ${selectedItem.status.toLowerCase()}`}>{selectedItem.status}</span>
            </div>

            <div className="view-actions">
              {selectedItem.pdf_path ? (
                <a
                  href={`${baseUrl}/uploads/${selectedItem.pdf_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="download-btn"
                >
                  Open PDF Document
                </a>
              ) : (
                <span className="no-file">No PDF attached</span>
              )}
            </div>

            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModals}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card delete-modal-card">
            <h2 className="modal-title">Delete Result</h2>
            <p>Are you sure you want to delete <b>{selectedItem.generated_title}</b>?</p>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModals}>Cancel</button>
              <button className="delete-confirm-btn" onClick={handleDeleteConfirm} disabled={isLoading}>
                {isLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}