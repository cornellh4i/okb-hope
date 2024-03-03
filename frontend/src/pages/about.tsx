import React from "react";
import Button from "@/components/Button";

/** An About page */
const About = () => {
  return (
    <>
      <Button text="hello" />
      Hello there
      <div className="bg-yellow-500 opacity-10 w-6/12 tracking-tighter">Hello</div>
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
      <div className="bg-red-500 h-44 flex items-center justify-center rounded-3xl m-6">Red</div>
      <div className="bg-blue-500 h-44 flex items-center justify-center rounded-3xl m-6">Blue</div>
      <div className="col-span-1 sm:col-span-2 bg-green-500 h-44 flex items-center justify-center rounded-3xl m-6">Green</div>
      </div>
    </>
  );
};

export default About;