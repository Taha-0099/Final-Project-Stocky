import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faCloudUploadAlt,
  faBarcode,
  faBars,
  faExpandArrowsAlt,
  faGlobe,
  faShoppingCart,
  faClipboardList,
  faChartBar,
  faBoxes,
  faExchangeAlt,
  faFileInvoice,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faBell as farBell } from "@fortawesome/free-regular-svg-icons";
import SideBar from "./SideBar";
import "./SS.css";
import { SettingsContext } from "./SettingsContext"; // <-- ADD THIS!



const initialState = {
  currency: "US Dollar",
  companyName: "Stocky",
  footer: "Stocky - Ultimate Inventory With POS",
  warehouse: "Warehouse 1",
  address: "3618  Abia Martin Drive",
  email: "admin@example.com",
  phone: "6315996770",
  language: "English",
  smsGateway: "twilio",
  logo: null,
  developedBy: "Stocky",
  customer: "walk-in-customer",
  timeZone: "UTC/GMT +00:00 - UTC",
  invoiceFooter: false,
  createQuotation: true,
  showLanguages: true,
};

const SS = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  // GET global context updater
  const { settings, setSettings } = useContext(SettingsContext);

  // Prefill data from backend (also picks up latest settings if context already has them)
  useEffect(() => {
    if (settings) {
      setForm({
        ...settings,
        logo: null,
      });
      if (settings.logo) {
        setLogoPreview(
          settings.logo.startsWith("http") ? settings.logo : "/" + settings.logo
        );
      }
      return;
    }
    setLoading(true);
    axios
      .get("http://localhost:5001/api/settings")
      .then((res) => {
        setForm({
          ...res.data,
          logo: null,
        });
        setSettings(res.data); // update global context
        if (res.data.logo) {
          setLogoPreview(
            res.data.logo.startsWith("http") ? res.data.logo : "/" + res.data.logo
          );
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not fetch settings",
        });
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [settings, setSettings]);

  const handleInput = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, logo: files[0] });
      if (files[0]) {
        setLogoPreview(URL.createObjectURL(files[0]));
      } else {
        setLogoPreview(null);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    for (let key in form) {
      // append everything except logo==null
      if (key === "logo" && form.logo) {
        formData.append("logo", form.logo);
      } else if (key !== "logo") {
        formData.append(key, form[key]);
      }
    }
    try {
      const res = await axios.put("http://localhost:5001/api/settings", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Live update global context (Header, etc) with new settings!
      setSettings(res.data);

      Swal.fire({
        icon: "success",
        title: "Settings Saved",
        text: "System settings have been updated successfully.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "Error saving settings",
      });
    }
    setLoading(false);
  };

  const handleClearCache = () => {
    setLoading(true);
    axios
      .post("http://localhost:5001/api/settings/clear-cache")
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Cache Cleared",
          text: "Application cache has been cleared.",
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to clear cache.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <SideBar />

      <header className="dashboard-header">
        <div className="logo-section">
          <div className="logo">S</div>
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
          <div className="brand-name">STOCKY</div>
        </div>
      </header>

      <div className="ss-page">
        <div className="ss-header">
          <FontAwesomeIcon icon={faCog} className="ss-header-icon" />
          <span className="ss-header-title">System Settings</span>
          <span className="ss-header-link">Settings</span>
          <span className="ss-header-divider">{">"}</span>
          <span className="ss-header-breadcrumb">System Settings</span>
        </div>
        <form className="ss-card" onSubmit={handleSubmit}>
          <h3 className="ss-card-title">System Settings</h3>
          <div className="ss-grid">
            <div className="ss-form-group">
              <label>Default Currency</label>
              <select
                name="currency"
                value={form.currency}
                onChange={handleInput}
              >
                <option>US Dollar</option>
                <option>Euro</option>
                <option>PKR</option>
                <option>Rupee</option>
              </select>
            </div>
            <div className="ss-form-group">
              <label>Default Email *</label>
              <input
                name="email"
                value={form.email || ""}
                onChange={handleInput}
                required
              />
            </div>
            <div className="ss-form-group">
              <label>Company Name *</label>
              <input
                name="companyName"
                value={form.companyName || ""}
                onChange={handleInput}
                required
              />
            </div>
            <div className="ss-form-group">
              <label>Company Phone *</label>
              <input
                name="phone"
                value={form.phone || ""}
                onChange={handleInput}
                required
              />
            </div>
            <div className="ss-form-group">
              <label>footer *</label>
              <input
                name="footer"
                value={form.footer || ""}
                onChange={handleInput}
                required
              />
            </div>
            <div className="ss-form-group">
              <label>Default Language</label>
              <select
                name="language"
                value={form.language}
                onChange={handleInput}
              >
                <option>English</option>
                <option>Urdu</option>
                <option>Arabic</option>
              </select>
            </div>
            <div className="ss-form-group">
              <label>Default Warehouse</label>
              <select
                name="warehouse"
                value={form.warehouse}
                onChange={handleInput}
              >
                <option>Warehouse 1</option>
                <option>Warehouse 2</option>
              </select>
            </div>
            <div className="ss-form-group">
              <label>Default SMS Gateway</label>
              <select
                name="smsGateway"
                value={form.smsGateway}
                onChange={handleInput}
              >
                <option>twilio</option>
                <option>other</option>
              </select>
            </div>
            <div className="ss-form-group ss-upload-group">
              <label>Change Logo</label>
              <div className="ss-upload-btn">
                <label className="ss-file-label">
                  <FontAwesomeIcon icon={faCloudUploadAlt} /> Choose File
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleInput}
                  />
                </label>
                <span className="ss-file-chosen">
                  {form.logo
                    ? form.logo.name
                    : logoPreview
                    ? (
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          style={{ height: "32px", verticalAlign: "middle", marginLeft: "10px" }}
                        />
                      )
                    : "No file chosen"}
                </span>
              </div>
            </div>
            <div className="ss-form-group">
              <label>Developed by *</label>
              <input
                name="developedBy"
                value={form.developedBy || ""}
                onChange={handleInput}
                required
              />
            </div>
            <div className="ss-form-group">
              <label>Default Customer</label>
              <select
                name="customer"
                value={form.customer}
                onChange={handleInput}
              >
                <option>walk-in-customer</option>
                <option>cash-customer</option>
              </select>
            </div>
            <div className="ss-form-group">
              <label>Time Zone</label>
              <select
                name="timeZone"
                value={form.timeZone}
                onChange={handleInput}
              >
                <option>UTC/GMT +00:00 - UTC</option>
                <option>UTC+05:00 - PKT</option>
              </select>
            </div>
          </div>
          <div className="ss-form-group" style={{ gridColumn: "1 / -1" }}>
            <label>Address *</label>
            <textarea
              name="address"
              value={form.address || ""}
              onChange={handleInput}
              required
            />
          </div>
          <div className="ss-options-row">
            <label>
              <input
                type="checkbox"
                name="invoiceFooter"
                checked={form.invoiceFooter || false}
                onChange={handleInput}
              />
              Invoice footer
            </label>
            <label>
              <input
                type="checkbox"
                name="createQuotation"
                checked={form.createQuotation || false}
                onChange={handleInput}
              />
              Create Quotation with Stock
            </label>
            <label>
              <input
                type="checkbox"
                name="showLanguages"
                checked={form.showLanguages || false}
                onChange={handleInput}
              />
              Show Languages
            </label>
          </div>
          <button className="ss-submit-btn" type="submit" disabled={loading}>
            <FontAwesomeIcon icon={faCog} /> {loading ? "Saving..." : "Submit"}
          </button>
        </form>
        <div className="ss-card ss-cache-card">
          <button
            className="ss-cache-btn"
            onClick={handleClearCache}
            disabled={loading}
          >
            Clear Cache
          </button>
        </div>
        <footer className="ss-footer">
          <div>
            <b>Stocky - Ultimate Inventory With POS</b>
            <br />
            © 2025 Developed by Stocky <br />
            All rights reserved - v5.0
          </div>
          <div>
            <div className="ss-footer-logo">
              <span>S</span>
            </div>
            <button className="ss-buy-btn">Buy Stocky</button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SS;
