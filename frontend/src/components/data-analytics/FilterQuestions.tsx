import React, { useState } from "react";
import QuestionDropDown from "./question-dropdown";
import { AccordionSummary, Grid } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Vertical_line from "@/assets/vertical_line_data.svg";

const Questions = ({ setGlobalQuestionType }: { setGlobalQuestionType }): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<string>("");
  const questions = () => {
    return ["Are there any specific concerns you would like to discuss with your conselor?", "When was the last time you spoke with a counselor?"];
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
    setShowDropDown(false); // Hide the dropdown after selecting an item
    setGlobalQuestionType(item);
  };

  const roundedClass = showDropDown ? 'rounded-t-2xl' : 'rounded-2xl';
  const changeExpand = showDropDown ? <ExpandLessIcon sx={{ color: '#0568a0' }} /> : <ExpandMoreIcon sx={{ color: '#0568a0' }} />;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={0.2}>
          <Vertical_line className="stroke-[#0568a0] "></Vertical_line>
        </Grid>
        <Grid item xs={11}>
          <button
            className={`w-full text-[#888888] rounded-2xl border-2 border-[#0568a0]`}
            onClick={(): void => toggleDropDown()}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
              dismissHandler(e)
            }
          >
            <div className={`w-auto bg-[#ffffff] text-[#888888] ${roundedClass}`}>
              <AccordionSummary expandIcon={changeExpand}>
                {selectItem || "Select"}
              </AccordionSummary>
            </div>

            {showDropDown && (
              <div className={`border borderColor-[#0568a0] rounded-2xl`}>
                <QuestionDropDown
                  items={questions()}
                  itemSelection={itemSelection}
                  showDropDown={showDropDown}
                  toggleDropDown={(): void => toggleDropDown()} // Dummy function
                />
              </div>
            )}
          </button>
        </Grid>
      </Grid>
    </>
  );
};

export default Questions;