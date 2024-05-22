import './navbar.css'
import Logo_Mobile from '@/app/assets/logo-mobile.svg'
import Image from 'next/image'
import Chevron_Down from '@/app/assets/icon-chevron-down.svg'
import Chevron_Up from '@/app/assets/icon-chevron-up.svg'
import CustomButton from "@/app/components/buttons/CustomButton";
import useStore from "@/app/store/useStore";
import {useEffect, useState} from "react";
import Popover from "@/app/components/popover/Popover";


const Navbar = () => {
  const {isModalOpen, modalType, activateModal, boards, activeBoard} = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    activateModal: state.activateModal,
    boards: state.boards,
    activeBoard: state.activeBoard
  }));

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const boardCount = boards.length;
  const selectedBoardHasColumns = activeBoard && activeBoard?.columns?.length > 0;

  useEffect(() => {
    if (boardCount > 0) {
      console.log('Boards detected');
    }
    if (activeBoard) {
      console.log('Active board detected', activeBoard);
    }

    console.log(selectedBoardHasColumns);
  }, [activeBoard, boardCount, selectedBoardHasColumns]);

  const togglePopover = () => {
    setIsPopoverOpen(prev => !prev);
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="navgroup-1">
          <div className="nav-logo">
            <Image src={Logo_Mobile} alt="Logo"/>
          </div>
          <div className="nav-link-header-group heading-l" onClick={() => activateModal('board-select')}>
            <h1 className="nav-header heading-l">
              {boardCount === 0 ? 'No Boards' : activeBoard?.name}
            </h1>
            <Image src={(isModalOpen && modalType === 'board-select') ? Chevron_Up : Chevron_Down} alt="Chevron"/>
          </div>
        </div>
        <div className="navgroup-2">
          <div className="add-task-container">
            <CustomButton label={'add-task'}
                          type={'primary-small'}
                          id="add_task"
                          disabled={boardCount === 0 || !selectedBoardHasColumns}
                          onClick={() => activateModal('new-task')}
            />
          </div>
          <div className="popover-trigger" onClick={togglePopover}>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fill-rule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308"/>
                <circle cx="2.308" cy="10" r="2.308"/>
                <circle cx="2.308" cy="17.692" r="2.308"/>
              </g>
            </svg>
          </div>
          {activeBoard && <Popover isPopoverOpen={isPopoverOpen} setIsPopoverOpen={setIsPopoverOpen}/>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
