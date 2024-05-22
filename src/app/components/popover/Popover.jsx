import './popover.css'
import useStore from "@/app/store/useStore";
import { useEffect, useRef, useState } from "react";

const Popover = ({isPopoverOpen, setIsPopoverOpen}) => {

  const popoverRef = useRef(null);

  const { activateModal } = useStore(state => ({
    activateModal: state.activateModal
  }));

  const handleEditBoard = () => {
    setIsPopoverOpen(false);
    activateModal('edit-board');
  }

  const handleDeleteBoard = () => {
    activateModal('delete');
    setIsPopoverOpen(false);
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
  }, [isPopoverOpen]);



  return (
    <div className="popover-container">
      {isPopoverOpen && (
        <div className="popover-ref-container" ref={popoverRef}>
          <div className="popover-content">
            <div className="popover-item" onClick={handleEditBoard}>Edit Board</div>
            <div className="popover-item popover-delete" onClick={handleDeleteBoard}>Delete Board</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;
