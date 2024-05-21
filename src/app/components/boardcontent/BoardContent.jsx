import React from 'react';
import CustomButton from '@/app/components/buttons/CustomButton';
import useStore from '@/app/store/useStore';
import './boardcontent.css';

const BoardContent = ({boardCount, activateModal}) => {
  const {activeBoard} = useStore((state) => ({
    activeBoard: state.activeBoard,
  }));

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
  } else if (activeBoard && activeBoard.board_data.columns.length === 0) {
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
  } else if (activeBoard && activeBoard.board_data.columns.length > 0) {
    return (

      <div className="columns-container">
        {activeBoard.board_data.columns.map((column) => (
          <div key={column.column_id} className="column-card">
            <h3 className="column-header heading-s">{column.title} ({column.task_list.length})</h3>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default BoardContent;