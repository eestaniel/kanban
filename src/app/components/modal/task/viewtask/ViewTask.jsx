import './viewtask.css';
import useStore from "@/app/store/useStore";
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import {useCallback, useEffect, useState} from "react";
import Menu from "@/app/components/menu/Menu";

const ViewTask = () => {
  const {initialData, updateTask} = useStore((state) => ({
    initialData: state.initialData,
    updateTask: state.updateTask,
    updateStatus: state.updateStatus
  }));

  const [newTask, setNewTask] = useState({});

  useEffect(() => {
    setNewTask(initialData);
  }, [initialData]);


  const handleOnCheck = useCallback((subtask) => {
    const updatedTask = {
      ...newTask,
      subtasks: newTask.subtasks.map((task) =>
        task.name === subtask.name ? {...task, isCompleted: !task.isCompleted} : task
      )
    };
    updateTask(updatedTask, 'checklist');
  }, [newTask, updateTask]);

  const handleCheckboxContainerClick = (id) => {
    document.getElementById(id).click();
  };


  const handleSelectStatus = useCallback((menuItem) => {
    // create a new task object with the updated status
    const updatedTask = {
      ...newTask,
      status: menuItem
    }
    // set the new task object
    setNewTask(updatedTask)
    updateTask(updatedTask, 'status');


  }, [newTask, updateTask]);

  return (
    <div className="task-container">
      <h2 className="task-header heading-l">{newTask.name}</h2>
      <p className="task-description body-l">{newTask.description}</p>
      <div className="subtask-group">
        <h3 className="subtask-header heading-s">Subtasks</h3>
        {newTask?.subtasks?.map((subtask) => (
          <div key={subtask.name} className="subtask-container"
               onClick={() => handleCheckboxContainerClick(subtask.name)}>
            <CustomTextField
              label={subtask.name}
              name={subtask.name}
              value={subtask.isCompleted}
              checked={subtask.isCompleted}
              onChange={() => handleOnCheck(subtask)}
              checkbox={true}
              classname={'subtask-checkbox'}
              id={subtask.name}
            />
          </div>
        ))}
      </div>

      <Menu newTask={newTask} handleSelectStatus={handleSelectStatus}/>
    </div>
  );
};

export default ViewTask;
