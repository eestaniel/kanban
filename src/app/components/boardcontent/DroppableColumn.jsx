import React, { useMemo } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from '@/app/components/boardcontent/Task';

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
export const DroppableColumn = ({ columnId, column, handleTaskCompletions }) => {
  const getBackgroundColor = (snapshot) => {
    if (snapshot.isDraggingOver) {
      return 'active-column';
    } else if (snapshot.draggingFromThisWith) {
      return '';
    } else {
      return '';
    }
  };

  const generateRandomColorCSS = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };

  const randomColor = useMemo(generateRandomColorCSS, []);

  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-card">
            <div className="card-header-group">
              <div className="header-color-circle" style={{ backgroundColor: randomColor }}></div>
              <h3 className="column-header heading-s">
                {column.name} ({column.tasks.length})
              </h3>
            </div>
            <div
              className={`task-list-group ${column.tasks.length === 0 && 'empty-column'} ${getBackgroundColor(snapshot)}`}
            >
              {column.tasks.map((task, index) => (
                <Task key={task.name} index={index} task={task} handleTaskCompletions={handleTaskCompletions} />
              ))}
            </div>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
