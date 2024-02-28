import React, { useState } from 'react';
import UncheckedPsych from '../../assets/unchecked_psych.svg';
import CheckedPsych from '../../assets/checked_psych.svg';
import UncheckedPatient from '../../assets/unchecked_patient.svg';
import CheckedPatient from '../../assets/checked_patient.svg';

const SelectionQuestionnaire = ({ setProfile }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={`w-full h-full flex flex-wrap flex-col justify-start gap-6 p-8 pb-4`}>
      <div className={`text-[32px] font-semibold font-montserrat`}>
        Welcome to the Wohoiame Patient Portal!
      </div>
      <div className={`text-2xl font-semibold font-montserrat`}>
        Are you a patient or a medical professional?
      </div>
      <div className={`grid grid-cols-2`}>
        <div
          className={`flex items-center justify-end ml-2 mr-7 pb-3`}
          onClick={() => handleOptionClick('patient')}
          onMouseEnter={() => setSelectedOption('patient')}
          onMouseLeave={() => selectedOption === 'patient' ? null : setSelectedOption(null)}
        >
          {selectedOption === 'patient' ? <CheckedPatient /> : <UncheckedPatient />}
        </div>
        <div
          className={`flex items-center justify-start ml-7 mr-2 pb-3`}
          onClick={() => handleOptionClick('psych')}
          onMouseEnter={() => setSelectedOption('psych')}
          onMouseLeave={() => selectedOption === 'psych' ? null : setSelectedOption(null)}
        >
          {selectedOption === 'psych' ? <CheckedPsych /> : <UncheckedPsych />}
        </div>
      </div>
    </div>
  );
}

export default SelectionQuestionnaire;
