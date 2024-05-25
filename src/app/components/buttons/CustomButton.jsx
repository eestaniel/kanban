
import './custombutton.css';
import { useState, useEffect } from 'react';

/**
 * CustomButton Component
 *
 * This component renders a customizable button with various styles and behaviors
 * based on the provided props.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.label - The text label for the button. If 'add-task', an SVG icon will be displayed.
 * @param {string} props.type - The type of the button which determines the styling.
 * @param {Function} props.onClick - The function to call when the button is clicked.
 * @param {string} [props.id=''] - The optional ID for the button element.
 * @param {boolean} [props.disabled=false] - The disabled state of the button.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const CustomButton = ({ label, type, onClick, id = '', disabled = false }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {

    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Determine additional class based on type
  const additionalClass = type === 'primary-large' ? 'heading-m' : 'btn-bold';

  return (
    <button
      className={`custom-button ${type} ${additionalClass} ${disabled ? 'disabled' : ''}`}
      id={id}
      onClick={onClick}
      disabled={disabled}
    >
      {label === 'add-task' ? (
        isMobile ? (
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
          </svg>
        ) : (
          '+ Add New Task'
        )
      ) : (
        label
      )}
    </button>
  );
};

export default CustomButton;
