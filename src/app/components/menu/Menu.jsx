import './menu.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import useStore from "@/app/store/useStore";

const Menu = ( {taskData, setTaskData} ) => {
  const {activeBoard} = useStore(state => ({
    activeBoard: state.activeBoard
  }));

  const handleSelectStatus = (value) => {
    setTaskData({
      ...taskData,
      task_data: {
        ...taskData.task_data,
        status: value
      }
    });
  }

  return (
    <>
      <CustomTextField
        label={'Current Status'}
        select={true}
        options={activeBoard.board_data.columns}
        func={handleSelectStatus}
      />
    </>
  );
};

export default Menu;
