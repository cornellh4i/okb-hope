import React, { useEffect, useState } from 'react';

type DropDownProps = {
  items: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  itemSelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  items,
  itemSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the city name
   * back to the parent component
   *
   * @param city  The selected city
   */
  const onClickHandler = (item: string): void => {
    itemSelection(item);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
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
    </>
  );
};

export default DropDown;
