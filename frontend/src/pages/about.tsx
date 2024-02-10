import React from "react";
import Button from "@/components/Button";




const getCatFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  console.log(response.json());
};

const handleClick = () => {
  getCatFact();
};

/** An About page */
const About = () => {
  return (
    <>
      <div className="bg-black bg-opacity-10 bg-yellow-400 w-3/6 space-x-5 
      tracking-tighter">Hello</div>
      <button onClick={handleClick}>cat fact</button>

      <div className="flex flex-col sm:grid sm:grid-cols-2">
        <div className="bg-red-600 p-4 m-4 rounded-md h-64"></div>
        <div className="bg-blue-700 p-4 m-4 rounded-md h-64"></div>
        <div className="bg-green-700 p-4 m-4 rounded-md h-64 sm:col-span-2"></div>
      </div>
    </>
  );
};

export default About;