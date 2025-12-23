import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../SectionPage.css";

// --- ICONS ---
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);

export default function BoardMembers() {
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

  const initialFormState = { name: "", designation: "", status: "Active", imageFile: null };
  const [formData, setFormData] = useState(initialFormState);

  // --- FETCH DATA ---
  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/board-members`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      if (res.status === 401) { navigate("/login"); return; }
      const data = await res.json();
      setResults(data);
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  useEffect(() => { if (token) fetchResults(); }, [token]);

  // --- HANDLERS ---
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, imageFile: e.target.files[0] });

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
    dataToSend.append("name", formData.name);
    dataToSend.append("designation", formData.designation);
    dataToSend.append("status", formData.status);
    if (formData.imageFile) dataToSend.append("imageFile", formData.imageFile);

    const url = isEdit ? `${baseUrl}/api/board-members/${selectedItem.id}` : `${baseUrl}/api/board-members`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { Authorization: `Bearer ${token}` },
        body: dataToSend,
      });
      if (!res.ok) throw new Error("Failed to save");
      closeModals(); fetchResults();
    } catch (err) { alert("Error saving data"); } finally { setIsLoading(false); }
  };

  const handleDeleteConfirm = async () => {
    if(!selectedItem) return;
    setIsLoading(true);
    try {
        const res = await fetch(`${baseUrl}/api/board-members/${selectedItem.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed");
        closeModals(); fetchResults();
    } catch(err) { alert("Failed to delete."); } finally { setIsLoading(false); }
  }

  const renderModalForm = (isEdit) => (
    <form className="modal-form" onSubmit={(e) => handleSubmit(e, isEdit)}>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g. Mr. Anil Satwani" />
      </div>
      <div className="form-group">
        <label>Designation</label>
        <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} required placeholder="e.g. Managing Director" />
      </div>
       <div className="form-group">
        <label>Profile Image {isEdit && <span className="hint">(Optional)</span>}</label>
        <div className="file-input-wrapper">
            <input type="file" ref={fileInputRef} name="imageFile" accept="image/*" onChange={handleFileChange} required={!isEdit && !selectedItem?.image_path} />
            <span className="file-chosen-text">{formData.imageFile ? formData.imageFile.name : "No file chosen"}</span>
        </div>
      </div>
      <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleInputChange}>
             <option value="Active">Active</option>
             <option value="Inactive">Inactive</option>
          </select>
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
          <h1 className="page-title">Governance <span className="subtitle">— Board Members</span></h1>
          <p className="page-description">Manage Board of Directors</p>
        </div>
        <button className="new-btn" onClick={() => { resetForm(); setShowCreateModal(true); }}>+ New</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{width: '60px'}}>Img</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
                <tr><td colSpan="5" style={{textAlign:"center", padding:"20px"}}>No members found</td></tr>
            ) : (
                results.map((item) => (
                <tr key={item.id}>
                    <td>
                        {item.image_path ? (
                             <img src={`${baseUrl}/uploads/${item.image_path}`} alt="" style={{width:'40px', height:'40px', borderRadius:'50%', objectFit:'cover'}} />
                        ) : (<div style={{width:'40px', height:'40px', background:'#eee', borderRadius:'50%'}}></div>)}
                    </td>
                    <td className="title-cell">{item.name}</td>
                    <td>{item.designation}</td>
                    <td><span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span></td>
                    <td className="actions-cell">
                        <button className="icon-btn edit-btn" onClick={() => { 
                            setSelectedItem(item); 
                            setFormData({ name: item.name, designation: item.designation, status: item.status, imageFile: null }); 
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

      {showCreateModal && (<div className="modal-overlay"><div className="modal-card"><h2 className="modal-title">Add Member</h2>{renderModalForm(false)}</div></div>)}
      {showEditModal && (<div className="modal-overlay"><div className="modal-card"><h2 className="modal-title">Edit Member</h2>{renderModalForm(true)}</div></div>)}
      
       {showDeleteModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card delete-modal-card">
             <h2 className="modal-title">Delete Member</h2>
             <p>Delete <b>{selectedItem.name}</b>?</p>
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