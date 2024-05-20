import './modal.css'
import BoardSelector from "@/app/components/modal/board/modalboardselect/BoardSelector";
import BoardForm from "@/app/components/modal/board/boardform/BoardForm";
import useStore from "@/app/store/useStore";


const Modal = () => {
  const { isModalOpen, modalType, closeModal } = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    closeModal: state.closeModal
  }));


  const modalContent = {
    'board-select': <BoardSelector/>,
    'new-board': <BoardForm/>
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
