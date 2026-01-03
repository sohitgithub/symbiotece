import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../SectionPage.css"; 

// --- ICONS ---
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);

export default function SecretarialCompliance() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");
  const fileInputRef = useRef(null);

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const initialFormState = { title: "", category: "Company", financialYear: "", pdfFile: null };
  const [formData, setFormData] = useState(initialFormState);

  // Predefined Companies for Subsidiaries
const subsidiaryOptions = [
    "Knovea Pharmaceutical Private Limited",
    "Symbiotec Zenfold Private Limited"
    ];

  const fyOptions = ["2024-25", "2023-24", "2022-23", "2021-22"];

  // --- FETCH DATA ---
  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/secretarial-compliance`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin");
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setResults(data);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  useEffect(() => { if (token) fetchResults(); else navigate("/admin"); }, [token]);

  // --- HANDLERS ---
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, pdfFile: e.target.files[0] });

  const resetForm = () => {
      setFormData(initialFormState);
      setSelectedItem(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
  }

  const closeModals = () => {
    setShowCreateModal(false); setShowEditModal(false); setShowDeleteModal(false);
    resetForm();
  };

  const handleSubmit = async (e, isEdit = false) => {
  e.preventDefault();
  setIsLoading(true);

  const dataToSend = new FormData();
  dataToSend.append("title", formData.title);
  dataToSend.append("category", formData.category);
  
  // ✅ Send financial year for both so the frontend grouping works
  dataToSend.append("financialYear", formData.financialYear);

  if (formData.pdfFile) dataToSend.append("pdfFile", formData.pdfFile);

    const url = isEdit ? `${baseUrl}/api/secretarial-compliance/${selectedItem.id}` : `${baseUrl}/api/secretarial-compliance`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        body: dataToSend,
      });
      
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        navigate("/admin");
        return;
      }

      if (!res.ok) throw new Error("Failed to save");
      closeModals(); fetchResults();
    } catch (err) { alert("Error saving data"); } finally { setIsLoading(false); }
  };

  const handleDeleteConfirm = async () => {
    if(!selectedItem) return;
    setIsLoading(true);
    try {
        const res = await fetch(`${baseUrl}/api/secretarial-compliance/${selectedItem.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.status === 401 || res.status === 403) {
            localStorage.removeItem("token");
            navigate("/admin");
            return;
        }

        if (!res.ok) throw new Error("Failed");
        closeModals(); fetchResults();
    } catch(err) { alert("Failed to delete."); } finally { setIsLoading(false); }
  }

  const renderModalForm = (isEdit) => (
    <form className="modal-form" onSubmit={(e) => handleSubmit(e, isEdit)}>
      
      {/* 1. Category Selection */}
      <div className="form-group">
        <label>Category</label>
        <select name="category" value={formData.category} onChange={handleInputChange}>
            <option value="Company">Company</option>
            <option value="Subsidiaries">Subsidiaries</option>
        </select>
      </div>

      {/* 2. Title / Company Name Selection */}
      <div className="form-group">
        <label>{formData.category === 'Subsidiaries' ? "Company Name" : "Document Title"}</label>
        
        {formData.category === 'Subsidiaries' ? (
            <select name="title" value={formData.title} onChange={handleInputChange} required>
                <option value="">Select Company</option>
                {subsidiaryOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        ) : (
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Annual Returns 2024" />
        )}
      </div>

      {/* 3. Financial Year (ONLY FOR SUBSIDIARIES) */}
          <div className="form-group">
            <label>Financial Year</label>
            <select name="financialYear" value={formData.financialYear} onChange={handleInputChange} required>
                <option value="">Select Year</option>
                {fyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

      {/* 4. File Upload */}
       <div className="form-group">
        <label>Upload PDF {isEdit && <span className="hint">(Optional)</span>}</label>
        <div className="file-input-wrapper">
            <input type="file" ref={fileInputRef} name="pdfFile" accept="application/pdf" onChange={handleFileChange} required={!isEdit && !selectedItem?.pdf_path} />
            <span className="file-chosen-text">{formData.pdfFile ? formData.pdfFile.name : "No file chosen"}</span>
        </div>
      </div>

      <div className="modal-footer">
        <button type="button" className="cancel-btn" onClick={closeModals}>Cancel</button>
        <button type="submit" className="save-btn" disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );

  return (
    <div className="section-page-container">
      <div className="section-header">
        <div>
          <h1 className="page-title">Governance <span className="subtitle">— Secretarial Compliance</span></h1>
          <p className="page-description">Manage Annual Returns & Compliance</p>
        </div>
        <button className="new-btn" onClick={() => { resetForm(); setShowCreateModal(true); }}>+ New</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Title / Company</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
                <tr><td colSpan="4" style={{textAlign:"center", padding:"20px"}}>No documents found</td></tr>
            ) : (
                results.map((item) => (
                <tr key={item.id}>
                    <td><span className={`status-badge ${item.category === 'Company' ? 'published' : 'draft'}`}>{item.category}</span></td>
                    <td className="title-cell">{item.title}</td>
                    <td>{item.financial_year || "-"}</td>
                    <td className="actions-cell">
                        <button className="icon-btn edit-btn" onClick={() => { 
                            setSelectedItem(item); 
                            setFormData({ 
                                title: item.title, 
                                category: item.category, 
                                financialYear: item.financial_year || "",
                                pdfFile: null 
                            }); 
                            setShowEditModal(true); 
                        }}><EditIcon /></button>
                        <button className="icon-btn delete-btn" onClick={() => { setSelectedItem(item); setShowDeleteModal(true); }}><DeleteIcon /></button>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (<div className="modal-overlay"><div className="modal-card"><h2 className="modal-title">Add Document</h2>{renderModalForm(false)}</div></div>)}
      {showEditModal && (<div className="modal-overlay"><div className="modal-card"><h2 className="modal-title">Edit Document</h2>{renderModalForm(true)}</div></div>)}
      
       {showDeleteModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card delete-modal-card">
             <h2 className="modal-title">Delete Document</h2>
             <p>Delete <b>{selectedItem.title}</b>?</p>
             <div className="modal-footer">
                 <button className="cancel-btn" onClick={closeModals}>Cancel</button>
                 <button className="delete-confirm-btn" onClick={handleDeleteConfirm} disabled={isLoading}>{isLoading ? "Deleting..." : "Delete"}</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}