import './customtextfield.css';
import CrossIcon from '@/app/assets/icon-cross.svg';
import Image from 'next/image';
import {memo} from 'react';

const CustomTextField = memo(({label, placeholder, value, onChange, isList, isListOne, onRemove, error}) => {


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
          <span onClick={onRemove} style={{cursor: 'pointer'}}>
            <Image src={CrossIcon} alt="Remove"/>
          </span>
        )}
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
})

CustomTextField.displayName = 'CustomTextField';
export default CustomTextField;

