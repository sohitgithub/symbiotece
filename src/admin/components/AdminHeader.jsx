import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiMail,
  FiMenu,
  FiSearch,
  FiLogOut,
} from "react-icons/fi";
import "./AdminHeader.css";

export default function AdminHeader({ onToggleSidebar }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role") || "Admin";

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin");
  };

  return (
    <header className="admin-header">
      {/* LEFT */}
      <div className="admin-header-left">
        <button className="menu-btn" onClick={onToggleSidebar}>
          <FiMenu />
        </button>
        <div className="brand">
          <span className="brand-logo">◆</span>
          <h3>Symbiotec CMS</h3>
        </div>
      </div>

      {/* RIGHT */}
      <div className="admin-header-right">

        <div className="profile">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin"
          />
          <div className="profile-info">
            <span className="name">Admin</span>
            <span className="role"></span>
          </div>
        </div>

        <button className="logout-btn" onClick={logout}>
          <FiLogOut />
        </button>
      </div>
    </header>
  );
}
