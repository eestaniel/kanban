import './viewtask.css';
import useStore from "@/app/store/useStore";
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import { useCallback, useEffect, useState } from "react";

const ViewTask = () => {
  const { initialData, updateTask } = useStore((state) => ({
    initialData: state.initialData,
    updateTask: state.updateTask
  }));

  const [newTask, setNewTask] = useState({});

  useEffect(() => {
    setNewTask(initialData);
  }, [initialData]);

  const handleOnCheck = useCallback((subtask) => {
    const updatedTask = {
      ...newTask,
      subtasks: newTask.subtasks.map((task) =>
        task.name === subtask.name ? { ...task, isCompleted: !task.isCompleted } : task
      )
    };
    updateTask(updatedTask);
  }, [newTask, updateTask]);

    const handleCheckboxContainerClick = (id) => {
    document.getElementById(id).click();
  };

  return (
    <div className="task-container">
      <h2 className="task-header heading-l">{newTask.name}</h2>
      <p className="task-description body-l">{newTask.description}</p>
      {newTask?.subtasks?.map((subtask) => (
        <div key={subtask.name} className="subtask-container" onClick={()=>handleCheckboxContainerClick(subtask.name)}>
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
  );
};

export default ViewTask;
