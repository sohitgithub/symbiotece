import React from "react";
import "./TermsConditions.css";

export default function TermsConditions() {
  return (
    <section className="tc-wrapper">
      <div className="tc-container">

        <h1 className="tc-main-title">Terms & Conditions</h1>
        <p className="tc-updated">Last Updated: January 2025</p>

        {/* INTRODUCTION */}
        <h2 className="tc-heading">1. Introduction & Agreement</h2>
        <p className="tc-text">
          Welcome to <strong>Symbiotec Pharmalab Pvt. Ltd.</strong> (“Company”, “we”, 
          “our”, “us”). These Terms & Conditions (“Terms”) govern your access 
          and use of our website, digital content, and services.  
          By using the Website, you acknowledge that you have read, understood, 
          and agree to be bound by these Terms.
        </p>

        {/* DEFINITIONS */}
        <h2 className="tc-heading">2. Definitions</h2>
        <ul className="tc-list">
          <li><strong>“User”, “You”</strong>: Any individual accessing or using the Website.</li>
          <li><strong>“Content”</strong>: All material, data, graphics, text, and resources on the Website.</li>
          <li><strong>“Services”</strong>: Digital tools, information, and features available online.</li>
        </ul>

        {/* ELIGIBILITY */}
        <h2 className="tc-heading">3. Eligibility & Access Rights</h2>
        <p className="tc-text">
          You must be at least <strong>18 years old</strong> to access or use this Website. 
          We reserve the right to restrict or terminate access for violation of these Terms.
        </p>

        {/* IP RIGHTS */}
        <h2 className="tc-heading">4. Intellectual Property Rights</h2>
        <p className="tc-text">
          All logos, trademarks, scientific data, product information, designs, 
          and content belong exclusively to <strong>Symbiotec Pharmalab Pvt. Ltd.</strong>
          Unauthorized use, reproduction, distribution, or modification is prohibited.
        </p>

        {/* USAGE RULES */}
        <h2 className="tc-heading">5. Website Usage Rules</h2>
        <ul className="tc-list">
          <li>You must comply with all applicable laws and regulations.</li>
          <li>Do not impersonate any person or organization.</li>
          <li>Do not bypass security systems or attempt unauthorized access.</li>
          <li>Do not scrape, copy, or extract data using bots or automation tools.</li>
        </ul>

        {/* PROHIBITED */}
        <h2 className="tc-heading">6. Prohibited Activities</h2>
        <ul className="tc-list">
          <li>Misuse of scientific, pharmaceutical, or proprietary content.</li>
          <li>Uploading malicious files, viruses, or harmful scripts.</li>
          <li>Reverse engineering or reproduction of proprietary systems.</li>
        </ul>

        {/* ACCURACY */}
        <h2 className="tc-heading">7. Accuracy of Information</h2>
        <p className="tc-text">
          While we aim for accuracy, the Website may contain technical, regulatory, 
          or scientific updates. Users must independently validate critical information.
        </p>

        {/* THIRD PARTY */}
        <h2 className="tc-heading">8. Third-Party Links</h2>
        <p className="tc-text">
          External links are provided for convenience only. Symbiotec does not endorse 
          or guarantee the accuracy, safety, or reliability of third-party content.
        </p>

        {/* DISCLAIMERS */}
        <h2 className="tc-heading">9. Disclaimers of Warranties</h2>
        <p className="tc-text">
          The Website is provided on an <strong>“as-is”</strong> and <strong>“as-available”</strong> basis. 
          We make no warranties regarding uninterrupted service, accuracy of data, 
          or security of transmitted information.
        </p>

        {/* LIABILITY */}
        <h2 className="tc-heading">10. Limitation of Liability</h2>
        <p className="tc-text">
          Symbiotec shall not be held liable for direct, indirect, incidental, or 
          consequential damages arising from Website use.  
          Our total liability shall not exceed any amount paid (if applicable) 
          for accessing the Website.
        </p>

        {/* INDEMNIFICATION */}
        <h2 className="tc-heading">11. Indemnification</h2>
        <p className="tc-text">
          You agree to indemnify and defend Symbiotec against all claims, losses, 
          legal fees, or liabilities resulting from misuse of the Website or 
          violation of these Terms.
        </p>

        {/* USER ACCOUNTS */}
        <h2 className="tc-heading">12. User Accounts</h2>
        <p className="tc-text">
          If accounts are enabled, users must maintain confidentiality of login 
          credentials. Suspicious activity may result in account suspension.
        </p>

        {/* GOVERNING LAW */}
        <h2 className="tc-heading">13. Governing Law & Jurisdiction</h2>
        <p className="tc-text">
          These Terms are governed by the laws of <strong>India</strong>.  
          All disputes shall fall under the exclusive jurisdiction of the 
          courts of <strong>Indore, Madhya Pradesh</strong>.
        </p>

        {/* CHANGES */}
        <h2 className="tc-heading">14. Changes to Terms</h2>
        <p className="tc-text">
          We may update or revise these Terms periodically. Continued Website use 
          indicates acceptance of revised Terms.
        </p>

        {/* CONTACT */}
        <h2 className="tc-heading">15. Contact Information</h2>
        <p className="tc-text">
          For concerns or clarification, reach us at:
        </p>
        <p className="tc-text">
          <strong>Email:</strong> info@symbiotec.com<br />
          <strong>Website:</strong> www.symbiotec.com<br />
          <strong>Address:</strong> Indore, Madhya Pradesh, India
        </p>

      </div>
    </section>
  );
}
