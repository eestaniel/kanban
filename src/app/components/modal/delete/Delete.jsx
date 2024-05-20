import './delete.css'
import useStore from "@/app/store/useStore";
import CustomButton from "@/app/components/buttons/CustomButton";
import {useCallback} from "react";

const Delete = ({type}) => {
  const {activeBoard, deleteBoard, closeModal} = useStore(state => ({
    activeBoard: state.activeBoard,
    deleteBoard: state.deleteBoard,
    closeModal: state.closeModal

  }));

  const handleDelete = useCallback(() => {
    if (type === 'board') {
      closeModal();
      deleteBoard(activeBoard.board_id);
    }
  }, [type, activeBoard, deleteBoard, closeModal]);


  return (
    <>
      <h2 className="heading-l modal-header" id="delete-header">
        {type === 'board' ? 'Delete this board' : 'Delete Task'}
      </h2>
      <p className="body-l modal-body" id="delete-body">
        {type === 'board' ?
          `Are you sure you want to delete the ‘${activeBoard.board_data.title}’ board? This action will remove all columns and tasks and cannot be reversed.`
          :
          // update later when tasks created
          'Are you sure you want to delete this task?'}
      </p>
      <div className="modal-button-group">
        <CustomButton label={'Delete'} type={'destructive'} id="delete-btn" onClick={() => handleDelete()}/>
        <CustomButton label={'Cancel'} type={'secondary'} id="cancel-btn"/>
      </div>
    </>
  );
};

export default Delete;
