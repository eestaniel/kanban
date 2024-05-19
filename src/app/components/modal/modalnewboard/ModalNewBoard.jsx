import './modalnewboard.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import CustomButton from "@/app/components/buttons/Custom_Button";
import {useState} from "react";

const ModalNewBoard = () => {
  const [columns, setColumns] = useState([{value: ''}])

  const addColumn = () => {
    setColumns([...columns, {value: ''}]);
  };

  const printColumns = () => {
    console.log(columns);
  }

  const handleInputChange = (index, newValue) => {
    const newColumns = columns.map((column, i) => {
      if (i === index) {
        return {...column, value: newValue};
      }
      return column;
    });
    setColumns(newColumns);
  };

  const removeColumn = (index) => {
    console.log("Removing column at index:", index);
    setColumns(currentColumns => currentColumns.filter((_, i) => i !== index));
  }

  return (
    <>
      <h3 className=" modal-header heading-l">Add New Board</h3>
      <CustomTextField label={'Board Name'} id={'board-name'} type={'text'} placeholder={'e.g. Web Design'}/>
      {columns.map((column, index) => (
        <CustomTextField
          key={index}
          label={index === 0 ? 'Board Columns' : ''}
          id={`board-id-${index}`}
          type="text"
          placeholder=""
          value={column.value}
          onChange={e => handleInputChange(index, e.target.value)}
          isList={index !== 0}
          isListOne={index === 0}
          removeColumn={() => removeColumn(index)}
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
