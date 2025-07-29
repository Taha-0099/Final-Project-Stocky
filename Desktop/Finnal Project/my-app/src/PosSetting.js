import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone, faUser, faBarcode, faMapMarkerAlt, faEnvelope, faWarehouse, faReceipt, faCheckCircle, faCog, faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import "./PosSetting.css";
import Header from "./Header";
import SideBar from "./SideBar";
import { SettingsContext } from "./SettingsContext";
import axios from "axios";

const PosSetting = () => {
  const { settings, setSettings, loading, fetchSettings } = useContext(SettingsContext);

  // Local state for form, initialized once settings are loaded
  const [form, setForm] = useState({
    note: "",
    showPhone: true,
    showCustomer: true,
    showBarcode: true,
    showAddress: true,
    showWarehouse: true,
    showNote: true,
    showEmail: true,
    showTax: true,
    printInvoice: true,
    displayItems: 8
  });

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5001/api/settings", form);
      setSettings(res.data);
      Swal.fire({
        icon: "success",
        title: "Settings Saved!",
        text: "Your POS settings have been updated.",
        confirmButtonColor: "#8f5aff"
      });
    } catch (err) {
      Swal.fire("Error", "Failed to save settings", "error");
    }
  };

  if (loading || !form) return <div>Loading...</div>;

  return (
    <>
      <Header/>
      <SideBar/>
      <div className="possettings-main">
        <div className="possettings-header">
          <h2>POS Settings</h2>
          <div className="possettings-settings-link">
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
            <span className="divider">|</span>
            <span>POS Settings</span>
          </div>
        </div>
        <div className="possettings-container">
          <div className="possettings-title">POS Settings</div>
          <form className="possettings-form" onSubmit={handleSubmit}>
            <label>
              Note to customer *
              <input
                className="ps-input"
                type="text"
                name="note"
                value={form.note}
                maxLength={120}
                onChange={handleChange}
                required
              />
            </label>
            <div className="ps-switch-row">
              <ToggleSwitch
                checked={form.showPhone}
                onChange={handleChange}
                name="showPhone"
                label="Show Phone"
                icon={faPhone}
              />
              <ToggleSwitch
                checked={form.showAddress}
                onChange={handleChange}
                name="showAddress"
                label="Show Address"
                icon={faMapMarkerAlt}
              />
              <ToggleSwitch
                checked={form.showEmail}
                onChange={handleChange}
                name="showEmail"
                label="Show Email"
                icon={faEnvelope}
              />
            </div>
            <div className="ps-switch-row">
              <ToggleSwitch
                checked={form.showCustomer}
                onChange={handleChange}
                name="showCustomer"
                label="Show Customer"
                icon={faUser}
              />
              <ToggleSwitch
                checked={form.showWarehouse}
                onChange={handleChange}
                name="showWarehouse"
                label="Show warehouse"
                icon={faWarehouse}
              />
              <ToggleSwitch
                checked={form.showTax}
                onChange={handleChange}
                name="showTax"
                label="Show Tax & Discount & Shipping"
                icon={faReceipt}
              />
            </div>
            <div className="ps-switch-row">
              <ToggleSwitch
                checked={form.showBarcode}
                onChange={handleChange}
                name="showBarcode"
                label="Show barcode"
                icon={faBarcode}
              />
              <ToggleSwitch
                checked={form.showNote}
                onChange={handleChange}
                name="showNote"
                label="Show Note to customer"
                icon={faInfoCircle}
              />
              <ToggleSwitch
                checked={form.printInvoice}
                onChange={handleChange}
                name="printInvoice"
                label="Print Invoice automatically"
                icon={faCheckCircle}
              />
            </div>
            <label>
              How many items do you want to display *
              <input
                className="ps-input"
                type="number"
                name="displayItems"
                min={1}
                max={100}
                value={form.displayItems}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="ps-submit-btn">
              <FontAwesomeIcon icon={faCheckCircle} style={{marginRight: 8}} />
              Submit
            </button>
          </form>
        </div>
        {/* Footer */}
        <div className="possettings-footer">
          <div>
            <b>Stocky - Ultimate Inventory With POS</b>
            <div className="ps-footer-desc">
              <FontAwesomeIcon icon={faCog} className="ps-footer-icon" />
              <span>
                © 2025 Developed by Stocky<br/>
                All rights reserved - v5.0
              </span>
            </div>
          </div>
          <button className="ps-buy-btn">
            Buy Stocky
          </button>
        </div>
      </div>
    </>
  );
};

// ToggleSwitch sub-component
function ToggleSwitch({ checked, onChange, label, icon, name }) {
  return (
    <label className="ps-toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <span className="ps-slider"></span>
      {icon && <FontAwesomeIcon icon={icon} className="ps-icon" />}
      <span className="ps-label">{label}</span>
    </label>
  );
}

export default PosSetting;
