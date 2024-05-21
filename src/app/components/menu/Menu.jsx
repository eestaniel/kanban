import './menu.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import useStore from "@/app/store/useStore";

const Menu = ({taskData, setTaskData}) => {
  const {activeBoard} = useStore(state => ({
    activeBoard: state.activeBoard
  }));

  const handleSelectStatus = (value) => {
    console.log(value);
    setTaskData(prevData => ({
      ...prevData,
      task_data: {
        ...prevData.task_data,
        status: value
      }
    }));
  }

  return (
    <>
      <CustomTextField
        label={'Current Status'}
        select={true}
        options={activeBoard.board_data.columns}
        value={taskData.task_data.status}
        onChange={handleSelectStatus}
      />
    </>
  );
};

export default Menu;
