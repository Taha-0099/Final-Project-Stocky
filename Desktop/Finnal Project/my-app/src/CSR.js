import React, { useState } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBoxOpen,
  faBarcode,
  faPercent,
  faDollarSign,
  faCheckCircle,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import "./CSR.css";
import SideBar from "./SideBar";
import Header from "./Header";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    code: "69311349",
    status: "complete",
    price: 25,
    qtySold: 18,
    qtyReturn: 18,
    discount: 0,
    tax: 0,
    subtotal: 450
  },
  {
    id: 2,
    code: "87716743",
    status: "complete",
    price: 34,
    qtySold: 8,
    qtyReturn: 8,
    discount: 0,
    tax: 0,
    subtotal: 272
  },
  {
    id: 3,
    code: "63417741",
    status: "complete",
    price: 34,
    qtySold: 5,
    qtyReturn: 5,
    discount: 0,
    tax: 0,
    subtotal: 170
  }
];

const CSR = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [sale, setSale] = useState("SL_1114");
  const [status, setStatus] = useState("Received");
  const [orderTax, setOrderTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [note, setNote] = useState("");
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);

  // Handle Qty Return Change
  const handleQtyReturn = (id, val) => {
    setProducts((prev) =>
      prev.map((prod) =>
        prod.id === id
          ? {
              ...prod,
              qtyReturn: Math.max(
                0,
                Math.min(Number(val), prod.qtySold || 0)
              ),
              subtotal: ((Number(val) || 0) * prod.price -
                (prod.discount || 0) +
                (prod.tax || 0))
            }
          : prod
      )
    );
  };

  // Totals Calculation
  const totalSubtotal = products.reduce(
    (sum, p) => sum + (p.subtotal || 0),
    0
  );
  const totalTax = ((totalSubtotal - discount) * orderTax) / 100;
  const grandTotal = totalSubtotal - discount + shipping + totalTax;

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Sale Return Created!",
      text: "Your sale return has been submitted.",
      confirmButtonColor: "#8f5aff"
    });
  };

  return (
    <div className="csr-root">
        <Header/>
      <SideBar />
      <div className="csr-main">
        <h2>
          Create Sale Return
          <span className="csr-breadcrumb">
            <FontAwesomeIcon icon={faChevronLeft} /> All Returns | Create Sale Return
          </span>
        </h2>
        <form className="csr-form" onSubmit={handleSubmit}>
          <div className="csr-fields-row">
            <div className="csr-field">
              <label>Date *</label>
              <div className="csr-input-icon">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <FontAwesomeIcon icon={faCalendarAlt} />
              </div>
            </div>
            <div className="csr-field">
              <label>Sale</label>
              <input value={sale} disabled />
            </div>
            <div className="csr-field">
              <label>Status *</label>
              <select value={status} onChange={e => setStatus(e.target.value)}>
                <option value="Received">Received</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
          <div className="csr-section-label">
            <strong>list product returns *</strong>
            <span className="csr-info-warning">
              Any products with a quantity set to 0 won’t be refunded
            </span>
          </div>

          <div className="csr-table-wrapper">
            <table className="csr-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Net Unit Price</th>
                  <th>Qty Sold</th>
                  <th>Qty return</th>
                  <th>Discount</th>
                  <th>Tax</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, idx) => (
                  <tr key={prod.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <span className="csr-prod-code">{prod.code}</span>
                      <span className="csr-prod-status">complete</span>
                    </td>
                    <td>${prod.price.toFixed(2)}</td>
                    <td>
                      <span className="csr-tag">{prod.qtySold}</span>
                    </td>
                    <td>
                      <div className="csr-qty-input">
                        <button
                          type="button"
                          onClick={() =>
                            handleQtyReturn(prod.id, prod.qtyReturn - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={prod.qtySold}
                          value={prod.qtyReturn}
                          onChange={e =>
                            handleQtyReturn(prod.id, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleQtyReturn(prod.id, prod.qtyReturn + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${Number(prod.discount).toFixed(2)}</td>
                    <td>${Number(prod.tax).toFixed(2)}</td>
                    <td>${prod.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Totals */}
          <div className="csr-totals-row">
            <div className="csr-totals-col">
              <label>Order Tax</label>
              <div className="csr-input-icon">
                <input
                  type="number"
                  value={orderTax}
                  min={0}
                  onChange={e => setOrderTax(Number(e.target.value))}
                />
                <span className="csr-inline-icon">
                  <FontAwesomeIcon icon={faPercent} />
                </span>
              </div>
            </div>
            <div className="csr-totals-col">
              <label>Discount</label>
              <div className="csr-input-icon">
                <input
                  type="number"
                  value={discount}
                  min={0}
                  onChange={e => setDiscount(Number(e.target.value))}
                />
                <span className="csr-inline-icon">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
              </div>
            </div>
            <div className="csr-totals-col">
              <label>Shipping</label>
              <div className="csr-input-icon">
                <input
                  type="number"
                  value={shipping}
                  min={0}
                  onChange={e => setShipping(Number(e.target.value))}
                />
                <span className="csr-inline-icon">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>
              </div>
            </div>
            {/* Totals Table */}
            <div className="csr-totals-summary">
              <table>
                <tbody>
                  <tr>
                    <td>Order Tax</td>
                    <td>
                      ${totalTax.toFixed(2)} ({orderTax.toFixed(2)}%)
                    </td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>${discount.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>Shipping</td>
                    <td>${shipping.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Grand Total</b>
                    </td>
                    <td>
                      <b>${grandTotal.toFixed(2)}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="csr-note-row">
            <label>
              Please provide any details
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="A few words ..."
              />
            </label>
          </div>
          <button className="csr-submit-btn" type="submit">
            <FontAwesomeIcon icon={faCheckCircle} style={{ marginRight: 8 }} />
            Submit
          </button>
        </form>
        {/* Footer */}
        <div className="csr-footer">
          <div>
            <b>Stocky - Ultimate Inventory With POS</b>
            <div className="ps-footer-desc">
              <FontAwesomeIcon icon={faBoxOpen} className="ps-footer-icon" />
              <span>
                © 2025 Developed by Stocky
                <br />
                All rights reserved - v5.0
              </span>
            </div>
          </div>
          <button className="ps-buy-btn">Buy Stocky</button>
        </div>
      </div>
    </div>
  );
};

export default CSR;
