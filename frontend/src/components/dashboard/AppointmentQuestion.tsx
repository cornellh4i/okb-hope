import React from "react";

const AppointmentQuestion = ({ name, question, value = "" }: { name: string, question: string, value: string }) => {
  return (
    <React.Fragment>
      <p className="font-bold text-black text-lg">
        {question}
      </p>
      <input className="outline-1 w-full" value={value} name={name} placeholder=''></input>
      <br></br><br></br>
    </React.Fragment>
  );
};

export default AppointmentQuestion;
