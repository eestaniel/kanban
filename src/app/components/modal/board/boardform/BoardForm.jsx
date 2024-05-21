import './bordform.css';
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/CustomButton";
import {useState, useCallback, useEffect} from "react";
import useInputValidator from "@/app/hooks/useInputValidator";
import useStore from "@/app/store/useStore";

// Utility function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

/**
 * BoardForm Component
 *
 * Handles the creation and editing of boards. Allows users to add new columns,
 * update board information, and validate input fields. The form is used in both creation and
 * editing modes, determined by the `mode` prop.
 *
 * @param {string} mode - Determines if the form is in 'create' or 'edit' mode.
 * @param {Object} initialData - Initial data for the board, used in edit mode.
 *
 * @type {Object} boardData - State object containing the board's data.
 * @property {string} boardData.board_id - Unique identifier for the board.
 * @property {Object} boardData.board_data - Contains the board's title and columns.
 * @property {string} boardData.board_data.title - Title of the board.
 * @property {Array} boardData.board_data.columns - List of columns in the board, each with `column_id`, `title`, and `error`.
 * @property {string} boardData.error - Error message for board validation.
 *
 * @function addColumn - Adds a new column to the board.
 * @function handleInputChange - Handles changes and validation for column titles.
 * @function removeColumn - Removes a column by index.
 * @function handleSubmitBoard - Submits the board, validates data, creates or updates the board.
 */

const BoardForm = ({mode, initialData}) => {
  // Initialize board data
  const [boardData, setBoardData] = useState({
    board_id: '',
    board_data: {
      title: '',
      columns: [],
    },
    error: ''
  });

  // Validate input
  const {validateInput} = useInputValidator();

  // Create board and close modal functions from global state
  const {createBoard, closeModal, createUniqueId, updateBoard} = useStore(state => ({
    createBoard: state.createBoard,
    closeModal: state.closeModal,
    createUniqueId: state.createUniqueId,
    updateBoard: state.updateBoard
  }));

  // If mode is edit and initial data exists, set the board data to the initial data
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      console.log('setting board data to initial data', initialData);
      setBoardData(initialData);
    }
  }, [mode, initialData]);

  /** @function addColumn - Adds a new column to the board.*/
  const addColumn = () => {
    setBoardData(prevData => ({
      ...prevData,
      board_data: {
        ...prevData.board_data,
        columns: [...prevData.board_data.columns, {column_id: generateId(), title: '', error: ''}]
      }
    }));
  };

  /** @function handleInputChange - Handles changes and validation for column titles.*/
  const handleInputChange = useCallback((index, newTitle) => {
    setBoardData(prevData => ({
      ...prevData,
      board_data: {
        ...prevData.board_data,
        columns: prevData.board_data.columns.map((column, i) =>
          i === index ? {...column, title: newTitle, error: validateInput(newTitle, 'Column Title')} : column
        )
      }
    }));
  }, [validateInput]);

  /** @function removeColumn - Removes a column by index.*/
  const removeColumn = useCallback((index) => {
    setBoardData(prevData => ({
      ...prevData,
      board_data: {
        title: prevData.board_data.title,
        columns: prevData.board_data.columns.filter((_, i) => i !== index)
      }
    }));
  }, []);

  /** @function handleSubmitBoard - Submits the board, validates data, creates or updates the board.*/
  const handleSubmitBoard = () => {
    const boardNameError = validateInput(boardData.board_data.title, 'Board Name');
    const columnErrors = boardData.board_data.columns.map(column => validateInput(column.title, 'column-title'));

    const newColumns = boardData.board_data.columns.map((column, index) => ({
      ...column,
      error: columnErrors[index]
    }));

    const hasErrors = columnErrors.some(error => error !== '') || boardNameError !== '';

    setBoardData(prevData => ({
      ...prevData,
      error: boardNameError,
      board_data: {
        ...prevData.board_data,
        columns: newColumns
      }
    }));

    if (!hasErrors) {
      if (mode !== 'edit') {
        const newBoard = {
          board_id: createUniqueId({}),
          board_data: {
            title: boardData.board_data.title,
            columns: boardData.board_data.columns
          }
        };
        console.log('board created, updating global state');
        createBoard(newBoard);
      } else {
        updateBoard(boardData);
      }
      closeModal();
    } else {
      console.log('Errors exist');
    }
  };

  return (
    <>
      <h3 className="modal-header heading-l">{mode==='edit'? 'Edit Board' : 'Add New Board'}</h3>
      <CustomTextField
        label={'Board Name'}
        id={'board-name'}
        type={'text'}
        placeholder={'e.g. Web Design'}
        value={boardData.board_data.title}
        onChange={(e) => setBoardData({
          ...boardData,
          board_data: {
            title: e.target.value,
            columns: boardData.board_data.columns
          }
        })}
        error={boardData.error}
      />

      {boardData.board_data.columns.length > 0 && boardData.board_data.columns.map((column, index) => (
        <CustomTextField
          key={column.column_id}
          label={index === 0 ? 'Board Columns' : ''}
          id={`board-id-${index}`}
          type="text"
          placeholder=""
          value={column.title}
          onChange={e => handleInputChange(index, e.target.value)}
          isList={index !== 0}
          isListOne={index === 0}
          onRemove={() => removeColumn(index)}
          error={column.error}
        />
      ))}

      <CustomButton
        label={'+ Add New Column'}
        type={'secondary'}
        id="add_column"
        disabled={false}
        onClick={addColumn}
      />
      <CustomButton
        label={`${mode !== 'edit' ? 'Create New Board' : 'Save Changes'}`}
        type={'primary-small'}
        id="create_board"
        disabled={false}
        onClick={handleSubmitBoard}
      />
    </>
  );
};

export default BoardForm;
