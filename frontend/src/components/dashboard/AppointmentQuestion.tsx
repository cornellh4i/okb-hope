import React from "react";

const AppointmentQuestion = ({ name, question }: { name: string, question: string }) => {
  return (
    <React.Fragment>
      <p className="font-bold text-black text-lg">
        {question}
      </p>
      <input className="outline-1 w-full" name={name} placeholder='enter here'></input>
      <br></br><br></br>
    </React.Fragment>
  );
};

export default AppointmentQuestion;
