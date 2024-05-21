import './customtextfield.css';
import CrossIcon from '@/app/assets/icon-cross.svg';
import Image from 'next/image';
import { memo } from 'react';

/**
 * CustomTextField Component
 *
 * A reusable text field component that supports input, textarea, and select elements.
 *
 * Props:
 * @param {string} label - The label for the input field.
 * @param {string} name - The name attribute for the input field.
 * @param {string} placeholder - The placeholder text for the input field.
 * @param {string} value - The current value of the input field.
 * @param {function} onChange - The function to call when the input value changes.
 * @param {boolean} isList - Determines if the field is part of a list.
 * @param {boolean} isListOne - Determines if the field is the first item in a list.
 * @param {function} onRemove - The function to call to remove the field (used for list items).
 * @param {string} error - The error message to display.
 * @param {string} id - The id attribute for the input field.
 * @param {boolean} multiline - Determines if the field should be a textarea instead of an input.
 * @param {boolean} select - Determines if the field should be a dropdown menu instead of an input or textarea.
 * @param {Array} options - The list of options for the dropdown menu.
 * @Qparam {boolean} disabled - Determines if the field should be disabled.
 */
const CustomTextField = memo(({ label, name, placeholder, value, onChange, isList, isListOne, onRemove, error, id, multiline, select, options, func }) => {
  return (
    <div className="textfield-container">
      {!isList && <label className="label heading-s">{label}</label>}
      <div className={`input-wrapper ${(isList || isListOne) ? 'shorter-field' : ''}`}>
        {select ? (
          <select
            className={`body-l ${error ? 'error' : ''}`}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option.title}  onClick={()=>func(option.title)}>
                {option.title}
              </option>
            ))}
          </select>
        ) : multiline ? (
          <textarea
            className={`body-l ${error ? 'error' : ''}`}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
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
            <Image src={CrossIcon} alt="Remove" />
          </span>
        )}
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
});

CustomTextField.displayName = 'CustomTextField';
export default CustomTextField;
