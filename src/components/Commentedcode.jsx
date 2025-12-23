 {/* ⭐ STOCK WITH MEGA MENU ⭐ */}
          <li
            className="nav-item mega-parent"
            onMouseEnter={() => handleMenuEnter("stock")}
            onMouseLeave={handleMenuLeave}
          >
            <Link
              to="/stock"
              className={location.pathname === "/stock" ? "active-link" : ""}
            >
              Stock
            </Link>

            {openMenu === "stock" && (
              <div
                className="mega-menu"
                onMouseEnter={() => handleMenuEnter("stock")}
                onMouseLeave={handleMenuLeave}
              >
                <div className="mega-inner">

                  {/* LEFT SECTION */}
                  <div className="mega-left">
                    <img src="/images/stock.webp" className="mega-img" alt="" />
                    <h3>Invest in Stocks</h3>
                    <p>
                      Explore stocks, ETFs and IPOs with fast order execution. Track your
                      holdings, analyse trends and monitor real-time performance.
                    </p>
                  </div>

                  
                  <div className="mega-cols">

                   
                    <div className="mega-col">

                      <Link
                        to="/stock?scroll=stock"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Intraday</h4>
                          <p>Monitor intraday performers in real time</p>
                        </div>
                      </Link>

                      <Link
                        to="/stock?scroll=stock"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Stock</h4>
                          <p>View live stock prices and analysis</p>
                        </div>
                      </Link>


                      <Link
                        to="/stock?scroll=performance"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Performance</h4>
                          <p>Track performance, returns & trends</p>
                        </div>
                      </Link>


                    </div>

                    
                    <div className="mega-col">

                      <Link
                        to="/stock?scroll=fundamentals"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Fundamentals</h4>
                          <p>Evaluate company fundamentals & ratios</p>
                        </div>
                      </Link>


                      <Link
                        to="/stock?scroll=financials"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Financials</h4>
                          <p>View revenue, profit & quarterly reports</p>
                        </div>
                      </Link>


                      <Link
                        to="/stock?scroll=shareholding"
                        className="mega-item-link"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenu(null);
                        }}
                      >
                        <div className="mega-item">
                          <h4>Shareholding Pattern</h4>
                          <p>See promoters, FII, DII and public holdings</p>
                        </div>
                      </Link>


                    </div>

                  </div>

                </div>
              </div>
            )}
          </li>