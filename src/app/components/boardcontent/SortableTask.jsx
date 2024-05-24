import React, { useState, useEffect, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableTask = ({ id, task, onClick, handleTaskCompletions }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const [isClick, setIsClick] = useState(true);
  const timeoutRef = useRef(null);
  const initialPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseDown = (event) => {
    initialPositionRef.current = { x: event.clientX, y: event.clientY };
    setIsClick(true);
    timeoutRef.current = setTimeout(() => {
      setIsClick(false);
    }, 200); // Delay to account for minor movements
  };

  const handleMouseMove = (event) => {
    const { x, y } = initialPositionRef.current;
    const deltaX = Math.abs(event.clientX - x);
    const deltaY = Math.abs(event.clientY - y);

    if (deltaX > 5 || deltaY > 5) {
      setIsClick(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  const handleMouseUp = (event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (isClick) {
      onClick(task);
    }
  };

  const handleDragEnd = () => {
    setIsClick(false);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? 'grabbing' : 'pointer',
    opacity: isDragging ? 0.25 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-card"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onPointerUp={handleMouseUp}
      onDragEnd={handleDragEnd}
    >
      <h4 className="task-header heading-m">{task.name}</h4>
      <p className="subtask-amount body-m">
        {handleTaskCompletions(task)} of {task.subtasks.length}{' '}
        {task.subtasks.length > 1 ? 'subtasks' : 'subtask'}
      </p>
    </div>
  );
};
