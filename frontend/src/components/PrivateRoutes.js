import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const token = window.localStorage.getItem("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoutes;
