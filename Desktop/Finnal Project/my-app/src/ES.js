// src/ES.js
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit, faTrash, faBarcode, faPlus, faSave
} from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";
import Header from "./Header";
import "./ES.css";
import axios from "axios";

const ES = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Initial states
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [products, setProducts] = useState([]);
  const [orderTax, setOrderTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [note, setNote] = useState("");

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5001/Sales/${id}`)
      .then(res => {
        const s = res.data;
        setDate(s.date ? s.date.substring(0, 10) : "");
        setCustomer(s.customer || "");
        setWarehouse(s.warehouse || "");
        setProducts((s.products || []).map((p, idx) => ({
          ...p,
          id: idx + 1,
          code: p.code || "",
          name: p.name || "",
          price: p.price || 0,
          stock: p.stock || 0,
          qty: p.quantity || 1,
          discount: p.discount || 0,
          tax: p.tax || 0,
          subtotal: (p.price || 0) * (p.quantity || 1),
          status: p.status || "Instock"
        })));
        setOrderTax(s.orderTax || 0);
        setDiscount(s.discount || 0);
        setShipping(s.shipping || 0);
        setStatus(s.status || "Pending");
        setNote(s.note || "");
      })
      .catch(() => Swal.fire("Error", "Could not load sale", "error"))
      .finally(() => setLoading(false));
  }, [id]);

  const subtotal = products.reduce((sum, p) => sum + p.subtotal, 0);
  const orderTaxAmt = (subtotal * orderTax) / 100;
  const grandTotal = subtotal + orderTaxAmt + Number(shipping) - Number(discount);

  const handleDelete = (pid) => {
    Swal.fire({
      title: "Delete Product?",
      text: "Remove this product from the sale?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6F49ED",
      cancelButtonColor: "#e74c3c",
      confirmButtonText: "Yes, delete"
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter((p) => p.id !== pid));
        Swal.fire("Deleted!", "Product removed.", "success");
      }
    });
  };

  const handleQtyChange = (pid, qty) => {
    setProducts(products.map((p) =>
      p.id === pid
        ? { ...p, qty, subtotal: p.price * qty }
        : p
    ));
  };

  const handleAddProduct = () => {
    if (products.length < 10 && products.length > 0) {
      const np = { ...products[0], id: Date.now(), code: Math.floor(Math.random() * 99999999), name: "New Product" };
      setProducts([...products, np]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare products data to match backend model
    const saleData = {
      date,
      customer,
      warehouse,
      products: products.map(p => ({
        code: p.code,
        name: p.name,
        price: p.price,
        quantity: p.qty,
        discount: p.discount,
        tax: p.tax,
        subtotal: p.subtotal,
        status: p.status,
        stock: p.stock
      })),
      orderTax,
      discount,
      shipping,
      status,
      note
    };

    axios.put(`http://localhost:5001/Sales/${id}`, saleData)
      .then(() => {
        Swal.fire("Saved!", "Sale updated successfully.", "success")
          .then(() => navigate(`/SD/${id}`)); // Go back to Sale Detail
      })
      .catch(() => Swal.fire("Error", "Could not update sale", "error"))
      .finally(() => setLoading(false));
  };

  if (loading) return <div style={{margin:"auto"}}>Loading...</div>;

  return (
    <>
      <Header/>
      <div style={{ display: "flex", background: "#fafbfc" }}>
        <SideBar />
        <div className="es-main">
          <div className="es-header">
            <span className="es-title">Edit Sale</span>
            <span className="es-breadcrumb">All Sales | Edit Sale</span>
          </div>
          <form className="es-form" onSubmit={handleSubmit}>
            <div className="es-row">
              <div className="es-col">
                <label>Date *</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
              </div>
              <div className="es-col">
                <label>Customer *</label>
                <input type="text" value={customer} onChange={e => setCustomer(e.target.value)} required />
              </div>
              <div className="es-col">
                <label>Warehouse *</label>
                <select value={warehouse} onChange={e => setWarehouse(e.target.value)}>
                  <option>Warehouse 1</option>
                  <option>Warehouse 2</option>
                </select>
              </div>
            </div>
            <div className="es-search">
              <FontAwesomeIcon icon={faBarcode} className="es-barcode" />
              <input className="es-search-input" placeholder="Scan/Search Product by Code Or Name" />
              <button type="button" className="es-add-btn" onClick={handleAddProduct}>
                <FontAwesomeIcon icon={faPlus} /> Add
              </button>
            </div>
            <div className="es-table-wrap">
              <table className="es-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Net Unit Price</th>
                    <th>Stock</th>
                    <th>Qty</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, idx) => (
                    <tr key={p.id}>
                      <td>{idx + 1}</td>
                      <td>
                        <span className="es-code">{p.code}</span>
                        <span className="es-badge">{p.status}</span>
                      </td>
                      <td>${p.price.toFixed(2)}</td>
                      <td>
                        <span className="es-stock">{p.stock}</span>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="es-qty"
                          min={1}
                          value={p.qty}
                          onChange={e => handleQtyChange(p.id, Number(e.target.value))}
                        />
                      </td>
                      <td>${p.discount.toFixed(2)}</td>
                      <td>${p.tax.toFixed(2)}</td>
                      <td>${p.subtotal.toFixed(2)}</td>
                      <td>
                        <button type="button" className="es-edit-btn">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          type="button"
                          className="es-del-btn"
                          onClick={() => handleDelete(p.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="es-summary-row">
              <div className="es-summary-cols">
                <div>
                  <label>Order Tax</label>
                  <input
                    type="number"
                    value={orderTax}
                    onChange={e => setOrderTax(Number(e.target.value))}
                    className="es-summary-input"
                    style={{ width: 60, marginRight: 5 }}
                  />%
                </div>
                <div>
                  <label>Discount</label>
                  <input
                    type="number"
                    value={discount}
                    onChange={e => setDiscount(Number(e.target.value))}
                    className="es-summary-input"
                    style={{ width: 60 }}
                  />
                </div>
                <div>
                  <label>Shipping</label>
                  <input
                    type="number"
                    value={shipping}
                    onChange={e => setShipping(Number(e.target.value))}
                    className="es-summary-input"
                    style={{ width: 60 }}
                  />
                </div>
              </div>
              <div className="es-totals">
                <div>Order Tax: <b>${orderTaxAmt.toFixed(2)} ({orderTax}%)</b></div>
                <div>Discount: <b>${Number(discount).toFixed(2)}</b></div>
                <div>Shipping: <b>${Number(shipping).toFixed(2)}</b></div>
                <div>Grand Total: <b>${grandTotal.toFixed(2)}</b></div>
              </div>
            </div>
            <div className="es-row">
              <div className="es-col">
                <label>Status *</label>
                <select value={status} onChange={e => setStatus(e.target.value)}>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div className="es-col" style={{ flex: 2 }}>
                <label>Note</label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="A few words..."
                  rows={2}
                />
              </div>
            </div>
            <button className="es-submit-btn" type="submit">
              <FontAwesomeIcon icon={faSave} /> Submit
            </button>
          </form>
          <footer className="es-footer">
            <div>
              <b>Stocky - Ultimate Inventory With POS</b><br />
              © 2025 Developed by Stocky <br />
              All rights reserved - v5.0
            </div>
            <div>
              <div className="es-footer-logo">
                <span>S</span>
              </div>
              <button className="es-buy-btn">Buy Stocky</button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default ES;
