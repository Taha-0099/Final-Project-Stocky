// src/Action.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "./Action.css";

const Action = ({ menuItems }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="action-wrapper" style={{ display: "inline-block" }}>
      <button
        className="dots-btn"
        onClick={e => {
          e.stopPropagation();
          setOpen(true);
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 19,
          color: "#8564e9",
          padding: 0
        }}
        tabIndex={0}
        aria-label="Actions"
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>

      {open && (
        <div>
          {/* Overlay */}
          <div
            className="modal-overlay"
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(35,20,50,0.13)",
              zIndex: 9999
            }}
          />
          {/* Centered Menu */}
          <div
            className="dots-menu centered-menu"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              minWidth: 260,
              background: "#fff",
              boxShadow: "0 6px 30px #b393e744",
              borderRadius: 16,
              zIndex: 10000,
              border: "1px solid #f2e9ff",
              padding: "10px 0",
            }}
            onClick={e => e.stopPropagation()}
          >
            {menuItems.map((item, idx) => (
              <div
                className={`menu-item${item.danger ? " danger" : ""}`}
                onClick={() => {
                  setOpen(false);
                  item.onClick && item.onClick();
                }}
                key={idx}
                style={{
                  padding: "13px 28px",
                  cursor: "pointer",
                  color: item.danger ? "#e74c3c" : "#6f49ed",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                  fontSize: 16
                }}
              >
                <FontAwesomeIcon icon={item.icon} style={{ marginRight: 14 }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Action;
