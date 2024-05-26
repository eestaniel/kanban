import React, {useState, useCallback, useEffect} from 'react';
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import dynamic from 'next/dynamic'
const CustomButton = dynamic(() => import("@/app/components/buttons/CustomButton"), {ssr: false});
import useInputValidator from "@/app/hooks/useInputValidator";
import useStore from "@/app/store/useStore";
import './bordform.css'

/**
 * BoardForm component
 * This component is responsible for rendering the board form component
 * It can be used to render a form to create or edit a board
 * @param mode
 * @returns {JSX.Element}
 */
const BoardForm = ({mode}) => {
  const [boardData, setBoardData] = useState({
    name: '',
    columns: [],
  });

  const [errors, setErrors] = useState({boardName: '', columns: {}});

  const {createBoard, closeModal, updateBoard, activeBoard} = useStore(state => ({
    createBoard: state.createBoard,
    closeModal: state.closeModal,
    updateBoard: state.updateBoard,
    activeBoard: state.activeBoard
  }));

  const {validateInput} = useInputValidator();

  useEffect(() => {
    if (mode === 'edit') {
      setBoardData({
        name: activeBoard.name,
        columns: activeBoard.columns
      });
    }
  }, [mode, activeBoard]);

  const validateForm = () => {
    const boardNameError = validateInput(boardData.name, 'board-name', mode === 'edit' ? 'edit' : '');
    const columnErrors = {};

    boardData.columns.forEach((column, index) => {
      const error = validateInput(column.name, 'column-name');
      if (error) {
        columnErrors[index] = error;
      }
    });

    const columnNames = boardData.columns.map(column => column.name.toLowerCase());
    const uniqueColumns = new Set(columnNames);
    if (columnNames.length !== uniqueColumns.size) {
      boardData.columns.forEach((column, index) => {
        if (columnNames.indexOf(column.name.toLowerCase()) !== index) {
          columnErrors[index] = 'Column names must be unique';
        }
      });
    }

    setErrors({
      boardName: boardNameError,
      columns: columnErrors
    });

    return !boardNameError && Object.keys(columnErrors).length === 0;
  };

  const handleSubmitBoard = () => {
    if (validateForm()) {
      const newBoard = {...boardData};

      if (mode === 'edit') {
        updateBoard(newBoard);
      } else {
        createBoard(newBoard);
      }
      closeModal();
    }
  };

  const handleInputChange = useCallback((index, newName) => {
    const newColumns = [...boardData.columns];
    newColumns[index] = {...newColumns[index], name: newName};

    const columnNames = newColumns.map(column => column.name.toLowerCase());
    const uniqueColumns = new Set(columnNames);
    const columnErrors = {...errors.columns};

    const error = validateInput(newName, 'column-name');
    if (error) {
      columnErrors[index] = error;
    } else {
      delete columnErrors[index];
    }

    if (columnNames.length !== uniqueColumns.size) {
      newColumns.forEach((column, i) => {
        if (i !== index && column.name.toLowerCase() === newName.toLowerCase()) {
          columnErrors[i] = 'Duplicate';
          columnErrors[index] = 'Duplicate';
        }
      });
    }

    setBoardData({...boardData, columns: newColumns});
    setErrors(prevErrors => ({
      ...prevErrors,
      columns: columnErrors
    }));
  }, [boardData, errors.columns, validateInput]);

  const handleBoardNameChange = (newName) => {
    setBoardData({...boardData, name: newName});
    setErrors(prevErrors => ({
      ...prevErrors,
      boardName: validateInput(newName, 'boardName')
    }));
  };

  const addColumn = () => {
    setBoardData(prev => ({
      ...prev,
      columns: [...prev.columns, {name: '', error: '', tasks: []}]
    }));
  };

  const removeColumn = (index) => {
    const newColumns = boardData.columns.filter((_, i) => i !== index);
    setBoardData(prev => ({...prev, columns: newColumns}));
  };

  return (
    <>
      <h3 className="modal-header heading-l">{mode === 'edit' ? 'Edit Board' : 'Add New Board'}</h3>
      <CustomTextField
        label="Board Name"
        id="board-name"
        type="text"
        placeholder="e.g. Web Design"
        value={boardData.name}
        onChange={e => handleBoardNameChange(e.target.value)}
        error={errors.boardName}
        classname={'board-form-header'}
      />
      {boardData.columns.map((column, index) => (
        <CustomTextField
          key={index}
          label={index === 0 ? 'Board Columns' : ''}
          id={`board-id-${index}`}
          type="text"
          placeholder=""
          value={column.name}
          onChange={e => handleInputChange(index, e.target.value)}
          isList={index !== 0}
          isListOne={index === 0}
          onRemove={() => removeColumn(index)}
          error={errors.columns[index]}
        />
      ))}
      <div className="board-button-group">
        <CustomButton label="+ Add New Column" type="secondary" onClick={addColumn}/>
        <CustomButton label={mode !== 'edit' ? 'Create Board' : 'Save Changes'} type="primary-small"
                      onClick={handleSubmitBoard}/>
      </div>
    </>
  );
};

export default BoardForm;
