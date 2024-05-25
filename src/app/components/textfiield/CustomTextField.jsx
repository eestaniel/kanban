import './customtextfield.css';
import CrossIcon from '@/app/assets/icon-cross.svg';
import Image from 'next/image';
import { memo, useState } from 'react';

/*
* CustomTextField component
* This component is responsible for rendering the custom text field component
* It can be used to render a text field, a dropdown, a checkbox or a textarea
* @param {string} label - The label of the text field
* @param {string} name - The name of the text field
* @param {string} placeholder - The placeholder of the text field
* @param {string} value - The value of the text field
* @param {function} onChange - The function to handle the change event
* @param {boolean} isList - A flag to determine if the text field is a list
* @param {boolean} isListOne - A flag to determine if the text field is a list with one item
* @param {function} onRemove - The function to handle the remove event
* @param {string} error - The error message to display
* @param {string} id - The id of the text field
* @param {boolean} multiline - A flag to determine if the text field is a textarea
* @param {boolean} select - A flag to determine if the text field is a dropdown
* @param {array} options - The options for the dropdown
* @param {boolean} checkbox - A flag to determine if the text field is a checkbox
* @param {boolean} checked - A flag to determine if the checkbox is checked
* @param {boolean} disabled - A flag to determine if the checkbox is disabled
* @param {string} classname - The class name of the text field
* @return {JSX.Element}
* */
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

  const handleSelectClick = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`textfield-container ${classname}`}>
      {!isList && (
        <label className={`label heading-s ${checkbox && checked ? 'is-checked' : ''}`}>
          {label}
        </label>
      )}
      <div className={`input-wrapper ${isList || isListOne ? 'shorter-field' : ''}`}>
        {select ? (
          <div className="custom-select-wrapper body-l">
            <div className={`custom-select ${error ? 'error' : ''}`} onClick={handleSelectClick}>
              {value || placeholder}
              {isDropdownOpen ? <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#635FC7" strokeWidth="2" fill="none" d="M9 6 5 2 1 6" />
              </svg> : <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
              </svg>}
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
          </div>
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
