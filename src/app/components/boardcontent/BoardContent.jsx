import React, {useCallback} from 'react';
import CustomButton from '@/app/components/buttons/CustomButton';
import useStore from '@/app/store/useStore';
import './boardcontent.css';
import {DragDropContext} from '@hello-pangea/dnd';
import {DroppableColumn} from './DroppableColumn'; // This will be our droppable column component

const BoardContent = ({boardCount, activateModal}) => {
  const {activeBoard, updateTaskPositions, isDarkMode} = useStore((state) => ({
    activeBoard: state.activeBoard,
    updateTaskPositions: state.updateTaskPositions,
    isDarkMode: state.isDarkMode,
  }));


  const handleDragEnd = (event) => {
    const {destination, source, draggableId} = event;

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

  const handleTaskClick = useCallback(
    (task) => {
      activateModal('view-task', task);
    },
    [activateModal]
  );

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
      <DragDropContext
        onDragEnd={handleDragEnd}
      >
        <div className="columns-container">
          {activeBoard.columns.map((column, index) => (
            <DroppableColumn
              key={index}
              column={column}
              columnId={column.name}
              handleTaskCompletions={handleTaskCompletions}
            >
              <div className="column-card">


              </div>
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
      </DragDropContext>
    );
  }

  return null;
};

export default BoardContent;
