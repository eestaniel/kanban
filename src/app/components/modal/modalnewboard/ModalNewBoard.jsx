import './modalnewboard.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/Custom_Button";
import {useState, useCallback} from "react";
import useInputValidator from "@/app/hooks/useInputValidator";
import useStore from "@/app/store/useStore";

const ModalNewBoard = () => {
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
  const [boardName, setBoardName] = useState({title: '', error: ''});
  const [columns, setColumns] = useState([])
  const {validateInput} = useInputValidator();
  const {createBoard} = useStore();


  const addColumn = () => {
    setColumns([...columns, {title: '', error: ''}]);
  };

  const testCreateBoard = () => {
    // check if errors exist in the board name
    const boardNameError = validateInput(boardName.title, 'Board Name');
    setBoardName({title: boardName.title, error: boardNameError});

    // check if errors exist in the columns
    const columnErrors = columns.map(column => {
      return validateInput(column.title, 'column-title')
    });
    setColumns(columns.map((column, index) => {
      return {...column, error: columnErrors[index]}
    }));

    if (columnErrors.some(error => error !== '') || boardNameError !== '') {
      console.log('Errors exist');
    } else {
      const newBoardData = {
        boardName: boardName.title,
        columns: columns
      };
      console.log('board created, updating global state');
      createBoard(newBoardData);  // Directly create board without setting state

    }
  }

  // validation for column list
  const handleInputChange = useCallback((index, newTitle) => {
    const error = validateInput(newTitle, 'Column Title');
    setColumns(prevColumns => prevColumns.map((column, i) => {
      return i === index ? {...column, title: newTitle, error} : column;
    }));
  }, [validateInput]);

  const removeColumn = useCallback((index) => {
    setColumns(currentColumns => currentColumns.filter((_, i) => i !== index));
  }, []);




  return (
    <>
      <h3 className=" modal-header heading-l">Add New Board</h3>
      <CustomTextField label={'Board Name'}
                       id={'board-name'}
                       type={'text'}
                       placeholder={'e.g. Web Design'}
                       value={boardName.title}
                       onChange={(e) => setBoardName({title: e.target.value, error: ''})}
                       error={boardName.error}

      />

      {Object.keys(columns).length > 0 && columns.map((column, index) => (
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
                    onClick={() => testCreateBoard()}/>

    </>
  );
};

export default ModalNewBoard;
