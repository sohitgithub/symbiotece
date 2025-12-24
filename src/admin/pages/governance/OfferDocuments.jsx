import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../SectionPage.css"; 

// --- ICONS ---
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);

export default function OfferDocuments() {
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

  // ✅ New State for Dropdown: 'pdf', 'video', or 'link'
  const [docType, setDocType] = useState("pdf"); 
  
  const initialFormState = { title: "", link: "", pdfFile: null };
  const [formData, setFormData] = useState(initialFormState);

  // --- FETCH DATA ---
  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/offer-documents`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      
      if (res.status === 401 || res.status === 403) { 
        localStorage.removeItem("token");
        navigate("/admin"); 
        return; 
      }
      
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
      setDocType("pdf"); // Default back to PDF
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
    
    // ✅ Logic: If PDF or Video -> Send File. If Link -> Send URL.
    if (docType === 'link') {
        dataToSend.append("link", formData.link);
    } else {
        // For PDF or Video, we send the file
        if (formData.pdfFile) {
            dataToSend.append("pdfFile", formData.pdfFile);
            dataToSend.append("link", ""); // Clear link if a file is present
        }
    }

    const url = isEdit ? `${baseUrl}/api/offer-documents/${selectedItem.id}` : `${baseUrl}/api/offer-documents`;
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
        const res = await fetch(`${baseUrl}/api/offer-documents/${selectedItem.id}`, {
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
      
      <div className="form-group">
        <label>Document Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Draft Red Herring Prospectus" />
      </div>

      {/* ✅ DOCUMENT TYPE DROPDOWN */}
      <div className="form-group">
          <label>Type</label>
          <select 
            value={docType} 
            onChange={(e) => {
                setDocType(e.target.value);
                // Reset file input if switching types
                if(fileInputRef.current) fileInputRef.current.value = "";
            }}
          >
              <option value="pdf">PDF Document</option>
              <option value="video">Video File</option>
              <option value="link">External Link</option>
          </select>
      </div>

      {/* ✅ CONDITIONAL INPUTS */}
      {docType === 'link' ? (
        // --- LINK INPUT ---
        <div className="form-group">
            <label>External URL</label>
            <input 
                type="url" 
                name="link" 
                value={formData.link} 
                onChange={handleInputChange} 
                required 
                placeholder="https://..." 
            />
        </div>
      ) : (
        // --- FILE INPUT (For PDF or Video) ---
       <div className="form-group">
        <label>
            Upload {docType === 'video' ? 'Video' : 'Document'} {isEdit && <span className="hint">(Optional)</span>}
        </label>
        <div className="file-input-wrapper">
            <input 
                type="file" 
                ref={fileInputRef} 
                name="pdfFile" 
                // ✅ Dynamic Accept Attribute
                accept={docType === 'video' ? "video/*" : "application/pdf"} 
                onChange={handleFileChange} 
                required={!isEdit && !selectedItem?.pdf_path} 
            />
            <span className="file-chosen-text">{formData.pdfFile ? formData.pdfFile.name : "No file chosen"}</span>
        </div>
        {docType === 'video' && <p className="hint" style={{fontSize:'12px', marginTop:'5px'}}>Supported: MP4, WebM, Ogg</p>}
      </div>
      )}

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
          <h1 className="page-title">Governance <span className="subtitle">— Offer Documents</span></h1>
          <p className="page-description">Manage IPO/Offer Documents & Videos</p>
        </div>
        <button className="new-btn" onClick={() => { resetForm(); setShowCreateModal(true); }}>+ New</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Link / File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
                <tr><td colSpan="4" style={{textAlign:"center", padding:"20px"}}>No documents found</td></tr>
            ) : (
                results.map((item) => {
                    const isExternal = item.link && (item.link.startsWith('http') || item.link.startsWith('www'));
                    const isFile = item.pdf_path && !isExternal;
                    
                    // Determine display label
                    let typeLabel = "Link";
                    if (isFile) {
                        // Check extension for PDF vs Video
                        const ext = item.pdf_path.split('.').pop().toLowerCase();
                        if(['mp4', 'mov', 'webm', 'ogg'].includes(ext)) typeLabel = "Video";
                        else typeLabel = "PDF";
                    }

                    return (
                        <tr key={item.id}>
                            <td className="title-cell">{item.title}</td>
                            <td>
                                <span className={`status-badge ${isFile ? 'published' : 'draft'}`}>
                                    {typeLabel}
                                </span>
                            </td>
                            <td>
                                {isFile ? (
                                    <a href={`${baseUrl}/uploads/${item.pdf_path}`} target="_blank" rel="noopener noreferrer" className="download-btn" style={{fontSize:'13px', padding:'5px 10px'}}>View File</a>
                                ) : (item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="download-btn" style={{fontSize:'13px', padding:'5px 10px', background:'#f3f4f6', color:'#333', border:'1px solid #ddd'}}>Open Link ↗</a>
                                ) : '-')}
                            </td>
                            <td className="actions-cell">
                                <button className="icon-btn edit-btn" onClick={() => { 
                                    setSelectedItem(item); 
                                    
                                    // Determine type to pre-fill form
                                    let type = 'link';
                                    if(item.pdf_path) {
                                        const ext = item.pdf_path.split('.').pop().toLowerCase();
                                        if(['mp4', 'mov', 'webm'].includes(ext)) type = 'video';
                                        else type = 'pdf';
                                    }
                                    
                                    setDocType(type);
                                    setFormData({ 
                                        title: item.title, 
                                        link: item.link || "", 
                                        pdfFile: null 
                                    }); 
                                    setShowEditModal(true); 
                                }}><EditIcon /></button>
                                <button className="icon-btn delete-btn" onClick={() => { setSelectedItem(item); setShowDeleteModal(true); }}><DeleteIcon /></button>
                            </td>
                        </tr>
                    );
                })
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