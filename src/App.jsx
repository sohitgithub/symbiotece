import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* ================= PUBLIC PAGES ================= */
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

/* ================= ADMIN AUTH & LAYOUT ================= */
import AdminLogin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/components/ProtectedRoute";

/* ================= ADMIN PAGES (PERFORMANCE) ================= */
import QuarterlyResultsAdmin from "./admin/pages/performance/QuarterlyResultsAdmin"; 
import AnnualCompany from "./admin/pages/performance/AnnualCompany";
import AnnualSubsidiaries from "./admin/pages/performance/AnnualSubsidiaries";
import AnnualGroup from "./admin/pages/performance/AnnualGroup";

/* ================= ADMIN PAGES (GOVERNANCE) ================= */
import BoardMembers from "./admin/pages/governance/BoardMembers";
import CommitteeComposition from "./admin/pages/governance/CommitteeComposition";
import Policies from "./admin/pages/governance/Policies";
import OfferDocuments from "./admin/pages/governance/OfferDocuments";
import ShareholdingPattern from "./admin/pages/governance/ShareholdingPattern";
import Disclosures from "./admin/pages/governance/Disclosures";
import SecretarialCompliance from "./admin/pages/governance/SecretarialCompliance";
import MaterialCreditors from "./admin/pages/governance/MaterialCreditors";
import IndustryReport from "./admin/pages/governance/IndustryReport";
import SchemeArrangements from "./admin/pages/governance/SchemeArrangements";
import MediaPress from "./admin/pages/governance/MediaPress";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
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

        {/* ================= ADMIN LOGIN ================= */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* ================= ADMIN PANEL ================= */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* --- PERFORMANCE SECTION (Updated) --- */}
          <Route path="performance/quarterly" element={<QuarterlyResultsAdmin />} />
          <Route path="performance/annual/company" element={<AnnualCompany />} />
          <Route path="performance/annual/subsidiaries" element={<AnnualSubsidiaries />} />
          <Route path="performance/annual/group" element={<AnnualGroup />} />

          {/* --- GOVERNANCE SECTION --- */}
          <Route path="governance/board" element={<BoardMembers />} />
          <Route path="governance/committee-composition" element={<CommitteeComposition />} />
          <Route path="governance/policies" element={<Policies />} />
          <Route path="governance/offer-documents" element={<OfferDocuments />} />
          <Route path="governance/shareholding-pattern" element={<ShareholdingPattern />} />
          <Route path="governance/disclosures" element={<Disclosures />} />
          <Route path="governance/secretarial-compliance" element={<SecretarialCompliance />} />
          <Route path="governance/material-creditors" element={<MaterialCreditors />} />
          <Route path="governance/industry-report" element={<IndustryReport />} />
          <Route path="governance/scheme-of-arrangements" element={<SchemeArrangements />} />
          <Route path="governance/media-press" element={<MediaPress />} />

        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}