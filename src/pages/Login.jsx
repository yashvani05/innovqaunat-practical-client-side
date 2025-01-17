import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "customer"; // Default to "customer"

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const endpoint = role === "admin" ? "/login/admin" : "/login/customer";
        const response = await axiosInstance.post(endpoint, values);
        alert("Login successful!");
        localStorage.setItem("authToken", response.data.token);

        if (role === "admin") {
          navigate("/admin-dashboard"); // Replace with admin dashboard route
        } else {
          navigate("/customer-dashboard"); // Replace with customer dashboard route
        }
      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          {role === "admin" ? "Admin Login" : "Customer Login"}
        </h1>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border rounded ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full p-3 border rounded ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login as {role === "admin" ? "Admin" : "Customer"}
          </button>
        </form>
        <p className="text-center mt-4">
          Not registered?{" "}
          <a href={"/register"} className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
        <p className="text-center mt-2">
          Want to log in as a{" "}
          <a
            href={
              role === "admin" ? "/login?role=customer" : "/login?role=admin"
            }
            className="text-blue-500 hover:underline"
          >
            {role === "admin" ? "Customer" : "Admin"}
          </a>
          ?
        </p>
      </div>
    </div>
  );
};

export default Login;
