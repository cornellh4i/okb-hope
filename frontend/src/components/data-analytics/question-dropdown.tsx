import React, { useEffect, useState } from 'react';

type DropDownProps = {
  items: string[];
  showDropDown: boolean;
  toggleDropDown;
  itemSelection
};

const QuestionDropDown: React.FC<DropDownProps> = ({
  items,
  itemSelection,
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
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <div className="">
      {items.map(
        (item: string, index: number): JSX.Element => {
          const isLastItem = index === items.length - 1;
          const roundedClass = isLastItem ? 'rounded-b-2xl' : 'border-b';
          return (
            <p
              className={`p-2 bg-white hover:bg-[#D0DBE9] hover:text-[#888888] active:text-[#888888] ${roundedClass}`}
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

export default QuestionDropDown;