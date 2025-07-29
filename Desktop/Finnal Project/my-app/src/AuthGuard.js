import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AuthGuard({ children, allowRoles }) {
  const token = localStorage.getItem('token');
  let role = localStorage.getItem('role'); // This must be set at login!

  if (!token) return <Navigate to="/" replace />;

  // Normalize to lowercase for comparison
  role = role ? role.toLowerCase() : null;
  const allowed = allowRoles ? allowRoles.map(r => r.toLowerCase()) : null;

  // If allowRoles specified and current role not allowed, redirect to dashboard
  if (allowed && (!role || !allowed.includes(role))) {
    return <Navigate to="/Dashboard" replace />;
  }

  // Otherwise, allow
  return children;
}
