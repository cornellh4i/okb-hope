
import React, { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/firebase';


type DropDownProps = {
  fileNames: string[];
  showDropDown: boolean;
  toggleDropDown;
  itemSelection;
};

const DropDown: React.FC<DropDownProps> = ({
  fileNames,
  itemSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the item label
   * back to the parent component
   *
   * @param item  The selected item
   */
  const onClickHandler = async (item: string) => {
    itemSelection(item);
      console.log(fileNames)
        try {
          const fileStorageRef = ref(storage, `resume_files/${item}`)
          const url = await getDownloadURL(fileStorageRef);
          // Create an anchor element and programmatically click it to download the file
          const link = document.createElement('a');
          link.href = url;
          link.target = "_blank";
          // link.download = fileNames[i]; // You can set the desired file name here
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error getting download URL:', error);
        }
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <div className="w-46">
      {fileNames.map(
        (item: string, index: number): JSX.Element => {
          const isLastItem = index === fileNames.length - 1;
          const roundedClass = isLastItem ? 'rounded-b-2xl' : 'border-b';
          return (
            <p
              className={`w-46 ml-4 p-2 text-xs font-montserrat bg-white hover:bg-okb-blue hover:text-white active:text-white ${roundedClass}`}
              key={index}
              onClick={(): void => {
                onClickHandler(item);
              }}
            >
              {item.substring(0,18)+'...'}
            </p>
          );
        }
      )}
    </div>
  );
};

export default DropDown;
