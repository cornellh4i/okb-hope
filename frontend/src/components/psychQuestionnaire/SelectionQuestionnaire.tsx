import React, { useState } from 'react';
import UncheckedPsych from '../../assets/unchecked_psych.svg';
import CheckedPsych from '../../assets/checked_psych.svg';
import UncheckedPatient from '../../assets/unchecked_patient.svg';
import CheckedPatient from '../../assets/checked_patient.svg';

interface SelectionQuestionnaireProps {
  patient: boolean;
  psychiatrist: boolean;
  onChange: (option: 'patient' | 'psychiatrist') => void;
}

const SelectionQuestionnaire = ({ patient, psychiatrist, onChange }: SelectionQuestionnaireProps) => {
  const [selectedOption, setSelectedOption] = useState<null | 'patient' | 'psychiatrist'>(null);

  const handleOptionClick = (option: 'patient' | 'psychiatrist') => {
    setSelectedOption(option);
    onChange(option)
  };

  return (
    <div className="w-full h-full flex flex-col justify-start gap-6 md:gap-9 p-8 pb-0">
      <div className="text-[26px] md:text-[32px] font-semibold font-montserrat">
        Welcome to the Wohoiame Patient Portal!
      </div>
      <div className="text-[18px] md:text-2xl font-semibold font-montserrat">
        Are you a patient or a medical professional?
      </div>
      <div className="flex flex-row justify-center">
        <div
          className={`flex items-center justify-end ml-2 mr-7 pb-3`}
          onClick={() => handleOptionClick('patient')}
        >
          {selectedOption === 'patient' ? <CheckedPatient /> : <UncheckedPatient />}
        </div>
        <div
          className={`flex items-center justify-start ml-7 mr-2 pb-3`}
          onClick={() => handleOptionClick('psychiatrist')}
        >
          {selectedOption === 'psychiatrist' ? <CheckedPsych /> : <UncheckedPsych />}
        </div>
      </div>
    </div>
  );
}

export default SelectionQuestionnaire;
