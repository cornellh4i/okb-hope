import React from "react";

interface CheckboxProps {
  id?: number;
  handleCheckChildElement?(event: React.FormEvent<HTMLInputElement>): void;
  isChecked?: boolean;
  label?: string;
  value?: string;
  color?: string;

}

const Checkbox = (props: CheckboxProps) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.handleCheckChildElement) {
      props.handleCheckChildElement(event);
    }
  };


  return (
    <li>
      <input
        key={props.id}
        onChange={handleChange} 
        type="checkbox"
        checked={props.isChecked}
        value={props.value}
        className={props.color}
      />
      {props.label}
    </li>
  );
};

export default Checkbox;