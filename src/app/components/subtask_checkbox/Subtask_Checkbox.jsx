import './modal.css';
import BoardSelector from "@/app/components/modal/board/modalboardselect/BoardSelector";
import BoardForm from "@/app/components/modal/board/boardform/BoardForm";
import Delete from "@/app/components/modal/delete/Delete";
import TaskForm from "@/app/components/modal/task/taskform/TaskForm";
import ViewTask from "@/app/components/modal/task/viewtask/ViewTask";
import useStore from "@/app/store/useStore";

/**
 * Modal component
 * This component is responsible for rendering the modal
 * This component uses the useStore hook to get the modal state
 * This component renders different modal content based on the modal type
 * The modal content is stored in the modalContent object
 * The modalContent object has the modal type as the key and the modal component as the value
 * [modalType] - The type of modal to render
 * [modalContent] - The modal content to render
 * [isModalOpen] - The state of the modal
 * [closeModal] - The function to close the modal
 * @return {JSX.Element}
 * */
const Modal = () => {
  const { isModalOpen, modalType, closeModal } = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    closeModal: state.closeModal,
  }));

  const modalContent = {
    'board-select': <BoardSelector />,
    'new-board': <BoardForm />,
    'new-task': <TaskForm />,
    'view-task': <ViewTask />,
    'edit-board': <BoardForm mode='edit' />,
    'edit-task': <TaskForm mode='edit' />,
    'delete': <Delete type='board' />
  };

  if (!isModalOpen) return null;

  return (
    <div className={`modal-backdrop ${modalType !== 'board-select' ? 'modal-board-form' : ''}`} onClick={closeModal}>
      <div
        className={`modal-content ${modalType === 'board-select' ? 'board-select' : 'board-form'}`}
        onClick={e => e.stopPropagation()}
      >
        {modalContent[modalType]}
      </div>
    </div>
  );
};

export default Modal;
