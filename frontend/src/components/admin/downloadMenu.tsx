import React, { useState } from "react";
import DropDown from "./downloadDropdown";
import { AccordionSummary } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface MenuProps {
  fileNames : string[]
}

const Menu: React.FC<MenuProps> = ({fileNames}): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState("")
//   const items = () => {
//     return ["Microsoft Excel"];
//   };


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

  const roundedClass = showDropDown ? 'rounded-t-2xl' : 'rounded-[12px]';
  const changeExpand = showDropDown ? <ExpandLessIcon sx={{ color: 'white'}} /> : <ExpandMoreIcon sx={{ color: 'white'}} />;

  return (
    <>
      <button
        className= "w-46"
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div className={`w-46 ml-4 bg-okb-blue ${roundedClass} text-okb-white font-montserrat hover:bg-light-blue cursor-pointer flex flex-row gap-2 text-semibold flex-end`}>
        <AccordionSummary expandIcon={changeExpand}>
        <div className={`pr-1`}> 
        </div>
        {"Download"}
        </AccordionSummary>
        </div>

        {showDropDown && (
          <DropDown
            fileNames={fileNames}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            itemSelection={itemSelection}
          />
        )}
      </button>
    </>
  );
};

export default Menu;