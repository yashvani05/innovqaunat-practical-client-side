import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("Verifying email...");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");
        if (!token) {
          setStatusMessage("Verification token is missing.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/verify-email?token=${token}`
        );

        if (response.status === 200) {
          setStatusMessage(response.data.message);
          setIsVerified(true);
        }
      } catch (error) {
        setStatusMessage(
          error.response?.data?.message || "Verification failed. Try again."
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-xl font-bold mb-4">Email Verification</h1>
        <p className="text-gray-700 mb-4">{statusMessage}</p>
        {isVerified && (
          <a
            href="/login"
            className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex justify-center items-center"
          >
            Go to Login
          </a>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
