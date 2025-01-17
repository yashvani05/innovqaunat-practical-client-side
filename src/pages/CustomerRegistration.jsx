import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

const CustomerRegistration = ({ role }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "customer",
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
        const response = await axiosInstance.post("/register/customer", values);
        console.log("response--", response);

        alert(response.message || "Customer registered successfully!");
        navigate("/login?role=customer");
      } catch (error) {
        console.log("error---", error);
        alert(error.response?.data?.message || "Error registering customer");
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register as Customer
        </button>
      </form>
      <p className="text-center">
        Already registered?{" "}
        <a
          href="/login?role='customer'"
          className="text-blue-500 hover:underline"
        >
          Login here
        </a>
      </p>
    </div>
  );
};

export default CustomerRegistration;
