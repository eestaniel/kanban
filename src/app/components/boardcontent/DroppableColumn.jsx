import React from 'react';
import {Droppable} from '@hello-pangea/dnd';
import {Task} from "@/app/components/boardcontent/Task";

/**
 * DroppableColumn component
 * This component renders a column with tasks
 * It is droppable and displays the column name and the number of tasks
 * @param {object} props - Component props
 * @param {string} props.columnId - The column ID
 * @param {object} props.column - The column object
 * @param {function} props.handleTaskCompletions - Function to handle task completions
 * @returns {JSX.Element}
 */
export const DroppableColumn = ({columnId, column, handleTaskCompletions}) => {
  const getBackgroundColor = (snapshot) => {
    // Giving isDraggingOver preference
    if (snapshot.isDraggingOver) {
      return 'active-column';
    } else if (snapshot.draggingFromThisWith) {
      return '';
    } else {
      // Otherwise use our default background
      return '';
    }

  };

  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-card">
            <h3 className="column-header heading-s">
              {column.name} ({column.tasks.length})
            </h3>
            <div className={`task-list-group ${column.tasks.length === 0 && 'empty-column'} ${getBackgroundColor(snapshot)}`}>
              {column.tasks.map((task, index) => (
                <Task key={task.name} index={index} task={task} handleTaskCompletions={handleTaskCompletions}/>
              ))}
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
