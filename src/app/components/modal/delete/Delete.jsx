import './delete.css'
import useStore from "@/app/store/useStore";
import dynamic from 'next/dynamic'
const CustomButton = dynamic(() => import("@/app/components/buttons/CustomButton"), {ssr: false});
import {useCallback} from "react";

const Delete = ({type}) => {
  const {activeBoard, deleteBoard, closeModal, deleteTask, initialData} = useStore(state => ({
    activeBoard: state.activeBoard,
    deleteBoard: state.deleteBoard,
    closeModal: state.closeModal,
    deleteTask: state.deleteTask,
    initialData: state.initialData,
  }));

  const handleDelete = useCallback(() => {
    if (type === 'board') {
      closeModal();
      deleteBoard(activeBoard.name);
    } else {
      deleteTask(initialData.name);
      closeModal();

    }
  }, [type, closeModal, deleteBoard, activeBoard.name, deleteTask, initialData.name]);

  const handleCancel = useCallback(() => {
    closeModal();
  }, [closeModal]);


  return (
    <>
      <h2 className="heading-l modal-header" id="delete-header">
        {type === 'board' ? 'Delete this board' : 'Delete Task'}
      </h2>
      <p className="body-l modal-body" id="delete-body">
        {type === 'board' ?
          `Are you sure you want to delete the ‘${activeBoard.name}’ board? This action will remove all columns and tasks and cannot be reversed.`
          :
          // update later when tasks created
          'Are you sure you want to delete this task?'}
      </p>
      <div className="modal-button-group">
        <CustomButton label={'Delete'} type={'destructive'} id="delete-btn" onClick={() => handleDelete()}/>
        <CustomButton label={'Cancel'} type={'secondary'} id="cancel-btn" onClick={()=> handleCancel()}/>
      </div>
    </>
  );
};

export default Delete;
