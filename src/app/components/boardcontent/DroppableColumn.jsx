import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const DroppableColumn = ({ children, columnId }) => {
  const { setNodeRef } = useDroppable({
    id: columnId,
    data: { columnId }
  });

  return (
    <div ref={setNodeRef}>
      {children}
    </div>
  );
};
