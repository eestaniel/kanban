import './modal.css';
import BoardSelector from "@/app/components/modal/board/modalboardselect/BoardSelector";
import BoardForm from "@/app/components/modal/board/boardform/BoardForm";
import Delete from "@/app/components/modal/delete/Delete";
import TaskForm from "@/app/components/modal/task/taskform/TaskForm";
import ViewTask from "@/app/components/modal/task/viewtask/ViewTask";
import useStore from "@/app/store/useStore";
import {useEffect, useState} from "react";

/**
 * Modal component
 * This component is responsible for rendering the modal component
 *
 * @return {JSX.Element}
 * */
const Modal = () => {
  const {isModalOpen, modalType, closeModal} = useStore(state => ({
    isModalOpen: state.isModalOpen,
    modalType: state.modalType,
    closeModal: state.closeModal,
  }));

  // useEffect to open task summary modal
  useEffect(() => {
    if (modalType === 'view-task') {
      setIsTaskSummaryOpen(true);
    } else {
      setIsTaskSummaryOpen(false);
    }
  }, [modalType]);

  const modalContent = {
    'board-select': <BoardSelector/>,
    'new-board': <BoardForm/>,
    'new-task': <TaskForm/>,
    'view-task': <ViewTask/>,
    'edit-board': <BoardForm mode='edit'/>,
    'edit-task': <TaskForm mode='edit'/>,
    'delete-task': <Delete type='task' />,
    'delete': <Delete type='board'/>
  };

  const [isTaskSummaryOpen, setIsTaskSummaryOpen] = useState(false)

  if (!isModalOpen) return null;


  return (
    <div className={`modal-backdrop ${modalType !== 'board-select' ? 'modal-board-form' : ''}`} onClick={closeModal}>
      <div
        className={`modal-content ${modalType === 'board-select' ? 'board-select' : 'board-form'} ${modalType=== 'view-task' && isTaskSummaryOpen ? 'task-summary' : ''}`}
        onClick={e => e.stopPropagation()}
      >
        {modalContent[modalType]}
      </div>
    </div>
  );
};

export default Modal;
