import './taskform.css';
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/CustomButton";
import {useCallback, useEffect, useState} from "react";
import useInputValidator from "@/app/hooks/useInputValidator";
import Menu from "@/app/components/menu/Menu";
import useStore from "@/app/store/useStore";

/**
 * TaskForm Component
 *
 * This component handles the creation and editing of tasks. It allows users to update task information
 * and validates input fields. The form is used in both creation and editing modes, determined by the `mode` prop.
 *
 * Props:
 * @param {string} mode - Determines if the form is in 'create' or 'edit' mode.
 */
const TaskForm = ({mode}) => {
  const [taskData, setTaskData] = useState({
    id: '',
    name: '',
    name_error: '',
    description: '',
    description_error: '',
    subtasks: [],
    status: ''
  });

  const {activeBoard, createTask, closeModal, initialData, updateTask} = useStore(state => ({
    activeBoard: state.activeBoard,
    createTask: state.createTask,
    closeModal: state.closeModal,
    initialData: state.initialData,
    updateTask: state.updateTask
  }));

  const {validateInput} = useInputValidator();

  const [placeholderSubtasks, setPlaceholderSubtasks] = useState([]);

  // Generate random placeholder subtasks once
  useEffect(() => {
    const subtasksList = ['Make Coffee', 'Take a break', 'Go for a walk', 'Read a book', 'Meditate', 'Stretch', 'Have a snack', 'Listen to music'];

    const generateRandomPlaceholderTasks = () => {
      const shuffledSubtasks = [...subtasksList].sort(() => 0.5 - Math.random());
      setPlaceholderSubtasks(shuffledSubtasks);
    };

    generateRandomPlaceholderTasks();
  }, []);

  // If mode is edit and initial data exists, set the task data to the initial data
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTaskData(initialData);
    } else if (activeBoard && activeBoard.columns.length > 0) {
      // set default status to the first column of the active board
      setTaskData(prevData => ({
        ...prevData,
        status: activeBoard.columns[0].name
      }));
    }
  }, [mode, initialData, activeBoard]);

  const handleOnChange = useCallback((e) => {
    const {name, value} = e.target;
    setTaskData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const addSubtask = (e) => {
    e.preventDefault();
    setTaskData(prevData => ({
      ...prevData,
      subtasks: [...prevData.subtasks, {name: '', isCompleted: false}]
    }));
  };

  const handleSubtaskChange = useCallback((index, newTitle) => {
    setTaskData(prevData => ({
      ...prevData,
      subtasks: prevData.subtasks.map((subtask, i) => {
        if (i === index) {
          return {...subtask, name: newTitle, error: validateInput(newTitle, 'task-name')};
        }
        return subtask;
      })
    }));
  }, [validateInput]);

  const removeSubtask = useCallback((index) => {
    setTaskData(prevData => ({
      ...prevData,
      subtasks: prevData.subtasks.filter((_, i) => i !== index)
    }));
  }, []);

  const handleSelectStatus = useCallback((menuItem) => {
    setTaskData(prevData => ({
      ...prevData,
      status: menuItem
    }));
  }, []);

  const handleSubmitTask = (e) => {
    e.preventDefault();

    let hasError = false;
    const updatedTaskData = {...taskData};

    // Validate task name
    updatedTaskData.name_error = validateInput(taskData.name, 'task-name');
    if (updatedTaskData.name_error) hasError = true;

    // Validate task description
    updatedTaskData.description_error = validateInput(taskData.description, 'task-description');
    if (updatedTaskData.description_error) hasError = true;

    // Validate each subtask
    updatedTaskData.subtasks = updatedTaskData.subtasks.map((subtask) => {
      const subtaskError = validateInput(subtask.name, 'task-name');
      if (subtaskError) hasError = true;
      return {...subtask, error: subtaskError};
    });

    if (hasError) {
      setTaskData(prevData => ({
        ...prevData,
        ...updatedTaskData
      }));
    } else {
      // Prepare the task data for submission
      const newTask = {
        ...taskData,
      };
      if (mode === 'edit') {
        // Update the task
        updateTask(newTask, 'edit');
      } else {
        // Create a new task
        createTask(newTask);
      }
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
          name="name"
          placeholder="e.g. Take coffee break"
          value={taskData.name}
          onChange={handleOnChange}
          error={taskData.name_error}
        />
        <CustomTextField
          id="task-description"
          label="Description"
          multiline={true}
          name="description"
          placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
          value={taskData.description}
          onChange={handleOnChange}
          error={taskData.description_error}
        />
        <div className="task-subtasks-group">
          {taskData?.subtasks?.length > 0 && taskData.subtasks.map((subtask, index) => (
            <CustomTextField
              key={index}
              label={index === 0 ? 'Subtasks' : ''}
              id={`subtask-id-${index}`}
              type="text"
              placeholder={placeholderSubtasks[index % placeholderSubtasks.length] || ''}
              value={subtask.name}
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
        </div>

        <Menu newTask={taskData} handleSelectStatus={handleSelectStatus}/>

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
