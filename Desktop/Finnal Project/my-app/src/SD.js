import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit, faEnvelope, faCommentDots, faFilePdf, faPrint, faTrash
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";
import "./SD.css";
import axios from "axios";
import Header from "./Header";

const SD = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5001/Sales/${id}`)
      .then(res => setSale(res.data))
      .catch(() => Swal.fire('Error', 'Could not fetch sale', 'error'))
      .finally(() => setLoading(false));
  }, [id]);

  // Actions
  const handleEdit = () => {
    // Route to ES.js for editing
    navigate(`/ES/${id}`);
  };
  const handleEmail = () => Swal.fire("Email", "Send Email to Customer", "info");
  const handleSMS = () => Swal.fire("SMS", "Send SMS to Customer", "info");
  const handlePDF = () => Swal.fire("PDF", "Download PDF Invoice", "info");
  const handlePrint = () => Swal.fire("Print", "Print Invoice", "info");
  const handleDelete = () =>
    Swal.fire({
      title: "Delete?",
      text: "Are you sure you want to delete this sale?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#e74c3c"
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5001/Sales/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Sale deleted successfully.", "success");
            navigate("/AS");
          })
          .catch(() => Swal.fire("Error", "Failed to delete sale", "error"));
      }
    });

  if (loading) return <div style={{ margin: "auto" }}>Loading...</div>;
  if (!sale) return <div style={{ margin: "auto", color: "red" }}>Sale not found.</div>;

  return (
    <>
      <Header />
      <div style={{ display: "flex" }}>
        <SideBar />
        <div className="sd-wrapper">
          <div className="sd-header">
            <span className="sd-title">Sale Detail</span>
            <span className="sd-breadcrumb">Sales | Sale Detail</span>
          </div>
          <div className="sd-actions">
            <button className="sd-btn green" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} /> Edit Sale
            </button>
            <button className="sd-btn blue" onClick={handleEmail}>
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </button>
            <button className="sd-btn purple" onClick={handleSMS}>
              <FontAwesomeIcon icon={faCommentDots} /> SMS
            </button>
            <button className="sd-btn orange" onClick={handlePDF}>
              <FontAwesomeIcon icon={faFilePdf} /> PDF
            </button>
            <button className="sd-btn yellow" onClick={handlePrint}>
              <FontAwesomeIcon icon={faPrint} /> Print
            </button>
            <button className="sd-btn red" onClick={handleDelete}>
              <FontAwesomeIcon icon={faTrash} /> Delete
            </button>
          </div>
          <div className="sd-detail">
            <div className="sd-detail-header">
              <div className="sd-col">
                <h4>Customer Info</h4>
                <div>{sale.customer || "-"}</div>
                <div>{sale.customerEmail || "-"}</div>
                <div>{sale.customerPhone || "-"}</div>
                <div>{sale.customerAddress || "-"}</div>
              </div>
              <div className="sd-col">
                <h4>Company Info</h4>
                <div>Stocky</div>
                <div>admin@example.com</div>
                <div>631596770</div>
                <div>3618 Abata Martin Drive</div>
              </div>
              <div className="sd-col">
                <h4>Invoice Info</h4>
                <div>
                  Reference: <b>{sale.ref}</b>
                </div>
                <div>
                  Payment Status:{" "}
                  <span className="sd-badge paid">
                    {Number(sale.paid) >= Number(sale.total) ? "Paid" : "Unpaid"}
                  </span>
                </div>
                <div>
                  Warehouse: <b>{sale.warehouse}</b>
                </div>
                <div>
                  Status: <span className="sd-badge completed">{sale.status}</span>
                </div>
              </div>
            </div>
            <div className="sd-table-section">
              <table className="sd-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Net Unit Price</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {(sale.products || []).map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.name}</td>
                      <td>${(row.price || 0).toFixed(2)}</td>
                      <td>{row.quantity}</td>
                      <td>${(row.price || 0).toFixed(2)}</td>
                      <td>${(row.discount || 0).toFixed(2)}</td>
                      <td>${(row.tax || 0).toFixed(2)}</td>
                      <td>${((row.price || 0) * (row.quantity || 0)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="sd-totals">
                <div>
                  <div>Order Tax: ${sale.orderTaxAmt ? sale.orderTaxAmt.toFixed(2) : "0.00"} ({sale.orderTax || 0}%)</div>
                  <div>Discount: ${sale.discount ? sale.discount.toFixed(2) : "0.00"}</div>
                  <div>Shipping: ${sale.shipping ? sale.shipping.toFixed(2) : "0.00"}</div>
                  <div>
                    <b>Grand Total: ${sale.total ? sale.total.toFixed(2) : "0.00"}</b>
                  </div>
                  <div>
                    <b>Paid: ${sale.paid ? sale.paid.toFixed(2) : "0.00"}</b>
                  </div>
                  <div>
                    <b>Due: {(sale.total && sale.paid) ? (sale.total - sale.paid).toFixed(2) : "0.00"}</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="sd-notes">Sale notes: {sale.notes || <span className="sd-muted">-</span>}</div>
          </div>
          <footer className="sd-footer">
            <div className="sd-footer-inner">
              <div>
                <b>Stocky - Ultimate Inventory With POS</b>
                <br />
                © 2025 Developed by Stocky
                <br />
                All rights reserved - v5.0
              </div>
              <div className="sd-footer-logo">
                <span style={{ fontSize: 32, color: "#a259ff" }}>
                  <FontAwesomeIcon icon={faEdit} />
                </span>
              </div>
            </div>
          </footer>
          <button className="sd-buy-btn">Buy Stocky</button>
        </div>
      </div>
    </>
  );
};

export default SD;
