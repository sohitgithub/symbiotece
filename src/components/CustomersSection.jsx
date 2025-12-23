import React from "react";
import { FiUserCheck } from "react-icons/fi";
import { RiBankLine } from "react-icons/ri";
import "./CustomersSection.css";

export default function CustomersSection() {
  return (
    <section className="customers-wrapper">
      <h2 className="customers-title">Our Customers</h2>

      <div className="customers-cards">

        {/* Card 1 */}
        <div className="customer-card">
          <FiUserCheck className="customer-icon" />
          <h3 className="customer-value">19.98 Million</h3>
          <p className="customer-label">Total Transacting Users</p>
          <p className="customer-date">On platform, as of 02 December 2025.</p>
        </div>

        {/* Card 2 */}
        <div className="customer-card">
          <RiBankLine className="customer-icon" />
          <h3 className="customer-value">₹3,232,197 Million</h3>
          <p className="customer-label">In customer assets</p>
          <p className="customer-date">On platform, as of 02 December 2025.</p>
        </div>

      </div>
    </section>
  );
}
