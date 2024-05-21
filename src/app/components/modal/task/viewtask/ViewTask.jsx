import './viewtask.css';
import useStore from "@/app/store/useStore";
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import { useCallback, useEffect, useState } from "react";

const ViewTask = () => {
  const { initialData, activeBoard, updateTask } = useStore((state) => ({
    initialData: state.initialData,
    activeBoard: state.activeBoard,
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
        task.subtask_id === subtask.subtask_id ? { ...task, completed: !task.completed } : task
      )
    };
    updateTask(updatedTask);
  }, [newTask, updateTask]);

  return (
    <div className="task-container">
      <h2 className="task-header heading-l">{newTask.title}</h2>
      <p className="task-description body-l">{newTask.description}</p>
      {newTask?.subtasks?.map((subtask) => (
        <div key={subtask.subtask_id} className="subtask-container">
          <CustomTextField
            label={subtask.title}
            name={subtask.title}
            value={subtask.completed}
            checked={subtask.completed}
            onChange={() => handleOnCheck(subtask)}
            checkbox={true}
          />
        </div>
      ))}
    </div>
  );
};

export default ViewTask;
