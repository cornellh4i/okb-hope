import React from "react";

const FilterModal = ({ title, content, onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Delete</button>
      </div>
    </div>
  );
};

export default FilterModal;