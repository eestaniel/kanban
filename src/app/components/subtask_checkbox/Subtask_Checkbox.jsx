import './subtask_checkbox.css'
import {useCallback} from "react";

const SubtaskCheckbox = ({label}) => {
  // Function to handle container click
  const toggleCheckbox = (event) => {
    // This stops the checkbox from toggling twice when the checkbox itself is clicked
    if (event.target.type !== 'checkbox') {
      document.getElementById('subtask').click();
    }
  };

  const handleIfChecked = useCallback(() => {
    if (document.getElementById('subtask').checked) {
      return 'checked';
    } else {
      return '';
    }
  }, []);
  return (
    <>
      <div className="subtask-checkbox-container subtask-heading" onClick={toggleCheckbox}>
        <input type="checkbox" id="subtask" name="subtask" value="subtask"/>
        <label htmlFor="subtask" onClick={toggleCheckbox} className={handleIfChecked()}>{label}</label>
      </div>
    </>
  );
};

export default SubtaskCheckbox;
