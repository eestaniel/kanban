import './modalnewboard.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/Custom_Button";
import {useState, useEffect, useCallback} from "react";
import useInputValidator from "@/app/hooks/useInputValidator";

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
  const [columns, setColumns] = useState([])
  const { validateInput } = useInputValidator();


  const addColumn = () => {
    setColumns([...columns, {title: '', error: ''}]);
  };

  const printColumns = () => {
    // check if errors exist
    const errors = columns.map(column => {
      return validateInput(column.title, 'column-title')
    });
    setColumns(columns.map((column, index) => {
      return {...column, error: errors[index]}
    } ));
  }

  const handleInputChange = useCallback((index, newTitle) => {
    const error = validateInput(newTitle, 'column-title');
    setColumns(prevColumns => prevColumns.map((column, i) => {
      return i === index ? { ...column, title: newTitle, error } : column;
    }));
  }, [validateInput]);

  const removeColumn = useCallback((index) => {
    setColumns(currentColumns => currentColumns.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
      console.log(columns)
    }
    , [columns]);


  return (
    <>
      <h3 className=" modal-header heading-l">Add New Board</h3>
      <CustomTextField label={'Board Name'} id={'board-name'} type={'text'} placeholder={'e.g. Web Design'}/>
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
                    onClick={() => printColumns()}/>

    </>
  );
};

export default ModalNewBoard;
