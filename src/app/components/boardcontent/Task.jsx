import React, {useState, useEffect, useRef} from 'react';
import {Draggable} from '@hello-pangea/dnd';
import useStore from "@/app/store/useStore";

export const Task = (props) => {

  const {activateModal} = useStore((state) => ({
    activateModal: state.activateModal
  }));

  const handleActivateModal = () => {
    activateModal('view-task', props.task);
  }

  return (
    <Draggable draggableId={props.task.name} index={props.index}>

      {(provided) => (
        <div className="task-card"
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref={provided.innerRef}
              onClick={handleActivateModal}
        >
          <div className="task-header">{props.task.name}</div>
          <p className="subtask-amount body-m">
            {props.handleTaskCompletions(props.task)} of {props.task.subtasks.length} {props.task.subtasks.length === 1 ? 'subtask' : 'subtasks'}
          </p>
        </div>
      )}
    </Draggable>
  );
};
