import './dropdown.css'
import {useState} from "react";
import Cheveron_Down from '@/app/assets/icon-chevron-down.svg'
import Cheveron_Up from '@/app/assets/icon-chevron-up.svg'
import Image from 'next/image'

const Dropdown = ({options}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  }

  return (
    <>
      <div className="dropdown-container">
        <div className="dropdown-header body-l" onClick={() => setIsOpen(!isOpen)}>
          <span>{selectedOption}</span>
          <Image src={isOpen ? Cheveron_Up : Cheveron_Down} alt="cheveron" width={10} height={5}/>
        </div>
        {isOpen && (
          <div className="dropdown-options">
            {options.map((option) => (
              <div
                key={option}
                className="dropdown-option body-l"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
