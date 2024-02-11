import React from "react";
import Button from "@/components/Button";

/** An About page */
const About = () => {
  return (
    <>
      <div className="bg-opacity-10 bg-yellow-400 w-1/2 tracking-tighter 
      bg-black">Hello</div>
      <div className="grid grid-cols-2">
        <div className="border-4 border-red-500 p-24 rounded-2xl h-72 mt-16 
        ml-24 mr-8 bg-red-700"></div>
        <div className="border-4 border-blue-500 p-24 rounded-2xl h-72 mt-16
        ml-8 mr-24 bg-blue-700"></div>
      </div>
      <div className="grid grid-cols-1">
        <div className="border-4 border-green-500 p-24 rounded-2xl h-72 mt-12
        mx-24 bg-green-700"></div>
      </div>
      <Button text="hello"/>
    </>
  );
};

export default About;