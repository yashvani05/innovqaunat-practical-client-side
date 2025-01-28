import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 h-[100vh] p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex lg:flex-row flex-col items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-32 h-32 rounded-full overflow-hidden">
            <img
              src="/my-image.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-semibold text-gray-800">YASH VANI</h1>
            <p className="text-lg text-gray-600">MERN STACK DEVELOPER</p>
            <div className="mt-4 text-start">
              <p className="text-gray-600">
                <strong>Address:</strong> Indore, MP
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> yashvani0305@gmail.com
              </p>
              <p className="text-gray-600">
                <strong>Contact:</strong> 83292929200
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">Blogs</h3>
            <p className="text-lg text-gray-600">25</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">Followers</h3>
            <p className="text-lg text-gray-600">1,500</p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">Following</h3>
            <p className="text-lg text-gray-600">180</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800">About Me</h2>
          <p className="mt-4 text-gray-600">
            Hello, I'm Yash Vani. I'm a passionate web developer with a love for
            creating beautiful and functional websites. I specialize in
            front-end development, using modern technologies like React and
            Tailwind CSS. When I'm not coding, you can find me exploring new
            tech trends or writing blogs about my experiences and learnings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
