import './popover.css'
import useStore from "@/app/store/useStore";


const Popover = ({setIsPopoverOpen}) => {
  const { activateModal, deleteBoard, activeBoard } = useStore(state => ({
    activateModal: state.activateModal,
    deleteBoard: state.deleteBoard,
    activeBoard: state.activeBoard
  }))

    const handleEditBoard = () => {
    setIsPopoverOpen(false);
    activateModal('edit-board',);
  }

  const handleDeleteBoard = () => {
    // add confirmation later
    deleteBoard(activeBoard.board_id);
    setIsPopoverOpen(false);
  }

  return (
    <div className="popover-container">
      <div className="popover-content">
        <div className="popover-item" onClick={()=>handleEditBoard()}>Edit Board</div>
        <div className="popover-item" onClick={()=>handleDeleteBoard()}>Delete Board</div>
      </div>
    </div>
  );
};

export default Popover;
