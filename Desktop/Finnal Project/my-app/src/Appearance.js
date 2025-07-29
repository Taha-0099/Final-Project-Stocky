import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./Appearance.css";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import { SettingsContext } from "./SettingsContext";
import axios from "axios";

const Appearance = () => {
  const { settings, fetchSettings } = useContext(SettingsContext);
  const [form, setForm] = useState({
    appName: "",
    pageTitle: "",
    developedBy: "",
    footer: "",
    favicon: null,
    logo: null,
  });

  useEffect(() => {
    if (settings) {
      setForm({
        appName: settings.appName || "",
        pageTitle: settings.pageTitle || "",
        developedBy: settings.developedBy || "",
        footer: settings.footer || "",
        favicon: null,
        logo: null,
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("appName", form.appName);
    formData.append("pageTitle", form.pageTitle);
    formData.append("developedBy", form.developedBy);
    formData.append("footer", form.footer);
    if (form.logo) formData.append("logo", form.logo);
    if (form.favicon) formData.append("favicon", form.favicon);

    try {
      await axios.post("http://localhost:5001/api/settings", formData);
      Swal.fire("Success", "Your appearance settings have been updated.", "success");
      fetchSettings();
    } catch (error) {
      Swal.fire("Error", "Failed to save settings", "error");
    }
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className="appearance-container">
        <h2>
          <FontAwesomeIcon icon={faCog} /> Appearance Settings
        </h2>
        <p className="breadcrumb">Settings | Appearance Settings</p>

        <form className="appearance-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-row">
            <label>App Name *</label>
            <input
              type="text"
              name="appName"
              value={form.appName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Page title suffix *</label>
            <input
              type="text"
              name="pageTitle"
              value={form.pageTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Change Logo</label>
            <input type="file" name="logo" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Change Favicon</label>
            <input type="file" name="favicon" onChange={handleChange} />
          </div>

          <div className="form-row">
            <label>Developed by *</label>
            <input
              type="text"
              name="developedBy"
              value={form.developedBy}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Footer *</label>
            <input
              type="text"
              name="footer"
              value={form.footer}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            <FontAwesomeIcon icon={faCog} /> Submit
          </button>
        </form>

        <Footer />
      </div>
    </>
  );
};

export default Appearance;


