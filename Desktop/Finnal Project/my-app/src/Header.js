import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faExpandArrowsAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faBell as farBell } from "@fortawesome/free-regular-svg-icons";
import { SettingsContext } from "./SettingsContext";
import Footer from './Footer';

function Header() {
  const { settings } = useContext(SettingsContext);

  // Helper to build logo URL for local uploads
  let logoUrl = "";
  if (settings?.logo) {
    // If logo path already includes 'http', use as is. Otherwise build full URL.
    if (settings.logo.startsWith('http')) {
      logoUrl = settings.logo;
    } else if (settings.logo.startsWith('uploads/')) {
      logoUrl = `http://localhost:5001/${settings.logo}`;
    } else {
      logoUrl = `http://localhost:5001/uploads/${settings.logo}`;
    }
  }

  return (
    <>
    <header className="dashboard-header">
      <div className="logo-section">
        <div className="logo">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt="Logo"
              style={{
                height: 32,
                width: 32,
                objectFit: "contain",
                borderRadius: "8px",
                background: "#eaeaea",
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          ) : (
            "S"
          )}
        </div>
        <FontAwesomeIcon icon={faBars} className="icon" />
      </div>
      <div className="header-icons">
        <button className="pos-btn">POS</button>
        <FontAwesomeIcon icon={faExpandArrowsAlt} className="icon" />
        <FontAwesomeIcon icon={faGlobe} className="icon" />
        <div className="notification-icon">
          <FontAwesomeIcon icon={farBell} className="icon" />
          <span className="badge">1</span>
        </div>
        <div className="brand-name">{settings?.companyName || "STOCKY"}</div>
      </div>
    </header>



</>
  );
}

export default Header;
