import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import StockHero from "../stockComponents/StockHero";
import StockPerformance from "../stockComponents/StockPerformance";
import FundamentalsSection from "../stockComponents/FundamentalsSection";
import Financials from "../stockComponents/Financials";
import ShareholdingPattern from "../stockComponents/ShareholdingPattern";

export default function Stock() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const scrollTo = params.get("scroll");

  // ⭐ Auto-scroll when coming from mega menu
  useEffect(() => {
    if (!scrollTo) return;

    const elementMap = {
      stock:"stock-hero",
      performance: "stock-performance",
      fundamentals: "stock-fundamentals",
      financials: "stock-financials",
      shareholding: "stock-shareholding",
    };

    const targetId = elementMap[scrollTo];
    if (!targetId) return;

    const element = document.getElementById(targetId);

    if (element) {
      // delay ensures component fully rendered
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [scrollTo]);

  return (
    <section>
      <div id="stock-hero">
        <StockHero />
      </div>

      <div id="stock-performance">
        <StockPerformance />
      </div>

      <div id="stock-fundamentals">
        <FundamentalsSection />
      </div>

      <div id="stock-financials">
        <Financials />
      </div>

      <div id="stock-shareholding">
        <ShareholdingPattern />
      </div>
    </section>
  );
}
