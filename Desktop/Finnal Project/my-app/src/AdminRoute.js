// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ADMIN_EMAIL = "admin@example.com"; // Change this to your real admin email

export default function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
