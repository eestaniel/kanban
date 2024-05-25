import dynamic from 'next/dynamic';
import { DragDropContext } from '@hello-pangea/dnd';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useEffect, useRef } from 'react';
import useStore from '@/app/store/useStore';
import './boardcontent.css';
import { DroppableColumn } from './DroppableColumn';

const CustomButton = dynamic(() => import("@/app/components/buttons/CustomButton"), { ssr: false });

/**
 * BoardContent component
 * This component renders the board content based on the active board
 * If there are no boards, it displays a message to create a new board
 * If the active board has no columns, it displays a message to create a new column
 * If the active board has columns, it displays the columns and tasks
 * @param {object} props - Component props
 * @param {number} props.boardCount - The number of boards
 * @param {function} props.activateModal - Function to activate a modal
 * @returns {JSX.Element}
 */
const BoardContent = ({ boardCount, activateModal }) => {
  const { activeBoard, updateTaskPositions, isDarkMode } = useStore((state) => ({
    activeBoard: state.activeBoard,
    updateTaskPositions: state.updateTaskPositions,
    isDarkMode: state.isDarkMode,
  }));

  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTo(0, Math.random() * 5000);
    }
  }, [container]);

  const handleDragEnd = (event) => {
    const { destination, source, draggableId } = event;

    if (!destination) {
      return;
    }

    const destinationColumnId = destination.droppableId;
    const destinationIndex = destination.index;
    const sourceColumnId = source.droppableId;
    const sourceIndex = source.index;

    updateTaskPositions(draggableId, sourceColumnId, destinationColumnId, sourceIndex, destinationIndex);
  };

  const handleTaskCompletions = (task) => {
    const completedSubtasks = task.subtasks.filter((subtask) => subtask.isCompleted);
    return completedSubtasks.length;
  };

  const autoScrollerOptions = {
    startFromPercentage: 0.25, // Start auto-scrolling when 25% from the edge
    maxScrollAtPercentage: 0.05, // Max speed achieved when 5% from the edge
    maxPixelScroll: 10, // Max pixels per frame
    ease: (percentage) => Math.pow(percentage, 2), // Custom easing function
    durationDampening: {
      stopDampeningAt: 1200, // Stop dampening after 1200ms
      accelerateAt: 2000, // Start accelerating dampening at 2000ms
    },
    disabled: false, // Auto-scrolling enabled
  };

  if (boardCount === 0) {
    return (
      <div className="empty-state-group">
        <h2 className="dashboard-header heading-l">
          No boards detected. Create a new board to get started.
        </h2>
        <CustomButton
          id="new-board-btn"
          label="Create New Board"
          type="primary-large"
          onClick={() => activateModal('new-board')}
          disabled={false}
        />
      </div>
    );
  } else if (activeBoard && activeBoard.columns.length === 0) {
    return (
      <div className="empty-state-group">
        <h2 className="dashboard-header heading-l">This board is empty. Create a new column to get started!</h2>
        <CustomButton
          id="new-column-btn"
          label="+ Add New Column"
          type="primary-large"
          onClick={() => activateModal('edit-board')}
          disabled={false}
        />
      </div>
    );
  } else if (activeBoard && activeBoard.columns.length > 0) {
    return (
      <DragDropContext onDragEnd={handleDragEnd} autoScrollerOptions={autoScrollerOptions}>
        <ScrollContainer
          className="container"
          horizontal={true}
          vertical={true}
          innerRef={container}
          ignoreElements={['.task-card']}
        >
          <div className="columns-container">
            {activeBoard.columns.map((column, index) => (
              <DroppableColumn
                key={index}
                column={column}
                columnId={column.name}
                handleTaskCompletions={handleTaskCompletions}
              >
                <div className="column-card"></div>
              </DroppableColumn>
            ))}
            {/* Blank column for adding a new column */}
            <div className="column-card new-column">
              <h3 className="column-header heading-s new-column-hidden-header">header</h3>
              <div className={`task-list-group new-column-container ${!isDarkMode && 'new-column-light'}`}
                   onClick={() => activateModal('edit-board')}>
                <h4 className="heading-xl">+ New Column</h4>
              </div>
            </div>
          </div>
        </ScrollContainer>
      </DragDropContext>
    );
  }

  return null;
};

export default BoardContent;
