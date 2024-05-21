import './taskform.css';
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/CustomButton";
import {useState, useEffect, useCallback} from "react";
import useInputValidator from "@/app/hooks/useInputValidator";
import Menu from "@/app/components/menu/Menu";
import useStore from "@/app/store/useStore";

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * TaskForm Component
 *
 * This component handles the creation and editing of tasks. It allows users to update task information
 * and validates input fields. The form is used in both creation and editing modes, determined by the `mode` prop.
 *
 * Props:
 * @param {string} mode - Determines if the form is in 'create' or 'edit' mode.
 * @param {Object} initialData - The initial data for the task, used in edit mode.
 *
 * State:
 * @typedef {Object} TaskData
 * @property {string} task_id - The unique identifier for the task.
 * @property {Object} task_data - The data object for the task.
 * @property {string} task_data.title - The title of the task.
 * @property {string} task_data.description - The description of the task.
 * @property {string} task_data.column_id - The column ID where the task belongs.
 * @property {Array} task_data.subtasks - The list of subtasks.
 * @property {Array} task_data.status - The status options for the task.
 * @property {string} task_data.title_error - The error message for task title validation.
 * @property {string} task_data.description_error - The error message for task description validation.
 *
 * Functions:
 * @function handleOnChange - Handles input changes for task fields and validates them.
 * @function addSubtask - Adds a new subtask to the task.
 * @function handleSubtaskChange - Handles input changes for subtasks and validates them.
 * @function removeSubtask - Removes a subtask from the task.
 * @function handleSubmitTask - Handles form submission, validates fields, and sets error messages.
 */
const TaskForm = ({mode, initialData}) => {
  const [taskData, setTaskData] = useState({
    task_id: '',
    task_data: {
      title: '',
      title_error: '',
      description: '',
      description_error: '',
      column_id: '',
      subtasks: [],
      status: '',
    }
  });

  const {activeBoard, createTask, closeModal} = useStore(state => ({
    activeBoard: state.activeBoard,
    createTask: state.createTask,
    closeModal: state.closeModal
  }));

  // If mode is edit and initial data exists, set the task data to the initial data
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      console.log('setting task data to initial data', initialData);
      setTaskData(initialData);
    } else {
      // set subtasks to index 0 of active board columns
      setTaskData(prevData => ({
        ...prevData,
        task_data: {
          ...prevData.task_data,
          column_id: activeBoard.board_data.columns[0].column_id,
          status: activeBoard.board_data.columns[0].title
        }
      }));
    }
  }, [mode, initialData, activeBoard.board_data.columns]);

  const {validateInput} = useInputValidator();

  /**
   * @function handleOnChange - Handles input changes for task fields and validates them.
   * @param {Object} e - The event object containing the input data.
   */
  const handleOnChange = useCallback((e) => {
    const {name, value} = e.target;
    setTaskData((prevState) => ({
      ...prevState,
      task_data: {
        ...prevState.task_data,
        [name]: value,
        [`${name}_error`]: validateInput(value, 'Task Title')
      }
    }));
  }, [validateInput]);


  /**
   * @function addSubtask - Adds a new subtask to the task.
   * @param {Object} e - The event object.
   */
  const addSubtask = (e) => {
    e.preventDefault()
    setTaskData(prevData => ({
      ...prevData,
      task_data: {
        ...prevData.task_data,
        subtasks: [...prevData.task_data.subtasks, {subtask_id: generateId(), title: '', error: ''}]
      }
    }));
  };

  /**
   * @function handleSubtaskChange - Handles input changes for subtasks and validates them.
   * @param {number} index - The index of the subtask to be updated.
   */
  const handleSubtaskChange = useCallback((index, newTitle) => {
    setTaskData(prevData => ({
      ...prevData,
      task_data: {
        ...prevData.task_data,
        subtasks: prevData.task_data.subtasks.map((subtask, i) => {
          if (i === index) {
            return {...subtask, title: newTitle, error: validateInput(newTitle, 'Subtask Title')};
          }
          return subtask;
        })
      }
    }));
  }
    , [validateInput]);

  /**
   * @function removeSubtask - Removes a subtask from the task.
   * @param {number} index - The index of the subtask to be removed.
   */
  const removeSubtask = useCallback((index) => {
    setTaskData(prevData => ({
      ...prevData,
      task_data: {
        ...prevData.task_data,
        subtasks: prevData.task_data.subtasks.filter((_, i) => i !== index)
      }
    }));
  }, []);

  const handleSubmitTask = (e) => {
    e.preventDefault();

    let hasError = false;
    const updatedTaskData = {...taskData.task_data};

    // Validate task title
    updatedTaskData.title_error = validateInput(taskData.task_data.title, 'Task Title');
    if (updatedTaskData.title_error) hasError = true

    // Validate task description
    updatedTaskData.description_error = validateInput(taskData.task_data.description, 'Task Description');
    if (updatedTaskData.description_error) hasError = true;

    // Validate each subtask
    updatedTaskData.subtasks = updatedTaskData.subtasks.map((subtask) => {
      const subtaskError = validateInput(subtask.title, 'Subtask Title');
      if (subtaskError) hasError = true;
      return {...subtask, error: subtaskError};
    });

    if (hasError) {
      setTaskData(prevData => ({
        ...prevData,
        task_data: updatedTaskData
      }));
    }

    // Prepare the task data for submission
    const newTask = {
      task_id: generateId(),
      title: taskData.task_data.title,
      description: taskData.task_data.description,
      column_id: taskData.task_data.column_id,
      subtasks: taskData.task_data.subtasks,
      status: taskData.task_data.status
    };
    if (hasError) {
      console.log('Task data has errors, cannot submit');
    } else {
      console.log('Submitting task:', newTask);
      createTask(newTask);
      closeModal();

    }
  };

  return (
    <div className="task-container">
      <h2 className="heading-l task-header">{mode !== 'edit' ? 'Add New Task' : 'Edit Task'}</h2>
      <form action="" className="task-form">
        <CustomTextField
          className="task-input-headers"
          label="Title"
          type="text"
          name="title"
          placeholder="e.g. Take coffee break"
          value={taskData.task_data.title}
          onChange={handleOnChange}
          error={taskData.task_data.title_error}
        />
        <CustomTextField
          id="task-description"
          label="Description"
          multiline={true}
          name="description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          value={taskData.task_data.description}
          onChange={handleOnChange}
          error={taskData.task_data.description_error}
        />

        {taskData.task_data.subtasks.length > 0 && taskData.task_data.subtasks.map((subtask, index) => (
          <CustomTextField
            key={subtask.subtask_id}
            label={index === 0 ? 'Subtasks' : ''}
            id={`subtask-id-${index}`}
            type="text"
            placeholder="e.g. Make coffee"
            value={subtask.title}
            onChange={e => handleSubtaskChange(index, e.target.value)}
            isList={index !== 0}
            isListOne={index === 0}
            onRemove={() => removeSubtask(index)}
            error={subtask.error}
          />
        ))}

        <CustomButton
          label={'+ Add New Subtask'}
          type={'secondary'}
          id="add_subtask"
          disabled={false}
          onClick={addSubtask}
        />

        <Menu taskData={taskData} setTaskData={setTaskData}/>

        <CustomButton
          label={`${mode !== 'edit' ? 'Create Task' : 'Save Changes'}`}
          type={'primary-small'}
          id="create_task"
          disabled={false}
          onClick={handleSubmitTask}
        />


      </form>
    </div>
  );
}

export default TaskForm;
