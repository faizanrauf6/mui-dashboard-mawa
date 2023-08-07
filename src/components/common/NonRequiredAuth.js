import { Outlet, Navigate } from "react-router-dom";

export default function NonRequiredAuth() {
  return !localStorage.getItem("token") ? (
    <Outlet />
  ) : (
    <Navigate replace to="/dashboard" />
  );
}
