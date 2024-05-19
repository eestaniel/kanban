import React, {useState} from "react";
import './customtextfield.css';
import CrossIcon from '@/app/assets/icon-cross.svg';
import Image from 'next/image';

const CustomTextField = ({label, placeholder, value, onChange, isList, isListOne, removeColumn}) => {
  const [error, setError] = useState(false);

  const testError = () => {
    if (value === '') {
      setError(true);
    } else {
      setError(false);
    }
  }

  return (
    <div className="textfield-container">
      {!isList && <label className="label">{label}</label>}
      <div className={`input-wrapper ${(isList || isListOne) ? 'shorter-field' : ''}`}>
        <input
          className={`body-l ${error ? 'error' : ''}`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {(isList || isListOne) && (
          <span onClick={removeColumn} style={{cursor: 'pointer'}}>
            <Image src={CrossIcon} alt="Remove"/>
          </span>
        )}
        {error && <span className="error-message">Can&apos;t be empty</span>}
      </div>
    </div>
  );
};

export default CustomTextField;
