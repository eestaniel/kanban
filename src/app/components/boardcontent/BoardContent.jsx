import React, {useState, useCallback} from 'react';
import CustomButton from '@/app/components/buttons/CustomButton';
import useStore from '@/app/store/useStore';
import './boardcontent.css';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import {SortableTask} from './SortableTask'; // This will be our sortable task component
import {DroppableColumn} from './DroppableColumn'; // This will be our droppable column component

const BoardContent = ({boardCount, activateModal}) => {
  const {activeBoard, boards, updateTaskPositions} = useStore((state) => ({
    activeBoard: state.activeBoard,
    boards: state.boards,
    updateTaskPositions: state.updateTaskPositions
  }));

  const [activeDragItem, setActiveDragItem] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = (event) => {
    const {active} = event;
    const {id: activeId} = active;
    const task = activeBoard.columns.flatMap(column => column.tasks).find(task => task.name === activeId);
    setActiveDragItem(task);
  };

  const getColumnName = (overName, overData) => {
    let newColumnName = '';
    if (!overData.current.sortable) {
      newColumnName = overData.current.columnId;
    } else {
      // map over columns
      activeBoard.columns.map((column) => {
        // map over column and find the column name that matches the overName
        column.tasks.map((task) => {
          if (task.name === overName) {
            newColumnName = column.name;
          }
        });
      });
    }


    return newColumnName;
  }

  const handleDragEnd = (event) => {
    const {active, over} = event;


    setActiveDragItem(null);

    if (!over) {
      return;
    }
    const {id: activeName} = active;
    const {id: overName,} = over
    updateTaskPositions(activeName, overName, getColumnName(overName, over.data));
  };

  const handleTaskCompletions = (task) => {
    const completedSubtasks = task.subtasks.filter((subtask) => subtask.isCompleted);
    return completedSubtasks.length;
  };

  const handleTaskClick = useCallback((task) => {
    activateModal('view-task', task);
  }, [activateModal]);

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
        <h2 className="dashboard-header heading-l">
          This board is empty. Create a new column to get started!
        </h2>
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="columns-container">
          {activeBoard.columns.map((column, index) => (
            <SortableContext
              key={index}
              items={column.tasks.map((task) => task.name)}
              strategy={verticalListSortingStrategy}
            >
              <DroppableColumn column={column} columnId={column.name}>
                <div className="column-card">
                  <h3 className="column-header heading-s">
                    {column.name} ({column.tasks.length})
                  </h3>
                  <div className="task-list-group">
                    {column.tasks.map((task) => (
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
        </div>
        <DragOverlay
          dropAnimation={{
            duration: 200,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
        >
          {activeDragItem ? (
            <div className="task-card">
              <h4 className="task-header heading-m">{activeDragItem.name}</h4>
              <p className="subtask-amount body-m">
                {handleTaskCompletions(activeDragItem)} of {activeDragItem.subtasks.length}{' '}
                {activeDragItem.subtasks.length > 1 ? 'subtasks' : 'subtask'}
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
