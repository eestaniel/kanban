import './modal.css'
import BoardSelector from "@/app/components/modal/board/modalboardselect/BoardSelector";
import BoardForm from "@/app/components/modal/board/boardform/BoardForm";
import Delete from "@/app/components/modal/delete/Delete";
import useStore from "@/app/store/useStore";


const Modal = () => {
  const { isModalOpen, modalType, closeModal, activeBoard} = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    closeModal: state.closeModal,
    activeBoard: state.activeBoard
  }));


  const modalContent = {
    'board-select': <BoardSelector/>,
    'new-board': <BoardForm/>,
    'edit-board': <BoardForm mode='edit' initialData={activeBoard}/>,
    'delete': <Delete type={'board'}/>
  }

  if (!isModalOpen) return null;

  return (
    <div className="modal-backdrop" onClick={()=> closeModal()}>
      <div
        className={`modal-content ${modalType==='board-select' ? 'board-select' : 'board-form'}`}
        onClick={e => e.stopPropagation()}>
        {modalContent[modalType]}
      </div>

    </div>

  );
};

export default Modal;
