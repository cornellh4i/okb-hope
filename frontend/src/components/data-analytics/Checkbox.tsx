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
        label={props.label}
        value={props.value}
      />
      {props.label}
    </li>
  );
};

export default Checkbox;