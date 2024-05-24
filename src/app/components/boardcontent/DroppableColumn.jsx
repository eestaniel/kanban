import React from 'react';
import { useDroppable } from '@dnd-kit/core';

/**
 * DroppableColumn component
 * @param {object} props
 * @param {JSX.Element} props.children - The children components to be rendered within the column.
 * @param {string} props.columnId - The unique identifier for the column.
 */
export const DroppableColumn = ({ children, columnId }) => {
  const { setNodeRef } = useDroppable({
    id: columnId,
    data: { columnId },
  });

  return (
    <div ref={setNodeRef} className="droppable-column">
      {children}
    </div>
  );
};
