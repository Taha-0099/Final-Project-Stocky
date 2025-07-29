import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Languages.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faGlobe } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
import axios from "axios";

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [form, setForm] = useState({ name: "", locale: "", flag: null });

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/languages");
      setLanguages(res.data);
    } catch (err) {
      console.error("Failed to load languages", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleAdd = async () => {
    if (!form.name || !form.locale || !form.flag) {
      return Swal.fire("Error", "Please fill all fields.", "error");
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("locale", form.locale);
    formData.append("flag", form.flag);

    try {
      await axios.post("http://localhost:5001/api/languages", formData);
      Swal.fire("Added", "Language added successfully.", "success");
      setForm({ name: "", locale: "", flag: null });
      fetchLanguages();
    } catch (err) {
      console.error("Add failed", err);
      Swal.fire("Error", "Failed to add language.", "error");
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will delete the language.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5001/api/languages/${id}`);
          Swal.fire("Deleted", "Language has been removed.", "success");
          fetchLanguages();
        } catch (err) {
          Swal.fire("Error", "Failed to delete language.", "error");
        }
      }
    });
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className="languages-container">
        <h2><FontAwesomeIcon icon={faGlobe} /> Languages</h2>
        <p className="breadcrumb">Settings | Languages</p>

        <div className="form-box">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Locale</label>
            <input
              type="text"
              name="locale"
              value={form.locale}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Flag</label>
            <input type="file" name="flag" onChange={handleChange} />
          </div>

          <div className="button-row">
            <button className="add-btn" onClick={handleAdd}>Add Language</button>
            <button className="reset-btn" onClick={() => setForm({ name: "", locale: "", flag: null })}>Reset</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Flag</th>
              <th>Name</th>
              <th>Locale</th>
              <th>Is Active</th>
              <th>Is Default</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {languages.map((lang) => (
              <tr key={lang._id}>
                <td><img src={`http://localhost:5001/${lang.flag}`} alt="flag" className="flag-img" /></td>
                <td>{lang.name}</td>
                <td>{lang.locale}</td>
                <td><input type="checkbox" checked={lang.isActive} readOnly /></td>
                <td><input type="checkbox" checked={lang.isDefault} readOnly /></td>
                <td>
                  <button className="edit-btn"><FontAwesomeIcon icon={faEdit} /> Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(lang._id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                  <button className="translate-btn">Translations</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Footer />
      </div>
    </>
  );
};

export default Languages;