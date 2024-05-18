import './subtask_checkbox.css'

const SubtaskCheckbox = ({label}) => {
  // Function to handle container click
  const toggleCheckbox = (event) => {
    // This stops the checkbox from toggling twice when the checkbox itself is clicked
    if (event.target.type !== 'checkbox') {
      document.getElementById('subtask').click();
    }
  };

  return (
    <>
      <div className="subtask-checkbox-container subtask-heading" onClick={toggleCheckbox}>
        <input type="checkbox" id="subtask" name="subtask" value="subtask"/>
        <label htmlFor="subtask" onClick={toggleCheckbox}>{label}</label>
      </div>
    </>
  );
};

export default SubtaskCheckbox;
