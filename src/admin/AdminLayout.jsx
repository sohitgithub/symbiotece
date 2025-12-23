import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`admin-layout ${collapsed ? "collapsed" : ""}`}>
      
      {/* SIDEBAR */}
      <AdminSidebar collapsed={collapsed} />

      {/* MAIN AREA */}
      <div className="admin-main">
        <AdminHeader onToggleSidebar={() => setCollapsed(!collapsed)} />
        
        <main className="admin-content">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
