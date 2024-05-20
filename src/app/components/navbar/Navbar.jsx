import './navbar.css'
import Logo_Mobile from '@/app/assets/logo-mobile.svg'
import Image from 'next/image'
import Chevron_Down from '@/app/assets/icon-chevron-down.svg'
import Chevron_Up from '@/app/assets/icon-chevron-up.svg'
import Vertical_Ellipsis from '@/app/assets/icon-vertical-ellipsis.svg'
import CustomButton from "@/app/components/buttons/CustomButton";
import useStore from "@/app/store/useStore";
import {useEffect, useState, useRef} from "react";
import Popover from "@/app/components/popover/Popover";

const Navbar = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null)

  useEffect(() => {
    // Step 2: Define the handler for clicking outside the Popover
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false);  // Close the Popover
      }
    }

    // Add event listener when Popover is open
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);


  const {isModalOpen, modalType, activateModal, boards, activeBoard} = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    activateModal: state.activateModal,
    boards: state.boards,
    activeBoard: state.activeBoard
  }));

  const boardCount = boards.length;
  const selectedBoardHasColumns = activeBoard && activeBoard?.board_data.columns?.length > 0;

  const handlePopover = () => {
    if (activeBoard) {
      setIsPopoverOpen(!isPopoverOpen);
    }
  }

  useEffect(() => {
    if (boardCount > 0) {
      console.log('Boards detected');
    }
    if (activeBoard) {
      console.log('Active board detected', activeBoard);
    }

    console.log(selectedBoardHasColumns)
  }, [activeBoard, boardCount, selectedBoardHasColumns]);

  return (
    <>
      <nav>

        <div className="nav-container">
          <div className="navgroup-1">
            <div className="nav-logo">
              <Image src={Logo_Mobile} alt="Logo"/>
            </div>
            <div className="nav-link-header-group heading-l" onClick={() => activateModal('board-select')}>
              <h1 className="nav-header heading-l">
                {boardCount === 0 ? 'No Boards' : activeBoard?.board_data.title}
              </h1>
              <Image src={(isModalOpen && modalType === 'board-select') ? Chevron_Up : Chevron_Down} alt="Chevron"/>
            </div>
          </div>
          <div className="navgroup-2">
            <div className="add-task-container">
              <CustomButton label={'add-task'}
                            type={'primary-small'}
                            id="add_task"
                            disabled={boardCount === 0 || !selectedBoardHasColumns}/>
            </div>
            <Image className={`ellipsis ${activeBoard? '': 'disabled-icon'}`} src={Vertical_Ellipsis} alt="Vertical Ellipsis" onClick={() => handlePopover()}/>
            {/*{isPopoverOpen && <Popover setIsPopoverOpen={setIsPopoverOpen}/>}*/}
            {isPopoverOpen && (
            <div className="popover-ref-container" ref={popoverRef}>
              {isPopoverOpen && <Popover setIsPopoverOpen={setIsPopoverOpen}/>}
            </div>
            )}
          </div>
        </div>
      </nav>

    </>
  );
};

export default Navbar;
