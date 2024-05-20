import './modalnewboard.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/Custom_Button";
import {useState} from "react";

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
  const [showError, setShowError] = useState(false)

  const addColumn = () => {
    setColumns([...columns, {title: '', error: 'Column title cannot be empty'}]);
  };

  const printColumns = () => {
    // check if errors exist
    const errors = columns.filter(column => column.error);
    if (errors.length > 0) {
      setShowError(true);
    }
    console.log(columns);
  }

  const validateColumn = (title) => {
    if (!title.trim()) {
      return 'Column title cannot be empty';
    }
    if (title.length > 16) {
      return 'Column title cannot exceed 16 characters';
    }
    return '';
  }

  const handleInputChange = (index, newTitle) => {
    const newColumns = columns.map((column, i) => {
      if (i === index) {
        const error = validateColumn(newTitle);
        return {...column, title: newTitle, error: error};
      }
      return column;
    });
    setColumns(newColumns);
  };

  const removeColumn = (index) => {
    setColumns(currentColumns => currentColumns.filter((_, i) => i !== index));
  }


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
            removeColumn={() => removeColumn(index)}
            error={column.error}
            showError={showError}
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
