import {Draggable} from '@hello-pangea/dnd';
import useStore from "@/app/store/useStore";


/**
 * Task component
 * This component renders a task card
 * It is draggable and displays the task name and the number of subtasks
 * It also activates the view task modal when clicked
 * @param {object} props - Component props
 * @param {number} props.index - The task index
 * @param {object} props.task - The task object
 * @returns {JSX.Element}
 */
export const Task = (props) => {

  const {activateModal} = useStore((state) => ({
    activateModal: state.activateModal,
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
          <div className="task-header-card heading-m">{props.task.name}</div>
          <p className="subtask-amount body-m">
            {props.handleTaskCompletions(props.task)} of {props.task.subtasks.length} {props.task.subtasks.length === 1 ? 'subtask' : 'subtasks'}
          </p>
        </div>
      )}
    </Draggable>
  );
};
