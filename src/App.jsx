import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PUBLIC PAGES */
import Home from "./pages/Home";
import Performance from "./pages/Performance";
import Announcements from "./pages/Announcements";
import Governance from "./pages/Governance";
import Stock from "./pages/Stock";
import Impact from "./pages/Impact";
import Policy from "./pages/Policy";
import TermsConditions from "./pages/TermsConditions";
import HelpCentre from "./pages/HelpCentre";
import InvestorRelations from "./pages/InvestorRelations";
import MemberPage from "./pages/boardMembers/MemberPage";
import AdminLogin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import SectionPage from "./admin/pages/SectionPage";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/components/ProtectedRoute";



export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
    
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/help" element={<HelpCentre />} />
        <Route path="/investor-relations" element={<InvestorRelations />} />
        <Route path="/board/:slug" element={<MemberPage />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* ADMIN PANEL */}
         <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          <Route
            path="performance/quarterly"
            element={
              <SectionPage
                sectionKey="quarterly"
              />
            }
          />

          <Route
            path="performance/annual/company"
            element={
              <SectionPage
                sectionKey="annual_company"
              />
            }
          />

          <Route
            path="performance/annual/subsidiaries"
            element={
              <SectionPage
                sectionKey="annual_subsidiaries"
              />
            }
          />

          <Route
            path="performance/annual/group"
            element={
              <SectionPage
                sectionKey="annual_group"
              />
            }
          />

          {/* GOVERNANCE */}
          {/* GOVERNANCE */}
          <Route
            path="governance/board"
            element={
            <SectionPage 
            sectionKey="board"
            />}
          />

          <Route
            path="governance/committee-composition"
            element={
            <SectionPage
               sectionKey="committee_composition"
            />}
          />

          <Route
            path="governance/policies"
            element={
            <SectionPage
              sectionKey="policies"
            />}
          />

          <Route
            path="governance/offer-documents"
            element={
            <SectionPage 
            sectionKey="offer_documents"
            />}
          />

          <Route
            path="governance/shareholding-pattern"
            element={
            <SectionPage 
               sectionKey="shareholding_pattern"
            />}
          />

          <Route
            path="governance/disclosures"
            element={
            <SectionPage 
            sectionKey="disclosures"
            />}
          />

          <Route
            path="governance/secretarial-compliance"
            element={
            <SectionPage 
            sectionKey="secretarial_compliance"
            />}
          />

          <Route
            path="governance/material-creditors"
            element={
            <SectionPage 
            sectionKey="material_creditors"
            />}
          />

          <Route
            path="governance/industry-report"
            element={
            <SectionPage 
            sectionKey="industry_report"
            />}
          />

          <Route
            path="governance/scheme-of-arrangements"
            element={
            <SectionPage 
              sectionKey="scheme_of_arrangements"
            />}
          />

          <Route
            path="governance/media-press"
            element={
            <SectionPage 
              sectionKey="media_press"
            />}
          />

        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}
