import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);   // ⭐ for mega menu
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuTimer = useRef(null);

  const handleMenuEnter = (menu) => {
    if (menuTimer.current) {
      clearTimeout(menuTimer.current);
      menuTimer.current = null;
    }
    setOpenMenu(menu);
  };

  const handleMenuLeave = () => {
    menuTimer.current = setTimeout(() => {
      setOpenMenu(null);
    }, 250);
  };

  return (
    <nav className={scrolled ? "nav-container scrolled" : "nav-container"}>
      <div className="nav-content">

        {/* LEFT - LOGO */}
        <div className="nav-left">
          <a href="http://investor.symbiotec.com/">
            <img src="/images/symbiotec-logo.webp" alt="logo" className="nav-logo" />
          </a>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="nav-links">

          {/* Home */}
          <li className="nav-item">
            <Link
              to="/"
              className={location.pathname === "/" ? "active-link" : ""}
            >
              Investor's Home
            </Link>
          </li>

          {/* Performance */}
          {/* ⭐ PERFORMANCE WITH MEGA MENU ⭐ */}
          <li
            className="nav-item mega-parent"
            onMouseEnter={() => handleMenuEnter("performanceMenu")}
            onMouseLeave={handleMenuLeave}
          >

            <Link
              to="/performance"
              className={location.pathname === "/performance" ? "active-link" : ""}
            >
              Financial Result
            </Link>

            {openMenu === "performanceMenu" && (
              <div
                className="mega-menu"
                onMouseEnter={() => handleMenuEnter("performanceMenu")}
                onMouseLeave={handleMenuLeave}
              >
                <div className="mega-inner">

                  {/* LEFT SECTION */}
                  <div className="mega-left">
                    <img src="/images/stock.webp" className="mega-img" alt="" />
                    <h3>Financial Result</h3>
                    <p>
                      View quarterly and annual financial reports, statements, and
                      results that reflect the company’s performance.
                    </p>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className="mega-cols">

                    {/* COLUMN 1 */}
                    <div className="mega-col">

                      <Link to="/performance?tab=quarterly" className="mega-item-link" onClick={() => setOpenMenu(null)}>
                        <div className="mega-item">
                          <h4>Quarterly Results</h4>
                          <p>Financial results for all reported quarters</p>
                        </div>
                      </Link>


                      <Link to="/performance?tab=annual&annualTab=company" className="mega-item-link" onClick={() => setOpenMenu(null)}>
                        <div className="mega-item">
                          <h4>Annual Reports</h4>
                          <p>Annual performance, statements and analysis</p>
                        </div>
                      </Link>


                    </div>

                  </div>

                </div>
              </div>
            )}
          </li>


          {/* Announcements */}
          <li className="nav-item">
            <Link
              to="/announcements"
              className={location.pathname === "/announcements" ? "active-link" : ""}
            >
              Announcements
            </Link>
          </li>

          {/* Governance */}
          {/* ⭐ GOVERNANCE WITH MEGA MENU ⭐ */}
          <li
            className="nav-item mega-parent"
            onMouseEnter={() => handleMenuEnter("governance")}
            onMouseLeave={handleMenuLeave}
          >

            <Link
              to="/governance"
              className={location.pathname === "/governance" ? "active-link" : ""}
            >
              Governance
            </Link>

            {openMenu === "governance" && (
              <div
                className="mega-menu"
                onMouseEnter={() => handleMenuEnter("governance")}
                onMouseLeave={handleMenuLeave}
              >
                <div className="mega-inner">

                  {/* LEFT SECTION */}
                  <div className="mega-left">
                    <img src="/images/stock.webp" className="mega-img" alt="" />
                    <h3>Corporate Governance</h3>
                    <p>
                      Explore governance structure, policies, disclosures and documents
                      ensuring transparency and compliance for stakeholders.
                    </p>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className="mega-cols">

                    {/* COLUMN 1 */}
                    <div className="mega-col">

                      <Link
                        to="/governance?tab=Board"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Board</h4>
                          <p>Meet our Board of Directors & leadership</p>
                        </div>
                      </Link>

                      <Link
                        to="/governance?tab=Committee%20Composition"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Committee Composition</h4>
                          <p>Audit, CSR, NRC and other committees</p>
                        </div>
                      </Link>

                      <Link
                        to="/governance?tab=Policies"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Policies</h4>
                          <p>Corporate, statutory & compliance policies</p>
                        </div>
                      </Link>

                      </div>

                        <div className="mega-col">
                      <Link
                        to="/governance?tab=Offer%20Documents"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Offer Documents</h4>
                          <p>Prospectus, DRHP, RHP and related filings</p>
                        </div>
                      </Link>

                      <Link
                        to="/governance?tab=Shareholding%20Pattern"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Shareholding Pattern</h4>
                          <p>Promoters, FII, DII and public share data</p>
                        </div>
                      </Link>

                   <Link
  to="/governance?tab=Disclosures"
  className="mega-item-link"
  onClick={(e) => {
    e.stopPropagation();
    setOpenMenu(null);
  }}
>
  <div className="mega-item">
    <h4>Disclosures</h4>
    <p>Regulatory & financial disclosures</p>
  </div>
</Link>


                    </div>

                  </div>

                </div>
              </div>
            )}
          </li>



          <li
            className="nav-item mega-parent"
            onMouseEnter={() => handleMenuEnter("more")}
            onMouseLeave={handleMenuLeave}
          >

            <span className="more-link">More</span>
            {/* since no page, we use span instead of Link */}

            {openMenu === "more" && (
              <div
                className="mega-menu"
                onMouseEnter={() => handleMenuEnter("more")}
                onMouseLeave={handleMenuLeave}
              >
                <div className="mega-inner">

                  {/* LEFT SECTION */}
                  <div className="mega-left">
                    <img src="/images/stock.webp" className="mega-img" alt="" />
                    <h3>More Options</h3>
                    <p>
                      Find additional resources, support, policies, and company information.
                    </p>
                  </div>

                  {/* RIGHT SECTION */}
                  <div className="mega-cols">

                    {/* COLUMN 1 */}
                    <div className="mega-col">

                      <a
                        href="/policy"
                        rel="noopener noreferrer"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Privacy Policy</h4>

                          <p>Read our privacy & data usage practices</p>
                        </div>
                      </a>


                      <Link
                        to="/help"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Help Center</h4>
                          <p>Get answers to frequently asked questions</p>
                        </div>
                      </Link>


                      {/* <Link
                        to="/stock"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Stock</h4>
                          <p>View stock updates </p>
                        </div>
                      </Link> */}


                    </div>

                    {/* COLUMN 2 */}
                    {/* <div className="mega-col">

                      <Link
                        to="https://www.symbiotec.com/career/"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Careers</h4>
                          <p>Explore job opportunities and openings</p>
                        </div>
                      </Link>


                      <Link
                        to="/impact"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Impact</h4>
                          <p>See our Impact and Culture</p>
                        </div>
                      </Link>


                      <Link
                        to="https://www.symbiotec.com/contact-us/"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Contact</h4>
                          <p>Get in touch with our support team</p>
                        </div>
                      </Link>


                    </div> */}

                  </div>

                </div>
              </div>
            )}
          </li>


        </ul>

        {/* MOBILE MENU ICON */}
        <div className="nav-menu-icon" onClick={() => setOpen(!open)}>
          {open ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {open && (
        <ul className="mobile-menu">
          <li className="mobile-item"><Link to="/" onClick={() => setOpen(false)}>Investors'Home</Link></li>
          <li className="mobile-item"><Link to="/performance" onClick={() => setOpen(false)}>Performance</Link></li>
          <li className="mobile-item"><Link to="/announcements" onClick={() => setOpen(false)}>Announcements</Link></li>
          <li className="mobile-item"><Link to="/governance" onClick={() => setOpen(false)}>Governance</Link></li>
          {/* <li className="mobile-item"><Link to="/stock" onClick={() => setOpen(false)}>Stock</Link></li>
          <li className="mobile-item"><Link to="/impact" onClick={() => setOpen(false)}>Impact</Link></li> */}

        </ul>
      )}
    </nav>
  );
};

export default Navbar;
