import './navbar.css'
import Logo_Mobile from '@/app/assets/logo-mobile.svg'
import Image from 'next/image'
import Chevron_Down from '@/app/assets/icon-chevron-down.svg'
import Chevron_Up from '@/app/assets/icon-chevron-up.svg'
import Vertical_Ellipsis from '@/app/assets/icon-vertical-ellipsis.svg'
import CustomButton from "@/app/components/buttons/Custom_Button";
import Modal from "@/app/components/modal/Modal";
import useStore from "@/app/store/useStore";
import {useBoardCount} from "@/app/hooks/useBoardCount";

const Navbar = () => {

  const {isModalOpen, modalType, activateModal, boards, selectedBoardId} = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    activateModal: state.activateModal,
    boards: state.boards,
    selectedBoardId: state.selectedBoardId
  }));

  const boardCount = useBoardCount();
  const selectedBoardHasColumns = boards[selectedBoardId]?.columns && Object.keys(boards[selectedBoardId].columns).length > 0;

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
                {boardCount === 0 ? 'No Boards' : ''}
              </h1>
              <Image src={(isModalOpen && modalType === 'board-select') ? Chevron_Up : Chevron_Down} alt="Chevron"/>
            </div>
          </div>
          <div className="navgroup-2">
            <div className="add-task-container">
              <CustomButton label={'+'} type={'primary-small'} id="add_task" disabled={boardCount=== 0 || !selectedBoardHasColumns}/>
            </div>
            <Image src={Vertical_Ellipsis} alt="Vertical Ellipsis"/>
          </div>
        </div>
      </nav>
      <Modal/>

    </>
  );
};

export default Navbar;
