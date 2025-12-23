import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Governance.css";

import GovernanceTabs from "../governanceComponents/GovernanceTabs";
// import Board from "../governanceComponents/Board";
import CommitteeComposition from "../governanceComponents/CommitteeComposition";
import Policies from "../governanceComponents/Policies";
import OfferDocuments from "../governanceComponents/OfferDocuments";
import ShareholdingPattern from "../governanceComponents/ShareholdingPattern";
import Disclosures from "../governanceComponents/DisclosuresSection";
import Secreterial from "../governanceComponents/Secreterial";
import MaterialCreditors from "../governanceComponents/MaterialCreditors";
import IndustryReport from "../governanceComponents/IndustryReport";
import SchemeArrangements from "../governanceComponents/SchemeArrangements";
import MediaAndPress from "../governanceComponents/MediaAndPress";

export default function Governance() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabFromURL = params.get("tab");

  const [activeTab, setActiveTab] = useState("Board");

  useEffect(() => {
    if (tabFromURL) {
      setActiveTab(tabFromURL);
    }
  }, [tabFromURL]);

  const renderContent = () => {
    // if (activeTab === "Board") return <Board/>;

    if (activeTab === "Committee Composition") return <CommitteeComposition />;
    if (activeTab === "Policies") return <Policies />;
    if (activeTab === "Offer Documents") return <OfferDocuments />;
    if (activeTab === "Shareholding Pattern") return <ShareholdingPattern />;
    if (activeTab === "Disclosures") return <Disclosures />;
    if (activeTab === "Secreterial & Regu.Compliance") return <Secreterial />;
    if (activeTab === "Material Creditors") return <MaterialCreditors />;
    if (activeTab === "Industry Report") return <IndustryReport />;
    if (activeTab === "Scheme of Arrangements") return <SchemeArrangements />;
    if (activeTab === "Media & Press") return <MediaAndPress />;

    return null;
  };

  return (
    <section className="governance-page">
      <GovernanceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="governance-content">
        {renderContent()}
      </div>
    </section>
  );
}
