import './custom_button.css'


const CustomButton = ({label, type, onClick, id='', disabled=false}) => {
  {/*
        Button Properties
          label: string
          type: [primary-large, primary-small, secondary, destructive]
   */
  }
  return (
    <>
      <button
        className={`custom-button ${type} ${type==='primary-large' ? 'heading-m' : 'btn-bold'} ${disabled ? 'disabled' : ''}`}
        id={id}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </>
  );
};

export default CustomButton;
