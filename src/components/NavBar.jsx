import React from "react";
import { NavLink } from "react-router-dom";

import "font-awesome/css/font-awesome.css";

function NavBar() {
  return (
    <React.Fragment>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <a href="overview" className="nav-link">
              <span className="link-text">Stacked</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="angle-double-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
            </a>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/overview">
              <i className="fa fa-pencil fa-2x fa-primary"></i>
              <span className="link-text">Overview</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/trades">
              <i className="fa fa-list-alt fa-2x fa-primary"></i>
              <span className="link-text">Trades</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/holdings">
              <i className="fa fa-table fa-2x fa-primary"></i>
              <span className="link-text">Holdings</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/gains">
              <i className="fa fa-bar-chart fa-2x fa-primary"></i>
              <span className="link-text">Gains</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/ca">
              <i className="fa fa-calendar fa-2x fa-primary"></i>
              <span className="link-text">Corporate Actions</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/stocks">
              <i className="fa fa-database fa-2x fa-primary"></i>
              <span className="link-text">Stock DB</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default NavBar;
