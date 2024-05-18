import React, { useState } from "react";
import './custom_textfield.css';

const CustomTextField = ({ label, placeholder }) => {
  const [error, setError] = useState(false);

  return (
    <div className="textfield-container">
      <label htmlFor="textfield" className="subtask-heading">{label}</label>
      <div className="input-wrapper">
        <input id="textfield" className={`body-l ${error ? 'error' : ''}`} type="text" placeholder={placeholder} />
        {error && <span className="error-message">Can&apos;t be empty</span>}
      </div>
    </div>
  );
};

export default CustomTextField;
