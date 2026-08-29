/**
 * Navbar.tsx – CRS gov.in Angular header.
 *
 * Layout:
 *   .crs-header-top (relative)
 *     .crs-flag-bg-left   ← flag.svg flipped, absolute left
 *     .crs-flag-bg-right  ← flag.svg original, absolute right
 *     .crs-emblem          ← emblem.png centered
 *     .crs-header-content  ← logos left, buttons right (on top of flags)
 *   .crs-nav-bar
 */

import { Link } from "react-router-dom";

import flagSvg_left from "../../assets/flag_left.svg";
import flagSvg_right from "../../assets/flag_right.svg";
import emblemPng from "../../assets/emblem.png";
import crsLogoLightPng from "../../assets/crs-logo-light.png";
import crsLogoPng from "../../assets/crs-logo.png";
import azadiLogoPng from "../../assets/azadi-logo.png";

import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="crs-header">
      {/* ───── Top header bar ───── */}
      <div className="crs-header-top">
        {/* Flag backgrounds + emblem (behind content) */}
        {/* <div className="crs-flag-bg-left">
          <img src={flagSvg} alt="Flag BG" />
        </div>
        <div className="crs-flag-bg-right">
          <img src={flagSvg} alt="Flag BG" />
        </div>
        <div className="crs-emblem">
          <img src={emblemPng} alt="National Emblem" width="105" height="154" />
        </div> */}

        {/* Content row — on top of flags */}
        <div className="crs-header-content">
          <div className="crs-header-left" style={{
            backgroundImage: `url("${flagSvg_left}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            backgroundSize: "cover",
          }}>
            <img
              src={crsLogoLightPng}
              alt="Birth and Death Registration Logo"
              className="crs-logo-desktop"
            />
            <img
              src={crsLogoPng}
              alt="Birth and Death Registration Logo"
              className="crs-logo-mobile"
            />
            {/* <span className="crs-spacer" /> */}
            <img
              src={azadiLogoPng}
              alt="75th Anniversary of Indian Independence"
              className="crs-azadi-logo"
            />
          </div>
          <div className="crs-emblem">
          <img src={emblemPng} alt="National Emblem" width="35" height="154" />
        </div> 
          <div className="crs-header-right" style={{
            backgroundImage: `url("${flagSvg_right}")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center",
            backgroundSize: "cover",
          }}>
            <div className="crs-header-actions">
              <div className="crs-font-buttons">
                <button type="button" className="crs-font-btn">
                  <span className="fs-8">A<sup>-</sup></span>
                </button>
                <button type="button" className="crs-font-btn">A</button>
                <button type="button" className="crs-font-btn">
                  A<sup>+</sup>
                </button>
              </div>
              <button type="button" className="crs-icon-btn" title="Toggle theme">
                <span className="material-icons">dark_mode</span>
              </button>
              <Link to="/" className="crs-login-btn">
                <span className="material-icons">person</span>
                <span className="crs-login-text">Login</span>
                <span className="material-icons">expand_more</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ───── Navigation bar ───── */}
      <div className="crs-nav-bar">
        <Link to="/" className="crs-nav-btn">Home</Link>
        <span className="crs-nav-btn">About CRS</span>
        <span className="crs-nav-btn">
          RBD Act and Model Rules
          <span className="material-icons">expand_more</span>
        </span>
        <span className="crs-nav-btn">Circulars</span>
        <span className="crs-nav-btn">
          Forms
          <span className="material-icons">expand_more</span>
        </span>
        <span className="crs-nav-btn">Training Manuals</span>
        <span className="crs-nav-btn">
          FAQs
          <span className="material-icons">expand_more</span>
        </span>
        <span className="crs-nav-btn crs-nav-howto">How To Apply</span>
      </div>
    </div>
  );
}
