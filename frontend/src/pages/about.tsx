import React from "react";

const About = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
      <div className="bg-red-500 rounded-lg p-4 text-white flex justify-center items-center">Red</div>
      <div className="bg-blue-500 rounded-lg p-4 text-white flex justify-center items-center">Blue</div>
      <div className="bg-green-500 rounded-lg p-4 text-white flex justify-center items-center sm:col-span-2">Green</div>
    </div>
  );
};

export default About;
