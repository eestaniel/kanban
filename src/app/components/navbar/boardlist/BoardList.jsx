import React from 'react';
import useStore from "@/app/store/useStore";

const BoardList = ({ onBoardClick }) => {
  const { boards, activeBoard } = useStore(state => ({
    boards: state.boards,
    activeBoard: state.activeBoard,
  }));

  return (
    <ul className="board-list">
      {boards.map((board, index) => (
        <li key={index} className={activeBoard?.id === board.id ? 'active' : ''}>
          <a href={`#${board.id}`} onClick={() => onBoardClick(board.id)}>{board.name}</a>
        </li>
      ))}
    </ul>
  );
};

export default BoardList;
