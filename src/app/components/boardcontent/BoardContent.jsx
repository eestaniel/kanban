import React, {useState, useCallback} from 'react';
import CustomButton from '@/app/components/buttons/CustomButton';
import useStore from '@/app/store/useStore';
import './boardcontent.css';
import {
  DndContext,
  rectanbleIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  closestCorners,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {SortableTask} from './SortableTask'; // This will be our sortable task component
import {DroppableColumn} from './DroppableColumn'; // This will be our droppable column component

const BoardContent = ({boardCount, activateModal}) => {
  const {activeBoard, updateTaskPositions, isDarkMode} = useStore((state) => ({
    activeBoard: state.activeBoard,
    updateTaskPositions: state.updateTaskPositions,
    isDarkMode: state.isDarkMode,
  }));

  const [activeDragItem, setActiveDragItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const {active} = event;
    const {id: activeId} = active;
    const task = activeBoard.columns
      .flatMap((column) => column.tasks)
      .find((task) => task.name === activeId);
    setActiveDragItem(task);
  };

  const getColumnName = (overName, overData) => {
    let newColumnName = '';
    if (!overData.current.sortable) {
      newColumnName = overData.current.columnId;
    } else {
      // map over columns
      activeBoard.columns.forEach((column) => {
        // map over column and find the column name that matches the overName
        column.tasks.forEach((task) => {
          if (task.name === overName) {
            newColumnName = column.name;
          }
        });
      });
    }

    return newColumnName;
  };

  const handleDragEnd = (event) => {
    const {active, over} = event;

    setActiveDragItem(null);

    if (!over) {
      return;
    }
    const {id: activeName} = active;
    const {id: overName} = over;

    updateTaskPositions(activeName, overName, getColumnName(overName, over.data));
  };

  const handleDragOver = (e) => {
    console.log(e.collisions)

  }

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
      <DndContext sensors={sensors}  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
      >
        <div className="columns-container">
          {activeBoard.columns.map((column, index) => (
            <SortableContext key={index} items={column.tasks.map((task) => task.name)}
                             strategy={verticalListSortingStrategy}
            >
              <DroppableColumn column={column} columnId={column.name}>
                <div className="column-card">
                  <h3 className="column-header heading-s">
                    {column.name} ({column.tasks.length})
                  </h3>
                  <div className={`task-list-group ${column.tasks.length === 0 && 'empty-column'}`}>
                    {column.tasks.length > 0 &&
                      column.tasks.map((task) => (
                        <SortableTask
                          key={task.name}
                          id={task.name}
                          task={task}
                          onClick={() => handleTaskClick(task)}
                          handleTaskCompletions={handleTaskCompletions}
                        />
                      ))}
                  </div>
                </div>
              </DroppableColumn>
            </SortableContext>
          ))}
          {/* Blank column for adding a new column */}
          <div className="column-card new-column">
            <h3 className="column-header heading-s new-column-hidden-header">header</h3>
            <div className={`task-list-group new-column-container ${!isDarkMode && 'new-column-light'}`} onClick={()=>activateModal('edit-board')}>
              <h4 className="heading-xl">+ New Column</h4>
            </div>
          </div>
        </div>
        <DragOverlay
          position={'fixed'}
          dropAnimation={{
            duration: 200,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
        >
          {activeDragItem ? (
            <div className="task-card">
              <h4 className="task-header heading-m">{activeDragItem.name}</h4>
              <p className="subtask-amount body-m">
                {handleTaskCompletions(activeDragItem)} of {activeDragItem.subtasks.length} {activeDragItem.subtasks.length > 1 ? 'subtasks' : 'subtask'}
              </p>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }

  return null;
};

export default BoardContent;
