import React from "react";
import "./CultureSection.css";

export default function CultureSection() {
  return (
    <section className="culture-section">

      {/* ROW 1 */}
      <div className="culture-row">
        <div className="culture-left">
          <h2 className="culture-title">
            A Culture Rooted <br /> In Purpose
          </h2>
        </div>

        <div className="culture-right">
          <div className="culture-block">
            <h3 className="culture-heading">
              Once a startup, always a startup
            </h3>
            <p className="culture-text">
              Even with over 1,000 people, we still work like a startup — lean teams,
              fast decisions, and a bias for action.
            </p>
          </div>

          <div className="culture-block">
            <h3 className="culture-heading">Builders turned owners</h3>
            <p className="culture-text">
              Over 77% of our team hold stock options so the people who are building
              Groww also get to share in its growth.
            </p>
          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="culture-row">
        <div className="culture-left">
          <h2 className="culture-title">
            Doing The Right <br /> Thing For The <br /> Customer
          </h2>
        </div>

        <div className="culture-right">
          <div className="culture-block">
            <h3 className="culture-heading">Built by listening, not guessing</h3>
            <p className="culture-text">
              Our teams regularly sit in on real customer conversations so we're
              solving actual problems, not guessing them.
            </p>
          </div>

          <div className="culture-block">
            <h3 className="culture-heading">
              Learning with India, across India
            </h3>
            <p className="culture-text">
              Through our "Ab India Karega Groww" workshops across the country,
              we meet users, hear their stories, and use those insights to build
              better products.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}
