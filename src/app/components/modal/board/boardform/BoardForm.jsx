import './bordform.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/Custom_Button";
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
    title: '',
    columns: [],
    error: null
  });
  // validate input
  const {validateInput} = useInputValidator();

  // create board and close modal functions from global state
  const {createBoard, closeModal} = useStore(state => ({
    createBoard: state.createBoard,
    closeModal: state.closeModal
  }));

  // if mode is edit and initial data exists, set the board data to the initial data
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setBoardData(initialData);
      // reset errors
      setBoardData(prevData => {
        return {
          ...prevData,
          columns: initialData.columns.map(column => {
            return {...column, error: null}
          })
        }
      })
    }
  }, [mode, initialData]);

  // function to add a new column to the board
  const addColumn = () => {
    setBoardData(prevData => {
      return {
        ...prevData,
        columns: [...prevData.columns, {title: '', error: ''}]
      }
    });
  };

  // validation for column list
  const handleInputChange = useCallback((index, newTitle) => {
    const error = validateInput(newTitle, 'Column Title');
    setBoardData(prevData => {
      return {
        ...prevData,
        columns: prevData.columns.map((column, i) => {
          return i === index ? {...column, title: newTitle, error} : column;
        })
      }
    });
  }, [validateInput]);

  const removeColumn = useCallback((index) => {
    setBoardData(prevData => {
      return {
        ...prevData,
        columns: prevData.columns.filter((_, i) => i !== index)
      }
    });
  }, []);

  // function to handle the submission of the board
  // validate the board name and columns
  // if no errors exist, create the board and close the modal
  // if errors exist, log the errors
  const handleSubmitBoard = () => {

    // check if errors exist in the board name
    const boardNameError = validateInput(boardData.title, 'Board Name');
    setBoardData(prevData => {
      return {
        ...prevData,
        title: boardData.title,
        error: boardNameError
      }
    });

    // check if errors exist in the columns
    const columnErrors = boardData.columns.map(column => {
      return validateInput(column.title, 'column-title')
    });
    setBoardData(prevData => {
      return {
        ...prevData,
        columns: prevData.columns.map((column, index) => {
          return {...column, error: columnErrors[index]}
        })
      }
    });

    // if errors exist, log the errors
    if (columnErrors.some(error => error !== '') || boardNameError !== '') {
      console.log('Errors exist');
    } else { // if no errors exist, create the board and close the modal
      const newBoardData = {
        title: boardData.title,
        columns: boardData.columns
      };
      console.log('board created, updating global state');
      createBoard(newBoardData);
      closeModal();
    }
  }

  return (
    <>
      <h3 className=" modal-header heading-l">Add New Board</h3>
      <CustomTextField label={'Board Name'}
                       id={'board-name'}
                       type={'text'}
                       placeholder={'e.g. Web Design'}
                       value={boardData.title}
                       onChange={(e) => setBoardData(prevData => ({...prevData, title: e.target.value, error: ''}))}
                       error={boardData.error}

      />

      {Object.keys(boardData.columns).length > 0 && boardData.columns.map((column, index) => (
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
      <CustomButton label={'Create Board'} type={'primary-small'} id="create_board" disabled={false}
                    onClick={() => handleSubmitBoard()}/>

    </>
  );
};

export default BoardForm;
