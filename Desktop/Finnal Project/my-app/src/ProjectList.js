// src/ProjectList.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faPause,
  faSync,
  faTimesCircle,
  faSearch,
  faFilter,
  faFilePdf,
  faFileExcel,
  faPlus,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./ProjectList.css";
import axios from "axios";
import Header from "./Header";
import SideBar from "./SideBar";

const statusColor = {
  Completed: "#1dbf73",
  "Not Started": "#7c7c7c",
  "In Progress": "#6f69ff",
  Cancelled: "#f54747",
};

const ProjectList = () => {
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  function fetchProjects() {
    axios.get("http://localhost:5001/api/projects")
      .then(res => setProjects(res.data))
      .catch(() => setProjects([]));
  }

  const handleDelete = (_id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You are about to delete this project.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5001/api/projects/${_id}`)
          .then(() => {
            setProjects(projects => projects.filter(p => p._id !== _id));
            Swal.fire("Deleted!", "Project has been deleted.", "success");
          });
      }
    });
  };

  const handleCreate = () => {
    Swal.fire({
      title: "Create Project",
      html:
        `<input id="title" class="swal2-input" placeholder="Title" required>
        <input id="customer" class="swal2-input" placeholder="Customer" required>
        <input id="company" class="swal2-input" placeholder="Company" required>
        <input id="start" class="swal2-input" type="date" placeholder="Start Date" required>
        <input id="finish" class="swal2-input" type="date" placeholder="Finish Date" required>
        <select id="status" class="swal2-input">
          <option value="Completed">Completed</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Cancelled">Cancelled</option>
        </select>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const title = document.getElementById('title').value.trim();
        const customer = document.getElementById('customer').value.trim();
        const company = document.getElementById('company').value.trim();
        const start = document.getElementById('start').value.trim();
        const finish = document.getElementById('finish').value.trim();
        const status = document.getElementById('status').value;
        if (!title || !customer || !company || !start || !finish) {
          Swal.showValidationMessage('All fields are required!');
          return false;
        }
        return { title, customer, company, start, finish, status };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        axios.post("http://localhost:5001/api/projects", result.value)
          .then(() => {
            fetchProjects();
            Swal.fire("Success", "Project created!", "success");
          });
      }
    });
  };

  // EDIT POPUP FUNCTIONAL WITH DATE PICKER
  const handleEdit = (project) => {
    Swal.fire({
      title: "Edit Project",
      html:
        `<input id="title" class="swal2-input" placeholder="Title" value="${project.title || ""}" required>
        <input id="customer" class="swal2-input" placeholder="Customer" value="${project.customer || ""}" required>
        <input id="company" class="swal2-input" placeholder="Company" value="${project.company || ""}" required>
        <input id="start" class="swal2-input" type="date" value="${project.start ? project.start.slice(0,10) : ""}" required>
        <input id="finish" class="swal2-input" type="date" value="${project.finish ? project.finish.slice(0,10) : ""}" required>
        <select id="status" class="swal2-input">
          <option value="Completed" ${project.status === "Completed" ? "selected" : ""}>Completed</option>
          <option value="Not Started" ${project.status === "Not Started" ? "selected" : ""}>Not Started</option>
          <option value="In Progress" ${project.status === "In Progress" ? "selected" : ""}>In Progress</option>
          <option value="Cancelled" ${project.status === "Cancelled" ? "selected" : ""}>Cancelled</option>
        </select>`,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const title = document.getElementById('title').value.trim();
        const customer = document.getElementById('customer').value.trim();
        const company = document.getElementById('company').value.trim();
        const start = document.getElementById('start').value.trim();
        const finish = document.getElementById('finish').value.trim();
        const status = document.getElementById('status').value;
        if (!title || !customer || !company || !start || !finish) {
          Swal.showValidationMessage('All fields are required!');
          return false;
        }
        return { title, customer, company, start, finish, status };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        axios
          .put(`http://localhost:5001/api/projects/${project._id}`, result.value)
          .then(() => {
            fetchProjects();
            Swal.fire("Updated!", "Project updated successfully.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update project", "error");
          });
      }
    });
  };

  // --- SEARCH LOGIC: by title, customer, company, start, finish ---
  const filteredProjects = projects.filter(row => {
    const query = search.toLowerCase();
    return (
      row.title.toLowerCase().includes(query) ||
      row.customer.toLowerCase().includes(query) ||
      row.company.toLowerCase().includes(query) ||
      (row.start && row.start.toLowerCase().includes(query)) ||
      (row.finish && row.finish.toLowerCase().includes(query))
    );
  });

  const statCount = type =>
    projects.filter(p => p.status === type).length;

  return (
    <>
      <Header />
      <SideBar />
      <div className="pl-container">
        <div className="pl-header-wrap">
          <h1 className="pl-page-title">
            Project List
            <span className="pl-breadcrumb">
              Projects <span style={{ color: "#aaa" }}>|</span> Project List
            </span>
          </h1>
        </div>
        <div className="pl-cards-row">
          <div className="pl-card">
            <FontAwesomeIcon icon={faCheckCircle} className="pl-card-icon" />
            <div className="pl-card-title">Completed</div>
            <div className="pl-card-count">{statCount("Completed")}</div>
          </div>
          <div className="pl-card">
            <FontAwesomeIcon icon={faPause} className="pl-card-icon" />
            <div className="pl-card-title">Not Started</div>
            <div className="pl-card-count">{statCount("Not Started")}</div>
          </div>
          <div className="pl-card">
            <FontAwesomeIcon icon={faSync} className="pl-card-icon" />
            <div className="pl-card-title">In Progress</div>
            <div className="pl-card-count">{statCount("In Progress")}</div>
          </div>
          <div className="pl-card">
            <FontAwesomeIcon icon={faTimesCircle} className="pl-card-icon" />
            <div className="pl-card-title">Cancelled</div>
            <div className="pl-card-count">{statCount("Cancelled")}</div>
          </div>
        </div>
        <div className="pl-controls-row">
          <div className="pl-search-bar">
            <FontAwesomeIcon icon={faSearch} className="pl-search-icon" />
            <input
              type="text"
              placeholder="Search this table"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-search-input"
            />
          </div>
          <div className="pl-btn-group">
            <button className="pl-btn pl-filter-btn"><FontAwesomeIcon icon={faFilter} /> Filter</button>
            <button className="pl-btn pl-pdf-btn"><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
            <button className="pl-btn pl-excel-btn"><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
            <button className="pl-btn pl-create-btn" onClick={handleCreate}><FontAwesomeIcon icon={faPlus} /> Create</button>
          </div>
        </div>
        <div className="pl-table-wrap">
          <table className="pl-table">
            <thead>
              <tr>
                <th className="pl-th">Title</th>
                <th className="pl-th">Customer</th>
                <th className="pl-th">Company</th>
                <th className="pl-th">Start date</th>
                <th className="pl-th">Finish date</th>
                <th className="pl-th">Status</th>
                <th className="pl-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((row) => (
                <tr key={row._id}>
                  <td className="pl-td">{row.title}</td>
                  <td className="pl-td">{row.customer}</td>
                  <td className="pl-td">{row.company}</td>
                  <td className="pl-td">{row.start}</td>
                  <td className="pl-td">{row.finish}</td>
                  <td className="pl-td">
                    <span
                      className="pl-status"
                      style={{
                        color: statusColor[row.status],
                        borderColor: statusColor[row.status]
                      }}>
                      {row.status}
                    </span>
                  </td>
                  <td className="pl-td">
                    <button title="Edit" onClick={() => handleEdit(row)} className="pl-icon-btn">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button title="Delete" onClick={() => handleDelete(row._id)} className="pl-icon-btn">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pl-pagination">
            <div>
              Rows per page: <select className="pl-row-select"><option>10</option></select>
            </div>
            <div>1 - {filteredProjects.length} of {filteredProjects.length} &nbsp; prev &nbsp; next</div>
          </div>
        </div>
        <div className="pl-footer-wrap">
          <div className="pl-footer-left">
            <b>Stocky - Ultimate Inventory With POS</b>
            <span className="pl-footer-signature">
              <span className="pl-footer-logo">S</span>
              © 2025 Developed by Stocky &nbsp; All rights reserved - v5.0
            </span>
          </div>
          <button className="pl-buy-btn">Buy Stocky</button>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
