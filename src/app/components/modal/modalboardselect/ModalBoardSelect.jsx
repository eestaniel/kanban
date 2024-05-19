import './modalboardselect.css'
import Image from 'next/image'
import Board_Icon from '@/app/assets/icon-board.svg'
import Icon_Light from '@/app/assets/icon-light-theme.svg'
import Icon_Dark from '@/app/assets/icon-dark-theme.svg'
import useStore from "@/app/store/useStore";
import {useBoardCount} from "@/app/hooks/useBoardCount";

const ModalBoardSelect = ({}) => {
  const {isDarkMode, toggleDarkMode, } = useStore();
  const boardCount = useBoardCount();


  return (
    <>
      <h2 className=" modal-header heading-s" id="board-select-header">All Boards({boardCount})</h2>
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
            <div className={`night-mode-toggle ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleDarkMode}>
              <div className="night-mode-toggle-inner"/>
            </div>
            <Image src={Icon_Dark} alt="Dark Icon"/>
          </div>
        </div>
      </div>
    </>

  );
};

export default ModalBoardSelect;
