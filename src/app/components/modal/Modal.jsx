import './modal.css'
import ModalBoardSelect from "./modalboardselect/ModalBoardSelect";
import ModalNewBoard from "./modalnewboard/ModalNewBoard";
import useStore from "@/app/store/useStore";


const Modal = () => {
  const { isModalOpen, modalType, closeModal } = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    closeModal: state.closeModal
  }));


  const modalContent = {
    'board-select': <ModalBoardSelect/>,
    'new-board': <ModalNewBoard/>
  }

  if (!isModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={()=> closeModal()}>
      <div
        className={`modal-content ${modalType==='board-select' ? 'board-select' : 'board-edit'}`}
        onClick={e => e.stopPropagation()}>
        {modalContent[modalType]}
      </div>

    </div>

  );
};

export default Modal;
