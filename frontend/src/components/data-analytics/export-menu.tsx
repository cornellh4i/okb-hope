import React, { useState } from "react";
import DropDown from "./export-dropdown";
import { AccordionSummary } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import * as FileSaver from "file-saver";
import XLSX from "sheetjs-style";
// import ExcelExporter from "./ExcelExporter";


interface MenuProps {
  questionType: string;
  men: string[];
  women: string[];
  other: string[];
  fileName: string;
}

const Menu: React.FC<MenuProps> = ({questionType, men, women, other , fileName}): JSX.Element => {
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

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    if (men[0] != "Men"){
        men.unshift("Men");
        women.unshift("Women");
        other.unshift("Other");
    }

    const questions = (questionType === "When was the last time you spoke with a counselor?")
            ? ['Gender', 'Within the last month', 'Within the last 6 months', 'Within the last year', 'Over a year ago', 'I have never spoken with a counselor/therapist before.']
            : ['Gender', 'my relationships', 'addiction', 'suicidal thoughts', 'family distress', 'substance abuse', 'academic distress', 'social anxiety', 'depression', 'other'];
  
    // Map the values to a data object
    const exceldata = [men.map(String), women.map(String), other.map(String)].map(values => {
        const obj = {};
        questions.forEach((columnName, index) => {
            obj[columnName] = values[index];
        });
        return obj;
    });

    const exportToExcel = async () => {
        const ws = XLSX.utils.json_to_sheet(exceldata);
        const wb = { Sheets: {'data' : ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

  const handleExportToExcel = () => {
    const questions = (questionType === "When was the last time you spoke with a counselor?")
            ? ['Gender', 'Within the last month', 'Within the last 6 months', 'Within the last year', 'Over a year ago', 'I have never spoken with a counselor/therapist before.']
            : ['Gender', 'my relationships', 'addiction', 'suicidal thoughts', 'family distress', 'substance abuse', 'academic distress', 'social anxiety', 'depression', 'other'];
    exportToExcel();
  };

  const roundedClass = showDropDown ? 'rounded-t-lg' : 'rounded-lg';
  const changeExpand = showDropDown ? <ExpandLessIcon sx={{ color: 'white'}} /> : <ExpandMoreIcon sx={{ color: 'white'}} />;

  return (
    <>
      <button
        className= "w-42"
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div className={`w-42 bg-[#0568a0] ${roundedClass} text-white`}>
        <AccordionSummary expandIcon={changeExpand}>
        <div className={`pr-1`}> 
        <ImportExportIcon></ImportExportIcon>
        </div>
        {"Export To..."}
        </AccordionSummary>
        </div>

        {showDropDown && (
          <DropDown
            items={items()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            itemSelection={itemSelection}
            exportToExcel={handleExportToExcel} 
          />
        )}
      </button>
    </>
  );
};

export default Menu;
