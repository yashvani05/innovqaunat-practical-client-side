import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-4xl font-semibold mb-6 text-center">Contact Me</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Feel free to get in touch with me through the following ways:
        </p>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            My Details
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Email:</strong>{" "}
            <a
              href="mailto: yashvani0305@example.com"
              className="text-blue-500 hover:underline"
            >
              yashvani0305@example.com
            </a>
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+91454654985"
              className="text-blue-500 hover:underline"
            >
              +91 454654985
            </a>
          </p>
          <div className="mt-4">
            <strong className="text-lg text-gray-700">Follow me:</strong>
            <div className="flex justify-center mt-2 space-x-4">
              <a
                href="https://facebook.com"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="https://www.linkedin.com/in/yash-vani-159368203/"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
