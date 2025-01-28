import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { validateToken } from "../redux/action/action";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await dispatch(validateToken());
        setIsAuthenticated(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Unauthorized access, redirecting to login.");
        }
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  if (isAuthenticated === false) {
    return <Navigate to="/login" replace />;
  }

  if (
    user.user &&
    (window.location.pathname === "/login" ||
      window.location.pathname === "/signup")
  ) {
    return <Navigate to="/about" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
