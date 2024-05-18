import './custom_button.css'


const CustomButton = ({label, type, onClick}) => {
  {/*
        Button Properties
          label: string
          type: [primary-large, primary-small, secondary, destructive]
   */
  }
  return (
    <>
      <button
        className={`custom-button ${type} ${type==='primary-large' ? 'heading-m' : 'btn-bold'}`}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default CustomButton;
