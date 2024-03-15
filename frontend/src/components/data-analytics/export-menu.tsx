import React, { useState } from "react";
import DropDown from "./export-dropdown";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack, Card } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Menu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<string>("");
  const items = () => {
    return ["Google Sheets", "Microsoft Excel"];
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
  return (
    <>
      <button
        className= "w-32"
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
        <div className={`bg-[#0568a0] ${roundedClass} text-white p-2`}>{"Export To..."}</div>
        </AccordionSummary>
        {showDropDown && (
          <DropDown
            items={items()}
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
