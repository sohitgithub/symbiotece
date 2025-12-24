import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../SectionPage.css"; // Check relative path

// ... Icons (Keep existing icons) ...
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const DeleteIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d9534f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);


export default function CommitteeComposition() {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Form State - Added role
  const initialFormState = { 
      committee_name: "", 
      member_name: "", 
      designation: "Member", 
      role: "Member" 
  };
  const [formData, setFormData] = useState(initialFormState);

  const committeeOptions = [
    "Audit Committee",
    "Nomination and Remuneration Committee",
    "Stakeholder Relationship Committee",
    "Risk Management Committee",
    "Corporate Social Responsibility Committee"
  ];

  // --- FETCH DATA ---
  const fetchResults = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/committees`, { 
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

  const resetForm = () => {
      setFormData(initialFormState);
      setSelectedItem(null);
  }

  const closeModals = () => {
    setShowCreateModal(false); setShowEditModal(false); setShowDeleteModal(false);
    resetForm();
  };

  const handleSubmit = async (e, isEdit = false) => {
    e.preventDefault();
    setIsLoading(true);

    const url = isEdit ? `${baseUrl}/api/committees/${selectedItem.id}` : `${baseUrl}/api/committees`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to save");
      closeModals(); fetchResults();
    } catch (err) { alert("Error saving data"); } finally { setIsLoading(false); }
  };

  const handleDeleteConfirm = async () => {
    if(!selectedItem) return;
    setIsLoading(true);
    try {
        const res = await fetch(`${baseUrl}/api/committees/${selectedItem.id}`, {
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
        <label>Committee Name</label>
        <select name="committee_name" value={formData.committee_name} onChange={handleInputChange} required>
            <option value="">Select Committee</option>
            {committeeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>

      <div className="form-group">
        <label>Member Name</label>
        <input type="text" name="member_name" value={formData.member_name} onChange={handleInputChange} required placeholder="e.g. Mr. Anil Satwani" />
      </div>

      <div className="form-group">
        <label>Designation (Board)</label>
        <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} required placeholder="e.g. Independent Director" />
      </div>

      <div className="form-group">
        <label>Role (In Committee)</label>
        <select name="role" value={formData.role} onChange={handleInputChange}>
             <option value="Chairperson">Chairperson</option>
             <option value="Member">Member</option>
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
          <h1 className="page-title">Governance <span className="subtitle">— Committees</span></h1>
          <p className="page-description">Manage Board Committees and Members</p>
        </div>
        <button className="new-btn" onClick={() => { resetForm(); setShowCreateModal(true); }}>+ New</button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Committee</th>
              <th>Member Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.length === 0 ? (
                <tr><td colSpan="4" style={{textAlign:"center", padding:"20px"}}>No members found</td></tr>
            ) : (
                results.map((item) => (
                <tr key={item.id}>
                    <td className="title-cell" style={{fontSize: '14px', fontWeight: 'bold', color:'#555'}}>
                        {item.committee_name}
                    </td>
                    <td>
                        {item.member_name}
                        <br/>
                        <span style={{fontSize:'12px', color:'#888'}}>{item.designation}</span>
                    </td>
                    <td>
                        <span className={`status-badge ${item.role === 'Chairperson' ? 'published' : 'draft'}`}>
                            {item.role}
                        </span>
                    </td>
                    <td className="actions-cell">
                        <button className="icon-btnn edit-btn" onClick={() => { 
                            setSelectedItem(item); 
                            setFormData(item); 
                            setShowEditModal(true); 
                        }}><EditIcon /></button>
                        <button className="icon-btnn delete-btn" onClick={() => { setSelectedItem(item); setShowDeleteModal(true); }}><DeleteIcon /></button>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {showCreateModal && (<div className="modal-overlay"><div className="modal-card"><h2 className="modal-title">Add Committee Member</h2>{renderModalForm(false)}</div></div>)}
      {showEditModal && (<div className="modal-overlay"><div className="modal-card"><h2 className="modal-title">Edit Member</h2>{renderModalForm(true)}</div></div>)}
      
       {showDeleteModal && selectedItem && (
        <div className="modal-overlay">
          <div className="modal-card delete-modal-card">
             <h2 className="modal-title">Delete Member</h2>
             <p>Remove <b>{selectedItem.member_name}</b> from {selectedItem.committee_name}?</p>
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