import React, { useEffect, useState } from 'react';
type DropDownProps = {
  items: string[];
  showDropDown: boolean;
  toggleDropDown;
  itemSelection;
  exportToExcel
};

const DropDown: React.FC<DropDownProps> = ({
  items,
  itemSelection,
  exportToExcel,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the item label
   * back to the parent component
   *
   * @param item  The selected item
   */
  const onClickHandler = (item: string): void => {
    itemSelection(item);
    if (item === "Microsoft Excel") {
      exportToExcel();
    } else {
      console.error("Invalid export option");
    }        
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <div className="">
      {items.map(
        (item: string, index: number): JSX.Element => {
          const isLastItem = index === items.length - 1;
          const roundedClass = isLastItem ? 'rounded-b-lg' : 'border-b';
          return (
            <p
              className={`p-2 bg-white hover:bg-[#0568a0] hover:text-white active:text-white ${roundedClass}`}
              key={index}
              onClick={(): void => {
                onClickHandler(item);
              }}
            >
              {item}
            </p>
          );
        }
      )}
    </div>
  );
};

export default DropDown;