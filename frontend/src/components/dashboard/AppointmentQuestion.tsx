import React from "react";

const AppointmentQuestion = ({ name, question, value = "" }: { name: string, question: string, value: string }) => {
  return (
    <React.Fragment>
      <p className="font-montserrat font-semibold text-black text-lg">
        {question}
      </p>
      <input className="outline-1 w-full font-montserrat italic text-[#5F5F5F]" value={value} name={name} placeholder=''></input>
    </React.Fragment>
  );
};

export default AppointmentQuestion;
