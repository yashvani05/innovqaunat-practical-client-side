import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

const AdminRegistration = ({ role }) => {
  const navigate = useNavigate();
  console.log("role--AdminRegistration", role);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "admin",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post("/register/admin", values);
        alert(response.message || "Admin registered successfully!");
        navigate("/login?role=admin");
      } catch (error) {
        alert(error.response.data.message || "Error registering admin");
      }
    },
  });

  return (
    <div className="space-y-6">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}
        </div>

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
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded"
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
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            className="w-full p-3 border rounded"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register as Admin
        </button>
      </form>
      <p className="text-center">
        Already registered?{" "}
        <a href="/login?role='admin'" className="text-blue-500 hover:underline">
          Login here
        </a>
      </p>
    </div>
  );
};

export default AdminRegistration;
