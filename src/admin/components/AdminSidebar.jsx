import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Shield,
  ChevronRight,
  FileText,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import "./AdminSidebar.css";

function SidebarItem({ to, icon: Icon, label, collapsed }) {
  const location = useLocation();
  const active = location.pathname === to;

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

export default function AdminSidebar({ collapsed }) {
  const [openPerformance, setOpenPerformance] = useState(true);
  const [openGovernance, setOpenGovernance] = useState(true);

  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* MAIN */}
      <SidebarItem
        to="/admin/dashboard"
        icon={LayoutDashboard}
        label="Dashboard"
        collapsed={collapsed}
      />

      {/* PERFORMANCE */}
      <button
        className="sidebar-toggle"
        onClick={() => setOpenPerformance(!openPerformance)}
      >
        <div className="toggle-left">
          <BarChart3 size={18} />
          {!collapsed && <span>Performance</span>}
        </div>
        {!collapsed && (
          <ChevronRight
            className={`arrow ${openPerformance ? "open" : ""}`}
          />
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
          <ChevronRight
            className={`arrow ${openGovernance ? "open" : ""}`}
          />
        )}
      </button>

      {openGovernance && !collapsed && (
        <div className="sidebar-sub">
          <SidebarItem to="/admin/governance/board" icon={Users} label="Board" />
          <SidebarItem
            to="/admin/governance/committee-composition"
            icon={Users}
            label="Committee Composition"
          />
          <SidebarItem
            to="/admin/governance/policies"
            icon={FileText}
            label="Policies"
          />
          <SidebarItem
            to="/admin/governance/offer-documents"
            icon={FileText}
            label="Offer Documents"
          />
          <SidebarItem
            to="/admin/governance/shareholding-pattern"
            icon={BarChart3}
            label="Shareholding Pattern"
          />
          <SidebarItem
            to="/admin/governance/disclosures"
            icon={FileText}
            label="Disclosures"
          />
          <SidebarItem
            to="/admin/governance/secretarial-compliance"
            icon={Shield}
            label="Secretarial & Regulatory Compliance"
          />
          <SidebarItem
            to="/admin/governance/material-creditors"
            icon={Users}
            label="Material Creditors"
          />
          <SidebarItem
            to="/admin/governance/industry-report"
            icon={FileText}
            label="Industry Report"
          />
          <SidebarItem
            to="/admin/governance/scheme-of-arrangements"
            icon={FileText}
            label="Scheme of Arrangements"
          />
          <SidebarItem
            to="/admin/governance/media-press"
            icon={FileText}
            label="Media & Press"
          />
        </div>
      )}


      <div className="sidebar-divider" />

      <SidebarItem
        to="/admin"
        icon={LogOut}
        label="Logout"
        collapsed={collapsed}
      />
    </aside>
  );
}
