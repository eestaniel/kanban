import './menu.css'
import CustomTextField from "@/app/components/textfiield/CustomTextField";
import useStore from "@/app/store/useStore";

const Menu = ({newTask, handleSelectStatus}) => {
  const {activeBoard, initialData} = useStore(state => ({
    activeBoard: state.activeBoard,
    initialData: state.initialData
  }));


  return (
    <>
      <CustomTextField
        label={'Current Status'}
        select={true}
        options={activeBoard.columns}
        value={newTask.status}
        onChange={(menuItem)=> handleSelectStatus(menuItem)}
      />
    </>
  );
};

export default Menu;
