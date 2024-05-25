import './popover.css';
import useStore from "@/app/store/useStore";
import { useEffect, useRef, useCallback } from "react";

/**
 * Popover component
 * @param {Object} props
 * @param {Boolean} props.isPopoverOpen
 * @param {Function} props.setIsPopoverOpen
 * @param {String} props.popoverType
 * @param {Object} props.task
 * @returns {JSX.Element}
 */

const Popover = ({ isPopoverOpen, setIsPopoverOpen, popoverType, task }) => {
  const popoverRef = useRef(null);

  const { activateModal } = useStore((state) => ({
    activateModal: state.activateModal,
  }));

  const handleEditBoard = () => {
    setIsPopoverOpen(false);
    activateModal('edit-board');
  };

  const handleDeleteBoard = () => {
    activateModal('delete');
    setIsPopoverOpen(false);
  };

  const handleEditTask = () => {
    setIsPopoverOpen(false);
    activateModal('edit-task', task);
  };

  const handleClickOutside = useCallback((event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      setIsPopoverOpen(false);
    }
  }, [setIsPopoverOpen]);

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen, handleClickOutside]);

  return (
    <div className="popover-container">
      {isPopoverOpen && (
        <div className={`popover-ref-container ${popoverType === 'nav-task' ? 'popover-task' : ''}`} ref={popoverRef}>
          <div className="popover-content">
            {popoverType === 'nav-menu' && (
              <ul className="popover-menu">
                <li className="popover-menu-item" onClick={handleEditBoard}>Edit Board</li>
                <li className="popover-menu-item popover-delete" onClick={handleDeleteBoard}>Delete Board</li>
              </ul>
            )}
            {popoverType === 'nav-task' && (
              <ul className="popover-menu">
                <li className="popover-menu-item" onClick={handleEditTask}>Edit Task</li>
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
