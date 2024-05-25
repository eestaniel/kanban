import './customtextfield.css';
import CrossIcon from '@/app/assets/icon-cross.svg';
import Image from 'next/image';
import { memo, useState, useEffect, useRef } from 'react';

const CustomTextField = memo(({
  label,
  name,
  placeholder,
  value,
  onChange,
  isList,
  isListOne,
  onRemove,
  error,
  id,
  multiline,
  select,
  options,
  checkbox,
  checked,
  disabled,
  classname
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectClick = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={`textfield-container ${classname}`} ref={dropdownRef}>
      {!isList && (
        <label className={`label heading-s ${checkbox && checked ? 'is-checked' : ''}`}>
          {label}
        </label>
      )}
      <div className={`input-wrapper ${isList || isListOne ? 'shorter-field' : ''}`}>
        {select ? (
          <>
            <div className="custom-select-wrapper body-l">
              <div className={`custom-select ${error ? 'error' : ''}`} onClick={handleSelectClick}>
                {value || placeholder}
                {isDropdownOpen ? (
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
                  </svg>
                ) : (
                  <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                    <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
                  </svg>
                )}
              </div>
            </div>
            {isDropdownOpen && (
              <ul className="custom-select-options">
                {options.map((option, index) => (
                  <li
                    key={index}
                    className="custom-select-option"
                    onClick={() => handleOptionClick(option.name)}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
            <select
              className="hidden-select"
              id={id}
              name={name}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            >
              {options.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </>
        ) : multiline ? (
          <textarea
            className={`body-l ${error ? 'error' : ''}`}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        ) : checkbox ? (
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={id}
              name={name}
              checked={checked}
              onChange={onChange}
              disabled={disabled}
            />
            <span className="checkmark"></span>
            <label htmlFor={id} className={`body-l ${error ? 'error' : ''}`}>
              {placeholder}
            </label>
          </div>
        ) : (
          <input
            className={`body-l ${error ? 'error' : ''}`}
            id={id}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
        {(isList || isListOne) && (
          <span onClick={onRemove} style={{ cursor: 'pointer' }}>
            <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#828FA3" fillRule="evenodd"><path
              d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path
              d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
          </span>
        )}
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
});

CustomTextField.displayName = 'CustomTextField';
export default CustomTextField;
