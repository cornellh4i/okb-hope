import React from "react";
import Button from "@/components/Button";
  
/** An About page */
const About = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="bg-red-600 flex justify-center items-center h-44 rounded-2xl m-5">red</div>
      <div className="bg-blue-400 flex justify-center items-center h-44 rounded-2xl m-5">blue</div>
      <div className="col-span-1 sm:col-span-2 bg-green-400 flex justify-center items-center h-44 rounded-2xl m-5">green</div>
    </div>
    </>
  );
};

export default About;