/**
 * Footer.tsx – Exact replica of the CRS gov.in Angular footer.
 *
 * Structure:
 *   - Government site logos row (data.gov.in, india.gov.in, etc.)
 *   - Quick links
 *   - Last updated, developer credit, copyright bar
 */

import mygovSvg from "../../assets/mygov.svg";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="crs-footer">
      <div className="crs-footer-inner">
        {/* ───── Government logos row ───── */}
        <ul className="crs-gov-sites">
          <li className="crs-gov-logo crs-gov-data-gov" title="data.gov.in" />
          <li className="crs-gov-logo crs-gov-indiagov" title="india.gov.in" />
          <li className="crs-gov-logo crs-gov-pmica" title="PM India" />
          <li className="crs-gov-logo crs-gov-makeinindia" title="Make in India" />
          <li className="crs-gov-logo crs-gov-digitalindia" title="Digital India" />
          <li className="crs-gov-logo crs-gov-mygov" title="MyGov">
            <img src={mygovSvg} alt="MyGov" className="crs-mygov-img" />
          </li>
          <li className="crs-gov-logo crs-gov-iyc" title="International Year of Cooperatives" />
        </ul>

        {/* ───── Quick links ───── */}
        <ul className="crs-quick-links">
          <li><span>Website Policy</span></li>
          <li><span>Mobile App Privacy Policy</span></li>
          <li><span>Terms &amp; Conditions</span></li>
          <li><span>Accessibility Statement</span></li>
          <li><span>Web Information Manager</span></li>
        </ul>

        <ul className="crs-quick-links crs-quick-links-last">
          <li><span>Feedback</span></li>
          <li><span>Sitemap</span></li>
          <li><span>Contact Us</span></li>
          <li><span>Vacancies</span></li>
          <li><span>Product &amp; Services</span></li>
          <li><span>Pricing</span></li>
          <li><span>Cancellation Policy</span></li>
          <li><span>Grievance Management Policy</span></li>
        </ul>

        <p className="crs-footer-updated">
          Last Updated: 30-01-2024 12:16:17
        </p>
        <p className="crs-footer-dev">
          Website Developed &amp; Maintained by Office of the Registrar General
          &amp; Census Commissioner of India
        </p>
        <p className="crs-footer-ministry">
          Ministry of Home Affairs
        </p>
      </div>

      {/* ───── Copyright bar ───── */}
      <div className="crs-copyright-bar">
        <p className="crs-copyright-text">
          © 2026 - The Registrar General &amp; Census Commissioner of India -{" "}
          <span className="crs-copyright-time">
            <span className="material-icons crs-time-icon">schedule</span>
            Aug 29, 2026, 7:48:51 PM
          </span>
        </p>
      </div>
    </footer>
  );
}
