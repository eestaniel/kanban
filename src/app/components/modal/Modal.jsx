import './modal.css'
import BoardSelector from "@/app/components/modal/board/modalboardselect/BoardSelector";
import BoardForm from "@/app/components/modal/board/boardform/BoardForm";
import Delete from "@/app/components/modal/delete/Delete";
import TaskForm from "@/app/components/modal/task/taskform/TaskForm";
import ViewTask from "@/app/components/modal/task/viewtask/ViewTask";
import useStore from "@/app/store/useStore";




const Modal = () => {
  const { isModalOpen, modalType, closeModal} = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    closeModal: state.closeModal,
  }));


  const modalContent = {
    'board-select': <BoardSelector/>,
    'new-board': <BoardForm/>,
    'new-task': <TaskForm />,
    'view-task': <ViewTask />,
    'edit-board': <BoardForm mode='edit'/>,
    'edit-task': <TaskForm mode='edit'/>,
    'delete': <Delete type={'board'}
    />
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
