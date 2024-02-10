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
    </>
  );
};

export default About;