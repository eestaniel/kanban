import React from 'react';
import CustomButton from '@/app/components/buttons/CustomButton';
import useStore from '@/app/store/useStore';
import {useCallback} from "react";
import './boardcontent.css';

const BoardContent = ({boardCount, activateModal}) => {
  const {activeBoard} = useStore((state) => ({
    activeBoard: state.activeBoard,
  }));



  const handleTaskClick = useCallback((task) => {
      activateModal('view-task', task);
    }, [activateModal]);

  if (boardCount === 0) {
    return (
      <div className="empty-state-group">
        <h2 className="dashboard-header heading-l">
          No boards detected. Create a new board to get started.
        </h2>
        <CustomButton
          id="new-board-btn"
          label="Create New Board"
          type="primary-large"
          onClick={() => activateModal('new-board')}
          disabled={false}
        />
      </div>
    );

  } else if (activeBoard && activeBoard.columns.length === 0) {
    return (
      <div className="empty-state-group">
        <h2 className="dashboard-header heading-l">
          This board is empty. Create a new column to get started!
        </h2>
        <CustomButton
          id="new-column-btn"
          label="+ Add New Column"
          type="primary-large"
          onClick={() => activateModal('edit-board')}
          disabled={false}
        />
      </div>
    );
  } else if (activeBoard && activeBoard.columns.length > 0) {
    return (

      <div className="columns-container">
        {activeBoard.columns.map((column,index) => (
          <div key={index} className="column-card">
            <h3 className="column-header heading-s">{column.name} ({column.tasks.length})</h3>
            <div className="task-list-group">
              {column.tasks.map((task) => (
                <div key={task.task_id} className="task-card" onClick={() => handleTaskClick(task)}>
                  <h4 className="task-header heading-m">{task.name}</h4>

                  {/*TODO: calculate how many subtasks completed and subtask length*/}
                  <p
                    className="subtask-amount body-m">{0} of {task.subtasks.length} {column.tasks.length > 1 ? 'subtasks' : 'subtask'}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default BoardContent;
