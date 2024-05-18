
import './modal.css'
import {useState} from 'react';
import Image from 'next/image'
import Board_Icon from '@/app/assets/icon-board.svg'
import Icon_Light from '@/app/assets/icon-light-theme.svg'
import Icon_Dark from '@/app/assets/icon-dark-theme.svg'

const Modal = ({isOpen, close, isDarkMode, setIsDarkMode, toggleDarkMode}) => {
  if (!isOpen) return null;
  const boardAmount = 0;


  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-content"
           onClick={e => e.stopPropagation()}> {/* Prevent click inside the modal from closing it */}
        <h2 className=" modal-header heading-s">All Boards()</h2>
        <div className="create-board-group">
          <div className="board-container">
            <Image src={Board_Icon} alt="Board Icon"/>
            <div className="board-subgroup">
              <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                <path fill="hsl(242, 48%, 58%)" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/>
              </svg>
              <h3 className="heading-m">Create New Board</h3>
            </div>
          </div>
          <div className="night-mode-toggle-container">
            <div className="toggle-group">
              <Image src={Icon_Light} alt="Light Icon"/>
              <div className={`night-mode-toggle ${isDarkMode? 'dark-mode':''}`} onClick={toggleDarkMode}>
                <div className="night-mode-toggle-inner"/>
              </div>
              <Image src={Icon_Dark} alt="Dark Icon"/>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Modal;
