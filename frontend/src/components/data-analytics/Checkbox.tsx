import React from "react";

interface CheckboxProps {
  id?: number;
  handleCheckChildElement?(event: React.FormEvent<HTMLInputElement>): void;
  isChecked?: boolean;
  label?: string;
  value?: string;

}

const Checkbox = (props: CheckboxProps) => {
  return (
    <li>
      <input
        key={props.id}
        onClick={props.handleCheckChildElement}
        type="checkbox"
        checked={props.isChecked}
        value={props.value}
        className="w-4 h-4 text-blue-500"
      />
      {props.label}
    </li>
  );
};

export default Checkbox;