import React from 'react';
import {Droppable} from '@hello-pangea/dnd';
import {Task} from "@/app/components/boardcontent/Task";

/**
 * DroppableColumn component
 * @param {object} props
 * @param {JSX.Element} props.children - The children components to be rendered within the column.
 * @param {string} props.columnId - The unique identifier for the column.
 */
export const DroppableColumn = ({children, columnId, column, handleTaskCompletions}) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column-card">
            <h3 className="column-header heading-s">
              {column.name} ({column.tasks.length})
            </h3>
            <div className={`task-list-group ${column.tasks.length === 0 && 'empty-column'}`}>
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
