import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Shield,
  ChevronRight,
  FileText,
  BookOpen,
  Users,
  LogOut,
} from "lucide-react";
import "./AdminSidebar.css";

/* ---------------- SINGLE SIDEBAR ITEM ---------------- */
function SidebarItem({ to, icon: Icon, label, collapsed }) {
  const location = useLocation();

  const active =
    location.pathname === to ||
    location.pathname.startsWith(to + "/");

  return (
    <Link
      to={to}
      className={`sidebar-item ${active ? "active" : ""}`}
      title={collapsed ? label : ""}
    >
      <Icon size={18} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

/* ---------------- MAIN SIDEBAR ---------------- */
export default function AdminSidebar({ collapsed }) {
  const [openPerformance, setOpenPerformance] = useState(true);
  const [openGovernance, setOpenGovernance] = useState(true);
  const [openPages, setOpenPages] = useState(true); // ✅ FIXED

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* DASHBOARD */}
      <SidebarItem
        to="/admin/dashboard"
        icon={LayoutDashboard}
        label="Dashboard"
        collapsed={collapsed}
      />

      <SidebarItem
        to="/admin/announcement"
        icon={LayoutDashboard}
        label="Announcement"
        collapsed={collapsed}
      />

      {/* PERFORMANCE */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpenPerformance(!openPerformance)}
      >
        <div className="toggle-left">
          <BarChart3 size={18} />
          {!collapsed && <span>Financial Results</span>}
        </div>
        {!collapsed && (
          <ChevronRight className={`arrow ${openPerformance ? "open" : ""}`} />
        )}
      </button>

      {openPerformance && !collapsed && (
        <div className="sidebar-sub">
          <SidebarItem to="/admin/performance/quarterly" icon={FileText} label="Quarterly Results" />
          <SidebarItem to="/admin/performance/annual/company" icon={FileText} label="Annual – Company" />
          <SidebarItem to="/admin/performance/annual/subsidiaries" icon={FileText} label="Annual – Subsidiaries" />
          <SidebarItem to="/admin/performance/annual/group" icon={FileText} label="Annual – Group" />
        </div>
      )}

      {/* GOVERNANCE */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpenGovernance(!openGovernance)}
      >
        <div className="toggle-left">
          <Shield size={18} />
          {!collapsed && <span>Governance</span>}
        </div>
        {!collapsed && (
          <ChevronRight className={`arrow ${openGovernance ? "open" : ""}`} />
        )}
      </button>

      {openGovernance && !collapsed && (
        <div className="sidebar-sub">
          <SidebarItem to="/admin/governance/board" icon={Users} label="Board" />
          <SidebarItem to="/admin/governance/committee-composition" icon={Users} label="Committee Composition" />
          <SidebarItem to="/admin/governance/policies" icon={FileText} label="Policies" />
          <SidebarItem to="/admin/governance/offer-documents" icon={FileText} label="Offer Documents" />
          <SidebarItem to="/admin/governance/shareholding-pattern" icon={BarChart3} label="Shareholding Pattern" />
          <SidebarItem to="/admin/governance/disclosures" icon={FileText} label="Disclosures" />
          <SidebarItem to="/admin/governance/secretarial-compliance" icon={Shield} label="Secretarial & Regulatory Compliance" />
          <SidebarItem to="/admin/governance/material-creditors" icon={Users} label="Material Creditors" />
          <SidebarItem to="/admin/governance/industry-report" icon={FileText} label="Industry Report" />
        </div>
      )}

      {/* PAGES ✅ */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpenPages(!openPages)}
      >
        <div className="toggle-left">
          <BookOpen size={18} />
          {!collapsed && <span>Pages</span>}
        </div>
        {!collapsed && (
          <ChevronRight className={`arrow ${openPages ? "open" : ""}`} />
        )}
      </button>

      {openPages && !collapsed && (
        <div className="sidebar-sub">
          <SidebarItem to="/admin/pages/privacy-policy" icon={FileText} label="Privacy Policy" />
          <SidebarItem to="/admin/governance/terms-conditions" icon={FileText} label="Terms & Conditions" />
          <SidebarItem to="/admin/governance/help-centre" icon={FileText} label="Help Centre" />
        </div>
      )}

      <div className="sidebar-divider" />

      {/* LOGOUT */}
      <SidebarItem
        to="/admin"
        icon={LogOut}
        label="Logout"
        collapsed={collapsed}
      />
    </aside>
  );
}
