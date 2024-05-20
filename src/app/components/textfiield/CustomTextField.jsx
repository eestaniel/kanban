import './customtextfield.css';
import CrossIcon from '@/app/assets/icon-cross.svg';
import Image from 'next/image';

const CustomTextField = ({label, placeholder, value, onChange, isList, isListOne, removeColumn, error, showError}) => {


  return (
    <div className="textfield-container">
      {!isList && <label className="label">{label}</label>}
      <div className={`input-wrapper ${(isList || isListOne) ? 'shorter-field' : ''}`}>
        <input
          className={`body-l ${(error && showError) ? 'error' : ''}`}
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
        {(error && showError) && <span className="error-message">Can&apos;t be empty</span>}
      </div>
    </div>
  );
};

export default CustomTextField;
