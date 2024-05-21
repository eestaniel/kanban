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
 * This component handles the creation and editing of boards. It allows users to add new columns,
 * update board information, and validate input fields. The form is used in both creation and
 * editing modes, determined by the `mode` prop.
 *
 * Props:
 * @param {string} mode - Determines if the form is in 'create' or 'edit' mode.
 * @param {Object} initialData - The initial data for the board, used in edit mode.
 *
 * State:
 * @param {Object} boardData - The state object containing board information including title and columns.
 * @param {string} boardData.board_id - The unique identifier for the board.
 * @param {Object} boardData.board_data - The data object for the board.
 * @param {string} boardData.board_data.title - The title of the board.
 * @param {Array} boardData.board_data.columns - The list of columns in the board.
 * @param {string} boardData.error - The error message for board validation.
 *
 * Functions:
 * @function addColumn - Adds a new column to the board with a unique column_id.
 * @function handleInputChange - Handles input changes for column titles and validates them.
 * @function removeColumn - Removes a column from the board by index.
 * @function handleSubmitBoard - Handles form submission, validates the board and columns,
 * and triggers board creation or update.
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

  // Function to add a new column to the board
  const addColumn = () => {
    setBoardData(prevData => ({
      ...prevData,
      board_data: {
        ...prevData.board_data,
        columns: [...prevData.board_data.columns, {column_id: generateId(), title: '', error: ''}]
      }
    }));
  };

  // Validation for column list
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

  const removeColumn = useCallback((index) => {
    setBoardData(prevData => ({
      ...prevData,
      board_data: {
        title: prevData.board_data.title,
        columns: prevData.board_data.columns.filter((_, i) => i !== index)
      }
    }));
  }, []);

  // Function to handle the submission of the board
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
      <h3 className="modal-header heading-l">Add New Board</h3>
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
