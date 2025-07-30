import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch, faFilter, faFilePdf, faFileExcel, faPlus, faEye, faEdit, faTimes
} from "@fortawesome/free-solid-svg-icons";
import "./AP.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Header from "./Header";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5001/Products";

const defaultProduct = {
  name: "",
  imgurl: "",
  barcodeSymbology: "",
  codeProduct: "",
  category: "",
  brand: "",
  unit: "",
  productType: "",
  productCost: "",
  productPrice: "",
  openingStock1: "",
};

function AP() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch products.", "error");
    }
  };

  // --- Delete Product ---
  const handleDelete = (prod) => {
    Swal.fire({
      title: "Delete?",
      text: `Are you sure you want to delete "${prod.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#e74c3c"
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${prod._id}`);
          Swal.fire("Deleted!", "", "success");
          fetchProducts();
        } catch (err) {
          Swal.fire("Error", err?.response?.data?.message || "Delete failed.", "error");
        }
      }
    });
  };

  // --- Export Excel ---
  const exportExcel = () => {
    const wscols = [
      "Image", "Type", "Name", "Code", "Brand", "Category", "Cost", "Price", "Unit", "Quantity"
    ];
    const rows = products.map(p => [
      p.imgurl,
      p.productType || "",
      p.name || "",
      p.codeProduct || "",
      p.brand || "",
      p.category || "",
      p.productCost != null ? p.productCost.toFixed(2) : "",
      p.productPrice != null ? p.productPrice.toFixed(2) : "",
      p.unit || "",
      p.openingStock1 != null ? p.openingStock1 : ""
    ]);
    const worksheet = XLSX.utils.aoa_to_sheet([wscols, ...rows]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "products");
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "products.xlsx");
  };

  // --- Export PDF ---
  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Type", "Name", "Code", "Brand", "Category", "Cost", "Price", "Unit", "Quantity"
    ];
    const tableRows = products.map(p => [
      p.productType || "",
      p.name || "",
      p.codeProduct || "",
      p.brand || "",
      p.category || "",
      p.productCost != null ? p.productCost.toFixed(2) : "",
      p.productPrice != null ? p.productPrice.toFixed(2) : "",
      p.unit || "",
      p.openingStock1 != null ? p.openingStock1 : ""
    ]);
    doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20, styles: { fontSize: 9 } });
    doc.save("products.pdf");
  };

  // --- Filtered Table ---
  const filtered = products.filter((p) => {
    const q = search.trim().toLowerCase();
    return (
      !q ||
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.codeProduct && p.codeProduct.toLowerCase().includes(q)) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.productType && p.productType.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <Header />
      <SideBar />
      <div className="all-products-root">
        <div className="ap-main">
          <div className="ap-title-block">
            <h2>All Products</h2>
            <span className="ap-breadcrumb">Products | All Products</span>
          </div>
          <div className="ap-toolbar">
            <div className="ap-search-box">
              <FontAwesomeIcon icon={faSearch} />
              <input
                type="text"
                placeholder="Search this table"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="ap-toolbar-actions">
              <button className="ap-btn" style={{ color: "#666" }}><FontAwesomeIcon icon={faFilter} /> Filter</button>
              <button className="ap-btn" style={{ color: "#28a745" }} onClick={exportPDF}><FontAwesomeIcon icon={faFilePdf} /> PDF</button>
              <button className="ap-btn" style={{ color: "#007bff" }} onClick={exportExcel}><FontAwesomeIcon icon={faFileExcel} /> EXCEL</button>
              <button className="ap-btn" style={{ color: "#a771ef" }} onClick={() => Swal.fire("Import", "Import products feature coming soon!", "info")}>Import products</button>
              <button className="ap-btn ap-create-btn" onClick={() => navigate("/CP")}>
                <FontAwesomeIcon icon={faPlus} /> Create
              </button>
            </div>
          </div>
          <div className="ap-table-wrapper">
            <table className="ap-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Cost</th>
                  <th>Price</th>
                  <th>Unit</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(prod => (
                  <tr key={prod._id}>
                    <td><input type="checkbox" /></td>
                    <td>
                      <img src={prod.imgurl} alt={prod.name} style={{ width: 34, height: 34, objectFit: "contain", borderRadius: 6, border: "1px solid #f0f0f0", background: "#fff" }} />
                    </td>
                    <td>{prod.productType || "Single"}</td>
                    <td>{prod.name}</td>
                    <td>{prod.codeProduct}</td>
                    <td>{prod.brand || "N/D"}</td>
                    <td>{prod.category}</td>
                    <td>{prod.productCost != null ? prod.productCost.toFixed(2) : ""}</td>
                    <td>{prod.productPrice != null ? prod.productPrice.toFixed(2) : ""}</td>
                    <td>{prod.unit}</td>
                    <td>{prod.openingStock1 != null ? prod.openingStock1 : ""}</td>
                    <td>
                      <span
                        className="ap-icon-btn"
                        title="View"
                        onClick={() => navigate(`/PD/${prod._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </span>
                      <span
                        className="ap-icon-btn"
                        title="Edit"
                        onClick={() => navigate(`/UP/${prod._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                      <span
                        className="ap-icon-btn"
                        title="Delete"
                        onClick={() => handleDelete(prod)}
                        style={{ color: "#e74c3c", cursor: "pointer" }}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 &&
                  <tr>
                    <td colSpan="12" style={{ textAlign: "center", color: "#aaa" }}>No products found.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
          <div className="ap-footer-bar">
            <span>1 - {filtered.length} of {products.length}</span>
            <span className="ap-footer-pagination">
              <span className="ap-footer-link ap-footer-link-disabled">prev</span>
              <span className="ap-footer-link ap-footer-link-disabled">next</span>
            </span>
          </div>
          <footer className="ap-main-footer">
            <div>
              <strong>Stocky - Ultimate Inventory With POS</strong><br />
              © 2025 Developed by Stocky<br />
              All rights reserved - v4.0.9
            </div>
            <div className="footer-logo">S</div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default AP;
