import React, { useState } from "react";
import QuestionDropDown from "./question-dropdown";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Card, Box } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const Questions: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<string>("");
  const items = () => {
    return ["When was the last time you spoke with a counselor? ", "What would you like to talk about with your counselor?"];
  };

  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  /**
   * Callback function to consume the
   * item label from the child component
   *
   * @param item  The selected item
   */
  const itemSelection = (item: string): void => {
    setSelectItem(item);
  };

  const roundedClass = showDropDown ? 'rounded-t-lg' : 'rounded-lg';
  const changeExpand = showDropDown ? <ExpandLessIcon sx={{ color: '#0568a0' }} /> : <ExpandMoreIcon sx={{ color: '#0568a0' }} />;

  return (
    <>
      <button
        className="w-68 text-[#888888]"
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div className={`w-68 bg-[#ffffff] ${roundedClass} text-[#888888]`}>
          <AccordionSummary expandIcon={changeExpand}>
            {"Export To..."}
          </AccordionSummary>
        </div>

        {showDropDown && (
          <div className={`border borderColor -[#0568a0]`}>
            <QuestionDropDown
              items={items()}
              showDropDown={false}
              toggleDropDown={(): void => toggleDropDown()}
              itemSelection={itemSelection}
            />
          </div>
        )}
      </button>
    </>
  );
};

export default Questions;
