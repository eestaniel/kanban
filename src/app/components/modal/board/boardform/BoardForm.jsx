import './bordform.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/CustomButton";
import {useState, useCallback, useEffect} from "react";
import useInputValidator from "@/app/hooks/useInputValidator";
import useStore from "@/app/store/useStore";


const BoardForm = ({mode, initialData}) => {
  /*Columns contain an array of objects with the following structure:
  * title: string
  * description: string
  * subtasks: [''] array of strings
  * status: string (option list of columns)
  * example:
  *   columns: [{
  *     title: 'To Do',
  *     description: 'Tasks that need to be done',
  *     subtasks: ['Task 1', 'Task 2'],
  *     status: 'To Do'
  * }]
  }*/

  // initialize board data
  const [boardData, setBoardData] = useState({
    board_id: '',
    board_data: {
      title: '',
      columns: [],
    },
    error: ''
  });
  // validate input
  const {validateInput} = useInputValidator();

  // create board and close modal functions from global state
  const {createBoard, closeModal, createUniqueId, updateBoard} = useStore(state => ({
    createBoard: state.createBoard,
    closeModal: state.closeModal,
    createUniqueId: state.createUniqueId,
    updateBoard: state.updateBoard
  }));

  // if mode is edit and initial data exists, set the board data to the initial data
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      console.log('setting board data to initial data', initialData);
      setBoardData(initialData);
    }
  }, [mode, initialData]);

  // function to add a new column to the board
  const addColumn = () => {
    setBoardData(prevData => ({
      ...prevData,
      board_data: {
        ...prevData.board_data,
        columns: [...prevData.board_data.columns, {title: '', error: ''}]
      }
    }));
  };


  // validation for column list
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
    setBoardData(prevData => {
      return {
        ...prevData,
        board_data: {
          title: prevData.board_data.title,
          columns: prevData.board_data.columns.filter((_, i) => i !== index)
        }
      }
    });
  }, []);

  // function to handle the submission of the board
  // validate the board name and columns
  // if no errors exist, create the board and close the modal
  // if errors exist, log the errors
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
      // create new board object if mode is not edit
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
        // update the board object if mode is edit
        updateBoard(boardData);
      }
      closeModal();
    } else {
      console.log('Errors exist');
    }
  };

  return (
    <>
      <h3 className=" modal-header heading-l">Add New Board</h3>
      <CustomTextField label={'Board Name'}
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
                       })
                       }
                       error={boardData.error}

      />

      {Object.keys(boardData.board_data.columns).length > 0 && boardData.board_data.columns.map((column, index) => (
        <CustomTextField
          key={index}
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

      <CustomButton label={'+ Add New Column'} type={'secondary'} id="add_column" disabled={false}
                    onClick={() => addColumn()}/>
      <CustomButton label={`${mode !== 'edit' ? 'Create New Board' : 'Save Changes'}`} type={'primary-small'}
                    id="create_board" disabled={false}
                    onClick={() => handleSubmitBoard()}/>

    </>
  );
};

export default BoardForm;
