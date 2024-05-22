import './popover.css'
import useStore from "@/app/store/useStore";
import { useEffect, useRef } from "react";

const Popover = ({isPopoverOpen, setIsPopoverOpen, popoverType, task}) => {

  const popoverRef = useRef(null);

  const { activateModal, initialData } = useStore(state => ({
    activateModal: state.activateModal,
    initialData: state.initialData
  }));


  const handleEditBoard = () => {
    setIsPopoverOpen(false);
    activateModal('edit-board');
  }

  const handleDeleteBoard = () => {
    activateModal('delete');
    setIsPopoverOpen(false);
  }

  const handleEditTask = () => {
    setIsPopoverOpen(false);
    console.log('task', task)
    activateModal('edit-task', task);


  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    }

    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen, setIsPopoverOpen]);



  return (
    <div className="popover-container">
      {isPopoverOpen && (
        <div className={`popover-ref-container ${popoverType==='nav-task' && 'popover-task'}`} ref={popoverRef}>
          <div className="popover-content">
            {popoverType === 'nav-menu' && (
              <ul className="popover-menu">
                <li className="popover-menu-item" onClick={()=>handleEditBoard()}>Edit Board</li>
                <li className="popover-menu-item popover-delete" onClick={handleDeleteBoard}>Delete Board</li>
              </ul>
            )}
            {popoverType === 'nav-task' && (
              <ul className="popover-menu">
                <li className="popover-menu-item" onClick={()=>handleEditTask()}>Edit Task</li>
                <li className="popover-menu-item popover-delete" onClick={handleDeleteBoard}>Delete Task</li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
