import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const NotFoundPage = () => {
  console.log("this page is worling");

  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call your logout API
        await axiosInstance.post("/user/logout", {
          headers: { "Content-Type": "application/json" },
        });
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return <h1>404 - Page Not Found</h1>;
};

export default NotFoundPage;
