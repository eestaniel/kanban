import './boardselector.css'
import Image from 'next/image'
import Icon_Light from '@/app/assets/icon-light-theme.svg'
import Icon_Dark from '@/app/assets/icon-dark-theme.svg'
import useStore from "@/app/store/useStore";
import {useBoardCount} from "@/app/hooks/useBoardCount";


const BoardSelector = ({}) => {
  const {isDarkMode, toggleDarkMode, activateModal, boards, activeBoard, changeActiveBoard, closeModal} = useStore(state => ({

    isDarkMode: state.isDarkMode,
    toggleDarkMode: state.toggleDarkMode,
    activateModal: state.activateModal,
    boards: state.boards,
    activeBoard: state.activeBoard,
    selectBoardToEdit: state.selectBoardToEdit,
    changeActiveBoard: state.changeActiveBoard,
    closeModal: state.closeModal
  }))
  const boardCount = useBoardCount();



  const handleSelectBoard = (board) => {
    console.log('selected board', board)
    changeActiveBoard(board);
    closeModal();
  }

  return (
    <>
      <h2 className=" modal-header heading-s" id="board-select-header">ALL BOARDS ({boardCount})</h2>
      {boardCount > 0 &&
        <div className="board-list-group">
          {/*iterate boards and display board name*/}
          {boards.map(board => (
            <div className={`board-list-subgroup ${activeBoard.name === board.name && 'active-selector'}`}
                 key={board.name}
                 onClick={() => handleSelectBoard(board)}
            >
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                  fill="currentColor"/>
              </svg>
              <h3 className="heading-m" key={board.name}>{board.name}</h3>
            </div>
          ))}
        </div>

      }
      <div className="create-board-group">
        <div className="board-container">
          <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
              fill="currentColor"/>
          </svg>
          <div className="board-subgroup">
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path fill="hsl(242, 48%, 58%)" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"/>
            </svg>
            <h3 className="heading-m" onClick={() => activateModal('new-board')}>Create New Board</h3>
          </div>
        </div>
        <div className="night-wrapper">
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
      </div>
    </>

  );
};

export default BoardSelector;
